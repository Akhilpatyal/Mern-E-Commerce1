import jwt from 'jsonwebtoken';

const adminAuth= async(req,res,next)=>{
    try {
        const{token}=req.headers
        if(!token){
            return res.json({success:false,message:"Node Authorised LogIn Again"});
        }
        const token_decoded=jwt.verify(token,process.env.JWT_SECRET);
        if (token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Node Authorised LogIn Again"});
        } 
        next()
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Node Authorised LogIn Again"});
        
    }
}

export default adminAuth;