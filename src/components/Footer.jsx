function Footer(){
    return (
        <>
        <div className="footer">
            <div className="company-footer">
                <h1 className="company-name">Zingo</h1>
                <h3 className="copyright">&copy; 2025 Zingo Limited</h3>
            </div>
            <div className="last-footer-section">
                <p className="footer-text">For better experience, download the Zingo app now</p>
                <a href="https://play.google.com/store/apps/details?id=in.swiggy.android&referrer=utm_source%3Dswiggy%26utm_medium%3Dheader" target="_blank">
                    <img src="/icon-GooglePlay_1_zixjxl.avif" className="google-play"></img>
                </a>
                <a href="https://apps.apple.com/in/app/swiggy-food-instamart-dineout/id989540920?referrer=utm_source%3Dswiggy%26utm_medium%3Dhomepage" target="_blank">
                    <img src="/icon-AppStore_lg30tv.avif" className="apple-store"></img>
                </a>
            </div>
        </div>
        </>
    );
}

export default Footer;