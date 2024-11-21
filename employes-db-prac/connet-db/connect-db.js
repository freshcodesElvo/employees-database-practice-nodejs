const mongoose = require('mongoose')

const connect_db = (url)=>{
    return mongoose.connect(url,{
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
        // useUnifiedTopology: true,
    })
}

module.exports = connect_db