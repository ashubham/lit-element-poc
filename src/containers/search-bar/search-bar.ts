import { ConnectedComponent } from '../../base/base-types/connected-component';
import { Component } from '../../base/decorators';

import {styles} from './search-bar-css';
import { html, query, property } from 'lit-element';
import {Tokenizer} from 'tokenizer.js';

import '../../widgets/layouts/horizontal/horizontal';
import '@material/mwc-icon/mwc-icon-font';
import '@material/mwc-icon-button';
import '@material/mwc-icon';
import { Phrase } from '../../services/auto-complete-service';
import { updateSearchText } from '../../modules/sage/sage-actions';

@Component({
    name: 'bk-search-bar',
    styles
})
export class SearchBarComponent extends ConnectedComponent {
    @query('#input') input!: HTMLDivElement;
    @property({attribute: false}) phrases!: string[];
    private tokenizer!: Tokenizer;

    constructor() {
        super();
    }

    render() {
        this.tokenizer && this.tokenizer.updateDisplay(this.tokenize(this.phrases));
        return html`
            <link href="https://unpkg.com/tokenizer.js@1.2.7/dist/tokenizer.css" rel="stylesheet">
            <bk-horizontal>
                <mwc-icon>search</mwc-icon>
                <div id="input" contenteditable="true"></div>
                <mwc-icon-button icon="clear"
                    @click=${() => this.tokenizer.clear()}></mwc-icon-button>
            </bk-horizontal>
        `;
    }

    firstUpdated() {
        this.tokenizer = new Tokenizer(this.input, {
            onChange: this.asyncTokenizePeriods,
		    onCaretPositionChanged: () => {},
		    initialInput: this.tokenize(this.phrases)
        })
    }

    stateChanged(state) {
        this.phrases = state.sage.phrases;
    }

    private asyncTokenizePeriods = (str: string, caretPosition) => {
        // UPDATE_SAGE_MODEL Action.
        this.dispatch(updateSearchText(str, caretPosition));
    }
    
    private tokenize(phrases: Phrase[]) {
        return phrases
            .map((phrase) => {
                return {
                    value: phrase.text,
                    className: (phrase.isComplete) ? 'token-type-a': 'incomplete-token',
                    isIncomplete: !phrase.isComplete,
                    isExtensible: false
                };
            });
    }
}