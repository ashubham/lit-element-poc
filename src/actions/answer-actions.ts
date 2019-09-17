import { Action, ActionCreator } from 'redux';

export enum AnswerActions {
    ADD_COLUMNS = 'ADD_COLUMNS',
    ADD_UPDATE_FILTER = 'ADD_UPDATE_FILTER',
    UPDATE_SAGE_MODEL = 'UPDATE_SAGE_MODEL'
}

export interface AddColumnAction extends Action<AnswerActions.ADD_COLUMNS> {};
export interface AddFilterAction extends Action<AnswerActions.ADD_FILTER> {};
export type LeftPanelAction = AddColumnAction | AddFilterAction;

export const addColumn: ActionCreator<AddColumnAction> = (columns) => {
    return {
        type: AnswerActions.ADD_COLUMNS,
        columns
    }
}

export const addFilter: ActionCreator<AddFilterAction> = (column) => {
    return {
        type: AnswerActions.ADD_UPDATE_FILTER,
        column
    }
}

