import { Reducer } from 'redux';
import { AnswerActions } from '../actions/answer-actions';

export interface SageModel {
    tokens: string[],
    phrases: string[]
}

const sage: Reducer<SageModel, any> = (state, action) => {
    switch(action.type) {
        case AnswerActions.UPDATE_SAGE_MODEL:
            
    }
}