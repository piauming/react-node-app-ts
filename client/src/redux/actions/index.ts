import { ActionType } from "./type"
import { CartItem } from "./payload"

// tie the payload to action.type
interface AddToCartAction {
    type: ActionType.ADD_TO_CART,
    payload: CartItem
}

export type Action = AddToCartAction;