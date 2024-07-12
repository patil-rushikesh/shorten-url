// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "Rushikesh$$$";

function setUser(/*id,*/ user) {
    // sessionIdToUserMap.set(id, user);
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secret);
}

function getUser(/*id*/ token) {
    // return sessionIdToUserMap.get(id);
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("JWT verification error:", error);
        return null; // Return null if verification fails
    }
}

module.exports = {
    setUser,
    getUser
};
