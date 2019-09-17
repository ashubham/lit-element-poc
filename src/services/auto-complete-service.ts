import _ from 'lodash';

export function createAddColumnTransform(column) {
    return {
        type: 'ADD_COLUMN',
        guid: column.guid,
        name: column.name
    }
}

export interface Phrase {
    text: string;
    isComplete: boolean;
}

interface SageResponse {
    phrases: Phrase[];
}

let emptyContext = {
    phrases: []
}

export function transformTable(context,
                               transforms): PromiseLike<SageResponse> {
    _.defaults(context, emptyContext);
    let newTokens = transforms.map(t => { 
        return {
            text: t.name,
            isComplete: true
        };
    });
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                phrases: context.phrases.concat(newTokens)
            })
        }, Math.random() * 200);
    });
}

export function editTable(context, newInput): PromiseLike<SageResponse> {
    _.defaults(context, emptyContext);
    let newText = context.phrases.reduce(
        (text, phrase) => {
            if(!phrase.isComplete) return text;

            return text.replace(phrase.text, '');
        }, newInput);
    newText = newText.trim();

    if(!newInput) {
        context.phrases = [];
    } else if(!newText) {
        let delPhraseIdx = context.phrases.findIndex(phrase => {
            return !newInput.includes(phrase.text);
        })
        context.phrases.splice(delPhraseIdx, 1);
    } else {
        let isComplete = newText[newText.length - 1] === '.';
        let newPhrase = {text: newText, isComplete};
        let newTextIdx = newInput.indexOf(newText);
        let newPhraseIdx = context.phrases.length;
        for(let i = 0, len = 0; i < context.phrases.length; i++) {
            len += context.phrases[i].text.length;
            if(newTextIdx < len) {
                newPhraseIdx = i;
                break;
            }
        }
        let doNoReplace = (context.phrases[newPhraseIdx - 1] && context.phrases[newPhraseIdx - 1].isComplete);
        if(!doNoReplace) {
            context.phrases.splice(newPhraseIdx - 1, 1, newPhrase);
        } else {
            context.phrases.splice(newPhraseIdx, 0, newPhrase);
        }
    }
    
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                phrases: _.cloneDeep(context.phrases)
            })
        }, Math.random() * 200);
    });
}
