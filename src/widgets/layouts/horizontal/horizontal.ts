import { BaseComponent } from '../../../base/base-types/base-component';
import { Component } from '../../../base/decorators';

import {styles} from './horizontal-css';
import { html, property } from 'lit-element';
/**
 * @element bk-horizontal
 */
@Component({
    name: 'bk-horizontal',
    styles
})
export class HorizontalLayout extends BaseComponent {
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