import React from "react";
import { getEnv } from "./EnvironmentConnection";

import { InfoIcon } from "lucide-react";
import { Button } from "@/aConnection/aShadcnConnection/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/aConnection/aShadcnConnection/components/ui/card";
import { 
  Alert, 
  AlertDescription, 
  AlertTitle 
} from "@/aConnection/aShadcnConnection/components/ui/alert";


const ENV = getEnv.ENV;
const MACHINE = getEnv.MACHINE;
const PORT = getEnv.PORT;
const APP_NAME = getEnv.APP_NAME;

const ReactConnection = () => {
  // render check
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

      <div className="h-full m-2 flex flex-col gap-2" >
        {/* Shadcn Connection */}
        <Alert className="w-full border border-blue-800" >
          <InfoIcon />
          <AlertTitle>Shadcn Connection</AlertTitle>
          <AlertDescription>
            Shadcn connection created successfully...
          </AlertDescription>
        </Alert>

        {/* React Connection */}
        <Card className="max-w-sm border border-amber-800" >
          <CardHeader>
            <CardTitle>React Connection</CardTitle>
            <CardDescription>
              React connection created successfully...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul>
              <li>Environment: {ENV}</li>
              <li>Machine: {MACHINE}</li>
              <li>Port: {PORT}</li>
              <li>App Name: {APP_NAME}</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button disabled >Click Here</Button>
          </CardFooter>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default ReactConnection;
