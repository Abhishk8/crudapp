import express from 'express';
import User from  './schema.js'
const router = express.Router();

router.get('/getuser',async(req,res)=>{
    try{
    const users = await User.find();
    res.json(users);
    }
    catch(err){
        console.log(err);
    }
})

router.post('/adduser',async(req,res)=>{
   try{
   const {username, email} = req.body;
   console.log(username,email);
   if(!username || !email){ res.json('Enter All details')
return;
}
   else {
    const newUser = new User({username,email});
    newUser.save();
    res.send("User saved successfully");
   }
}catch(err){
    console.log(err);

}
})
router.delete('/deleteuser:id',async(req,res)=>{
    const userid = req.params.id;
    if(!userid) res.send("Enter credentials");
    const response = await User.findOneAndDelete(userid);
    res.send("user deleted succesfully");
})
router.put('/updateuser:id',async(req,res)=>{
        const userid = req.params.id;
        
        const {username,email} = req.body;
       
        if(!username && !email)  {res.send("provide credtials"); return;}
        else await User.findByIdAndUpdate(userid,{username,email});
        res.send("successfully updated");
        
       
       
        
})


export default router;