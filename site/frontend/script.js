import { spawn } from "node:child_process";


const environment = process.argv[2] || "development";
const machine = process.argv[3] || "local";

const vite = spawn(
  "npm",
  [ "exec", "vite", "--", "--mode", environment ],
  {
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env,
      VITE_MACHINE: machine
    }
  }
)

vite.on("error", (error) => {
  console.log("Vite error: ", error.message);
});

vite.on("close", (code) => {
  console.log("Vite closed: ", code);
})
