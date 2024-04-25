require("dotenv").config();
const express = require("express");
const app = express();
const cors=require("cors");
const cookieParser=require("cookie-parser");
const PORT = 8000;
// process.env.PORT || 

app.use(
  cors()
  );
  require("./connection/db");
  app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/api/v1/admin", require("./routes/AdminRouter"));
app.use("/api", require("./routes/categoryRouter"));
app.use("/api", require("./routes/subcategoryRouter"));
app.use("/api", require("./routes/productRouter"));
app.use("/api", require("./routes/serviceRouter"));
app.use("/api", require("./routes/teamRouter"));
app.use("/api", require("./routes/blog"));
app.use("/api", require("./routes/career"));
app.use(express.static("uploads"));
app.get('/',(req,res)=>{
  res.send('hey manish')
})
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Internal Server Error" } = err;
  res.status(statusCode).send(message);
});

app.listen(PORT, () =>
  console.log(`app listening on http://127.0.0.1:${PORT}/api/v1/admin`)
);



