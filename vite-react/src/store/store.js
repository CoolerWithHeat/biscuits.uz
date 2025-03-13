import { createStore } from 'redux';

const initialState = {
    added_products: {},
    total: 0,
    lastResulted: 0,
    interaction: 0,
};

const validatePositive = (digit)=>{
    const data = digit || 0;
    return (data < 0) ? 0 : digit
}

const server_response = JSON.parse(import.meta.env.server_response);

const calculateTotal = (addedProducts)=>{
    const keys = Object.keys(addedProducts);
    let totalResulted = 0;
    keys.forEach(each_key=>{
        const product = server_response[each_key];
        if (product){
            let price = product.price;
            try{ price=parseFloat(price) } catch{};
            const quantity = addedProducts[each_key].quantity;
            const NumberPrice = typeof price === 'number';
            const NumberQuantity = typeof quantity === 'number';
            if ((NumberPrice) && (NumberQuantity)){
                totalResulted += (price*quantity);
            }
        };
    });
    return totalResulted;
};

const mainReducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case 'Add':
            if (payload){
                const states = {...state.added_products};
                const interationPoints = state.interaction + 1;
                const existingState = states[payload] || {};
                const existingAmount = (existingState ? existingState['quantity'] : 0) || 0;
                const resulted = typeof existingAmount === "number" ? existingAmount+1 : 1;
                states[payload] = {quantity: resulted, last_operation:'increment'};
                const lastTotal = state.total;
                const currentTotal = calculateTotal(states);
                return {...state, added_products: states, total: currentTotal, lastResulted:lastTotal, interaction: interationPoints};
            };
            return {...state, added_products: state.added_products};
        case 'Decrease':
            if (payload){
                const states = {...state.added_products};
                const interationPoints = state.interaction + 1;
                const existingState = states[payload] || {};
                const existingAmount = (existingState ? existingState['quantity'] : 0) || 0;
                let resulted = typeof existingAmount === "number" ? existingAmount-1 : 1;
                resulted = validatePositive(resulted);
                states[payload] = {quantity: resulted, last_operation:'decrement'};
                const lastTotal = state.total;
                const currentTotal = calculateTotal(states);
                return {...state, added_products: states, total: currentTotal, lastResulted:lastTotal, interaction: interationPoints};
            };
            return {...state, added_products: state.added_products};

        case 'Complete_Removal':
            if (payload){
                const states = {...state.added_products};
                const interationPoints = state.interaction + 1;
                const existingState = states[payload] || {};
                if (existingState){states[payload] = {quantity: 0, last_operation:'decrement'}}
                const lastTotal = state.total;
                const currentTotal = calculateTotal(states);
                return {...state, added_products: states, total: currentTotal, lastResulted:lastTotal, interaction: interationPoints};
            };
            return {...state, added_products: state.added_products};
        default:
            return state;
    }
};

const store = createStore(mainReducer);

export default store;