import { Reducer } from 'redux';
import { SageActions } from './sage-actions';
import { Phrase } from '../../services/auto-complete-service';

export interface SageModel {
    phrases: Phrase[]
}

let initiate_state = {
    phrases: []
}

export const sage: Reducer<SageModel, any> = (state: SageModel = initiate_state, 
    action: any): SageModel => {
    switch(action.type) {
        case SageActions.UPDATE_SAGE_MODEL:
            return {
                ...state,
                phrases: action.phrases
            }
        default:
            return state;
    }
}
