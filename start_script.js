/*

Instructions:

on root folder

1. run npm i
2. run node start_script.js

Notes:

All actions are committed instantaneously,
there are no transactions or rollbacks implemented yet.

However, all the actions are safe to be interrupted mid-way...

*/

import { select, input } from "@inquirer/prompts";
import { spawn } from "child_process";
import fs from "fs/promises";
import os from "os";

//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////// Main Script
//////////////////////////////////////////////////////////////////////////////////////////

async function runScript() {
  await dockerConfiguration();
  if ((await pythonVirtualEnvConfiguration()) === false) return;
  await pythonDjangoConfiguration();
  await frontendConfiguration();
}

runScript();

//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////// Docker Compose Configuration
//////////////////////////////////////////////////////////////////////////////////////////

async function dockerConfiguration() {
  const answer_docker = await select({
    message: "Do you want to run docker-compose?",
    choices: [
      {
        name: "yes, just run it",
        value: 1,
        description: "run docker-compose up",
      },
      {
        name: "yes, make sure to start with a clean database",
        value: 2,
        description: `docker-compose down --volumes;\nand then run docker-compose up`,
      },
      {
        name: "no",
        value: 3,
        description: "do not start any container",
      },
    ],
  });

  if (answer_docker === 1) {
    runCommandsDetached(["echo 'Starting Docker...'", "docker-compose up --build", "echo 'Docker started'"]);
  } else if (answer_docker === 2) {
    runCommandsDetached([
      "echo 'Shutting down Docker...'",
      "docker-compose down --volumes",
      "echo 'Starting Docker...'",
      "docker-compose up --build",
      "echo 'Docker started'",
    ]);
  } else {
    return false;
  }
  return true;
}

//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////// Python virtual environment Configuration
//////////////////////////////////////////////////////////////////////////////////////////

async function pythonVirtualEnvConfiguration() {
  const answer_python_venv = await select({
    message: "Do you have python virtual environment already configured and up-to-date?",
    choices: [
      {
        name: "yes",
        value: true,
        description: "",
      },
      {
        name: "no",
        value: false,
        description: "",
      },
    ],
  });

  if (!answer_python_venv) {
    console.log("-----------------------------------------------------------------------------------");
    console.log("Please configure Python venv before running this script");
    console.log("You must run this script from a terminal where Python virtual environment is active");
    console.log("-----------------------------------------------------------------------------------");
    console.log("Instructions:");
    console.log("1. Create the Python virtual environment");
    console.log("2. Install all the libraries in `requirements.txt`");
    console.log("3. Start a terminal with the Python virtual environment activated");
    console.log("-----------------------------------------------------------------------------------");
    return false;
  }
  return true;
}

//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////// Python(Django) Configuration
//////////////////////////////////////////////////////////////////////////////////////////

async function pythonDjangoConfiguration() {
  const answer_django_env = await select({
    message: "Have you already configured the `.env` file inside `./backend/`?",
    choices: [
      {
        name: "yes",
        value: true,
        description: "",
      },
      {
        name: "no",
        value: false,
        description: "",
      },
    ],
  });

  if (!answer_django_env) {
    try {
      await backendEnvConfig();
    } catch (err) {
      console.log("-----------------------------------------------------------------------------------");
      console.log(err);
      console.log("-----------------------------------------------------------------------------------");
      throw err;
    }
  }

  const answer_python_server_migrate = await select({
    message: "Do you want to run `python manage.py migrate` before starting the backend server?",
    choices: [
      {
        name: "yes",
        value: true,
        description: "Script will run migrate and then start the server",
      },
      {
        name: "no",
        value: false,
        description: "Script will just start the server",
      },
    ],
  });

  const DjangoCommands = ["echo 'Starting Django...'", "cd backend/"];

  if (answer_python_server_migrate) {
    DjangoCommands.push(`python manage.py makemigrations`);
    DjangoCommands.push(`python manage.py migrate`);
  }

  const answer_python_runserver_ip = await select({
    message: "Where do you want to run django",
    choices: [
      {
        name: "localhost",
        value: 1,
        description: "python manage.py runserver",
      },
      {
        name: "my local IPv4",
        value: 2,
        description: "python manage.py runserver 192.168.xxx.xxx",
      },
    ],
  });

  if (answer_python_runserver_ip === 1) {
    DjangoCommands.push(`python manage.py runserver`);
  } else if (answer_python_runserver_ip === 2) {
    const localIP = getLocalIP();
    if (localIP) {
      console.log("-----------------------------------------------------------------------------------");
      console.log(`Using localIP: ${localIP}`);
      console.log("-----------------------------------------------------------------------------------");
      DjangoCommands.push(`python manage.py runserver ${localIP}:8000`);
    } else {
      console.log("-----------------------------------------------------------------------------------");
      console.log("Failed to retrieve local IPv4, falling back to `python manage.py runserver`");
      console.log("-----------------------------------------------------------------------------------");
      DjangoCommands.push(`python manage.py runserver`);
    }
  }

  runCommandsDetached(DjangoCommands);
  return true;
}

//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////// Backend Env
//////////////////////////////////////////////////////////////////////////////////////////

async function backendEnvConfig() {
  const answer_python_env_start = await select({
    message: "Would you like to configure the `.env` file inside `./backend/` now?",
    choices: [
      {
        name: "yes",
        value: true,
        description: "",
      },
      {
        name: "no",
        value: false,
        description: "",
      },
    ],
  });

  if (!answer_python_env_start) {
    console.log("-----------------------------------------------------------------------------------");
    console.log("Skipping .env configuration...");
    console.warn("You need to configure the .env file. The server may not work properly without it.");
    console.log("-----------------------------------------------------------------------------------");
    return false;
  }

  const GEMINI_API_KEY = await input({ message: "Enter your GEMINI_API_KEY value:" });

  await fs.writeFile("./backend/.env", `GEMINI_API_KEY=${GEMINI_API_KEY}`);
  console.log("-----------------------------------------------------------------------------------");
  console.log("GEMINI_API_KEY inserted successfully!");
  console.log("-----------------------------------------------------------------------------------");
  return true;
}

//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////// Frontend Configuration Script
//////////////////////////////////////////////////////////////////////////////////////////

async function frontendConfiguration() {
  const answer_frontend_env = await select({
    message: "Have you already configured the `.env` file inside `./Healthera/` (frontend)?",
    choices: [
      {
        name: "yes",
        value: true,
        description: "",
      },
      {
        name: "no",
        value: false,
        description: "",
      },
    ],
  });

  if (!answer_frontend_env) {
    try {
      await frontendEnvConfig();
    } catch (err) {
      console.log("-----------------------------------------------------------------------------------");
      console.log(err);
      console.log("-----------------------------------------------------------------------------------");
      throw err;
    }
  }

  const ExpoCommands = ["echo 'Starting Expo...'", "cd Healthera/", "npm i", "npx expo start"];

  runCommandsDetached(ExpoCommands);
  return true;
}

//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////// Frontend Env
//////////////////////////////////////////////////////////////////////////////////////////

async function frontendEnvConfig() {
  const answer_frontend_env_start = await select({
    message: "Would you like to configure the `.env` file inside `./Healthera/` now?",
    choices: [
      {
        name: "yes",
        value: true,
        description: "",
      },
      {
        name: "no",
        value: false,
        description: "",
      },
    ],
  });

  if (!answer_frontend_env_start) {
    console.log("-----------------------------------------------------------------------------------");
    console.log("Skipping .env configuration...");
    console.warn("You need to configure the .env file. The server may not work properly without it.");
    console.log("-----------------------------------------------------------------------------------");
    return false;
  }

  const EXPO_PUBLIC_BASE_URL_REST_API = await input({
    message: "Enter your EXPO_PUBLIC_BASE_URL_REST_API value (e.g. `http://111.222.333.444:8000`)",
  });

  await fs.writeFile("./Healthera/.env", `EXPO_PUBLIC_BASE_URL_REST_API=${EXPO_PUBLIC_BASE_URL_REST_API}`);
  console.log("-----------------------------------------------------------------------------------");
  console.log("GEMINI_API_KEY inserted successfully!");
  console.log("-----------------------------------------------------------------------------------");
  return true;
}

//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////// Terminal Spawner
//////////////////////////////////////////////////////////////////////////////////////////

function runCommandsDetached(commands) {
  const platform = os.platform();
  let shell, shellArgs;

  if (platform === "win32") {
    shell = "cmd.exe";
    shellArgs = ["/c", "start", "cmd.exe", "/k"];
  } else if (platform === "darwin") {
    shell = "osascript";
    shellArgs = ["-e", 'tell app "Terminal" to do script "'];
  } else {
    // Assume Linux or other Unix-like OS
    shell = "x-terminal-emulator";
    shellArgs = ["-e", "bash", "-c"];
  }

  const commandString = commands.join(" && ");

  let spawnArgs;
  if (platform === "win32") {
    spawnArgs = [...shellArgs, commandString];
  } else if (platform === "darwin") {
    spawnArgs = [...shellArgs, `${commandString}"`];
  } else {
    spawnArgs = [...shellArgs, `${commandString}; exec bash`];
  }

  const terminal = spawn(shell, spawnArgs, {
    detached: true,
    stdio: "ignore",
  });

  terminal.unref();

  console.log("-----------------------------------------------------------------------------------");
  console.log(`Detached process started with PID ${terminal.pid}`);
  console.log("-----------------------------------------------------------------------------------");
}

//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////// Get LocalIP for Django runserver
//////////////////////////////////////////////////////////////////////////////////////////

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Filter for IPv4 and non-internal addresses (ignoring loopback)
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}
