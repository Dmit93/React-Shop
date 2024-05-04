import { createContext, useState, useReducer } from "react";

export const CartContext = createContext(null);

export const initialState = {
    cartItems: [],
    viewCartPopup: false
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':

            const { item, color } = action.payload;
            const existingItem = state.cartItems.find(i => i.id === `${item.id}-${color.data.color}`);

            if (existingItem) {
                const updatedCartItems = state.cartItems.map(cartItem => {
                    if (cartItem.id === existingItem.id) {
                        return { ...cartItem, count: cartItem.count + 1 };
                    }
                    return cartItem;
                });
                return { ...state, cartItems: updatedCartItems };
            } else {
                const newCartItem = { ...item, count: 1, id: `${item.id}-${color.data.color}`, color: color.data.color };
                return { ...state, cartItems: [...state.cartItems, newCartItem] };
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
            };

        case 'TOGGLE_CART_POPUP':

            return { ...state, viewCartPopup: !state.viewCartPopup };

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [viewCartPopup, setViewCartPopup] = useState(false);

    const [state, dispatch] = useReducer(cartReducer, initialState);

    // console.log(initialState)
    const addCart = (item, color) => {

        const existingItem = cartItems.find(i => i.id === item.id);
        if (existingItem) {
            const findId = cartItems.find(i => i.id === `${item.id}-${color.data.color}`); // TODO переделать эту бредятину
            if (existingItem.color !== color.data.color && !findId) {
                setCartItems([...cartItems, { ...item, count: 1, id: `${item.id}-${color.data.color}`, color: color.data.color }]);
            } else {
                setCartItems(cartItems.map(i => i.id === item.id ? { ...i, count: i.count + 1 } : i));
            }
        } else {
            setCartItems([...cartItems, { count: 1, ...item, color: color.data.color }]);
        }
    }

    // const addCart = (item, color) => {
    //     dispatch({ type: 'ADD_TO_CART', payload: { item, color } });
    // }


    const removeCart = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    }

    // const viewCartClick = () => {
    //     dispatch({ type: 'TOGGLE_CART_POPUP' });
    // }

    const viewCartClick = () => setViewCartPopup(!viewCartPopup);

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addCart, removeCart, viewCartPopup, viewCartClick, initialState }}>
            {children}
        </CartContext.Provider>
    );
}