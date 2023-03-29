import produce from 'immer';
import { ActionType } from "../actions/type/index";
import { Action } from "../actions/index";
import initialState from "../initialState";
import State from '../State';

const reducer = (state: State = initialState, action: Action): State => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ActionType.ADD_TO_CART:
                draft.cart.push(action.payload);
            default:
                return draft;
        }
    });
}

export default reducer

export type RootState = ReturnType<typeof reducer>