class EnvironmentConnection {
  private ENV = "default";
  private MACHINE = "default";
  private PORT = 3000;
  private APP_NAME = "POC02-ExpressShadcnSetup";

  constructor() {
    this.setEnvironment();
  }

  private setEnvironment() {
    this.ENV = String(
      import.meta.env.VITE_ENV || this.ENV
    );
    
    this.MACHINE = String(
      import.meta.env.VITE_MACHINE || this.MACHINE
    );
    
    this.PORT = Number(
      import.meta.env.VITE_PORT || this.PORT
    );
    
    this.APP_NAME = String(
      import.meta.env.VITE_APP_NAME || this.APP_NAME
    );
  }

  public getEnvironment() {
    return {
      ENV: this.ENV,
      MACHINE: this.MACHINE,
      PORT: this.PORT,
      APP_NAME: this.APP_NAME,
    }
  }
}

const environmentConnection = new EnvironmentConnection();
export const getEnv = environmentConnection.getEnvironment();
