
const bcrypt = require('bcrypt');
const saltyHash = require('../config/main').bycrypt.saltyHash;
const User = require('../Models/User');
const Admin = require('../Models/Admin');
const mainAdmin = require('../config/main').mainAdmin;

const initApp =  new Promise( async (ressolve,reject)=>{
    try{
        const checkUser = await User.findAll({email: mainAdmin.email , first_name: mainAdmin.first_name});
        if(checkUser.length){
            ressolve('The Admin account is already exsist');
        }else{
            const hashedPassword = await bcrypt.hash(mainAdmin.password,saltyHash);
            const user = await User.create({
                'first_name': mainAdmin.first_name,
                'last_name': mainAdmin.last_name,
                'email':  mainAdmin.email,
                'password': hashedPassword,
                'gender': mainAdmin.gender,
                'birth_day': mainAdmin.gender,
                verified: mainAdmin.verified,
                img_url: mainAdmin.img_url,
            });
            const admin = await Admin.create({
                admin_id : user.id,
                user_id : user.id,
            });
            ressolve('Admin account has been created');
        }
    }catch(err){
        reject(err);
    }
});

module.exports = initApp;