import React from "react";
import { getEnv } from "./EnvironmentConnection";


const ENV = getEnv.ENV;
const MACHINE = getEnv.MACHINE;
const PORT = getEnv.PORT;
const APP_NAME = getEnv.APP_NAME;

const ReactConnection = () => {
  // render checl
  console.log(`React connection created successfully...`);
  console.log(`
    Environment: ${ENV}
    Machine: ${MACHINE}
    Port: ${PORT}
    App Name: ${APP_NAME}
  `);

  // jsx
  return (
    <React.Fragment>
      {/* ReactConnection */}

      <div>
        <h1>React Connection</h1>
        <p>React connection created successfully...</p>
        <ul>
          <li>Environment: {ENV}</li>
          <li>Machine: {MACHINE}</li>
          <li>Port: {PORT}</li>
          <li>App Name: {APP_NAME}</li>
        </ul>
      </div>
    </React.Fragment>
  )
}

export default ReactConnection;
