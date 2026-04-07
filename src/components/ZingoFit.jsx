import { Link } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { Grill, PowerBowl, SaladBowl, Smoothie, Juice, ThirtyGram, FortyGram, FiftyGram } from "../utils/gym-menu";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Mousewheel, FreeMode, Controller} from "swiper/modules";
import Footer from "./Footer";

import "swiper/css";
import "swiper/css/navigation";

// Register the plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

function ZingoFit(){
    const container1 = useRef();
    const container2 = useRef();
    const tl = useRef();
    // Create separate state for each menu section
    const [grillSlider1, setGrillSlider1] = useState(null);
    const [grillSlider2, setGrillSlider2] = useState(null);
    const [powerSlider1, setPowerSlider1] = useState(null);
    const [powerSlider2, setPowerSlider2] = useState(null);
    const [saladSlider1, setSaladSlider1] = useState(null);
    const [saladSlider2, setSaladSlider2] = useState(null);
    const [smoothieSlider1, setSmoothieSlider1] = useState(null);
    const [smoothieSlider2, setSmoothieSlider2] = useState(null);
    const [juiceSlider1, setJuiceSlider1] = useState(null);
    const [juiceSlider2, setJuiceSlider2] = useState(null);
    const [thirtySlider1, setThirtySlider1] = useState(null);
    const [thirtySlider2, setThirtySlider2] = useState(null);
    const [fortySlider1, setFortySlider1] = useState(null);
    const [fortySlider2, setFortySlider2] = useState(null);
    const [fiftySlider1, setFiftySlider1] = useState(null);
    const [fiftySlider2, setFiftySlider2] = useState(null);
    // --------------------------------------------------------------
    const [gender, setGender] = useState("male");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [activity, setActivity] = useState("1.2"); // Default to Sedentary

    // State to hold the calculated calorie results
    const [results, setResults] = useState(null);
    
    // State to manage and display error messages
    const [error, setError] = useState("");

    function calculateCalories(event){
        event.preventDefault(); // Prevent the default form submission behavior
        
        // Clear previous results and errors
        setResults(null);
        setError("");

        // Parse state values for calculation
        const parsedAge = parseInt(age);
        const parsedWeight = parseFloat(weight);
        const parsedHeight = parseFloat(height);

        // --- Input Validation ---
        if (isNaN(parsedAge) || isNaN(parsedWeight) || isNaN(parsedHeight) || parsedAge <= 0 || parsedWeight <= 0 || parsedHeight <= 0) {
            setError("Please enter valid positive numbers for age, weight, and height.");
            return; // Stop the calculation if validation fails
        }

        // --- BMR Calculation (Mifflin-St Jeor Equation) ---
        let bmr;
        if (gender === "male") {
            bmr = 10 * parsedWeight + 6.25 * parsedHeight - 5 * parsedAge + 5;
        } else {
            bmr = 10 * parsedWeight + 6.25 * parsedHeight - 5 * parsedAge - 161;
        }

        // --- TDEE (Total Daily Energy Expenditure) Calculation ---
        const tdee = bmr * parseFloat(activity);

        // --- Set Calorie Goal Results ---
        setResults({
            maintenance: Math.round(tdee),
            mildLoss: Math.round(tdee - 250),
            weightLoss: Math.round(tdee - 500),
            extremeLoss: Math.round(tdee - 1000),
        });
    };

    function clearForm(){
        setGender("male");
        setAge("");
        setWeight("");
        setHeight("");
        setActivity('1.2');
        setResults(null);
        setError("");
    };
    // --------------------------------------------------------------

    // An array of the x positions you want to assign
    const negxPositions = [-200, -300, -400];
    const posxPositions = [200, 300, 400];
    useGSAP(()=>{
        gsap.to(".Food1, .Food2, .Food3",{
            x: (index) => negxPositions[index],
            duration:4,
            stagger: 1.5,
            scrollTrigger:{
                trigger: ".Food1, .Food2, .Food3",
                start: "top 30%",
                scrub:true
            }
        })

        gsap.to(".Food4, .Food5, .Food6",{
            x: (index) => posxPositions[index],
            duration:4,
            stagger: 1.5,
            scrollTrigger:{
                trigger: ".Food1, .Food2, .Food3",
                start: "top 30%",
                scrub:true
            }
        })
    } , {scope:container1})
    // -------------------------------------------

    useGSAP(()=>{
        tl.current=gsap.timeline({paused:true});

        tl.current.to(".calculator-container",{
            x:-500,
            duration:1
        })
    },{scope:container2})

    function openCalc(){
        tl.current.play();
    }

    function closeCalc(){
        tl.current.reverse();
    }

    return (
        <>
        <header className="gym-header">
            <div className="ZingoFitLogo">
                <img src="../src/utils/gym-img.png" className="gym-logo"></img>
                <img src="../src/utils/side-img.webp" className="side1-img"></img>
                <img src="../src/utils/side-img.webp" className="side2-img"></img>
                <Link to="/">
                    <button className="home-btn">Home</button>
                </Link>
                <a href="https://www.swiggy.com/swiggy_customer_care" target="_blank" className="card-link">
                    <button className="contact-btn">Contact Us</button>
                </a>
                <a href="https://careers.swiggy.com/#/about" target="_blank" className="card-link">
                    <button className="about-btn">About Us</button>
                </a>
            </div>
            <img src="../src/utils/catchy-img.png" className="catchy-img"></img>
        </header>

        <div className="animation" ref={container1}>
            <div className="gym-text-container">
                <h1 className="gym-text1">Taste the Gains.</h1>
                <h2 className="gym-text2">Stop compromising on flavour. Start seeing results.</h2>
                <p className="gym-text3">We believe that eating for your goals should be a highlight of your day, not a chore. Say goodbye to the myth that healthy food can't be delicious. We provide vibrant, chef-crafted meals tailored to your fitness journey and delivered fresh. Our menu  brings you exciting flavours from different cuisines, all with a healthy twist, making it effortless to stay on track and love the food you eat.</p>
            </div>
            {/* --------------------------------------------------------------------- */}

            <div className="why-container">
                <h2 className="benefits">Our benefits</h2>
                <h1 className="why-text">So Why Choose ZingoFit?</h1>
                <p className="why-text1">Zingofit is not a diet system that promotes cleanses, pills, preserved foods or any kind of disordered eating habits. We’re all about wholesome &</p>
                <p className="why-text2">nourishing foods that make you feel the best version of yourself.</p>
                <img src="../src/utils/why-img.png" className="why-img"></img>

                <img src="../src/utils/plate.png" className="plate"></img>
            </div>
            {/* ------------------------------------------------------------------ */}
            <img src="../src/utils/Food1.png" className="Food1"></img>
            <img src="../src/utils/Food2.png" className="Food2"></img>
            <img src="../src/utils/Food3.png" className="Food3"></img>
            <img src="../src/utils/Food4.png" className="Food4"></img>
            <img src="../src/utils/Food5.png" className="Food5"></img>
            <img src="../src/utils/Food6.png" className="Food6"></img>
        </div>

        <h1 className="gym-menu">Our Menu</h1>
        <p className="gym-menu-text">Our Meals Contain Only 5 gm Olive Oil & Natural Sweeteners.</p>

        <div className="synced-swipers">
            <div className="grill-grain">
                <h1 className="grill-grain-text">Grill & Grain Meal Boxes</h1>
                <Swiper
                    modules={[Navigation, Mousewheel, FreeMode,  Controller]}
                    spaceBetween={40}
                    slidesPerView={"auto"}
                    speed={1500}
                    centeredSlides={true}
                    mousewheel={{
                        forceToAxis:true,
                        sensitivity: 0.5,      // Lower sensitivity = less sensitive scrolling
                        thresholdDelta: 30,    // Minimum scroll distance to trigger slide change
                        thresholdTime: 500,    // Minimum time between scroll events
                        releaseOnEdges: true,
                    }}
                    controller={{ control: grillSlider2 }}
                    onSwiper={(swiper) => {
                        setGrillSlider1(swiper);
                    }}
                >
                {
                    Grill.map((obj) => (
                        <SwiperSlide key={obj.id}>
                            <div className="gym-card">
                                <img src={"https://toneop.s3.ap-south-1.amazonaws.com/" + obj.image_web} className="swiper-img"></img>
                                <h3 className="swiper-text">{obj.name}</h3>
                                <button className="food-INFO" id={obj.diet_preference}>Starting from ₹{obj.price} </button>
                            </div>
                        </SwiperSlide>
                    ))
                }
                </Swiper>
            </div>

            <div className="nutrition">
                <h1 className="nutritional-text">Nutritional Info</h1>
                <img src="../src/utils/nutrion-left.png" className="img-left"></img>
                <img src="../src/utils/nutrion-right.png" className="img-right"></img>
                <Swiper
                    modules={[Navigation,Mousewheel,FreeMode,Controller]}
                    spaceBetween={30}
                    slidesPerView={1}
                    speed={1500}
                    direction="vertical"
                    slidesOffsetBefore={30}
                    slidesOffsetAfter={5}
                    mousewheel={{
                        forceToAxis: true,
                        sensitivity: 0.5,      // Lower sensitivity = less sensitive scrolling
                        thresholdDelta: 50,    // Minimum scroll distance to trigger slide change
                        thresholdTime: 500,    // Minimum time between scroll events
                        releaseOnEdges: true
                    }}
                    controller={{ control: grillSlider1 }}
                    onSwiper={(swiper) => {
                        setGrillSlider2(swiper);
                    }}
                >
                    {
                        Grill.map((obj) => (
                            <SwiperSlide key={obj.id}>
                                <div className="nutrition-info">
                                    {/* We have to iterate over servings array */}
                                    {obj.servings.map((Obj) => (
                                        <div className="BOX" key={Obj.kcal + Obj.price + Obj.carbs}>
                                            <p className="food_name">{Obj.name}</p>
                                            <p className="calories">Calories : {Obj.kcal} kcal</p>
                                            <p className="Price">Price : ₹{Obj.price}</p>
                                            <div className="nutrition-pic">
                                                <div className="protein-info">
                                                    <img src="../src/utils/1.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Protein</p>
                                                    <p className="nutrition-amt">{Obj.protein}g</p>
                                                </div>
                                                <div className="fat-info">
                                                    <img src="../src/utils/2.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Fat</p>
                                                    <p className="nutrition-amt">{Obj.fat}g</p>
                                                </div>
                                                <div className="fiber-info">
                                                    <img src="../src/utils/3.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Fiber</p>
                                                    <p className="nutrition-amt">{Obj.fibre}g</p>
                                                </div>
                                                <div className="carbs-info">
                                                    <img src="../src/utils/4.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Carbs</p>
                                                    <p className="nutrition-amt">{Obj.carbs}g</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>

        <div className="synced-swipers">
            <div className="grill-grain">
                <h1 className="grill-grain-text">Power Bowls</h1>
                <Swiper
                    modules={[Navigation, Mousewheel, FreeMode,  Controller]}
                    spaceBetween={40}
                    slidesPerView={"auto"}
                    speed={1500}
                    centeredSlides={true}
                    mousewheel={{
                        forceToAxis:true,
                        sensitivity: 0.5,      // Lower sensitivity = less sensitive scrolling
                        thresholdDelta: 30,    // Minimum scroll distance to trigger slide change
                        thresholdTime: 500,    // Minimum time between scroll events
                        releaseOnEdges: true,
                    }}
                    controller={{ control: powerSlider2 }}
                    onSwiper={(swiper) => {
                        setPowerSlider1(swiper);
                    }}
                >
                {
                    PowerBowl.map((obj) => (
                        <SwiperSlide key={obj.id}>
                            <div className="gym-card">
                                <img src={"https://toneop.s3.ap-south-1.amazonaws.com/" + obj.image_web} className="swiper-img"></img>
                                <h3 className="swiper-text">{obj.name}</h3>
                                <button className="food-INFO" id={obj.diet_preference}>Starting from ₹{obj.price} </button>
                            </div>
                        </SwiperSlide>
                    ))
                }
                </Swiper>
            </div>

            <div className="nutrition">
                <h1 className="nutritional-text">Nutritional Info</h1>
                <img src="../src/utils/nutrion-left.png" className="img-left"></img>
                <img src="../src/utils/nutrion-right.png" className="img-right"></img>
                <Swiper
                    modules={[Navigation,Mousewheel,FreeMode,Controller]}
                    spaceBetween={30}
                    slidesPerView={1}
                    speed={1500}
                    direction="vertical"
                    slidesOffsetBefore={30}
                    slidesOffsetAfter={5}
                    mousewheel={{
                        forceToAxis: true,
                        sensitivity: 0.5,      // Lower sensitivity = less sensitive scrolling
                        thresholdDelta: 50,    // Minimum scroll distance to trigger slide change
                        thresholdTime: 500,    // Minimum time between scroll events
                        releaseOnEdges: true
                    }}
                    controller={{ control: powerSlider1 }}
                    onSwiper={(swiper) => {
                        setPowerSlider2(swiper);
                    }}
                >
                    {
                        PowerBowl.map((obj) => (
                            <SwiperSlide key={obj.id}>
                                <div className="nutrition-info">
                                    {/* We have to iterate over servings array */}
                                    {obj.servings.map((Obj) => (
                                        <div className="BOX BOX_1" key={Obj.kcal + Obj.price + Obj.carbs}>
                                            <p className="food_name">{Obj.name}</p>
                                            <p className="calories">Calories : {Obj.kcal} kcal</p>
                                            <p className="Price">Price : ₹{Obj.price}</p>
                                            <div className="nutrition-pic">
                                                <div className="protein-info">
                                                    <img src="../src/utils/1.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Protein</p>
                                                    <p className="nutrition-amt">{Obj.protein}g</p>
                                                </div>
                                                <div className="fat-info">
                                                    <img src="../src/utils/2.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Fat</p>
                                                    <p className="nutrition-amt">{Obj.fat}g</p>
                                                </div>
                                                <div className="fiber-info">
                                                    <img src="../src/utils/3.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Fiber</p>
                                                    <p className="nutrition-amt">{Obj.fibre}g</p>
                                                </div>
                                                <div className="carbs-info">
                                                    <img src="../src/utils/4.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Carbs</p>
                                                    <p className="nutrition-amt">{Obj.carbs}g</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>

        <div className="synced-swipers">
            <div className="grill-grain">
                <h1 className="grill-grain-text">Salad Bowls</h1>
                <Swiper
                    modules={[Navigation, Mousewheel, FreeMode,  Controller]}
                    spaceBetween={40}
                    slidesPerView={"auto"}
                    speed={1500}
                    centeredSlides={true}
                    mousewheel={{
                        forceToAxis:true,
                        sensitivity: 0.5,      // Lower sensitivity = less sensitive scrolling
                        thresholdDelta: 30,    // Minimum scroll distance to trigger slide change
                        thresholdTime: 500,    // Minimum time between scroll events
                        releaseOnEdges: true,
                    }}
                    controller={{ control: saladSlider2 }}
                    onSwiper={(swiper) => {
                        setSaladSlider1(swiper);
                    }}
                >
                {
                    SaladBowl.map((obj) => (
                        <SwiperSlide key={obj.id}>
                            <div className="gym-card">
                                <img src={"https://toneop.s3.ap-south-1.amazonaws.com/" + obj.image_web} className="swiper-img"></img>
                                <h3 className="swiper-text">{obj.name}</h3>
                                <button className="food-INFO" id={obj.diet_preference}>Starting from ₹{obj.price} </button>
                            </div>
                        </SwiperSlide>
                    ))
                }
                </Swiper>
            </div>

            <div className="nutrition">
                <h1 className="nutritional-text">Nutritional Info</h1>
                <img src="../src/utils/nutrion-left.png" className="img-left"></img>
                <img src="../src/utils/nutrion-right.png" className="img-right"></img>
                <Swiper
                    modules={[Navigation,Mousewheel,FreeMode,Controller]}
                    spaceBetween={30}
                    slidesPerView={1}
                    speed={1500}
                    direction="vertical"
                    slidesOffsetBefore={30}
                    slidesOffsetAfter={5}
                    mousewheel={{
                        forceToAxis: true,
                        sensitivity: 0.5,      // Lower sensitivity = less sensitive scrolling
                        thresholdDelta: 50,    // Minimum scroll distance to trigger slide change
                        thresholdTime: 500,    // Minimum time between scroll events
                        releaseOnEdges: true
                    }}
                    controller={{ control: saladSlider1 }}
                    onSwiper={(swiper) => {
                        setSaladSlider2(swiper);
                    }}
                >
                    {
                        SaladBowl.map((obj) => (
                            <SwiperSlide key={obj.id}>
                                <div className="nutrition-info">
                                    {/* We have to iterate over servings array */}
                                    {obj.servings.map((Obj) => (
                                        <div className="BOX BOX_1" key={Obj.kcal + Obj.price + Obj.carbs}>
                                            <p className="food_name">{Obj.name}</p>
                                            <p className="calories">Calories : {Obj.kcal} kcal</p>
                                            <p className="Price">Price : ₹{Obj.price}</p>
                                            <div className="nutrition-pic">
                                                <div className="protein-info">
                                                    <img src="../src/utils/1.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Protein</p>
                                                    <p className="nutrition-amt">{Obj.protein}g</p>
                                                </div>
                                                <div className="fat-info">
                                                    <img src="../src/utils/2.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Fat</p>
                                                    <p className="nutrition-amt">{Obj.fat}g</p>
                                                </div>
                                                <div className="fiber-info">
                                                    <img src="../src/utils/3.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Fiber</p>
                                                    <p className="nutrition-amt">{Obj.fibre}g</p>
                                                </div>
                                                <div className="carbs-info">
                                                    <img src="../src/utils/4.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Carbs</p>
                                                    <p className="nutrition-amt">{Obj.carbs}g</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>

        <div className="synced-swipers">
            <div className="grill-grain">
                <h1 className="grill-grain-text">Smoothie Bowls</h1>
                <Swiper
                    modules={[Navigation, Mousewheel, FreeMode,  Controller]}
                    spaceBetween={40}
                    slidesPerView={"auto"}
                    speed={1500}
                    centeredSlides={true}
                    mousewheel={{
                        forceToAxis:true,
                        sensitivity: 0.5,      // Lower sensitivity = less sensitive scrolling
                        thresholdDelta: 30,    // Minimum scroll distance to trigger slide change
                        thresholdTime: 500,    // Minimum time between scroll events
                        releaseOnEdges: true,
                    }}
                    controller={{ control: smoothieSlider2 }}
                    onSwiper={(swiper) => {
                        setSmoothieSlider1(swiper);
                    }}
                >
                {
                    Smoothie.map((obj) => (
                        <SwiperSlide key={obj.id}>
                            <div className="gym-card">
                                <img src={"https://toneop.s3.ap-south-1.amazonaws.com/" + obj.image_web} className="swiper-img"></img>
                                <h3 className="swiper-text">{obj.name}</h3>
                                <button className="food-INFO" id={obj.diet_preference}>Starting from ₹{obj.price} </button>
                            </div>
                        </SwiperSlide>
                    ))
                }
                </Swiper>
            </div>

            <div className="nutrition">
                <h1 className="nutritional-text">Nutritional Info</h1>
                <img src="../src/utils/nutrion-left.png" className="img-left"></img>
                <img src="../src/utils/nutrion-right.png" className="img-right"></img>
                <Swiper
                    modules={[Navigation,Mousewheel,FreeMode,Controller]}
                    spaceBetween={30}
                    slidesPerView={1}
                    speed={1500}
                    direction="vertical"
                    slidesOffsetBefore={30}
                    slidesOffsetAfter={5}
                    mousewheel={{
                        forceToAxis: true,
                        sensitivity: 0.5,      // Lower sensitivity = less sensitive scrolling
                        thresholdDelta: 50,    // Minimum scroll distance to trigger slide change
                        thresholdTime: 500,    // Minimum time between scroll events
                        releaseOnEdges: true
                    }}
                    controller={{ control: smoothieSlider1 }}
                    onSwiper={(swiper) => {
                        setSmoothieSlider2(swiper);
                    }}
                >
                    {
                        Smoothie.map((obj) => (
                            <SwiperSlide key={obj.id}>
                                <div className="nutrition-info">
                                    {/* We have to iterate over servings array */}
                                    {obj.servings.map((Obj) => (
                                        <div className="BOX BOX_1" key={Obj.kcal + Obj.price + Obj.carbs}>
                                            <p className="food_name">{Obj.name}</p>
                                            <p className="calories">Calories : {Obj.kcal} kcal</p>
                                            <p className="Price">Price : ₹{Obj.price}</p>
                                            <div className="nutrition-pic">
                                                <div className="protein-info">
                                                    <img src="../src/utils/1.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Protein</p>
                                                    <p className="nutrition-amt">{Obj.protein}g</p>
                                                </div>
                                                <div className="fat-info">
                                                    <img src="../src/utils/2.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Fat</p>
                                                    <p className="nutrition-amt">{Obj.fat}g</p>
                                                </div>
                                                <div className="fiber-info">
                                                    <img src="../src/utils/3.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Fiber</p>
                                                    <p className="nutrition-amt">{Obj.fibre}g</p>
                                                </div>
                                                <div className="carbs-info">
                                                    <img src="../src/utils/4.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Carbs</p>
                                                    <p className="nutrition-amt">{Obj.carbs}g</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>

        <div className="synced-swipers">
            <div className="grill-grain">
                <h1 className="grill-grain-text">Cold Pressed Juices</h1>
                <Swiper
                    modules={[Navigation, Mousewheel, FreeMode,  Controller]}
                    spaceBetween={40}
                    slidesPerView={"auto"}
                    speed={1500}
                    centeredSlides={true}
                    mousewheel={{
                        forceToAxis:true,
                        sensitivity: 0.5,      // Lower sensitivity = less sensitive scrolling
                        thresholdDelta: 30,    // Minimum scroll distance to trigger slide change
                        thresholdTime: 500,    // Minimum time between scroll events
                        releaseOnEdges: true,
                    }}
                    controller={{ control: juiceSlider2 }}
                    onSwiper={(swiper) => {
                        setJuiceSlider1(swiper);
                    }}
                >
                {
                    Juice.map((obj) => (
                        <SwiperSlide key={obj.id}>
                            <div className="gym-card">
                                <img src={"https://toneop.s3.ap-south-1.amazonaws.com/" + obj.image_web} className="swiper-img"></img>
                                <h3 className="swiper-text">{obj.name}</h3>
                                <button className="food-INFO" id={obj.diet_preference}>Starting from ₹{obj.price} </button>
                            </div>
                        </SwiperSlide>
                    ))
                }
                </Swiper>
            </div>

            <div className="nutrition">
                <h1 className="nutritional-text">Nutritional Info</h1>
                <img src="../src/utils/nutrion-left.png" className="img-left"></img>
                <img src="../src/utils/nutrion-right.png" className="img-right"></img>
                <Swiper
                    modules={[Navigation,Mousewheel,FreeMode,Controller]}
                    spaceBetween={30}
                    slidesPerView={1}
                    speed={1500}
                    direction="vertical"
                    slidesOffsetBefore={30}
                    slidesOffsetAfter={5}
                    mousewheel={{
                        forceToAxis: true,
                        sensitivity: 0.5,      // Lower sensitivity = less sensitive scrolling
                        thresholdDelta: 50,    // Minimum scroll distance to trigger slide change
                        thresholdTime: 500,    // Minimum time between scroll events
                        releaseOnEdges: true
                    }}
                    controller={{ control: juiceSlider1 }}
                    onSwiper={(swiper) => {
                        setJuiceSlider2(swiper);
                    }}
                >
                    {
                        Juice.map((obj) => (
                            <SwiperSlide key={obj.id}>
                                <div className="nutrition-info">
                                    {/* We have to iterate over servings array */}
                                    {obj.servings.map((Obj) => (
                                        <div className="BOX BOX_1" key={Obj.kcal + Obj.price + Obj.carbs}>
                                            <p className="food_name">{Obj.name}</p>
                                            <p className="calories">Calories : {Obj.kcal} kcal</p>
                                            <p className="Price">Price : ₹{Obj.price}</p>
                                            <div className="nutrition-pic">
                                                <div className="protein-info">
                                                    <img src="../src/utils/1.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Protein</p>
                                                    <p className="nutrition-amt">{Obj.protein}g</p>
                                                </div>
                                                <div className="fat-info">
                                                    <img src="../src/utils/2.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Fat</p>
                                                    <p className="nutrition-amt">{Obj.fat}g</p>
                                                </div>
                                                <div className="fiber-info">
                                                    <img src="../src/utils/3.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Fiber</p>
                                                    <p className="nutrition-amt">{Obj.fibre}g</p>
                                                </div>
                                                <div className="carbs-info">
                                                    <img src="../src/utils/4.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Carbs</p>
                                                    <p className="nutrition-amt">{Obj.carbs}g</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>

        <div className="synced-swipers">
            <div className="grill-grain">
                <h1 className="grill-grain-text">30g Protein Box</h1>
                <Swiper
                    modules={[Navigation, Mousewheel, FreeMode,  Controller]}
                    spaceBetween={40}
                    slidesPerView={"auto"}
                    speed={1500}
                    centeredSlides={true}
                    mousewheel={{
                        forceToAxis:true,
                        sensitivity: 0.5,      // Lower sensitivity = less sensitive scrolling
                        thresholdDelta: 30,    // Minimum scroll distance to trigger slide change
                        thresholdTime: 500,    // Minimum time between scroll events
                        releaseOnEdges: true,
                    }}
                    controller={{ control: thirtySlider2 }}
                    onSwiper={(swiper) => {
                        setThirtySlider1(swiper);
                    }}
                >
                {
                    ThirtyGram.map((obj) => (
                        <SwiperSlide key={obj.id}>
                            <div className="gym-card">
                                <img src={"https://toneop.s3.ap-south-1.amazonaws.com/" + obj.image_web} className="swiper-img"></img>
                                <h3 className="swiper-text">{obj.name}</h3>
                                <button className="food-INFO" id={obj.diet_preference}>Starting from ₹{obj.price} </button>
                            </div>
                        </SwiperSlide>
                    ))
                }
                </Swiper>
            </div>

            <div className="nutrition">
                <h1 className="nutritional-text">Nutritional Info</h1>
                <img src="../src/utils/nutrion-left.png" className="img-left"></img>
                <img src="../src/utils/nutrion-right.png" className="img-right"></img>
                <Swiper
                    modules={[Navigation,Mousewheel,FreeMode,Controller]}
                    spaceBetween={30}
                    slidesPerView={1}
                    speed={1500}
                    direction="vertical"
                    slidesOffsetBefore={30}
                    slidesOffsetAfter={5}
                    mousewheel={{
                        forceToAxis: true,
                        sensitivity: 0.5,      // Lower sensitivity = less sensitive scrolling
                        thresholdDelta: 50,    // Minimum scroll distance to trigger slide change
                        thresholdTime: 500,    // Minimum time between scroll events
                        releaseOnEdges: true
                    }}
                    controller={{ control: thirtySlider1 }}
                    onSwiper={(swiper) => {
                        setThirtySlider2(swiper);
                    }}
                >
                    {
                        ThirtyGram.map((obj) => (
                            <SwiperSlide key={obj.id}>
                                <div className="nutrition-info">
                                    {/* We have to iterate over servings array */}
                                    {obj.servings.map((Obj) => (
                                        <div className="BOX BOX_1" key={Obj.kcal + Obj.price + Obj.carbs}>
                                            <p className="food_name">{Obj.name}</p>
                                            <p className="calories">Calories : {Obj.kcal} kcal</p>
                                            <p className="Price">Price : ₹{Obj.price}</p>
                                            <div className="nutrition-pic">
                                                <div className="protein-info">
                                                    <img src="../src/utils/1.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Protein</p>
                                                    <p className="nutrition-amt">{Obj.protein}g</p>
                                                </div>
                                                <div className="fat-info">
                                                    <img src="../src/utils/2.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Fat</p>
                                                    <p className="nutrition-amt">{Obj.fat}g</p>
                                                </div>
                                                <div className="fiber-info">
                                                    <img src="../src/utils/3.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Fiber</p>
                                                    <p className="nutrition-amt">{Obj.fibre}g</p>
                                                </div>
                                                <div className="carbs-info">
                                                    <img src="../src/utils/4.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Carbs</p>
                                                    <p className="nutrition-amt">{Obj.carbs}g</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>

        <div className="synced-swipers">
            <div className="grill-grain">
                <h1 className="grill-grain-text">40g Protein Box</h1>
                <Swiper
                    modules={[Navigation, Mousewheel, FreeMode,  Controller]}
                    spaceBetween={40}
                    slidesPerView={"auto"}
                    speed={1500}
                    centeredSlides={true}
                    mousewheel={{
                        forceToAxis:true,
                        sensitivity: 0.5,      // Lower sensitivity = less sensitive scrolling
                        thresholdDelta: 30,    // Minimum scroll distance to trigger slide change
                        thresholdTime: 500,    // Minimum time between scroll events
                        releaseOnEdges: true,
                    }}
                    controller={{ control: fortySlider2 }}
                    onSwiper={(swiper) => {
                        setFortySlider1(swiper);
                    }}
                >
                {
                    FortyGram.map((obj) => (
                        <SwiperSlide key={obj.id}>
                            <div className="gym-card">
                                <img src={"https://toneop.s3.ap-south-1.amazonaws.com/" + obj.image_web} className="swiper-img"></img>
                                <h3 className="swiper-text">{obj.name}</h3>
                                <button className="food-INFO" id={obj.diet_preference}>Starting from ₹{obj.price} </button>
                            </div>
                        </SwiperSlide>
                    ))
                }
                </Swiper>
            </div>

            <div className="nutrition">
                <h1 className="nutritional-text">Nutritional Info</h1>
                <img src="../src/utils/nutrion-left.png" className="img-left"></img>
                <img src="../src/utils/nutrion-right.png" className="img-right"></img>
                <Swiper
                    modules={[Navigation,Mousewheel,FreeMode,Controller]}
                    spaceBetween={30}
                    slidesPerView={1}
                    speed={1500}
                    direction="vertical"
                    slidesOffsetBefore={30}
                    slidesOffsetAfter={5}
                    mousewheel={{
                        forceToAxis: true,
                        sensitivity: 0.5,      // Lower sensitivity = less sensitive scrolling
                        thresholdDelta: 50,    // Minimum scroll distance to trigger slide change
                        thresholdTime: 500,    // Minimum time between scroll events
                        releaseOnEdges: true
                    }}
                    controller={{ control: fortySlider1 }}
                    onSwiper={(swiper) => {
                        setFortySlider2(swiper);
                    }}
                >
                    {
                        FortyGram.map((obj) => (
                            <SwiperSlide key={obj.id}>
                                <div className="nutrition-info">
                                    {/* We have to iterate over servings array */}
                                    {obj.servings.map((Obj) => (
                                        <div className="BOX BOX_1" key={Obj.kcal + Obj.price + Obj.carbs}>
                                            <p className="food_name">{Obj.name}</p>
                                            <p className="calories">Calories : {Obj.kcal} kcal</p>
                                            <p className="Price">Price : ₹{Obj.price}</p>
                                            <div className="nutrition-pic">
                                                <div className="protein-info">
                                                    <img src="../src/utils/1.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Protein</p>
                                                    <p className="nutrition-amt">{Obj.protein}g</p>
                                                </div>
                                                <div className="fat-info">
                                                    <img src="../src/utils/2.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Fat</p>
                                                    <p className="nutrition-amt">{Obj.fat}g</p>
                                                </div>
                                                <div className="fiber-info">
                                                    <img src="../src/utils/3.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Fiber</p>
                                                    <p className="nutrition-amt">{Obj.fibre}g</p>
                                                </div>
                                                <div className="carbs-info">
                                                    <img src="../src/utils/4.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Carbs</p>
                                                    <p className="nutrition-amt">{Obj.carbs}g</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>

        <div className="synced-swipers">
            <div className="grill-grain">
                <h1 className="grill-grain-text">50g Protein Box</h1>
                <Swiper
                    modules={[Navigation, Mousewheel, FreeMode,  Controller]}
                    spaceBetween={40}
                    slidesPerView={"auto"}
                    speed={1500}
                    centeredSlides={true}
                    mousewheel={{
                        forceToAxis:true,
                        sensitivity: 0.5,      // Lower sensitivity = less sensitive scrolling
                        thresholdDelta: 30,    // Minimum scroll distance to trigger slide change
                        thresholdTime: 500,    // Minimum time between scroll events
                        releaseOnEdges: true,
                    }}
                    controller={{ control: fiftySlider2 }}
                    onSwiper={(swiper) => {
                        setFiftySlider1(swiper);
                    }}
                >
                {
                    FiftyGram.map((obj) => (
                        <SwiperSlide key={obj.id}>
                            <div className="gym-card">
                                <img src={"https://toneop.s3.ap-south-1.amazonaws.com/" + obj.image_web} className="swiper-img"></img>
                                <h3 className="swiper-text">{obj.name}</h3>
                                <button className="food-INFO" id={obj.diet_preference}>Starting from ₹{obj.price} </button>
                            </div>
                        </SwiperSlide>
                    ))
                }
                </Swiper>
            </div>

            <div className="nutrition">
                <h1 className="nutritional-text">Nutritional Info</h1>
                <img src="../src/utils/nutrion-left.png" className="img-left"></img>
                <img src="../src/utils/nutrion-right.png" className="img-right"></img>
                <Swiper
                    modules={[Navigation,Mousewheel,FreeMode,Controller]}
                    spaceBetween={30}
                    slidesPerView={1}
                    speed={1500}
                    direction="vertical"
                    slidesOffsetBefore={30}
                    slidesOffsetAfter={5}
                    mousewheel={{
                        forceToAxis: true,
                        sensitivity: 0.5,      // Lower sensitivity = less sensitive scrolling
                        thresholdDelta: 50,    // Minimum scroll distance to trigger slide change
                        thresholdTime: 500,    // Minimum time between scroll events
                        releaseOnEdges: true
                    }}
                    controller={{ control: fiftySlider1 }}
                    onSwiper={(swiper) => {
                        setFiftySlider2(swiper);
                    }}
                >
                    {
                        FiftyGram.map((obj) => (
                            <SwiperSlide key={obj.id}>
                                <div className="nutrition-info">
                                    {/* We have to iterate over servings array */}
                                    {obj.servings.map((Obj) => (
                                        <div className="BOX BOX_1" key={Obj.kcal + Obj.price + Obj.carbs}>
                                            <p className="food_name">{Obj.name}</p>
                                            <p className="calories">Calories : {Obj.kcal} kcal</p>
                                            <p className="Price">Price : ₹{Obj.price}</p>
                                            <div className="nutrition-pic">
                                                <div className="protein-info">
                                                    <img src="../src/utils/1.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Protein</p>
                                                    <p className="nutrition-amt">{Obj.protein}g</p>
                                                </div>
                                                <div className="fat-info">
                                                    <img src="../src/utils/2.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Fat</p>
                                                    <p className="nutrition-amt">{Obj.fat}g</p>
                                                </div>
                                                <div className="fiber-info">
                                                    <img src="../src/utils/3.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Fiber</p>
                                                    <p className="nutrition-amt">{Obj.fibre}g</p>
                                                </div>
                                                <div className="carbs-info">
                                                    <img src="../src/utils/4.webp" className="nutrition-img"></img>
                                                    <p className="nutrition-text">Carbs</p>
                                                    <p className="nutrition-amt">{Obj.carbs}g</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>

        <div className="mail-list-container">
            <img src="../src/utils/border-img.png" className="apple"></img>
            <div className="main-container">
                <div className="combo-header">
                    <h1 className="header1">Join our</h1>
                    <h1 className="header2">mailing list</h1>
                </div>
                <p className="para1">Subscribe to our newsletter to stay up to date with our discounts and new products.</p>
                <div className="input-btn">
                    <input type="text" id="Input" name="gmail" placeholder="Your Email..."></input>
                    <button className="SUBSCRIBE">Subscribe</button>
                </div>
            </div>
        </div>

        <Footer/>
        {/* ----------Calorie Calc------------------ */}
        {/* Made this outside div to apply the ref property */}
        <div ref={container2}>
            <div className="calculator-container">      
            {/* Left Side: Form Section */}
            <div className="form-panel">
                <h1 className="calculator-title">Calorie Calculator</h1>
                <p className="calculator-description">Estimate your daily calorie needs to maintain, lose, or gain weight.</p>
                        
                <form onSubmit={calculateCalories}>
                    <p className="GENDER">Gender</p>
                    <div className="gender-group">
                        <div className="gender-grp1">
                            {/* checked={gender === 'male'} -> If your state variable gender equals "male", this radio shows as ticked. */}
                            {/* If gender is something else (like "female"), this radio stays unticked. */}
                            <input type="radio" id="FIRST" name="gender" value="male" checked={gender==="male"} onChange={(event) => setGender(event.target.value)} />
                            <label htmlFor="FIRST" className="male-label">Male</label>
                        </div>
                        <div className="gender-grp2">
                            <input type="radio" id="SECOND" name="gender" value="female" checked={gender==="female"} onChange={(event) => setGender(event.target.value)} />
                            <label htmlFor="SECOND" className="female-label">Female</label>
                        </div>
                    </div>

                    <div className="age-group">
                        <label htmlFor="THIRD" className="age-label">Age</label>
                        <input type="number" id="THIRD" name="age" value={age} onChange={(event) => setAge(event.target.value)} placeholder="e.g., 25" required />
                    </div>

                    <div className="weight-group">
                        <label htmlFor="FOURTH" className="weight-label">Weight (kg)</label>
                        <input type="number" id="FOURTH" name="weight" value={weight} onChange={(event) => setWeight(event.target.value)} placeholder="e.g., 70" required />
                    </div>
                    <div className="height-group">
                        <label htmlFor="FIFTH" className="height-label">Height (cm)</label>
                        <input type="number" id="FIFTH" name="height" value={height} onChange={(event) => setHeight(event.target.value)} placeholder="e.g., 175" required />
                    </div>

                    <div className="activity-group">
                        <label className="dropdown-label">Activity Level</label>
                        <select name="activity" value={activity} onChange={(event) => setActivity(event.target.value)} className="form-select" required>
                            <option value="1.2">Sedentary (little or no exercise)</option>
                            <option value="1.375">Lightly active (light exercise/sports 1-3 days/week)</option>
                            <option value="1.55">Moderately active (moderate exercise/sports 3-5 days/week)</option>
                            <option value="1.725">Very active (hard exercise/sports 6-7 days a week)</option>
                            <option value="1.9">Extra active (very hard exercise/physical job)</option>
                        </select>
                    </div>

                    <div className="button-group">
                        <button type="submit" className="calc-btn">Calculate</button>
                        <button type="button" onClick={clearForm} className="clear-btn">Clear</button>
                    </div>
                </form>
            </div>

            {/* Right Side: Results Section */}
            <div className="results-panel">
                {/* This block is only rendered when the user hasn’t submitted or calculated results yet, and there’s no error. */}
                {/* Basically, it’s the initial screen / default UI before the user does anything. */}
                {/* CONDITIONAL RENDERING */}

                {!results && !error && (
                    <div>
                        <svg className="initial-message-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M12 8h.01M15 8h.01M15 14h.01M18 17h.01M18 14h.01M18 11h.01M18 8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h2 className="results-title">Your Results</h2>
                        <p className="results-para">Fill out the form to see your personalized calorie goals.</p>
                    </div>
                )}
                

                {/* If error is truthy (contains a message), then this <div> will render.      */}
                {error && ( <div className="error-message">{error}</div> )}

                {results && (
                    <div className="w-full">
                        <h2 className="results-title">Your Daily Calorie Needs</h2>
                        <div className="results-list">
                            <div className="result-card card-green">
                                <p className="result-card-title">Maintenance</p>
                                <p className="result-card-value">{results.maintenance.toLocaleString()} Calories/day</p>
                                <p className="result-card-desc">To maintain your current weight.</p>
                            </div>
                            <div className="result-card card-yellow" style={{transitionDelay: '100ms'}}>
                                <p className="result-card-title">Mild Weight Loss (0.25 kg/week)</p>
                                <p className="result-card-value">{results.mildLoss.toLocaleString()} Calories/day</p>
                            </div>
                            <div className="result-card card-orange" style={{transitionDelay: '200ms'}}>
                                <p className="result-card-title">Weight Loss (0.5 kg/week)</p>
                                <p className="result-card-value">{results.weightLoss.toLocaleString()} Calories/day</p>
                            </div>
                            <div className="result-card card-red" style={{transitionDelay: '300ms'}}>
                                <p className="result-card-title">Extreme Weight Loss (1 kg/week)</p>
                                <p className="result-card-value">{results.extremeLoss.toLocaleString()} Calories/day</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Close button */}
            <i className="ri-close-circle-fill" onClick={closeCalc}></i>
            </div>
        </div>
        <img src="../src/utils/calorieCalcBTN.png" className="calorie-btn" onClick={openCalc}></img>
        </>
    );
}

export default ZingoFit;
