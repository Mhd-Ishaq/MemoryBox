const jwt = require('jsonwebtoken');
const JWT_SECRET =process.env.JWT_SECRET;

const fetchUser = (req,res,next)=>{
  // get the user auth token from header

  const token = req.header('auth-token');
  if(!token){
    return res.status(401).json({error:'please authenticate using a valid token'});
  }

  try {
    const data = jwt.verify(token,JWT_SECRET);
    req.user = data.user;
    next();  
  }catch(error){
    return res.status(401).json({error:'please authenticate using a valid token'});

  }
}

module.exports = fetchUser;
