import { Reducer } from 'redux';
import { Actions } from './actions';

let initiate_state = {
    columns: []
}

export const sourceColumns: Reducer<any, any> = (state = initiate_state, 
    action: any) => {
    switch(action.type) {
        case Actions.GET_COLUMN_LIST:
            return {
                ...state,
                columns: action.columns
            }
        default:
            return state;
    }
}