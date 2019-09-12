
import { html, css, property, PropertyValues } from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { ConnectedComponent } from '../base-types/connected-component';
import { Component } from '../decorators';

@Component({
    name: 'poc-app'
})
export class PocApp extends ConnectedComponent {
    static get styles() {
        return css`
            :host {
                display: block;
            }
        `
    }

    constructor() {
        super();
        setPassiveTouchGestures(true);
    }

    protected render() {
        return html`
            <div>Hello World</div>
            <button>Fire!</button>
        `;
    }
}