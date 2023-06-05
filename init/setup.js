import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultsDir = path.join(__dirname, '..', 'defaults');

const throwCallback = () => {};
// Todo, asyncify
function checkConfig(dirname, filename) {
    const dirExists = fs.existsSync(dirname, throwCallback);
    if (!dirExists) {
        fs.mkdirSync(dirname, throwCallback);
    }

    const fileExists = fs.existsSync(filename, throwCallback);
    if (!fileExists) {
        const defaultConfig = JSON.parse(fs.readFileSync(path.join(defaultsDir, 'bot.json')));
        fs.appendFile(filename, JSON.stringify(defaultConfig, null, 4), throwCallback);
    }

    const dotEnvExists = fs.existsSync(path.resolve('.env'), throwCallback);
    if (!dotEnvExists) {
        // Todo, add a logger
        console.error("dotenv file not found, generating. Please add your discord bot token to the .env file created.");
        const content = fs.readFileSync(path.join(defaultsDir, 'dotenv'), throwCallback);
        fs.appendFile(path.resolve('.env'), content, throwCallback);
    }
}
// Todo, asyncify
function checkCommands(commanddir, admindir, templatedir) {
    const dirExists = fs.existsSync(commanddir, throwCallback);
    if (!dirExists) {
        fs.mkdirSync(commanddir, throwCallback);
        fs.mkdirSync(admindir, throwCallback);
        fs.mkdirSync(templatedir, throwCallback);
        return;
    }

    const adminExists = fs.existsSync(admindir, throwCallback);
    if (!adminExists) {
        fs.mkdirSync(admindir, throwCallback);
    }

    const templateExists = fs.existsSync(templatedir, throwCallback);
    if (!templateExists) {
        fs.mkdirSync(templatedir, throwCallback);
    }
}

function checkEvents(eventdir) {
    const dirExists = fs.existsSync(eventdir, throwCallback);
    if (!dirExists) {
        fs.mkdirSync(eventdir, throwCallback);
    }
}

export default function setup(options) {
    path.basename(process.cwd());

    const { config, commands, events } = options;
    config.file = path.join(config.dir, config.file);
    checkConfig(config.dir, config.file);

    commands.admin = path.join(commands.dir, commands.admin);
    commands.template = path.join(commands.dir, commands.template);
    checkCommands(commands.dir, commands.admin, commands.template);

    checkEvents(events.dir)
}