import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../Central Store/CartSlicer";
import { Link } from "react-router";
import CartButton from "./CartButton";

function CheckOut(){
    const [DeliveryFee, setDeliveryFee] = useState(35);

    const items = useSelector((state) => state.cartSlice.items);

    // Cart Empty Wala UI show karo
    if(items.length===0){
        return (
            <>
            <div className="checkout-header">
                <div className="secure-checkout">
                    <img src="/orange-zingo.png" className="orange-zingo-1"></img>
                    <p className="secure">SECURE CHECKOUT</p>
                </div>
                <div className="help-div">
                    <i className="ri-shake-hands-fill help-icon"></i>
                    <a href="https://www.swiggy.com/support" target="_blank" className="menu-link">
                        <button className="help-btn">Help</button>
                    </a>
                </div>
            </div>
            {/* ---------------------------------------- */}
            <div className="empty-cart-ui">
                <img src="/empty-cart-ui.png" className="empty-cart-ui-pic"></img>
                <Link to="/restaurants">
                    <button className="browse-restaurants">BROWSE RESTAURANTS</button>
                </Link>
            </div>
            </>
        )
    }

    let totalBill = 0;
    for(let obj of items){
        totalBill += ((obj.price ?? obj.defaultPrice)/100)*(obj.quantity);
    }

    // --------------------------------------
    const dispatch = useDispatch();

    function clrCart(){
        dispatch(clearCart());
    }

    return (
        <>
        
        <div className="checkout-header">
            <div className="secure-checkout">
                <Link to="/">
                    <img src="/orange-zingo.png" className="orange-zingo-1"></img>
                </Link>
                <p className="secure">SECURE CHECKOUT</p>
            </div>
            <div className="help-div">
                <i className="ri-shake-hands-fill help-icon"></i>
                <a href="https://www.swiggy.com/support" target="_blank" className="menu-link">
                    <button className="help-btn">Help</button>
                </a>
            </div>
        </div>
        {/* --------------------------------------------------------------------------------------------------- */}

        <div className="your-cart-div">
            <p className="your-cart">Your Cart</p>
            <img src="/shopping-cart.png" className="your-cart-pic"></img>
        </div>
        {/* --------------------------------------------------------------------------------------------------- */}

        <hr className="cart-hr-tag"></hr>
        {/* --------------------------------------------------------------------------------------------------- */}

        {
            items.map((obj,index) => (
                <div className="item" key={index}>
                    <div className="container-div">
                        <img src={"https://media-assets.swiggy.com/swiggy/image/upload/" + obj?.imageId} className="item-pic"></img>
                        <p className="item-name">{obj?.name}</p>
                    </div>
                    <div className="positioning-div">
                        <CartButton cardData={obj}/>
                    </div>
                    {/* Total price would be -> (original price*quantity) */}
                    <p className="item-price">₹{((obj?.price ?? obj?.defaultPrice)/100)*(obj?.quantity)}</p>
                </div>
            ))
        }
        {/* --------------------------------------------------------------------------------------------------- */}

        <div className="optional-checkbox">
            <input type="checkbox" className="option" name="CheckBox"></input>
            <div className="checkbox-txt">
                <p className="checkbox-txt-1">Opt in for No-contact Delivery</p>
                <p className="checkbox-txt-2">Unwell, or avoiding contact? Please select no-contact delivery. 
                    Partner will safely place the order outside your door (not for COD)</p>
            </div>
        </div>
        {/* --------------------------------------------------------------------------------------------------- */}

        <div className="div-one">
            <button className="delivery-type">Delivery Type</button>
            <div className="div-three">
                <div className="div-four">
                    <input type="radio" className="radio-btn-1" name="delivery-radio-btn" value="45" onChange={(event) => setDeliveryFee(Number(event.target.value))}></input>
                    <div className="div-five">
                        <p className="express">Express
                            <img src="/light.png" className="delivery-image"></img>
                            | <span className="overline-txt">₹35</span>
                              <span className="extended-fee">₹45</span>
                        </p>
                        <p className="desc-one">Fastest delivery, directly to you!</p>
                    </div>
                </div>
                <p className="time-one">20-25 mins</p>
            </div>
            <div className="div-three">
                <div className="div-four">
                    <input type="radio" className="radio-btn-1" name="delivery-radio-btn" value="35" onChange={(event) => setDeliveryFee(Number(event.target.value))}></input>
                    <div className="extra-five">
                        <p className="express">Standard</p>
                        <p className="desc-one">Minimal order grouping</p>
                    </div>
                </div>
                <p className="time-one">25-30 mins</p>
            </div>
            <div className="div-three">
                <div className="div-four">
                    <input type="radio" className="radio-btn-1" name="delivery-radio-btn" value="35" onChange={(event) => setDeliveryFee(Number(event.target.value))}></input>
                    <div className="extra-five">
                        <p className="express">Eco Saver</p>
                        <p className="desc-one">Lesser CO2 by order grouping</p>
                    </div>
                </div>
                <p className="time-one">30-40 mins</p>
            </div>
        </div>
        {/* --------------------------------------------------------------------------------------------------- */}

        <div className="total-bill-div">
            <div className="bill-details-div">
                <img src="/bill.png" className="bill-pic"></img>
                <p className="bill-details">Bill Details</p>
            </div>
            <div className="bill-details-1">
                <p className="total">Item Total</p>
                <p className="total-original-price">₹{totalBill}</p>
            </div>

            <hr className="bill-hr-tag-1"></hr>

            <div className="delivery">
                <p className="delivery-fee">Delivery Fee | 1.5 kms</p>
                <p className="total-delivery">₹{DeliveryFee}</p>
            </div>
            <div className="Gst">
                <p className="Gst-charges">GST & Other Charges</p>
                <p className="total-gst">₹74</p>
            </div>

            <hr className="bill-hr-tag-2"></hr>

            <div className="total-bill">
                <p className="payment">TO PAY</p>
                <p className="total-payment">₹{totalBill + DeliveryFee + 74}</p>
            </div>

            <hr className="bill-hr-tag-3"></hr>
        </div>
        {/* --------------------------------------------------------------------------------------------------- */}

        <div className="cancellation-policy">
            <p className="policy-txt-1">Review your order and address details to avoid cancellations</p>
            <p className="policy-txt-2">Please ensure your address and order details are correct. This order, if cancelled, is non-refundable.</p>
            <a href="https://www.swiggy.com/refund-policy" target="_blank" className="cancellation-policy-link">
                <p>Read policy</p>
            </a>
        </div>
        {/* --------------------------------------------------------------------------------------------------- */}

        <button className="clear-cart-btn" onClick={clrCart}>Clear Cart</button>
        
        </>
    )
}

export default CheckOut;



