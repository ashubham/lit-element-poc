import { Action, ActionCreator, Dispatch, AnyAction } from 'redux';
import * as metadataService from '../../services/metadata-service';

export enum Actions {
    GET_COLUMN_LIST = 'GET_COLUMN_LIST'
}

export const getColumns: ActionCreator<any> = () => 
    async (dispatch) => {
        let columns = await metadataService.getColumns();
        dispatch({
            type: Actions.GET_COLUMN_LIST,
            columns
        });
    }