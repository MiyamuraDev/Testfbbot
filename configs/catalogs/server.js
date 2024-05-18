const fs = require('fs-extra');
const { spawn } = require("child_process");
const http = require("http");
const semver = require("semver");
const express = require("express");
const app = express();
const logger = require("./system-settings/console/console-logger.js");
const path = require('path');
const net = require('net');
const chalk = require('chalk');
const pkg = require('../../package.json');
const axios = require('axios');
// Getting random port
const getRandomPort = () => Math.floor(Math.random() * (65535 - 1024) + 1024);
const PORT = getRandomPort();
let currentPort = PORT;
const CSB = `https://ce30664a-7ff1-46d5-ba37-077ec0026475-00-2cuojcg5umiln.sisko.replit.dev/`.toLowerCase();
var uptimelink = [`${CSB}`]
const Monitor = require('ping-monitor');
for (const now of uptimelink) {
  const monitor = new Monitor({
    website: `${now}`,
    title: '█▀ █▀▀ █▀█ █░█ █▀▀ █▀█\n▄█ ██▄ █▀▄ ▀▄▀ ██▄ █▀▄',
    interval: 1,
  config: {
    intervalUnits: 'minutes'
  }
});
monitor.on('up', (res) => console.log(chalk.bold.hex("#00FF00")("[ UP ] ❯ ") + chalk.hex("#00FF00")(`${res.website}`)))
monitor.on('down', (res) => console.log(chalk.bold.hex("#FF0000")("[ DOWN ] ❯ ") + chalk.hex("#FF0000")(`${res.website} ${res.statusMessage}`)))
monitor.on('stop', (website) => console.log(chalk.bold.hex("#FF0000")("[ STOP ] ❯ ") + chalk.hex("#FF0000")(`${website}`)))
monitor.on('error', (error) => console.log(chalk.bold.hex("#FF0000")("[ ERROR ] ❯ ") + chalk.hex("#FF0000")(`${error}`)))
}

// SETTING UP THE SERVER

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/html/website.html'));
});

app.get('/', (req, res) => res.sendStatus(200));

setInterval(uptime, 1000);

function uptime() {
  axios.get(CSB).then(() => {}).catch(() => {});
}

  console.clear();

  logger("Opened server site...", "[ Starting ]");
  app.listen(PORT, () =>
	logger(`Your app is listening a http://localhost:${PORT}`, "[ ONLINE ]")
);

console.log(chalk.bold.dim(`${CSB}`.toUpperCase() + `(v${pkg.version})`));
  logger(`Getting Started!`, "STARTER");
  startBot(0);

  async function isPortAvailable(port) {
    return new Promise((resolve) => {
      const tester = net.createServer()
        .once('error', () => resolve(false))
        .once('listening', () => {
          tester.once('close', () => resolve(true)).close();
        })
        .listen(port, '127.0.0.1');
    });
  }

  function startServer(port) {
    app.listen(port, () => {
      logger.loader(`Bot is running on port: ${port}`);
      logger.loader(`Activating uptime for ${chalk.underline(`'${CSB}'`)}`, 'SYSTEM');
    });

    app.on('error', (error) => {
      logger(`An error occurred while starting the server: ${error}`, "SYSTEM");
    });
  }

  async function startBot(index) {
    try {
      const isAvailable = await isPortAvailable(currentPort);
      if (!isAvailable) {
        logger(`Retrying...`, "SYSTEM");
        const newPort = getRandomPort();
        logger.loader(`Current port ${currentPort} is not available. Switching to new port ${newPort}.`);
        currentPort = newPort;
      }
      
      startServer(currentPort);

      const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "system.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true,
        env: {
          ...process.env,
          CHILD_INDEX: index,
        },
      });

      child.on("close", (codeExit) => {
        if (codeExit !== 0) {
          startBot(index);
        }
      });

      child.on("error", (error) => {
        logger(`An error occurred while starting the child process: ${error}`, "SYSTEM");
      });
    } catch (err) {
      logger(`Error while starting the bot: ${err}`, "SYSTEM");
    }
  }

function getFormattedDate() {
  const date = new Date();
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}

function logUptime() {
  const uptime = process.uptime();
  const formattedDate = getFormattedDate();
  const data = `${formattedDate} - Uptime: ${uptime.toFixed(2)} seconds\n`;

  fs.appendFile('uptime.json', data, (err) => {
    if (err) throw err;
    console.log('Uptime logged.');

    const uptimeLimit = 24 * 60 * 60; // 24 hours in seconds
    if (uptime >= uptimeLimit) {
      console.log('24 hours uptime reached. Stopping logging.');
      clearInterval(intervalId); 
    }
  });
}

const intervalId = setInterval(logUptime, 300000);
//  █░ █▀█ █░█ █▀▀
//  █▄ █▄█ ▀▄▀ ██▄
//            █░█
//            █▄█