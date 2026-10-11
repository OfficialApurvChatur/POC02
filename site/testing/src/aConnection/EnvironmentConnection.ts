import dotenv from "dotenv";


class EnvironmentConnection {
  private connection = dotenv.config();
  private envPath = "";

  private ENV = "default";
  private MACHINE = "default";
  private PORT = 8000;
  private APP_NAME = "POC02-ExpressShadcnSetup";
  private BACKEND_URL = "http://localhost:8000"
  private FRONTEND_URL = "http://localhost:3000"

  constructor() {
    this.loadEnvironment();
    this.setEnvironment();

    console.log(`Environment connection created successfully...`);
    console.log(`
      Path: ${this.envPath}
      Environment: ${this.ENV}
      Machine: ${this.MACHINE}
      Port: ${this.PORT}
      App Name: ${this.APP_NAME}
    `);
  }

  private loadEnvironment() {
    const environment = this.connection.parsed?.NODE_ENV;
    const machine = this.connection.parsed?.NODE_MACHINE;
  
    this.envPath = machine === "local" ? `./env/.env.${environment}` : `.env`;

    dotenv.config({
      path: this.envPath
    });
  }

  private setEnvironment() {
    this.ENV = String(
      process.env.NODE_ENV || this.ENV
    );

    this.MACHINE = String(
      process.env.NODE_MACHINE || this.MACHINE
    );

    this.PORT = Number(
      process.env.NODE_PORT || this.PORT
    );
    
    this.APP_NAME = String(
      process.env.NODE_APP_NAME || this.APP_NAME
    );
    
    this.BACKEND_URL = String(
      process.env.BACKEND_URL || this.BACKEND_URL
    );
    
    this.FRONTEND_URL = String(
      process.env.FRONTEND_URL || this.FRONTEND_URL
    );
  }

  public getEnvironment() {
    return {
      ENV: this.ENV,
      MACHINE: this.MACHINE,
      PORT: this.PORT,
      APP_NAME: this.APP_NAME,
      BACKEND_URL: this.BACKEND_URL,
      FRONTEND_URL: this.FRONTEND_URL,
    }
  }
}

const environmentConnection = new EnvironmentConnection();
export default environmentConnection;
export const getEnv = environmentConnection.getEnvironment();
