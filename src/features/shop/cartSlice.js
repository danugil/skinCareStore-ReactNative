import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: {
            user: null,
            updatedAt: new Date().toLocaleString(),
            total: null,
            items: [],
        },
    },
    reducers: {
        addItem: (state, action) => {
            const productRepeated = state.value.items.find(
                (item) => item.id === action.payload.id
            );
            if (productRepeated) {
                const itemsUpdated = state.value.items.map((item) => {
                    if (item.id === action.payload.id) {
                        item.quantity += action.payload.quantity
                        return item;
                    }
                    return item;
                });
                const total = itemsUpdated.reduce(
                    (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
                    0
                );
                state.value = {
                    ...state.value,
                    items: itemsUpdated,
                    total,
                    updatedAt: new Date().toDateString(),
                };
            } else {
                state.value.items.push(action.payload);
                const total = state.value.items.reduce(
                    (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
                    0
                );
                state.value = {
                    ...state.value,
                    total,
                    updatedAt: new Date().toLocaleString(),
                };

            };
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            const itemsDeleted = state.value.items.filter((item) => item.id !== itemId);
            const calculateTotal = (items) => {
                return items.reduce((acc, currentItem) => acc + currentItem.price * currentItem.quantity, 0);
            };
            state.value = {
                ...state.value,
                items: itemsDeleted,
                total: calculateTotal(itemsDeleted),
                updatedAt: new Date().toDateString(),
            };
        },
        emptyCart: (state) => {
            state.value = {
                ...state.value,
                updatedAt: new Date().toLocaleString(),
                total: null,
                items: [],
            };
        },
        increment: (state, action) => {
            const id = action.payload;
            const index = state.value.items.findIndex(item => item.id === id);
            state.value.items[index].quantity += 1;
            const calculateTotal = (items) => {
                return items.reduce((acc, currentItem) => acc + currentItem.price * currentItem.quantity, 0);
            };
            state.value = {
                ...state.value,
                updatedAt: new Date().toDateString(),
                total: calculateTotal(state.value.items),
            };
        },
        decrement: (state, action) => {
            const id = action.payload;
            const index = state.value.items.findIndex(item => item.id === id);
            state.value.items[index].quantity -= 1;
            if (state.value.items[index].quantity === 0) {
                state.value.items.splice(index, 1);
            };
            const calculateTotal = (items) => {
                return items.reduce((acc, currentItem) => acc + currentItem.price * currentItem.quantity, 0);
            };
            state.value = {
                ...state.value,
                updatedAt: new Date().toDateString(),
                total: calculateTotal(state.value.items),
            };
        },
    },
});

export const { addItem, removeItem, emptyCart, increment, decrement } = cartSlice.actions;

export default cartSlice.reducer;