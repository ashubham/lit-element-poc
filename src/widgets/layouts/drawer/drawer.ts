import { BaseComponent } from '../../../base/base-types/base-component';
import { Component } from '../../../base/decorators';

import {styles} from './drawer-css';
import { html, customElement } from 'lit-element';

/**
 * @element bk-drawer-layout
 * @slot drawer
 */
@Component({
    name: 'bk-drawer-layout',
    styles
})
export class DrawerLayout extends BaseComponent {
    constructor() {
        super();
    }

    protected render() {
        return html`
            <slot id="drawerSlot" name="drawer"></slot>
            <div class="content-container">
                <slot></slot>
            </div>    
        `;
    }
}