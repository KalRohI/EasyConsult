const express = require('express');
var cors = require('cors')
// logger
const log = require('./logs/logger');
// routes
const patientRouter = require('./routes/patientRoute');
const doctorRouter = require('./routes/doctorRoute');
const diagnosisRouter = require('./routes/diagnosisRoute');
const prescriptionRouter = require('./routes/prescriptionRoute');
const consultationRouter = require('./routes/consultationRoute');
//db
require('./db/db')
const http = require('http');
const socketIO = require('socket.io');


const PORT_NUM = process.env.PORT || 3030;
const app = express();
const server = http.createServer(app);
const { MongoClient } = require('mongodb');

//const io = socketIO(server);
const io = socketIO(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
    transports: ['websocket', 'polling'],
  });

// Middle ware
//json
app.use(express.json());
app.use(cors())



//log requests coming to server
app.use((req, res, next) => {
    log(`${req.url} Request Method: ${req.method}`)
    next()
})

// tetsing websocket
let changeStream;
var connectionString = "mongodb+srv://easyconsult:easyconsultdbsecure@easyconsult.ezjzle4.mongodb.net/easyconsult?retryWrites=true&w=majority";
MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    const db = client.db('easyconsult'); // Replace with your database name
    const consultationsCollection = db.collection('consultations');

    // Set up change stream on the consultations collection
    changeStream = consultationsCollection.watch();

    // Listen for changes in the consultations collection
    changeStream.on('change', (change) => {
      // Emit the new consultation object to all connected clients
      console.log("change happend")
      io.emit('consultationChanged', change.fullDocument);
    });
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));
// testing websocket done

io.on('connection', (socket) => {
    console.log('Client connected');

    // ... (other code)
    socket.emit('welcome', 'Welcome to the WebSocket server!');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});



app.get('/', (req, res) => {
    console.log("User has hit homepage")
    res.json({"msg": "API working..."})
  });

// Routes
app.use("/patient", patientRouter)
app.use("/doctor", doctorRouter)
app.use("/diagnosis", diagnosisRouter)
app.use("/prescription", prescriptionRouter)
app.use("/consultation", consultationRouter)

server.listen(PORT_NUM, () => {
    console.log("Running express server on port 3030");
    log("Running express server on port 3030");
})