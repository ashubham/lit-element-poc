import { BaseComponent } from '../../base/base-types/base-component'
import { html, LitElement } from 'lit-element'
import { WrappedComponent, property } from '../../base/decorators';
import { directive } from 'lit-html';


const ifD = directive((shouldShow, template) => (part) => {
    shouldShow && part.setValue(template);
})

@WrappedComponent({
    name: 'test-widget',
    styles: []
})
export class TestWidget {
    @property({ type: String }) text;
    @property({ type: Boolean }) showChild = false;

    @property({ type: String })
    get value(): string {
        return this.text;
    }

    set value(val) {
        this.text = val;
    }

    constructor(text) {
        this.text = text;
    }

    render() {
        return html`
            <div>${this.text}</div>
            ${ifD(this.showChild, html`<div>
                <span>Child</span>
            </div>`)}
        `
    }
}