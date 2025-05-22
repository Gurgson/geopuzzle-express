import mongoose from "mongoose";
import app from "./app.js";
import gameWebsocket from "./websockets/game.js";
import config from "./config.js";
process.on("uncaughtException", (err) => {
  console.log(err, "\n");
  console.log(err.name, err.message);
  console.log("Shutting down");

  process.exit(1);
});
const PORT = config.port
const encodedPass = encodeURIComponent(config.db.pass);
const DBConnectionString = config.db.url
  .replace('<db_password>', encodedPass)
  .replace('<DB_Name>', config.nodeEnv);;
mongoose
  .connect(DBConnectionString)
  .then(() => {
    console.log('GeoPuzzle Database connected');
  })
  .catch((error) => {
    console.log('Geopuzzle app cannot connect database');
    console.error(error)
  });
const server = app.listen(PORT, () => {
  console.log(`Server GeoPuzzle is running on ${PORT} port in ${config.nodeEnv} mode`);
});
// game websocket upgrade

gameWebsocket(server);