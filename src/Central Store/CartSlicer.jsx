import {createSlice} from "@reduxjs/toolkit";

const cart = createSlice({
    name: "cartSlice",
    initialState: {
        // Hum apne foodObj ko ek array mein hi store karayenge na. Kyunki user toh 
        // multiple food items add kar sakta hai na...Initially, this array will be empty
        // since no item has been added yet...Toh items array ko ek tareeke se cart samjh lo
        items:[],
        count : 0,
    },
    reducers:{
        // Ab hum functions kaun kaun se banaye? Jo operations honge in items array...
        // Ya toh items array mein new foodObj add honge if user clicks the ADD btn
        addItems : (state,action) => {
            const newItem = {
                ...action.payload, // Our cardData will be stored in action.payload and we will spread this data
                quantity: 1 // As we are adding a new item
            }
            // Now, we will push this modified foodData in our items array
            state.items.push(newItem);
            state.count++;
        },
        // Ya toh particular foodObj ka count in items array badhega if user clicks the (+) btn
        IncrementItems : (state,action) => {
            // The primary find operation in JavaScript arrays is the find() method. It returns the first element in an array 
            // that satisfies the provided condition. If no element satisfies the condition, it returns undefined.
            const element =state.items.find((obj) => obj.id===action.payload.id);
            element.quantity += 1;
            state.count++;
        },
        // Ya toh particular foodObj ka count in items array ghatega if user clicks the (-) btn
        DecrementItems : (state,action) => {
            const element =state.items.find((obj) => obj.id===action.payload.id);
            if(element.quantity>1){
                element.quantity -= 1;
            }
            else{
                // To remove an object from the items array, we can take a smarter approach:
                // Instead of directly deleting it, we filter out all other items and keep that specific item.
                // The filtered result is then reassigned to the items array, effectively removing the target object cleanly.
                state.items=state.items.filter((obj) => obj.id!=action.payload.id);
            }
            state.count--;
        },
        // This resets the items array to empty and item count to zero.
        clearCart : (state,action) => {
            state.items = []; 
            state.count = 0;
        }
    }
})

export const {addItems,IncrementItems,DecrementItems,clearCart} = cart.actions;

export default cart.reducer;