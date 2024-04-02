import User from "../models/User.js"

export const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = 20; 
        const startIndex = (page - 1) * limit; 

        const filter = {};
        if (req.query.domain) filter.domain = req.query.domain;
        if (req.query.gender) filter.gender = req.query.gender;
        if (req.query.available) filter.available = req.query.available;
        if (req.query.name) {
            filter.first_name = { $regex: `.*${req.query.name}.*`, $options: 'i' };
          }

        const users = await User.find(filter).skip(startIndex).limit(limit); 
        return res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }
}

export const createUser = async(req,res)=>{
    try{
       const newUser = new User({id:req.body.id,first_name:req.body.first_name,last_name:req.body.last_name,domain:req.body.domain,avatar:req.body.avatar,email:req.body.email,gender:req.body.gender})
       await newUser.save()
       return res.status(200).json("user created successfully")
    }
    catch(err){
        console.log(err)
        return res.status(500).json("Internal Server Error")
    }
}

export const getSingleUser = async(req,res)=>{
    try{

        const user = await User.findById(req.params.userId)

        if(!user){
            return res.status(404).json("user does not exist")
        }

        return res.status(200).json({user})

    }
    catch(err){
        console.log(err)
        return res.status(500).json("Internal Server Error")
    }
}

export const updateSingleUser = async(req,res)=>{
    try{

        const user = await User.findById(req.params.userId)

        if(!user){
            return res.status(404).json("user does not exist")
        }

        await User.findByIdAndUpdate(req.params.userId,req.body,{new:true,runValidators:true})

        return res.status(200).json("user updated successfully")

    }
    catch(err){
        console.log(err)
        return res.status(500).json("Internal Server Error")
    }
}