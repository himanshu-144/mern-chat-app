const express = require('express');
const colors = require('colors');
const bodyParser = require('body-parser')
const cors = require('cors');
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRouter');
const messageRoutes = require("./routes/messageRouter");
const userRoutes = require("./routes/userRouter");
const morgan = require('morgan')
const path = require("path");
const dotenv = require('dotenv');
const { server, app } = require('./socket/socket');
dotenv.config();
connectDB();
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/message', messageRoutes);
app.use('/api/v1/users', userRoutes);

// --------------------deployment------------------------

const __dirname1 = path.resolve();

app.use(express.static(path.join(__dirname1, "/client/build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname1, "client", "build", "index.html"));
});


server.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`.yellow.bold);
})