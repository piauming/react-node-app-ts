import { Dispatch } from "redux";
import { Action } from "../index";
import { ActionType } from "../type";
import { CartItem } from "../payload";

const addToCart = (id: number, count: number, title: string) => {
    return (dispatch: Dispatch<Action>) => {
        // action is the value
        // this action creator can specify what are the inputs but
        // and the format of payload must match 
        // the "interface AddToCartAction" in "redux/actions/index"
        const cartItem: CartItem = {id: id, count: count, title: title}
        const action = {
            type: ActionType.ADD_TO_CART,
            payload: cartItem
        }

        dispatch(action);
    }
}

export default addToCart;