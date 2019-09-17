import { BaseComponent } from '../../../base/base-types/base-component';
import { Component } from '../../../base/decorators';

import {styles} from './vertical-css';
import { html, property } from 'lit-element';
/**
 * @element bk-vertical
 */
@Component({
    name: 'bk-vertical',
    styles
})
export class VerticalLayout extends BaseComponent {
    @property({type: String}) justify: "center" | "start" | "end" = "start";

    constructor() {
        super();
    }

    render() {
        return html`
            <slot justify=${this.justify}></slot>
        `;
    }
}