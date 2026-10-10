import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'


export default defineConfig(({ mode }) => {
  const environment = mode;
  const machine = process.env.VITE_MACHINE;

  const envDir = machine ==="local" ? `./env` : `.`;
  const envVar = loadEnv(environment, envDir, "");
  const port = Number(envVar.VITE_PORT);

  console.log(`Environment connection created successfully...`);
  console.log(`
    Path: ${envDir}
    Environment: ${envVar.VITE_ENV}
    Machine: ${envVar.VITE_MACHINE}
    Port: ${envVar.VITE_PORT}
    App Name: ${envVar.VITE_APP_NAME}
  `);

  return {
    plugins: [react()],
    envDir,
    server: {
      port
    }
  }
})
