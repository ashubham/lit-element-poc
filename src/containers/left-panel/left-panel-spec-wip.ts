import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import { stub } from 'sinon';
import './left-panel';
import { LeftPanelComponent } from './left-panel';

describe('Left Panel', () => {
    it('Should show a list of passed columns', async () => {
        let columns = [{ name: 'c1', id: 'c1' }, { name: 'c2', id: 'c2' }];
        let el = await fixture(html`<bk-left-panel .columns=${columns}></bk-left-panel>`);
        expect(el).shadowDom.to.equalSnapshot();
    });

    it('Should filter columns when keyword typed', async () => {
        let columns = [{ name: 'c1', id: 'c1' }, { name: 'c2', id: 'c2' }];
        let el = await fixture(html`<bk-left-panel .columns=${columns}></bk-left-panel>`);
        let searchEl = el.shadowRoot.getElementById('search') as HTMLInputElement;
        searchEl.value = 'c2';
        searchEl.dispatchEvent(new Event('input'));
        await elementUpdated(el);
        expect(el.shadowRoot.querySelector('bk-label').text).to.equal('c2');
    })
})