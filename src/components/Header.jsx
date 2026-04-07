import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Link } from "react-router";
import zingoHomeLogo from "../utils/zingo-home-logo.png";

function Header(){
    const container=useRef();
    const tl=useRef();
    const {contextSafe} = useGSAP({scope:container});
    const isAnimating1=useRef(false);
    const isAnimating2=useRef(false);
    const isAnimating3=useRef(false);
    const isAnimating4=useRef(false);

    useGSAP(()=>{
        let tl=gsap.timeline();

        tl.from(".logo",{
            opacity:0,
            y:-100,
            duration:1
        })

        tl.from(".navbar",{
            opacity:0,
            y:-100,
            duration:0.5
        })

        tl.from(".menu",{
            opacity:0,
            y:-100,
            duration:0.5
        })
    },{scope:container})

    useGSAP(()=>{
        tl.current=gsap.timeline({paused:true});

        tl.current.to(".side-menu",{
            x:-400,
            duration:0.5
        })

        tl.current.from(".Menu, .Help, .Partner, .Ride, .GetApp, .Terms, .menu-link",{
            x:100,
            opacity:0,
            duration:0.5,
            stagger:0.05 // 0.05s between each item
        },"-=0.2")

    },{scope:container})

    function menuOpen(){
        tl.current.play();
    }

    function menuClose(){
        tl.current.reverse();
    }

    useGSAP(()=>{

        gsap.to(".img1",{
            x:325,
            duration:2
        })

        gsap.to(".img2",{
            x:-325,
            duration:2
        })

    }, {scope:container})

    useGSAP(()=>{
        gsap.from(".CARD",{
            x:100,
            opacity:0,
            duration:1.5,
            stagger:0.3
        })
    },{scope:container})

    const button1Slide=contextSafe(()=>{
        if(isAnimating1.current===true){
            return;
        }
        else{
            isAnimating1.current=true;
            gsap.to("#BUTTON1",{
                y:150,
                duration:1,
                repeat:1,
                yoyo:true,
                repeatDelay:5,
                onComplete: ()=>{
                    isAnimating1.current=false;
                }
            })
        }
    })

    const button2Slide=contextSafe(()=>{
        if(isAnimating2.current===true){
            return;
        }
        else{
            isAnimating2.current=true;
            gsap.to("#BUTTON2",{
                y:150,
                duration:1,
                repeat:1,
                yoyo:true,
                repeatDelay:5,
                onComplete: ()=>{
                    isAnimating2.current=false;
                }
            })
        }
    })

    const button3Slide=contextSafe(()=>{
        if(isAnimating3.current===true){
            return;
        }
        else{
            isAnimating3.current=true;
            gsap.to("#BUTTON3",{
                y:150,
                duration:1,
                repeat:1,
                yoyo:true,
                repeatDelay:5,
                onComplete: ()=>{
                    isAnimating3.current=false;
                }
            })
        }
    })

    const button4Slide=contextSafe(()=>{
        if(isAnimating4.current===true){
            return;
        }
        else{
            isAnimating4.current=true;
            gsap.to("#BUTTON4",{
                y:150,
                duration:1,
                repeat:1,
                yoyo:true,
                repeatDelay:5,
                onComplete: ()=>{
                    isAnimating4.current=false;
                }
            })
        }
    })

    return (
        <>
        <div className="container1" ref={container}>
            <div className="first" ref={container}>
                {/* Company Logo ---------------------------------------------- */}
                <img src={zingoHomeLogo} className="white-zingo"></img>
                <div className="logo">
                    <h1>Zingo</h1>
                    <h2 id="Subsidiary">A Subsidiary of Swiggy</h2>
                </div>
                {/* ----------------------------------------------------------- */}

                {/* Navbar----------------------------------------------------- */}
                <div className="navbar">
                    <a href="https://careers.swiggy.com/#/" target="_blank" className="card-link">
                        <div className="card card1">
                            <ion-icon name="home"></ion-icon>
                            <p className="iconText">Corporate</p>
                        </div>
                    </a>
                    <a href="https://careers.swiggy.com/#/about" target="_blank" className="card-link">
                        <div className="card card2">
                            <ion-icon name="information-circle"></ion-icon>
                            <p className="iconText">About Us</p>
                        </div>
                    </a>
                    <a href="https://www.swiggy.com/swiggy_customer_care" target="_blank" className="card-link">
                        <div className="card card3">
                            <ion-icon name="call"></ion-icon>
                            <p className="iconText">Contact Us</p>
                        </div>
                    </a>
                    <Link to="/SignIn" className="card-link">
                        <div className="card card4">
                            <ion-icon name="log-in"></ion-icon>
                            <p className="iconText">Sign in</p>
                        </div>
                    </Link>
                </div>
                {/* ----------------------------------------------------------- */}

                {/* Menu Bar--------------------------------------------------- */}
                <div className="menu" onClick={menuOpen}>
                    <ion-icon name="grid"></ion-icon>
                </div>

                <div className="side-menu">
                    <div className="Menu">
                        <ion-icon name="menu"></ion-icon>
                        <p>Menu</p>
                    </div>
                    <a href="https://www.swiggy.com/support" target="_blank" className="menu-link">
                        <div className="Help">
                            <i className="ri-customer-service-2-line"></i>
                            <p className="menu-text">Help & Support</p>
                        </div>
                    </a>
                    <a href="https://partner.swiggy.com/login" target="_blank" className="menu-link">
                        <div className="Partner">
                            <i className="ri-shake-hands-line"></i>
                            <p className="menu-text">Partner with us</p>
                        </div>
                    </a>
                    <a href="https://ride.swiggy.com/" target="_blank" className="menu-link">
                        <div className="Ride">
                            <i className="ri-truck-line"></i>
                            <p className="menu-text">Ride with us</p>
                        </div>
                    </a>
                    <a href="https://www.swiggy.com/swiggy-super" target="_blank" className="menu-link">
                        <div className="GetApp">
                            <i className="ri-mobile-download-line"></i>
                            <p className="menu-text">Get the App</p>
                        </div>
                    </a>
                    <a href="https://www.swiggy.com/terms-and-conditions" target="_blank" className="menu-link">
                        <div className="Terms">
                            <i className="ri-article-line"></i>
                            <p className="menu-text">Terms & Conditions</p>
                        </div>
                    </a>
                    <div className="social-links">
                        <a href="https://www.linkedin.com/company/swiggy-in/" target="_blank" className="menu-link">
                            <i className="ri-linkedin-box-fill"></i>
                        </a>
                        <a href="https://www.instagram.com/swiggyindia/?hl=en" target="_blank" className="menu-link">
                            <i className="ri-instagram-fill"></i>
                        </a>
                        <a href="https://www.facebook.com/swiggy.in/" target="_blank" className="menu-link">
                            <i className="ri-facebook-circle-fill"></i>
                        </a>
                        <a href="https://in.pinterest.com/swiggyindia/" target="_blank" className="menu-link">
                            <i className="ri-pinterest-fill"></i>
                        </a>
                        <a href="https://x.com/Swiggy?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" className="menu-link">
                            <i className="ri-twitter-fill"></i>
                        </a>
                    </div>

                    {/* Close Menu Button */}
                    <i className="ri-close-large-fill" onClick={menuClose}></i>
                </div>
                {/* ----------------------------------------------------------- */}
            </div>

            {/* My second container----------------------------------- */}
            <div className="second">
                <div className="text1">
                    <p>Order food & groceries. Discover</p>
                </div>
                <div className="text2">
                    <p>best restaurants. Zingo it!</p>
                </div>
                <div className="inputElements">
                    <select name="location" id="drop-down">
                        <option value="Delhi">Delhi</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Varanasi">Varanasi</option>
                        <option value="Bombay">Bombay</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Chennai">Chennai</option>
                    </select>

                    <div className="box-icon">
                        <input type="text" name="hotel" id="searchbox" placeholder="Search for restaurant, item or more"></input>
                        <i className="ri-search-line"></i>
                    </div>
                </div>
            </div>
            {/* -------------------------------------------------------- */}

            {/* Images-------------------------- */}
            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png" className="img1"></img>
            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png" className="img2"></img>
            {/* ----------------------------------------------- */}

            <div className="card-container" ref={container}>
                <div className="CARD" ref={container}>
                    <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/1/fa01e85b-3057-482d-9523-5289722b1df2_Food4BU.png" className="img" onClick={button1Slide}></img>
                    <Link to="/restaurants" >
                        <button className="BUTTON" id="BUTTON1">Visit</button>
                    </Link>
                </div>
                <div className="CARD">
                    <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/16/ca34e375-f1bd-4a2e-a3e7-0a20833be83b_IM4BU1.png" className="img" onClick={button2Slide}></img>
                    <a href="https://www.swiggy.com/instamart?entryId=1234&entryName=mainTileEntry4&v=1" target="_blank">
                        <button className="BUTTON" id="BUTTON2">Visit</button>
                    </a>
                </div>
                <div className="CARD">
                    <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/1/76c30e5a-8adb-4795-bf5b-fa64e9e9e1d3_DO4BU.png" className="img" onClick={button3Slide}></img>
                    <a href="https://www.swiggy.com/dineout" target="_blank">
                        <button className="BUTTON" id="BUTTON3">Visit</button>
                    </a>
                </div>
                <div className="CARD">
                    <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/31/14033c0b-8907-420b-b72a-d26cfa68dc7b_Genie4BU.png" className="img" onClick={button4Slide}></img>
                    <a href="https://www.swiggy.com/instamart/city/mumbai/b/swiggy-genie" target="_blank">
                        <button className="BUTTON" id="BUTTON4">Visit</button>
                    </a>
                </div>
            </div>

            {/* ZingoFit Button */}
            <div className="gym-section">
                <Link to="/ZingoFit">
                    <button className="gym-button">ZingoFit</button>
                </Link>
                <i className="ri-leaf-fill"></i>
            </div>

        </div>
        </>
    );
}

export default Header;


