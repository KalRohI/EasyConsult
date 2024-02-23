const mongoose = require('mongoose');

var connectionString = "mongodb+srv://easyconsult:easyconsultdbsecure@easyconsult.ezjzle4.mongodb.net/easyconsult?retryWrites=true&w=majority";
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(() => console.log("Connected to DB"))
.catch(err => console.log(err))

module.exports = mongoose;