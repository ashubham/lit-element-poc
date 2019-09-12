import {LitElement} from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../store';

export class ConnectedComponent extends connect(store)(LitElement) {
    constructor() {
        super();
    }
}