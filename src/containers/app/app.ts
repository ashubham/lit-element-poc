
import { html, css, property, PropertyValues } from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { ConnectedComponent } from '../base-types/connected-component';
import { Component } from '../decorators';
import {styles} from './app-css';

import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-icon-button';
import '@material/mwc-icon/mwc-icon-font';

import '../../containers/home/home';

@Component({
    name: 'poc-app',
    styles
})
export class PocApp extends ConnectedComponent {
    constructor() {
        super();
        setPassiveTouchGestures(true);
    }

    protected render() {
        return html`
            <mwc-top-app-bar-fixed>
                <div slot="title">Lit Element POC</div>
                <mwc-icon-button icon="menu" slot="navigationIcon"></mwc-icon-button>
            </mwc-top-app-bar-fixed>
            <bk-home></bk-home>
        `;
    }
}