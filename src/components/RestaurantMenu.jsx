import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Navigation} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Footer from "./Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CartButton from "./CartButton";
import { useSelector, useDispatch } from "react-redux";
import Shimmer2 from "./Shimmer2";
import { addMenu } from "../Central Store/restaurantsSlice";

function RestaurantMenu(){
    const [FoodData, setFoodData] = useState({});
    const [dealData, setdealData] = useState([]);
    const [topPicksData, setTopPicksData] = useState([]);
    const [allTimeFav, setAllTimeFav] = useState([]);
    const [menuPart2, setMenuPart2] = useState([]);
    const [menuPart3, setMenuPart3] = useState([]);
    const [menuPart4, setMenuPart4] = useState([]);
    const [menuPart5, setMenuPart5] = useState([]);
    const [menuPart6, setMenuPart6] = useState([]);
    // ----------------------------------------------------
    const [VegFilter, setVegFilter] = useState(false);
    const [NonVegFilter, setNonVegFilter] = useState(false);
    // ----------------------------------------------------
    const count = useSelector((state) => state.cartSlice.count);
    // ----------------------------------------------------
    const [loading, setLoading] = useState(true);
    // ----------------------------------------------------

    const { rest_id } = useParams();

    function populateLocalState(data){
        setFoodData(data);
        setdealData(data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers);
        setTopPicksData(data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.carousel);
        // Nullish Coalescing for Subway- There is one extra step in Subway's API (accessing its category key too) for showing Subway's Menu...
        setAllTimeFav(data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards ?? data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.categories[0]?.itemCards);
        setMenuPart2(data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card?.itemCards ?? data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card?.categories[0]?.itemCards);
        setMenuPart3(data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card?.itemCards ?? data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card?.categories[0]?.itemCards);
        setMenuPart4(data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[5]?.card?.card?.itemCards ?? data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[5]?.card?.card?.categories[0]?.itemCards);
        setMenuPart5(data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[6]?.card?.card?.itemCards ?? data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[6]?.card?.card?.categories[0]?.itemCards);
        setMenuPart6(data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[9]?.card?.card?.itemCards ?? data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[9]?.card?.card?.categories[0]?.itemCards);
        setLoading(false);
    }

    const dispatch = useDispatch();
    async function fetchDATA(){
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const restAPI = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.7320385&lng=76.77263339999999&restaurantId=${rest_id}&catalog_qa=undefined&submitAction=ENTER`;
        const response = await fetch(proxy + restAPI);
        const data = await response.json();

        // 4. After fetching, dispatch the data to the store to cache it for future use.
        dispatch(addMenu({ rest_id, data }));

        populateLocalState(data);
    }

    // 1. Check the cache first!
    const cachedMenu = useSelector((state) => state.restaurantsSlice.menusData[rest_id]);
    
    useEffect(()=>{
        if(cachedMenu){
            // 2. If it is present, use the stored data and don't make an API call.
            populateLocalState(cachedMenu);
        }
        else{
            // 3. If menuData is not present in the cache in Redux, make the API call, 
            // then save the new data to the store for next time.
            fetchDATA();
        } 
    } , [])

    // -----------------------------------------------------

    // Veg/Non Veg Animation through GSAP
    const container1 = useRef(); // For Veg
    const tl1 = useRef(); // For Veg
    const container2 = useRef(); // For Non-Veg
    const tl2 = useRef(); // For Non-Veg

    useGSAP(()=> {
        if(loading===true){
            return; // If we are loading, do nothing.
        }
        tl1.current=gsap.timeline({paused:true});

        tl1.current.to(".veg-icon",{
            x:30,
            duration: 0.2
        })

        tl1.current.to(".veg-div",{
            backgroundColor: "#00A800",
            duration: 0.2
        } , "-=0.2")

    } , {scope: container1, dependencies: [loading]});

    useGSAP(()=> {
        if(loading===true){
            return; // If we are loading, do nothing.
        }
        tl2.current=gsap.timeline({paused:true});

        tl2.current.to(".non-veg-icon",{
            x:30,
            duration: 0.2
        })

        tl2.current.to(".non-veg-div",{
            backgroundColor: "#D40000",
            duration: 0.2
        } , "-=0.2")

    } , {scope: container2, dependencies: [loading]});

    function HandleVegToggle(){

        if(VegFilter===false){
            tl1.current.play();
            // If Non Veg Filter is already ON, then OFF it.
            if(NonVegFilter===true){
                tl2.current.reverse();
                setNonVegFilter(false);
            }
        }
        else if(VegFilter===true){
            tl1.current.reverse();
        }

        // Toggle the filter state
        setVegFilter(!VegFilter);
    }

    function HandleNonVegToggle(){

        if(NonVegFilter===false){
            tl2.current.play();
            // If Veg Filter is already ON, then OFF it.
            if(VegFilter===true){
                tl1.current.reverse();
                setVegFilter(false);
            }
        }
        else if(NonVegFilter===true){
            tl2.current.reverse();
        }

        // Toggle the filter state
        setNonVegFilter(!NonVegFilter);
    }

    function getFilteredItems(items){
        {/* Jab both VegFilter and NonVegFilter ki value false ho, it means user has
        not clicked any filter yet, so jo normal hai sab dikha do. */}
        if(VegFilter===false && NonVegFilter===false){
            return items;
        }
        {/* Jab mere ko sirf veg items show karane hai, toh mujhe sare objects ko
        map karane ki zaroorat nahi hai. Sirf voh voh objects filter karke
        map karwa do jismein isVeg key present ho. Also yeh tabhi karna hai
        jab VegFilter ki value true ho */}
        if(VegFilter==true){
            return items.filter((foodObj) => "isVeg" in foodObj?.card?.info);
        }
        if(NonVegFilter==true){
            return items.filter((foodObj) => !("isVeg" in foodObj?.card?.info));
        }
    }
    // --------------------------------------------
    if(loading===true){
        return <Shimmer2></Shimmer2>
    }

    return(
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

        <div className="containeR">
            <h1 className="company-Name">{FoodData?.data?.cards[2]?.card?.card?.info?.name}</h1>
            <div className="containER">
                <div className="rating">
                    <ion-icon name="star" className="rest-star1"></ion-icon>
                    <p className="rest-rating">{FoodData?.data?.cards[2]?.card?.card?.info?.avgRatingString}</p>
                    <p className="noOfRatings">({FoodData?.data?.cards[2]?.card?.card?.info?.totalRatingsString})</p>
                    <i className="ri-circle-fill" id="dot"></i>
                    <p className="cost">{FoodData?.data?.cards[2]?.card?.card?.info?.costForTwoMessage}</p>
                </div>
                <p className="Rest-cuisines">{FoodData?.data?.cards[2]?.card?.card?.info?.cuisines.join(", ")}</p>
                <p className="rest-outlet">Outlet : <span className="span">{FoodData?.data?.cards[2]?.card?.card?.info?.areaName}</span></p>
                <p className="rest-TIME">{FoodData?.data?.cards[2]?.card?.card?.info?.sla?.slaString}</p>
            </div>
            {/* ----------------- */}
            <div className="dealSlider">
                <h2 className="DEALS">Deals for you</h2>
                <Swiper
                    modules={[Navigation, Mousewheel, FreeMode]}
                    navigation={{
                        prevEl: ".my-swiper-btn-Prev",
                        nextEl: ".my-swiper-btn-Next"
                    }}
                    spaceBetween={25}
                    slidesPerView={"auto"}
                    speed={900}
                    mousewheel={{
                        forceToAxis: true
                    }}
                    freeMode={true}
                >
                    {
                        dealData.map((obj3,index) => (
                            <SwiperSlide key={index}>
                                <div className="deal-container">
                                    <img src={"https://media-assets.swiggy.com/swiggy/image/upload/" + obj3?.info?.offerLogo} className="swiper-img"></img>
                                    <div className="deal-offer">
                                        <p className="abc">{obj3?.info?.header}</p>
                                        <p className="def">{obj3?.info?.description}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

                {/* Custom Nav buttons */}
                <div className="my-swiper-btn-Prev">
                    <i className="ri-arrow-left-circle-fill"></i>
                </div>
                <div className="my-swiper-btn-Next">
                    <i className="ri-arrow-right-circle-fill"></i>
                </div>
            </div>
            {/* ----------------- */}
        </div>

        <img src="/rest-menu.png" className="menu-pic"></img>

        <hr className="divider"></hr>

        {topPicksData && (
            <div className="topPicks-slider">
            <h2 className="swiper-header">Top Picks</h2>
            <Swiper
                modules={[Navigation, FreeMode, Mousewheel]}
                navigation={{
                    prevEl: ".my-swiper-btN-prev",
                    nextEl: ".my-swiper-btN-next"
                }}
                spaceBetween={15}
                slidesPerView={"auto"}
                speed={900}
                mousewheel={{
                    forceToAxis: true
                }}
                freeMode={true}
            >
                {
                    topPicksData.map((obj5,index) => (
                        <SwiperSlide key={index}>
                            <div className="swiper-content">
                                <img src={"https://media-assets.swiggy.com/swiggy/image/upload/" + obj5?.creativeId} className="swiper-img"></img>
                                <p className="swiper-text">₹{((obj5.dish.info.defaultPrice ?? obj5.dish.info.price)/100).toFixed(2)}</p>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            {/* Custom Nav buttons */}
            <div className="my-swiper-btN-prev">
                <i className="ri-arrow-left-circle-fill"></i>
            </div>
                <div className="my-swiper-btN-next">
                <i className="ri-arrow-right-circle-fill"></i>
            </div>
        </div>
        )}

        <Link to={"/search/" + rest_id} className="cart-link">
            <div>
                <button className="search-feature">Search for dishes</button>
                <i className="ri-search-line shubham-s"></i>
            </div>
        </Link>

        <div className="btn-grp-2">
            <div className="veg-btn" onClick={HandleVegToggle}>
                <div className="center-div" ref={container1}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="veg-icon">
                        <rect x="4" y="4" width="120" height="120" rx="15" ry="15" fill="#FFFFFF" stroke="#00a800" strokeWidth="6"/>
                        <circle cx="64" cy="64" r="35" fill="#00a800"/>
                    </svg>
                    <div className="veg-div"></div>
                </div>
            </div>
            <div className="non-veg-btn" onClick={HandleNonVegToggle}>
                <div className="center-div" ref={container2}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="non-veg-icon">
                        <rect x="4" y="4" width="120" height="120" rx="15" ry="15" fill="#FFFFFF" stroke="#e00000" strokeWidth="6"/>
                        <circle cx="64" cy="64" r="35" fill="#d40000"/>
                    </svg>
                    <div className="non-veg-div"></div>
                </div>
            </div>
        </div>
        
        {/* All-time favorites section */}
        {allTimeFav && (
            <div className="all-time">
            <img src="/upper-bg.png" className="upper-bg"></img>
            <div className="all-time-main">
                <p className="all-time-text">All-time Favorites</p>
                <p className="all-time-title">{FoodData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.title}</p>
                <div className="all-time-slider">
                    <Swiper
                        modules={[Mousewheel,FreeMode]}
                        spaceBetween={90}
                        slidesPerView={"auto"}
                        speed={1200}
                        slidesOffsetBefore={25}
                        slidesOffsetAfter={25}
                        mousewheel={{
                            forceToAxis: true
                        }}
                        freeMode={true}
                    >
                        {
                            getFilteredItems(allTimeFav).length>0 ? (
                                getFilteredItems(allTimeFav).map((obj,index) => (
                                    <SwiperSlide key={index}>
                                        <div className="swiper-content">
                                            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/" + obj?.card?.info?.imageId} className="swiper-img"></img>
                                            {/* Mujhe future mein yeh current card kis data se bana hai voh bhi chahiye hoga. And we know yeh current card
                                            obj ke data se bana hai. So, we passed obj as well to the button function.. */}
                                            <CartButton cardData={obj?.card?.info}/>
                                            {/* --------------------------------------- */}
                                            <p className="swiper-name">{obj?.card?.info?.name}</p>
                                            <p className="swiper-description">{obj?.card?.info?.description}</p>
                                            <div className="price-rating">
                                                <div className="price">
                                                    <p className="swiper-price">₹{(obj?.card?.info?.defaultPrice ?? obj?.card?.info?.price)/100}</p>
                                                    <i class="ri-price-tag-3-fill"></i>
                                                </div>
                                                {/* If rating exists, then only show me the rating otherwise not -> Conditional Rendering */}
                                                {obj?.card?.info?.ratings?.aggregatedRating?.rating && (
                                                    <div className="rating">
                                                        <i class="ri-star-fill"></i>
                                                        <p className="swiper-rating">{obj?.card?.info?.ratings?.aggregatedRating?.rating} <span className="swiper-rating-count">({obj?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})</span></p>
                                                    </div>
                                                )} 
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <>
                                <p className="empty-error-msg1">Searching for flavour...</p>
                                <p className="empty-error-msg2">Nothing here, but the kitchen's full of options!</p>
                                <div className="explore-pic">
                                    <p className="empty-error-msg3">Explore the Menu</p>
                                    <img src="/food-menu.png" className="empty-error-pic"></img>
                                </div>
                                </>
                            )
                        }
                    </Swiper>
                </div>
            </div>
            <img src="/lower-bg.png" className="lower-bg"></img>
        </div>
        )}
        
        {/* Rest of the 5 MENUS */}
        {menuPart2 && (
            <div className="all-time">
            <img src="/upper-bg.png" className="upper-bg"></img>
            <div className="all-time-main">
                <p className="all-time-title">{FoodData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card?.title}</p>
                <div className="all-time-slider">
                    <Swiper
                        modules={[Mousewheel,FreeMode]}
                        spaceBetween={90}
                        slidesPerView={"auto"}
                        speed={1200}
                        slidesOffsetBefore={25}
                        slidesOffsetAfter={25}
                        mousewheel={{
                            forceToAxis: true
                        }}
                        freeMode={true}
                    >
                        {
                            // Zaroori thoda na hai ki jo filter hoke array aaye usmein
                            // usmein items hon hi..Kya pata voh empty ho..Kya pata agar Veg
                            // filter lagaya hai toh uss array mein koi veg items ho hi na..
                            // Toh voh toh khali hi hoga. So, we have to handle this empty
                            // array through ternary operator..
                            getFilteredItems(menuPart2).length>0 ? (
                                getFilteredItems(menuPart2).map((obj,index) => (
                                    <SwiperSlide key={index}>
                                        <div className="swiper-content">
                                            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/" + obj?.card?.info?.imageId} className="swiper-img"></img>
                                            {/* Mujhe future mein yeh current card kis data se bana hai voh bhi chahiye hoga. And we know yeh current card
                                            obj ke data se bana hai. So, we passed obj as well to the button function.. */}
                                            <CartButton cardData={obj?.card?.info}/>
                                            {/* --------------------------------------- */}
                                            <p className="swiper-name">{obj?.card?.info?.name}</p>
                                            <p className="swiper-description">{obj?.card?.info?.description}</p>
                                            <div className="price-rating">
                                                <div className="price">
                                                    <p className="swiper-price">₹{(obj?.card?.info?.defaultPrice ?? obj?.card?.info?.price)/100}</p>
                                                    <i class="ri-price-tag-3-fill"></i>
                                                </div>
                                                {/* If rating exists, then only show me the rating otherwise not -> Conditional Rendering */}
                                                {obj?.card?.info?.ratings?.aggregatedRating?.rating && (
                                                    <div className="rating">
                                                        <i class="ri-star-fill"></i>
                                                        <p className="swiper-rating">{obj?.card?.info?.ratings?.aggregatedRating?.rating} <span className="swiper-rating-count">({obj?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})</span></p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <>
                                <p className="empty-error-msg1">Searching for flavour...</p>
                                <p className="empty-error-msg2">Nothing here, but the kitchen's full of options!</p>
                                <div className="explore-pic">
                                    <p className="empty-error-msg3">Explore the Menu</p>
                                    <img src="/food-menu.png" className="empty-error-pic"></img>
                                </div>
                                </>
                            )
                        }
                    </Swiper>
                </div>
            </div>
            <img src="/lower-bg.png" className="lower-bg"></img>
        </div>
        )}

        {menuPart3 && (
            <div className="all-time">
            <img src="/upper-bg.png" className="upper-bg"></img>
            <div className="all-time-main">
                <p className="all-time-title">{FoodData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card?.title}</p>
                <div className="all-time-slider">
                    <Swiper
                        modules={[Mousewheel,FreeMode]}
                        spaceBetween={90}
                        slidesPerView={"auto"}
                        speed={1200}
                        slidesOffsetBefore={25}
                        slidesOffsetAfter={25}
                        mousewheel={{
                            forceToAxis: true
                        }}
                        freeMode={true}
                    >
                        {
                            getFilteredItems(menuPart3).length>0 ? (
                                getFilteredItems(menuPart3).map((obj,index) => (
                                    <SwiperSlide key={index}>
                                        <div className="swiper-content">
                                            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/" + obj?.card?.info?.imageId} className="swiper-img"></img>
                                            {/* Mujhe future mein yeh current card kis data se bana hai voh bhi chahiye hoga. And we know yeh current card
                                            obj ke data se bana hai. So, we passed obj as well to the button function.. */}
                                            <CartButton cardData={obj?.card?.info}/>
                                            {/* --------------------------------------- */}
                                            <p className="swiper-name">{obj?.card?.info?.name}</p>
                                            <p className="swiper-description">{obj?.card?.info?.description}</p>
                                            <div className="price-rating">
                                                <div className="price">
                                                    <p className="swiper-price">₹{(obj?.card?.info?.defaultPrice ?? obj?.card?.info?.price)/100}</p>
                                                    <i class="ri-price-tag-3-fill"></i>
                                                </div>
                                                {/* If rating exists, then only show me the rating otherwise not -> Conditional Rendering */}
                                                {obj?.card?.info?.ratings?.aggregatedRating?.rating && (
                                                    <div className="rating">
                                                        <i class="ri-star-fill"></i>
                                                        <p className="swiper-rating">{obj?.card?.info?.ratings?.aggregatedRating?.rating} <span className="swiper-rating-count">({obj?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})</span></p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <>
                                <p className="empty-error-msg1">Searching for flavour...</p>
                                <p className="empty-error-msg2">Nothing here, but the kitchen's full of options!</p>
                                <div className="explore-pic">
                                    <p className="empty-error-msg3">Explore the Menu</p>
                                    <img src="/food-menu.png" className="empty-error-pic"></img>
                                </div>
                                </>
                            )
                        }
                    </Swiper>
                </div>
            </div>
            <img src="/lower-bg.png" className="lower-bg"></img>
        </div>
        )}

        {menuPart4 && (
            <div className="all-time">
            <img src="/upper-bg.png" className="upper-bg"></img>
            <div className="all-time-main">
                <p className="all-time-title">{FoodData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[5]?.card?.card?.title}</p>
                <div className="all-time-slider">
                    <Swiper
                        modules={[Mousewheel,FreeMode]}
                        spaceBetween={90}
                        slidesPerView={"auto"}
                        speed={1200}
                        slidesOffsetBefore={25}
                        slidesOffsetAfter={25}
                        mousewheel={{
                            forceToAxis: true
                        }}
                        freeMode={true}
                    >
                        {
                            getFilteredItems(menuPart4).length>0 ? (
                                getFilteredItems(menuPart4).map((obj,index) => (
                                    <SwiperSlide key={index}>
                                        <div className="swiper-content">
                                            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/" + obj?.card?.info?.imageId} className="swiper-img"></img>
                                            {/* Mujhe future mein yeh current card kis data se bana hai voh bhi chahiye hoga. And we know yeh current card
                                            obj ke data se bana hai. So, we passed obj as well to the button function.. */}
                                            <CartButton cardData={obj?.card?.info}/>
                                            {/* --------------------------------------- */}
                                            <p className="swiper-name">{obj?.card?.info?.name}</p>
                                            <p className="swiper-description">{obj?.card?.info?.description}</p>
                                            <div className="price-rating">
                                                <div className="price">
                                                    <p className="swiper-price">₹{(obj?.card?.info?.defaultPrice ?? obj?.card?.info?.price)/100}</p>
                                                    <i class="ri-price-tag-3-fill"></i>
                                                </div>
                                                {/* If rating exists, then only show me the rating otherwise not -> Conditional Rendering */}
                                                {obj?.card?.info?.ratings?.aggregatedRating?.rating && (
                                                    <div className="rating">
                                                        <i class="ri-star-fill"></i>
                                                        <p className="swiper-rating">{obj?.card?.info?.ratings?.aggregatedRating?.rating} <span className="swiper-rating-count">({obj?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})</span></p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <>
                                <p className="empty-error-msg1">Searching for flavour...</p>
                                <p className="empty-error-msg2">Nothing here, but the kitchen's full of options!</p>
                                <div className="explore-pic">
                                    <p className="empty-error-msg3">Explore the Menu</p>
                                    <img src="/food-menu.png" className="empty-error-pic"></img>
                                </div>
                                </>
                            )
                        }
                    </Swiper>
                </div>
            </div>
            <img src="/lower-bg.png" className="lower-bg"></img>
        </div>
        )}

        {menuPart5 && (
            <div className="all-time">
            <img src="/upper-bg.png" className="upper-bg"></img>
            <div className="all-time-main">
                <p className="all-time-title">{FoodData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[6]?.card?.card?.title}</p>
                <div className="all-time-slider">
                    <Swiper
                        modules={[Mousewheel,FreeMode]}
                        spaceBetween={90}
                        slidesPerView={"auto"}
                        speed={1200}
                        slidesOffsetBefore={25}
                        slidesOffsetAfter={25}
                        mousewheel={{
                            forceToAxis: true
                        }}
                        freeMode={true}
                    >
                        {
                            getFilteredItems(menuPart5).length>0 ? (
                                getFilteredItems(menuPart5).map((obj,index) => (
                                    <SwiperSlide key={index}>
                                        <div className="swiper-content">
                                            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/" + obj?.card?.info?.imageId} className="swiper-img"></img>
                                            {/* Mujhe future mein yeh current card kis data se bana hai voh bhi chahiye hoga. And we know yeh current card
                                            obj ke data se bana hai. So, we passed obj as well to the button function.. */}
                                            <CartButton cardData={obj?.card?.info}/>
                                            {/* --------------------------------------- */}
                                            <p className="swiper-name">{obj?.card?.info?.name}</p>
                                            <p className="swiper-description">{obj?.card?.info?.description}</p>
                                            <div className="price-rating">
                                                <div className="price">
                                                    <p className="swiper-price">₹{(obj?.card?.info?.defaultPrice ?? obj?.card?.info?.price)/100}</p>
                                                    <i class="ri-price-tag-3-fill"></i>
                                                </div>
                                                {/* If rating exists, then only show me the rating otherwise not -> Conditional Rendering */}
                                                {obj?.card?.info?.ratings?.aggregatedRating?.rating && (
                                                    <div className="rating">
                                                        <i class="ri-star-fill"></i>
                                                        <p className="swiper-rating">{obj?.card?.info?.ratings?.aggregatedRating?.rating} <span className="swiper-rating-count">({obj?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})</span></p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <>
                                <p className="empty-error-msg1">Searching for flavour...</p>
                                <p className="empty-error-msg2">Nothing here, but the kitchen's full of options!</p>
                                <div className="explore-pic">
                                    <p className="empty-error-msg3">Explore the Menu</p>
                                    <img src="/food-menu.png" className="empty-error-pic"></img>
                                </div>
                                </>
                            )
                        }
                    </Swiper>
                </div>
            </div>
            <img src="/lower-bg.png" className="lower-bg"></img>
        </div>
        )}

        {menuPart6 && (
            <div className="all-time">
            <img src="/upper-bg.png" className="upper-bg"></img>
            <div className="all-time-main">
                <p className="all-time-title">{FoodData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[9]?.card?.card?.title}</p>
                <div className="all-time-slider">
                    <Swiper
                        modules={[Mousewheel,FreeMode]}
                        spaceBetween={90}
                        slidesPerView={"auto"}
                        speed={1200}
                        slidesOffsetBefore={25}
                        slidesOffsetAfter={25}
                        mousewheel={{
                            forceToAxis: true
                        }}
                        freeMode={true}
                    >
                        {
                            getFilteredItems(menuPart6).length>0 ? (
                                getFilteredItems(menuPart6).map((obj,index) => (
                                    <SwiperSlide key={index}>
                                        <div className="swiper-content">
                                            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/" + obj?.card?.info?.imageId} className="swiper-img"></img>
                                            {/* Mujhe future mein yeh current card kis data se bana hai voh bhi chahiye hoga. And we know yeh current card
                                            obj ke data se bana hai. So, we passed obj as well to the button function.. */}
                                            <CartButton cardData={obj?.card?.info}/>
                                            {/* --------------------------------------- */}
                                            <p className="swiper-name">{obj?.card?.info?.name}</p>
                                            <p className="swiper-description">{obj?.card?.info?.description}</p>
                                            <div className="price-rating">
                                                <div className="price">
                                                    <p className="swiper-price">₹{(obj?.card?.info?.defaultPrice ?? obj?.card?.info?.price)/100}</p>
                                                    <i class="ri-price-tag-3-fill"></i>
                                                </div>
                                                {/* If rating exists, then only show me the rating otherwise not -> Conditional Rendering */}
                                                {obj?.card?.info?.ratings?.aggregatedRating?.rating && (
                                                    <div className="rating">
                                                        <i class="ri-star-fill"></i>
                                                        <p className="swiper-rating">{obj?.card?.info?.ratings?.aggregatedRating?.rating} <span className="swiper-rating-count">({obj?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})</span></p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <>
                                <p className="empty-error-msg1">Searching for flavour...</p>
                                <p className="empty-error-msg2">Nothing here, but the kitchen's full of options!</p>
                                <div className="explore-pic">
                                    <p className="empty-error-msg3">Explore the Menu</p>
                                    <img src="/food-menu.png" className="empty-error-pic"></img>
                                </div>
                                </>
                            )
                        }
                    </Swiper>
                </div>
            </div>
            <img src="/lower-bg.png" className="lower-bg"></img>
        </div>
        )}

        <Footer/>

        </>
    )
}

export default RestaurantMenu;



