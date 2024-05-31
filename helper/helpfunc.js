const jwt = require("jsonwebtoken");

exports.getUserNameOfToken=(token,secret_key)=>{
    if (!token){
        return {
            status:"failed",
            message:"please login"
        };
    }
    return new Promise((resolve,reject)=>{
        jwt.verify(token, secret_key, (err, _user) => {
            if (err){
                reject({status:"failed", message: 'Invalid token', error: err });
            }
            console.log(_user)
            resolve(_user.username);
        });
    })
}