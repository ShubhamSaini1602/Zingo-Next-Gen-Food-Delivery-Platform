import { Link, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CartButton from "./CartButton";

function Searchpage(){
    const [Value, setValue] = useState("");
    const [finalArr, setFinalArr] = useState([]);

    const count = useSelector((state) => state.cartSlice.count);

    const {rest_id} = useParams();
    const FoodData = useSelector((state) => state.restaurantsSlice.menusData[rest_id]);
    // ---------------------------------------------------------------------------------------

    useEffect(()=>{
        // First, we have to check whether foodData exists or not
        if (!FoodData) return;

        const temp = [];

        const arr1 = (FoodData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards ?? FoodData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.categories[0]?.itemCards);
        for(let i=0;i<arr1.length;i++){
            temp.push(arr1[i]?.card?.info);
        }
        const arr2 = (FoodData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card?.itemCards ?? FoodData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card?.categories[0]?.itemCards);
        for(let i=0;i<arr2.length;i++){
            temp.push(arr2[i]?.card?.info);
        }
        const arr3 = (FoodData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card?.itemCards ?? FoodData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card?.categories[0]?.itemCards);
        for(let i=0;i<arr3.length;i++){
            temp.push(arr3[i]?.card?.info);
        }
        const arr4 = (FoodData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[5]?.card?.card?.itemCards ?? FoodData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[5]?.card?.card?.categories[0]?.itemCards);
        for(let i=0;i<arr4.length;i++){
            temp.push(arr4[i]?.card?.info);
        }
        const arr5 = (FoodData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[6]?.card?.card?.itemCards ?? FoodData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[6]?.card?.card?.categories[0]?.itemCards);
        for(let i=0;i<arr5.length;i++){
            temp.push(arr5[i]?.card?.info);
        }

        // Remove Duplicates from the temp array
        // 1. Create a Map. The key will be the obj's unique ID.
        const myMap = new Map();
        // 2. Loop through your temp array. The Map will automatically handle duplicates.
        for(let obj of temp){
            myMap.set(obj.id, obj);
        }
        // 3. Convert the unique values from the Map back into an array.
        const uniqueItemsArray = Array.from(myMap.values());

        setFinalArr(uniqueItemsArray);
    },[FoodData]);

    return (
        <>
        <div className="header-2">
            <Link to="/">
                <img src="/orange-zingo.png" className="orange-zingo"></img>
            </Link>

            <div className="navbar-2">
                <div className="navbar-2-temp extra1-temp">
                    <i className="ri-briefcase-fill navbar-2-icon"></i>
                    <a href="https://careers.swiggy.com/#/" target="_blank" className="card-link">
                        <button className="navbar-BTN text-10">Corporate</button>
                    </a>
                </div>
                <div className="navbar-2-temp">
                    <i className="ri-information-2-fill navbar-2-icon"></i>
                    <a href="https://careers.swiggy.com/#/about" target="_blank" className="card-link">
                        <button className="navbar-BTN text-11">About Us</button>
                    </a>
                </div>
                <div className="navbar-2-temp">
                    <i className="ri-phone-fill navbar-2-icon"></i>
                    <a href="https://www.swiggy.com/swiggy_customer_care" target="_blank" className="card-link">
                        <button className="navbar-BTN text-12">Contact Us</button>
                    </a>
                </div>
                <div className="navbar-2-temp">
                    <i className="ri-shake-hands-fill navbar-2-icon"></i>
                    <a href="https://www.swiggy.com/support" target="_blank" className="menu-link">
                        <button className="navbar-BTN text-13">Help</button>
                    </a>
                </div>
                <div className="navbar-2-temp extra2-temp">
                    <i className="ri-login-box-fill navbar-2-icon"></i>
                    <Link to="/SignIn" className="card-link">
                        <button className="navbar-BTN text-14">Sign In</button>
                    </Link>
                </div>
            </div>

            <Link to="/checkout" className="cart-link">
                {/* Cart Option In Header */}
                <div className="header-cart">
                    <img src="/shopping-bag.png" className="cart-img"></img>
                    <div className="centering-div">
                        <p className="item-count">{count}</p>
                    </div>
                    <p className="cart-heading">Cart</p>
                </div>
            </Link>
        </div>

        <div className="all-search">
            <Link to={"/city/Chandigarh/" + rest_id} className="cart-link">
                <i className="ri-arrow-left-long-line"></i>
            </Link>
            <input type="text" className="search-bar" placeholder={"Search in " + FoodData?.data?.cards[2]?.card?.card?.info?.name}
            value={Value} onChange={(event)=> setValue(event.target.value)}></input>
            <i className="ri-search-line shubham-saini"></i>
        </div>
        
        {/* Jab humari typed value exist karti ho tabhi neeche suggestions dikhana */}
        {/* nahi toh khali rakhna for the time being */}
        {Value && (
            finalArr.filter((obj) => obj?.name.toLowerCase().includes(Value.toLowerCase())).map((obj,index) => (
                <>
                <div className="outer-DIV" key={index}>
                    <div className="txt-div">
                        <p className="food-item-name">{obj?.name}</p>
                        <div className="all-offers">
                            <p className="food-price">₹ {(obj?.price ?? obj?.defaultPrice)/100}</p>
                            {/* When offer exists, then only show the offers */}
                            {obj?.offerTags && (
                                <>
                                <i className="ri-price-tag-3-fill payal"></i>
                                <p className="offer-tag1">{obj?.offerTags[0]?.title}</p>
                                <p className="offer-tag2">{obj?.offerTags[0]?.subTitle}</p>
                                </>
                            )}
                        </div>
                        <p className="CONTENT">{obj?.description}</p>
                    </div>
                    <div className="search-card">
                        <img src={"https://media-assets.swiggy.com/swiggy/image/upload/" + obj?.imageId} className="search-img"></img>
                        <div className="positioning-div-2">
                            <CartButton cardData={obj}/>
                        </div>
                    </div>
                </div>
                <hr className="suggestion-hr-tag"></hr>
                </>
            ))
        )}
        </>
    )
}

export default Searchpage;