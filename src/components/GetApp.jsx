import simpleImg from "../utils/image.png";

function GetApp(){
    return (
        <>
        <div className="get-app">
            <div className="text-container">
                <h1 className="app-name">Zingo</h1>
                <h1 className="get-app-now">Get the Zingo App now!</h1>
                <p className="best-offers">For best offers and discounts curated specially for you.</p>
            </div>
            <img src={simpleImg} className="QR"></img>
        </div>
        </>
    );
}

export default GetApp;