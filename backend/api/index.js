import app from "../index.js";
import { connectDB } from "../src/config/databaseConnection.js";

const port = process.env.PORT;
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`App running on ${port} & Databse Connected`);
  });
}).catch((err)=>{
    console.log(err);
})
