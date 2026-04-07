import { createSlice } from "@reduxjs/toolkit";

const cacheStore = createSlice({
    name: "restaurantsSlice",
    initialState:{
        // We will store each API menuData keyed by its restaurant ID
        menusData : [],
    },

    reducers: {
        addMenu : (state,action) => {
            const {rest_id, data} = action.payload;
            // Cache the data using the restaurant ID as the index
            state.menusData[rest_id] = data;
        }
    }
});

export const {addMenu} = cacheStore.actions;
export default cacheStore.reducer;