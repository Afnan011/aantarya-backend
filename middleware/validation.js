const Joi = require('joi')
const jwt = require('jsonwebtoken')

const registerValidation = (data) => {
    const schema = Joi.object(
        {
            name: Joi.string().min(5).max(255).required(),
            email: Joi.string().min(5).max(255).required(),
            password: Joi.string().min(5).max(255).required(),
            isUG: Joi.boolean()
        }
    )

    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object(
        {
            email: Joi.string().min(5).max(255).required(),
            password: Joi.string().min(5).max(255).required()
        }
    )

    return schema.validate(data);
}


//verify jwt token (middleware)
const verifyToken = (req, res, next) => {
    const token = req.header("auth-token")

    if(!token){
        return res.status(401).json({error:"access denied"})
    }

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
            if(err){
                console.log("error: ");
                console.log(err);
            }
            else{
                console.log("res: ")
                console.log(decode)
            }
        })
        req.user = verified;
        next()
    }catch(err){
        res.status(400).json({error:"token is not valid"})
    }

}



module.exports = {registerValidation, loginValidation, verifyToken}