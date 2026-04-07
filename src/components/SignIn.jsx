function SignIn(){
    return (
        <>
        <div className="img_form">
            <img src="../src/utils/Signin.png" className="signinPic"></img>
            <form className="form">
                <h1 className="text-layer">Sign In</h1>
                <div className="input-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" placeholder="Username or Email"></input>
                </div>
                <div className="input-group">
                    <label for="password">Password</label>
                    <input type="text" id="password" placeholder="Password"></input>
                </div>
                <button className="signin-btn">Sign In</button>

                <p className="social-text">Sign In with a Social Media Account</p>
                <div className="social-btns">
                    <i className="ri-google-fill GOOGLE"></i>
                    <i className="ri-facebook-circle-fill FACEBOOK"></i>
                    <i className="ri-instagram-fill INSTAGRAM"></i>
                </div>
            </form>
        </div>
        </>
    );
}

export default SignIn;