import { dineoutRestaurants } from "../utils/Data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Mousewheel, FreeMode, EffectCoverflow} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function HotelSlider(){

    const container = useRef();

    useGSAP(()=>{

        gsap.from(".hotel-text",{
            x:-100,
            duration:3,
            opacity:0,
            scrollTrigger:{
                trigger: ".hotel-text",
                start: "top 70%",
                end: "top 30%",
                scrub: true
            }
        }, {scope:container})

    })

    return (
        <>
        <div className="hotel-title" ref={container}>
            <h1 className="hotel-text">Discover best restaurants on Dineout</h1>
        </div>
        <div className="hotelslider">
            <Swiper
                modules={[Navigation,Pagination,Mousewheel,FreeMode,EffectCoverflow]}
                effect={"coverflow"}
                navigation={{
                    prevEl: ".MY-swiper-button-prev",
                    nextEl: ".MY-swiper-button-next"
                }}
                pagination={{clickable:true}}
                slidesPerView={"auto"}
                speed={600}
                centeredSlides={true}
                initialSlide={5}
                mousewheel={{
                    forceToAxis: true
                }}
                freeMode={true}
                coverflowEffect={{
                    rotate:15,
                    stretch:80,
                    depth:350,
                    modifier:1,
                    slideShadows:true
                }}
            >
                {
                    dineoutRestaurants.map((obj)=> (
                        <SwiperSlide>
                            <div className="CARD">
                                <img src={"https://media-assets.swiggy.com/swiggy/image/upload/" + obj.info.mediaFiles[0].url} className="swiper-img"></img>
                                <div className="overlay"></div>
                                <div className="FIRST">
                                    <h1 className="hotel-name">{obj.info.name}</h1>
                                    <div className="rating-div">
                                        <ion-icon name="star"></ion-icon>
                                        <p className="RATING">{obj.info.rating.value}</p>
                                    </div>
                                </div>
                                <div className="SECOND">
                                    <p className="food-type">{obj.info.cuisines[0]}</p>
                                    <p className="PRICE">{obj.info.costForTwo}</p>
                                </div>
                                <div className="THIRD">
                                    <p className="location">{obj.info.locationInfo.formattedAddress}</p>
                                    <p className="DISTANCE">{obj.info.locationInfo.distanceString}</p>
                                </div>
                                <div className="FIFTH">
                                    <p className="offers">{obj.info.customerOffer.info.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            {/* 2. Add your custom button elements here */}
            <div className="MY-swiper-button-prev">
                <i className="ri-arrow-left-circle-fill"></i>
            </div>
            <div className="MY-swiper-button-next">
                <i className="ri-arrow-right-circle-fill"></i>
            </div>
        </div>
        </>
    );
}

export default HotelSlider;




