exports.appPort = 3000;

exports.sequelize = {
    name: 'shopy', 
    userName: 'root',
    password:'',
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
};


exports.bycrypt = {
    saltyHash : 6,
};

exports.jwt = {
    secertKey: 'Shopy is an Eccommerce here',
    issuer: 'Shopy',
    expiresIn: '1h'
};


exports.mainAdmin = {
    'first_name': 'admin',
    'last_name': 'admin',
    'email':  'admin@shopy.com',
    'password': '12345678',
    'gender':'male',
    'birth_day': new Date().toString(),
    'verified': true,
    'img_url': null,
};