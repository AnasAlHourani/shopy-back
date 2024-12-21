const Notfication = require('../Models/Notfication');
const UserNotfication = require('../Models/UserNotfication');

exports.get = async (req, res, next) => {
    try {
        const userNotifications = await UserNotfication.findAll({ where: { user_id: req.user.id } , order: [['id', 'ASC']],});
        const notificationsPromises = userNotifications.map(async (userNotfication) => {
            const notification = await Notfication.findAll({ where: { id: userNotfication.notfication_id ,  }, });
            return {...notification[0].dataValues , seen: userNotfication.seen};
        });
        const notifications = await Promise.all(notificationsPromises);
        res.json({ msg: 'Your notifications', notifications: notifications });
    } catch (err) {
        next(err, req, res, next);
    }
};

exports.seen = async (req,res,next)=>{
    try{
        const id = req.params.id;
        const userNotfication = await UserNotfication.findAll({where: {notfication_id : id,user_id: req.user.id}});
        if(userNotfication.length){
            userNotfication[0].seen = true;
            userNotfication[0].save();
            res.json({msg:'you has seen a notfication '});
        }else{
            const err = new Error();
            throw err;
        }
    }catch(err){
        next(err, req, res, next);
    }
};