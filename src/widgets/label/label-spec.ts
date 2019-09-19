import { fixture, html, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import './label';

describe('Label Component', () => {
    it('should show only text if no icons are passed', async () => {
        const el = await fixture(html`<bk-label text="Hello"></bk-label>`);
        expect(el).shadowDom.to.equal(`
            <bk-horizontal>
                <div class="text">
                    Hello
                </div>
            </bk-horizontal>`
        );
    });

    it('Should trigger leadingIconClick event when leading icon is clicked', async () => {
        let onClick = stub();
        const el: HTMLElement = await fixture(html`<bk-label 
            leadingIcon="clear" text="Hello" @leadingIconClick=${onClick}></bk-label>`);
        el.shadowRoot.getElementById('leading').click();
        expect(onClick).to.have.been.calledOnce;
    })
})