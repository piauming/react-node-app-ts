import produce from "immer";
import State from "../State";
import { CartItem } from "../actions/payload";

const addToCart = (state: State, payload: CartItem) => {
    return produce(state, draft => {
        draft.cart.push(payload);
    });
}

export default addToCart;