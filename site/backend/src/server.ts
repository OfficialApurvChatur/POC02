import "./aConnection/EnvironmentConnection.js";
// import nodeConnection from "./aConnection/NodeConnection.js";
import expressConnection from "./aConnection/ExpressConnection.js";


function init() {
  // listen node connection
  // nodeConnection.listenConnection();

  // listen express connection
  expressConnection.listenConnection();
}

init();
