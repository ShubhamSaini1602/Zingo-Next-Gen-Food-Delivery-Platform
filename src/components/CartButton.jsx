import { useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import {addItems,IncrementItems,DecrementItems} from "../Central Store/CartSlicer";

function CartButton({cardData}){
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cartSlice.items);

    const element = items.find((obj) => obj.id===cardData.id);
    const count = element ? element.quantity : 0;

    function handleAddItems(){
        dispatch(addItems(cardData));
    }

    function handleIncrementItems(){
        dispatch(IncrementItems(cardData));
    }

    function handleDecrementItems(){
        dispatch(DecrementItems(cardData));
    }

    return (
        <>
        {count===0 ? (
            <button className="btn-first-version" onClick={()=> handleAddItems()}>ADD</button>
        ) : (
            <div className="btn-second-version">
                <button className="decrement" onClick={()=> handleDecrementItems()}>-</button>
                <p className="showCount">{count}</p>
                <button className="increment" onClick={()=> handleIncrementItems()}>+</button>
            </div>
        )}
        </>
    )
}

export default CartButton;