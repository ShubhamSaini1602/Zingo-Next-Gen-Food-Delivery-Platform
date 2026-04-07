import { imageGridCards } from "../utils/Data";
import { ImageGridCards } from "../utils/Data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, FreeMode} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";

function FoodSlider(){
    const container = useRef();

    useGSAP(()=>{

        gsap.from(".grocery-text",{
            x:-100,
            duration:3,
            opacity:0,
            scrollTrigger:{
                trigger: ".grocery-text",
                start: "top 70%",
                end: "top 30%",
                scrub: true
            }
        }, {scope:container})

    })

    return (
        <>
        {/* Fast-food Slider */}
        <div className="foodslider">
            <Swiper
                modules={[Navigation,Pagination,Mousewheel,FreeMode]}
                navigation={{
                    prevEl: ".my-swiper-button-prev",
                    nextEl: ".my-swiper-button-next"
                }}
                pagination={{clickable:true}}
                spaceBetween={30}
                slidesPerView={"auto"}
                speed={600}
                centeredSlides={true}
                slidesOffsetBefore={20}  // Left margin
                slidesOffsetAfter={20}   // Right margin
                loop={true}
                mousewheel={{
                    forceToAxis: true
                }}
                freeMode={true}
            >
            {
                imageGridCards.map((obj) => (
                    <SwiperSlide key={obj.id}>
                        <div className="content">
                            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/"+obj.imageId} className="swiper-img"></img>
                        </div>
                    </SwiperSlide>
                ))
            }
            </Swiper>

            {/* 2. Add your custom button elements here */}
            <div className="my-swiper-button-prev">
                <i className="ri-arrow-left-circle-fill"></i>
            </div>
            <div className="my-swiper-button-next">
                <i className="ri-arrow-right-circle-fill"></i>
            </div>
        </div>
        
        {/* We wrapped the h1 inside a div due to the ref rules we studied. */}
        <div className="grocery-title" ref={container}>
            <h1 className="grocery-text">Shop groceries on Instamart</h1>
        </div>
        {/* Groceries Slider */}
        <div className="groceriesSlider">
            <Swiper
                modules={[Navigation,Pagination,Mousewheel,FreeMode]}
                navigation={{
                    prevEl: ".My-swiper-button-prev",
                    nextEl: ".My-swiper-button-next"
                }}
                pagination={{clickable:true}}
                spaceBetween={30}
                slidesPerView={"auto"}
                speed={600}
                centeredSlides={true}
                slidesOffsetBefore={20}  // Left margin
                slidesOffsetAfter={20}   // Right margin
                loop={true}
                mousewheel={{
                    forceToAxis: true
                }}
                freeMode={true}
            >
            {
                ImageGridCards.map((obj) => (
                    <SwiperSlide key={obj.id}>
                        <div className="content">
                            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/"+obj.imageId} className="swiper-img"></img>
                            <h3 className="swiper-text">{obj.action.text}</h3>
                        </div>
                    </SwiperSlide>
                ))
            }
            </Swiper>

            {/* 2. Add your custom button elements here */}
            <div className="My-swiper-button-prev">
                <i className="ri-arrow-left-circle-fill"></i>
            </div>
            <div className="My-swiper-button-next">
                <i className="ri-arrow-right-circle-fill"></i>
            </div>
        </div>
        </>
    );
}

export default FoodSlider;





