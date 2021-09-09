const User = require('../../models/user')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')


module.exports = (function () {
    this.validate = (data) => {
        if(!data.first_name || !data.last_name || !data.email || !data.phoneNumber || !data.password) {
            return TE("Invalid Parameter: first_name,last_name,email,phoneNumebr is required");
        }
        if(!validatePhone(data.phoneNumber)){
            return TE("Invalid Parameter: phoneNumber is invalid");
        }
    }
    this.login = async({body}) => {
                // get the values
        const {email,password} = body

        // if if email is avaible
        const check = await User.findOne({email:email})
        // check if credient are correct
        if (!check || !bcrypt.compareSync(password, check.hash)) {
            throw TE("Invalid email or password")
        }    

        const token = jwt.sign({ _id: check._id }, process.env.LOGIN_SECRETE, {
            expiresIn: "3649635 days"
          });
        
        // get the user instance from the database
        const admin = await User.findById(check._id)
        return {data:{admin,token,"message":"Login successfull"}}
    }
    this.create = async({body}) => {
        const {first_name,last_name,email,phoneNumber,password} = body;
        validate({first_name,last_name,email,phoneNumber,password});
        // check if email Exists
        if(await alreadyExist(User,{email:email,status:1})){
            return TE("Email Already Exists");
        }

        const data = {first_name,last_name,email,phoneNumber,hash : bcrypt.hashSync(password, 10)}
        // make a new instance of user
        const instance = await makeInstance(User,data,null);
        return {
            data: {
                message:"New User Added",
                userInstance:instance
            }
        }
    }

    this.update = async ({body,decoded}) => {
        const user_id = decoded._id;
        const data = {};
        Object.keys(body).map(item => {
            if(body[item] != "" && body[item] != undefined){
                if(item == "password"){
                    data['hash'] = bcrypt.hashSync(body[item], 10);
                }
                data[item] = body[item];
            }
        })
        const updateUser = await makeInstance(User,data,user_id);
        const user = await getUserInstance(user_id);
        return {
            data:{
                user,
                message:"Profile Updated"
            }
        }
    } 

    this.getUserInstance = async (user_id) => {
        return await User.findById(user_id)
    }

    this.fetch = async ({body}) => {
        const {name, sort,skip,limit} = body;
        const searchParams = {}
        if(name != undefined || name != undefined){
            searchParams['name'] = {$or: [{ first_name: { $regex: name, $options: 'i' } },{ last_name: { $regex: name, $options: 'i' } }]}
        }
        // searchParams['status'] = 1;
        console.log(searchParams)
        const all_data = await User.find(searchParams).sort({updatedAt:sort}).skip(skip).limit(limit)
        return {
            data:{
                all_data,
                total_count:all_data.length,
                total:await alreadyExist(User,{}),
                params:{
                    name,sort,skip,limit
                },
                message:"User All",

            }
        }
    }
    this.deleteUser = async ({params}) => {
        const {id} = params
        if(!await alreadyExist(User,{_id:id})){
            return TE("Cannot Find User");
        }
        const updatedUser = await User.findOne({_id:id},{status:1},{upsert:true})
        return {
            data:{
                message:"User Deleted",
            }
        }
    }
    return this;
  })();