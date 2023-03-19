const bcryptjs = require("bcryptjs") ;

const users = [
    {
        name:'Admin user',
        email: 'admin@gmail.com',
        password:bcryptjs.hashSync('123456',10),
        isAdmin: true
    },
    {
        name:'Hamza El Mkhantar',
        email: 'hamza@gmail.com',
        password:bcryptjs.hashSync('123456',10),
        isAdmin: true
    },
    {
        name:'Ahmed Ahmed',
        email: 'ahmed@gmail.com',
        password:bcryptjs.hashSync('123456',10),
        isAdmin: true
    }
]

module.exports = users