import { BaseComponent } from '../../base/base-types/base-component'
import { Component, action } from '../../base/decorators'

import {styles} from './label-css';
import { html, property } from 'lit-element';
import '@material/mwc-icon';


/**
 * @element bk-label
 * @fires leadingIconClick
 */
@Component({
    name: 'bk-label',
    styles
})
export class LabelComponent extends BaseComponent {
    @property({type: String}) text: string = '';
    @property({type: String}) leadingIcon: string = '';
    @property({type: String}) trailingIcon: string = '';
    @property({type: String}) id: string = '';
    @action<void>({}) leadingIconClick!: () => {};

    constructor() {
        super();
    }

    render() {
        return html`
            <bk-horizontal>
                ${this.leadingIcon 
                    ? html`<mwc-icon
                        id="leading" 
                        class="leading"
                        @click=${this.leadingIconClick}>${this.leadingIcon}</mwc-icon>` : ''}
                <div class="text">${this.text}</div>
                ${this.trailingIcon 
                    ? html`<mwc-icon 
                        class="trailing"
                        @click=${this.leadingIconClick}>${this.trailingIcon}</mwc-icon>`
                    : ''}
            </bk-horizontal>
        `;
    }
}   