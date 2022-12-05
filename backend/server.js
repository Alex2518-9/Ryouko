const app = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

// setting up config file
if(process.env.NODE_ENV !== "PRODUCTION"){
  require().dotenv.config({ path: "backend/config/config.env" });
}

// Handle the Uncaught exceptions (must on the top of code)
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.stack}`);
  console.log(`Shutting down the server due to Uncaught exception`);
  server.close(() => {
    process.exit(1);
  });
});

// Connectin to db
connectDatabase();

// Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLUDINARY_CLOUD_NAME,
  api_key: process.env.CLUDINARY_API_KEY,
  api_secret: process.env.CLUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () =>
  console.log(
    `Server started on port: ${process.env.PORT} in ${process.env.NODE_ENV}`
  )
);

// Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
