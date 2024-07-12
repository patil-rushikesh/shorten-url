const { getUser } = require('../service/auth')

async function checkForAuthentication(req, res, next) {
    const userUid = req.cookies?.uid;
    if (!userUid) {
        return next();
    }

    const user = await getUser(userUid);
    req.user = user;
     return next();
}

function restrictTo(roles) {
    return (req, res, next) => {
        if(!req.user){
            return res.redirect('/login');
        }
        if(!roles.includes(req.user.role)){
            return res.end("unAuthorized");
        }

        return next();
    }
}

// async function restrictToLoggedInUserOnly(req, res, next) {
//     const userUid = req.cookies?.uid;
//     if (!userUid) {
//         return res.redirect("/login");
//     }

//     const user = await getUser(userUid);
//     if (!user) {
//         return res.redirect("/login");
//     }

//     req.user = user;
//     next();
// }



// async function checkAuth(req, res, next) {
//     const userUid = req.cookies?.uid;


//     const user = await getUser(userUid);


//     req.user = user;
//     next();
// }
module.exports = {
    // restrictToLoggedInUserOnly,
    // checkAuth,
    checkForAuthentication,
    restrictTo
}