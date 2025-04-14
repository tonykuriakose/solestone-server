import { config } from "dotenv";
import Server from "./server/Server";
config();

const PORT = process.env.PORT || 3001;

const expressServer = new Server();
expressServer.start(PORT);



  
