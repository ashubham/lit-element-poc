import { Action, ActionCreator, Dispatch, AnyAction } from 'redux';
import * as autoCompleteService from '../../services/auto-complete-service';
import {ThunkAction} from 'redux-thunk';

type ThunkResult = ThunkAction<void, any, undefined, any>;

export enum SageActions {
    ADD_COLUMNS = 'ADD_COLUMNS',
    ADD_UPDATE_FILTER = 'ADD_UPDATE_FILTER',
    UPDATE_SAGE_MODEL = 'UPDATE_SAGE_MODEL'
}

export interface AddColumnAction extends Action<SageActions.ADD_COLUMNS> {};
export interface AddFilterAction extends Action<SageActions.ADD_UPDATE_FILTER> {};

export const addColumns: ActionCreator<AddColumnAction> = (columns) =>
    async (dispatch: Dispatch<AnyAction>, getState: () => any) => {
        // Call sage service to get tokens/phrases
        let state = getState();
        let transforms = columns.map(autoCompleteService.createAddColumnTransform);
        let {phrases} = await autoCompleteService.transformTable(state.sage, transforms);
        dispatch({
            type: SageActions.UPDATE_SAGE_MODEL,
            phrases
        });
    }

export const updateSearchText: ActionCreate<ThunkResult> = (newInput, caretPosition, isCaretOnSeparator) =>
    async(dispatch, getState: () => any) => {
        let state = getState();
        let {phrases} = await autoCompleteService.editTable(state.sage, newInput);
        dispatch({
            type: SageActions.UPDATE_SAGE_MODEL,
            phrases
        });
    }

export const addFilter: ActionCreator<AddFilterAction> = (column) => {
    return {
        type: SageActions.ADD_UPDATE_FILTER,
        column
    }
}

