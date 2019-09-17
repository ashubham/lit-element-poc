import { ConnectedComponent } from '../../base/base-types/connected-component';
import { Component } from '../../base/decorators';

import {styles} from './search-bar-css';
import { html, query } from 'lit-element';
import {Tokenizer} from 'tokenizer.js';

import '../../widgets/layouts/horizontal/horizontal';
import '@material/mwc-icon/mwc-icon-font';
import '@material/mwc-icon-button';
import '@material/mwc-icon';

@Component({
    name: 'bk-search-bar',
    styles
})
export class SearchBarComponent extends ConnectedComponent {
    @query('#input') input!: HTMLDivElement;
    constructor() {
        super();
    }

    render() {
        return html`
            <link href="https://unpkg.com/tokenizer.js@1.2.7/dist/tokenizer.css" rel="stylesheet">
            <bk-horizontal>
                <mwc-icon>search</mwc-icon>
                <div id="input" contenteditable="true"></div>
                <mwc-icon-button icon="clear"></mwc-icon-button>
            </bk-horizontal>
        `;
    }

    firstUpdated() {
        let tokenizer = new Tokenizer(this.input, {
            onChange: this.asyncTokenizePeriods,
		    onCaretPositionChanged: () => {},
		    initialInput: this.tokenizePeriods("I am complete. I am too. I am not")
        })
    }

    private asyncTokenizePeriods = (str: string, caretPosition) => {
        let tokenized = this.tokenizePeriods(str, caretPosition);
        return new Promise(resolve => {
            setTimeout(() => resolve(tokenized), 50);
        });
    }
    
    private tokenizePeriods(str: string, caretPosition) {
        return str
            .replace(/\./g, '.#!')
            .split('#!')
            .filter(token => token !== "")
            .map(token => token.trimLeft())
            .map((token) => {
                console.log(token);
                let isComplete = token[token.length - 1] === '.';
                return {
                    value: token,
                    className: (isComplete) ? 'token-type-a': 'incomplete-token',
                    isIncomplete: !isComplete,
                    isExtensible: false
                };
            });
    }
}