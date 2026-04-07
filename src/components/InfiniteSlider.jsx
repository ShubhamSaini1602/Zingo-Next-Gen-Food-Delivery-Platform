// Import Core Components
import {Swiper, SwiperSlide} from "swiper/react";
// Import Additional Components you need in your project
import {Autoplay} from "swiper/modules";

// Import this base CSS (mandatory)
import "swiper/css";

// Import additional components' css as well if any
// ----------Nothing for now-----------------------

function InfiniteSlider(){
    
    return (
        <>
        <div className="marquee">
            <Swiper
            modules={[Autoplay]}
            slidesPerView={"auto"}
            spaceBetween={50}
            loop={true}
            speed={6500}
            autoplay={{
                delay:0,
                disableOnInteraction: false,
                reverseDirection: true
            }}
            allowTouchMove={false}
            >
            <SwiperSlide>
                <div className="content">
                    <h1 className="swiper-text1">WELCOME TO ZINGO</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" className="swiper-img"></img>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <h1 className="swiper-text2">Welcome To Zingo</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" className="swiper-img"></img>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <h1 className="swiper-text1">WELCOME TO ZINGO</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" className="swiper-img"></img>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <h1 className="swiper-text2">Welcome To Zingo</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" className="swiper-img"></img>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <h1 className="swiper-text1">WELCOME TO ZINGO</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" className="swiper-img"></img>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <h1 className="swiper-text2">Welcome To Zingo</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" className="swiper-img"></img>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <h1 className="swiper-text1">WELCOME TO ZINGO</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" className="swiper-img"></img>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <h1 className="swiper-text2">Welcome To Zingo</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" className="swiper-img"></img>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <h1 className="swiper-text1">WELCOME TO ZINGO</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" className="swiper-img"></img>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="content">
                    <h1 className="swiper-text2">Welcome To Zingo</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" className="swiper-img"></img>
                </div>
            </SwiperSlide>
            </Swiper>
        </div>
        </>
    );
}

export default InfiniteSlider;




