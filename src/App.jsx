import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import ZingoFit from "./components/ZingoFit";
import Restaurants from "./components/Restaurants";
import RestaurantMenu from "./components/RestaurantMenu";
import ScrollToTop from "./components/ScrollToTop";
import {store , persistor} from "./Central Store/store";
import { PersistGate } from "redux-persist/integration/react";
import {Provider} from "react-redux";
import CheckOut from "./components/CheckOut";
import Searchpage from "./components/Searchpage";


function App(){
    return (
        <>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
        <ScrollToTop /> {/* Add this component right inside your Router */}
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/SignIn" element={<SignIn/>}></Route>
            <Route path="/ZingoFit" element={<ZingoFit/>}></Route>
            <Route path="/restaurants" element={<Restaurants/>} ></Route>
            <Route path="/city/Chandigarh/:rest_id" element={<RestaurantMenu/>}></Route>
            <Route path="/checkout" element={<CheckOut/>}></Route>
            <Route path="/search/:rest_id" element={<Searchpage/>}></Route>
        </Routes>
        </BrowserRouter>
        </PersistGate>
        </Provider>
        </>
    );
}

const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);