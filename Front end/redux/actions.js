function addProduct(payload) {
    return {
        type: 'ADD_PRODUCT',
        payload,
    };
}

export { addProduct };
