import { ConnectedComponent } from '../../base/base-types/connected-component';
import { Component } from '../../base/decorators';
import {styles} from './home-css';
import { html } from 'lit-element';

import { TestWidget } from '../../widgets/test-widget/test-widget';
import '../../widgets/test-widget/test-widget';
import '../../widgets/layouts/drawer/drawer';
import '../left-panel/left-panel';
import '../../widgets/layouts/vertical/vertical'
import '../search-bar/search-bar';

/**
 * Home Component
 * 
 * @element bk-home
 */
@Component({
    name: `bk-home`,
    styles
})
export class HomeComponent extends ConnectedComponent {
    constructor() {
        super();
        this.widget = new TestWidget('initial');
    }

    protected render() {
        return html`
            <test-widget .ctrl=${this.widget}></test-widget>
            <bk-drawer-layout>
                <bk-left-panel slot="drawer"></bk-left-panel>
                <bk-vertical justify="center">
                    <bk-search-bar></bk-search-bar>
                </bk-vertical>
            </bk-drawer-layout>
        `
    }
}