import Header from "./Header";
import InfiniteSlider from "./InfiniteSlider";
import FoodSlider from "./FoodSlider";
import HotelSlider from "./HotelSlider";
import GetApp from "./GetApp";
import Footer from "./Footer";

function Home(){
    return (
        <>
        <Header/>
        <InfiniteSlider/>
        <FoodSlider/>
        <HotelSlider/>
        <GetApp/>
        <Footer/>
        </>
    );
}

export default Home;