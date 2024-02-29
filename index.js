const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require("./config/dbConfig");
const authRoute = require("./routes/auth");
const jobRoute = require('./routes/jobs')
const errorHandler = require('./middlewares/errorHandler')
const cookieParser = require("cookie-parser");
dotenv.config();
dbConnect();
const PORT = process.env.PORT || 3000;
const HOST = process.env.PORT || "localhost";

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/jobs",jobRoute)
app.use(errorHandler)

app.get("/", (req, res) => {
  res.send(`Server is Up and Running at PORT: ${PORT}`);
});

// To get the Cookies
// app.get("/token", (req, res) => {
// //   const data = req.cookies; 
// const data = req.cookies.token;
//   res.status(200).json({
//     message: data,
//   });
// });

app.get('/health',(req,res)=>{
  res.json({"message":"Server is Healthy and Running!"})
})



app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  }
});
