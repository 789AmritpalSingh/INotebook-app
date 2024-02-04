// middleware is a function which is called when login at any place is done to fetch the details

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'Amritisagoodb$oy' //When a JWT is created (signed) using the jwt.sign() function, the JWT_SECRET is used to create a digital signature. This signature is included in the JWT. When the JWT is later verified using the jwt.verify() function, the library uses the JWT_SECRET to check whether the signature is valid. If the signature can be successfully verified using the secret key, it means that the token has not been tampered with and is considered authentic.

// To address your concern about generating different authentication tokens for each user login:

// User-Specific Data: While the tokens themselves will be unique for each user's session, they will all be signed using the same JWT_SECRET. The secret is not tied to any specific user; it's used to ensure the overall security of the JWTs.

// Token Payload: The payload of the JWT includes user-specific information, such as user ID, roles, permissions, or any other relevant data. This payload is unique to each user, and it is usually encrypted (if sensitive) and base64-encoded. The payload is not what makes each token unique; it's the combination of the payload, signature, and header that ensures the token's uniqueness and security.

// Token Expiration: Additionally, tokens often have an expiration time (exp claim) after which they are no longer considered valid. This further enhances security and ensures that tokens have a limited lifespan.

const fetchuser = (req,res,next) =>{
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token') // taking token from header auth-token which is passed in request
    if(!token) {// if token doesn't match
        res.status(401).send({error: 'Please authenticate using a valid token'})
    }
    try{
        const data = jwt.verify(token,JWT_SECRET) // The jwt.verify() function uses the provided JWT_SECRET to verify that the token has not been tampered with. If the token's signature matches the expected signature created using the JWT_SECRET, it is considered valid.
        //If the token has been tampered with or is invalid for any reason, the verification process will fail.
        
        req.user = data.user //data.user is used to extract the user-related information from the decoded JWT payload and attach it to the req.user property.

        next() // req,res ke baad next() middleware run hoga
    }catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}

module.exports = fetchuser