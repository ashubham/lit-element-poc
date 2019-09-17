import { ConnectedComponent } from '../../base/base-types/connected-component';
import { Component } from '../../base/decorators';

import {styles} from './left-panel-css';
import { html, property } from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import _ from 'lodash';

import '@material/mwc-button';
import '@material/mwc-textfield';
import '../../widgets/label/label';
import { LabelComponent } from '../../widgets/label/label';
 
/**
 * @element bk-left-panel
 */
@Component({
    name: 'bk-left-panel',
    styles
})
export class LeftPanelComponent extends ConnectedComponent {
    //@property({attribute: false}) columns: any[] = [];
    private filteredColumns = columns;

    constructor() {
        super();
    }

    render() {
        return html`
            <bk-vertical>
                <div class="header">Data</div>
                <div class="choose-sources">
                    <mwc-button dense outlined label="Choose sources"></mwc-button>
                </div>
                <mwc-textfield label="Search columns"
                    dense
                    icon="search"
                    iconTrailing="clear"
                    @input=${this.onFilterUpdate}></mwc-textfield>
                <div class="column-list"
                     @leadingIconClick=${this.filterOnColumn}
                     @dblclick=${this.addColumn}>
                    ${this.filteredColumns.map(c => html`
                        <bk-label 
                            text=${c.name} 
                            trailingIcon="filter_list"></bk-label>
                    `)}
                </div>
            </bk-vertical>
        `;
    }

    private addColumn(e) {
        let targetCol: any = e.target;
        console.log(targetCol);
    }

    private onFilterUpdate(e: InputEvent) {
        let filter = (e.composedPath()[0] as HTMLInputElement).value;
        console.log(filter);
        this.filterList(filter);
    }

    private filterList = _.debounce((filter: string) => {
        filter = filter.toLowerCase();
        this.filteredColumns = columns.filter(c => {
            return c.name.toLowerCase().includes(filter);
        });
        this.requestUpdate();
    }, 100);

    stateChanged(state: any) {
        //this.columns = state.leftPanel.columns;
    }
}

let columns: any[] = [];
for(let i = 0;i<1000;i++) {
    columns.push({
        name: `Amount ${i}`,
        id: _.uniqueId()
    });
}