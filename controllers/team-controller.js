import Team from "../models/Team.js";
import User from "../models/User.js";

export const createTeam = async (req, res) => {
    try {
        
        const { name, department, users } = req.body;

        const userIds = users.map(user => user.userId);

        // Check if all users belong to the specified department
        const usersBelongToDepartmentAndAvailable = await User.find({ _id: { $in: userIds }, domain:department, available: true });

        console.log(usersBelongToDepartmentAndAvailable)

        if (usersBelongToDepartmentAndAvailable.length !== userIds.length) {
            return res.status(400).json(`All users should belong to the ${department} department and must be available `);
        }
        
        const newTeam = new Team({
            name,
            department,
            users 
        });

        
        await newTeam.save();

        return res.status(200).json("team created successfully");
    } catch (err) {
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }
}

export const getTeamDetails = async(req,res)=>{
    try{

        const team = await Team.findById(req.params.id).populate({
            path:"users.userId"
           
        })

        if(!team){
            return res.status(404).json("Team doesn't exist")
        }

        return res.status(200).json({team})

    }
    catch(err){
        console.log(err)
        return res.status(500).json("Internal Server Error")
    }
}

export const getTeams=async(req,res)=>{
  try{

    const teams = await Team.find().populate({
      path:"users.userId"
    })

    return res.status(200).json({teams})

  }
  catch(err){
    console.log(err)
    return res.status(500).json("Internal Server Error")

  }
}

export const getUniqueDomains = async (req,res) => {
    try {
      const result = await User.aggregate([
        {
          $match: {
            domain: { $exists: true, $ne: "" } 
          }
        },
        {
          $group: {
            _id: "$domain" 
          }
        },
        {
          $sort: { _id: 1 } 
        },
        {
          $project: {
            _id: 0,
            domain: "$_id" 
          }
        }
      ]);
  
      
      const domains = result.map(item => item.domain);
  
      return res.status(200).json({domains})
    } catch (error) {
      console.error('Failed to fetch unique domains:', error);
       return res.status(500).json("Internal Server Error")
    }
  };