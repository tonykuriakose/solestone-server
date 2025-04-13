import express, { Application } from "express";

class Server {
  public app: Application;
  private server: any;

  constructor() {
    this.app = express();
    this.initialize();
  }

  initialize() {
    try {
      console.log("Initializing server");
    } catch (error) {
      console.log("Error in initializing server");
    }
  }

  start(PORT:String | number) {
    this.server = this.app.listen(PORT,()=>{
        console.log(`Server running on ${PORT}`);
        
    })
  }

  stop() {}
}


export default Server;
