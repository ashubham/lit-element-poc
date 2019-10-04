import { ConnectedComponent } from '../../base/base-types/connected-component';
import { Component } from '../../base/decorators';

import {styles} from './left-panel-css';
import { html, property } from 'lit-element';
import _ from 'lodash';

import '@material/mwc-button';
import '@material/mwc-textfield';
import '../../widgets/label/label';
import { LabelComponent } from '../../widgets/label/label';

import {sage} from '../../modules/sage/sage-reducers';
import {sourceColumns} from '../../modules/misc/reducers';
import { addColumns } from '../../modules/sage/sage-actions';
import {store} from '../../base/store';
import { getColumns } from '../../modules/misc/actions';

store.addReducers({
    sage,
    sourceColumns
});

/**
 * @element bk-left-panel
 */
@Component({
    name: 'bk-left-panel',
    styles
})
export class LeftPanelComponent extends ConnectedComponent {
    @property({attribute: false}) columns: any[] = [];
    private filteredColumns = this.columns;

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
                    id="search"
                    icon="search"
                    iconTrailing="clear"
                    @input=${this.onFilterUpdate}></mwc-textfield>
                <div class="column-list"
                     @leadingIconClick=${this.filterOnColumn}
                     @dblclick=${this.addColumn}>
                     <div a>
                        <div b></div>
                     </div>

                    ${this.filteredColumns.map(c => html`
                        <bk-label 
                            text=${c.name}
                            id=${c.id} 
                            trailingIcon="filter_list"></bk-label>
                    `)}
                </div>
            </bk-vertical>
        `;
    }

    private addColumn(e) {
        let targetCol: any = e.target;
        console.log(targetCol);
        this.dispatch(addColumns([{
            name: targetCol.text,
            id: targetCol.id
        }]));
    }

    private onFilterUpdate(e: InputEvent) {
        let filter = (e.composedPath()[0] as HTMLInputElement).value;
        console.log(filter);
        this.filterList(filter);
    }

    private filterList = _.debounce((filter: string) => {
        filter = filter.toLowerCase();
        this.filteredColumns = this.columns.filter(c => {
            return c.name.toLowerCase().includes(filter);
        });
        this.requestUpdate();
    }, 100);

    firstUpdated() {
        this.dispatch(getColumns());
    }

    async performUpdate() {
        await new Promise((resolve) => setTimeout(resolve));
        super.performUpdate();
    }

    stateChanged(state: any) {
        this.columns = state.sourceColumns.columns;
        this.filteredColumns = this.columns;
    }
}
