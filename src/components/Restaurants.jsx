import { useEffect, useState } from "react";
import { Link } from "react-router";
import Footer from "./Footer";
import { Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Mousewheel, FreeMode,} from "swiper/modules";
import Shimmer1 from "./Shimmer1";
import { useSelector } from "react-redux";

import "swiper/css";
import "swiper/css/navigation";

function Restaurants(){
    const [slideData, setslideData] = useState([]);
    const [RestData, setRestData] = useState([]);
    const [loading, setLoading] = useState(true);
    // ----------------------------------------------------
    const count = useSelector((state) => state.cartSlice.count);
    // ----------------------------------------------------

    async function fetchData(){
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const SwiggyAPI = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.7320385&lng=76.77263339999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
        const response = await fetch(proxy + SwiggyAPI);
        const data = await response.json();
        // Extracting only the required data (array of objects)
        setslideData(data?.data?.cards[0]?.card?.card?.imageGridCards?.info);
        setRestData(data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setLoading(false);
    }

    useEffect(()=>{
        fetchData();
    } , [])

    // Before the data is fetched, return the Shimmer So that the below return 
    // statement is not executed, the Shimmer Effect is returned directly
    if(loading===true){
        return <Shimmer1></Shimmer1>
    }

    return (
        <>
        <div className="header-2">
            <Link to="/">
                <img src="../src/utils/orange-zingo.png" className="orange-zingo"></img>
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

            <Link to="/checkout"  className="cart-link">
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
        {/* -------------------------------------- */}
        <div className="khana-slider">
            <h2 className="swiper-text">What's on your mind?</h2>
            <Swiper
                modules={[Navigation, Mousewheel, FreeMode]}
                navigation={{
                    prevEl: ".mY-swiper-btn-prev",
                    nextEl: ".mY-swiper-btn-next"
                }}
                slidesPerView={"auto"}
                spaceBetween={30}
                speed={900}
                mousewheel={{
                    forceToAxis: true
                }}
                freeMode={true}
            >
                {
                    slideData.map((obj1) => (
                        <SwiperSlide key={obj1.id}>
                            <div className="swiper-slide-content">
                                <img src={"https://media-assets.swiggy.com/swiggy/image/upload/" + obj1?.imageId} className="swiper-img"></img>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <div className="mY-swiper-btn-prev">
                <i className="ri-arrow-left-circle-fill"></i>
            </div>
            <div className="mY-swiper-btn-next">
                <i className="ri-arrow-right-circle-fill"></i>
            </div>
        </div>
        {/* -------------------------------------- */}
        <hr className="hr-tag"></hr>
        {/* -------------------------------------- */}
        <h2 className="hotels-chd">Restaurants with online food delivery in Chandigarh</h2>
        <div className="card-container2">
            {
                RestData.map((obj2) => (
                    <Link to={"/city/Chandigarh/" + obj2?.info?.id} className="card-link">
                        <div className="rest-card" key={obj2?.name}>
                            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/" + obj2?.info?.cloudinaryImageId} className="rest-img"></img>
                            {/* Overlay between img and text */}
                            <div className="rest-overlay"></div>
                            <div className="text-text">
                                <h1 className="rest-text1">{obj2?.info?.aggregatedDiscountInfoV3?.header}</h1>
                                <h1 className="rest-text2">{obj2?.info?.aggregatedDiscountInfoV3?.subHeader}</h1>
                            </div>
                            <h2 className="rest-name">{obj2?.info?.name}</h2>
                            <div className="rating-time">
                                <ion-icon name="star" className="rest-star"></ion-icon>
                                <p className="rest-rating">{obj2?.info?.avgRating}</p>
                                <i className="ri-circle-fill"></i>
                                <p className="rest-time">{obj2?.info?.sla?.slaString}</p>
                            </div>
                            <h3 className="rest-cuisines">{obj2?.info?.cuisines.join(", ")}</h3>
                            <h3 className="rest-location">{obj2?.info?.areaName}</h3>
                        </div>
                    </Link>
                ))
            }
        </div>
        <Footer/>
        </>
    );
}

export default Restaurants;