import jwt from 'jsonwebtoken';
const secret = '!@#$%^&*()/<>?:{}[]'


/** logic: 

 *  It attempts to extract the JWT token from the request's 'auth-token' header.

 *  If there's no token in the header, it responds with a 401 status and an error message indicating that authentication is required.

 *  If there is a token, it tries to verify it using the secret key (secret) defined in your code. If the verification succeeds, it decodes the token and extracts the user information from it (data.user).

 *  If the token is verified, it attaches the user object to the request (req.user) so that the subsequent route handler can access it.

 *  If the token verification fails (e.g., due to an expired or invalid token), it responds with a 401 status and an error message indicating that access is denied.

*/
const fetchuser = (req,res, next)=>{
 const token = req.header('auth-token');
 if(!token){
    res.status(401).send({error: "You need to authenticate yourself first"})
 }
 try {
    const data = jwt.verify(token, secret)
    req.user = data.user;
    next();
 } catch (error) {
    res.status(401).send({error: "Access not granted"})

 }
}

export default fetchuser;