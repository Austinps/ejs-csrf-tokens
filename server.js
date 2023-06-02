import dotenv from "dotenv";
import connectDB from "./db.js";
import app from "./app.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((error) =>
    console.log("Error connecting to MongoDB: ", error.message)
  );
