const User = require('../models/user')
const { v4: uuidv4 } = require('uuid');
const {setUser} = require('../service/auth')

async function handleUserSignUp(req,res){
    const{name, email, password} = req.body;
    await User.create(
        {
            name,
            email,
            password,
        }
    );
    return res.redirect('/');
}

async function handleRenderSignUpPage(req, res){
    return res.render("signup")
}


async function handleRenderLogInPage(req,res){
    return res.render("login")
}


async function handleUserLogIn(req,res){
    const{email, password} = req.body;
    const user = await User.findOne(
        {
            email,
            password,
        }
    );
    if(!user){
        return res.render("login", {
            error: "Invalid Username or Password",
        })
    }

    // const sessionId = uuidv4();
    // setUser(sessionId, user);
    const token = setUser(user);
    // res.cookie('uid', sessionId);
    res.cookie('uid', token);
    return res.redirect('/');
}


async function handleUserLogout(req, res) {
    res.clearCookie("uid");
    return res.redirect("/login");
}


module.exports = {
    handleUserSignUp,
    handleRenderSignUpPage,
    handleUserLogIn,
    handleRenderLogInPage,
    handleUserLogout
}