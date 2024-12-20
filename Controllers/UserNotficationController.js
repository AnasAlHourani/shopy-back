const Notfication = require('../Models/Notfication');
const UserNotfication = require('../Models/UserNotfication');

exports.get = async (req, res, next) => {
    try {
        const userNotifications = await UserNotfication.findAll({ where: { user_id: req.user.id } });
        const notificationsPromises = userNotifications.map(async (userNotfication) => {
            const notification = await Notfication.findAll({ where: { id: userNotfication.notfication_id } });
            return notification;  
        });
        const notifications = await Promise.all(notificationsPromises);
        res.json({ msg: 'Your notifications', notifications });
    } catch (err) {
        next(err, req, res, next);
    }
};
