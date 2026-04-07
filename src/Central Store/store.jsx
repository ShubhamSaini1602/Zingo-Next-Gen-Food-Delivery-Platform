import { configureStore, combineReducers } from "@reduxjs/toolkit";
import CartReducer from "./CartSlicer";
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import cacheReducer from "./restaurantsSlice";

const rootReducer = combineReducers({
    cartSlice: CartReducer,
    restaurantsSlice: cacheReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist : ["restaurantsSlice"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export const persistor = persistStore(store);

