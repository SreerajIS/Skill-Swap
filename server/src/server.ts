import app from "./app"
import env from "./util/validateEnv"
import mongoose from "mongoose";


const port = env.PORT || 3000;

if (env.MONGO_CONNECTION_STRING) {
  mongoose
    .connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
      console.log("mongoose connected");
      app.listen(port, () => {
        console.log("server running on port: " + port);
      });
    })
    .catch((error) => {
      console.error("Error connecting to Mongodb:", error);
    });
} else {
  console.error("MONGO_CONNECTION_STRING is not defined in your environment")
}
