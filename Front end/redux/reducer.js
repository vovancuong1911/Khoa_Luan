const initState = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];

function reducerUser(state = initState, action) {
    switch (action.type) {
        case 'ADD_PRODUCT':
            const existingProductIndex = state.findIndex((product) => product.id === action.payload.id);
            if (existingProductIndex === -1) {
                const updatedState = [...state, action.payload];
                localStorage.setItem('products', JSON.stringify(updatedState));
                return updatedState;
            } else {
                const updatedState = [...state];
                updatedState[existingProductIndex] = {
                    ...updatedState[existingProductIndex],
                    quantity: updatedState[existingProductIndex].quantity + action.payload.quantity,
                };
                localStorage.setItem('products', JSON.stringify(updatedState));
                return updatedState;
            }
        default:
            return state;
    }
}

export default reducerUser;
