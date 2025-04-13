import express, { Application } from "express";

class Server {
  public app: Application;
  private server: any;

  constructor() {
    this.app = express()
    this.initialize();
  }

  async initialize() {
    try {
      console.log("Initialise");
    } catch (error) {
      console.log(error, "Error in initialize");
    }
  }

  async start(PORT:string | number){

    this.server = this.app.listen(PORT,()=>{
        console.log(`Server running at ${PORT}`);
        
    })



  }
}


export default Server;
