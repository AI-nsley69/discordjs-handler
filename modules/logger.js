/*
    - Parsable and readable format
    - Logging to both console and file (optionally configurable???)
    - Prettify console output
    - Rotate logs based on size
    - Different log levels (error > warn > verbose)
*/
import path from 'path';
import fs from 'fs';

const LogLevel = {
    ERROR: 0,
    WARN: 1,
    VERBOSE: 2
}

const LogType = {
    ALL: 0,
    FILE: 1,
    CONSOLE: 2,
}

function readConfig(configDir) {
    path.basename(process.cwd());
    const configFile = path.resolve(path.join(configDir, 'logger.json'));
    const config = JSON.parse(fs.readFileSync(configFile));
    return config;
}

function getLevel(lvl) {
    // default value
    let level = LogLevel.ERROR;

    // Evaluate string option
    if (typeof lvl === 'string') {
        const tmp = LogLevel[lvl.toUpperCase()];
        if (tmp) level = tmp;
    }

    const upperBound = 2;
    const lowerBound = 0;
    // Evaluate int option
    if (typeof lvl === 'number') {
        if (lvl > upperBound) level = upperBound;
        else if (lvl < lowerBound) level = lowerBound;

        level = Math.floor(lvl);
    }

    return level;
}

function getLevelFromNum(num) {
    return Object.keys(LogLevel)[num];
}

function getType(logType) {
    // Default value
    let type = LogType.ALL;

    if (typeof logType === 'string') {
        const tmp = LogType[logType.toUpperCase()];
        if (tmp) type = tmp;
    }

    const upperBound = 2;
    const lowerBound = 0;
    // Evaluate int option
    if (typeof logType === 'number') {
        if (logType > upperBound) type = upperBound;
        else if (logType < lowerBound) type = lowerBound;

        type = Math.floor(logType);
    }

    return type;
}

function sendToConsole(content, instance, level) {
    const { type, date } = instance;
    if (type !== LogType.ALL && type !== LogType.CONSOLE) return;
    // Todo: better parsing of this god forsaken ugly date name holy shit i wanna cry
    const parsed = `(${new Date(date).toLocaleString()}) [${getLevelFromNum(level)}]: ${content}`;
    console.log(parsed);
}

function sendToFile(content, instance, level) {
    if (type !== LogType.ALL && type !== LogType.FILE) return;
    // Do something here later
}

class Logger {
    constructor(configDir) {
        this.config = readConfig(configDir);
        this.level = getLevel(this.config.level);
        this.type = getType(this.config.type);
        this.date = Date.now();
    }
    // This is verbose
    log(content) {
        if (LogLevel.VERBOSE > this.level) return;
        this.date = Date.now();
        sendToConsole(content, this, LogLevel.VERBOSE);
    }

    warn(content) {
        if (LogLevel.WARN > this.level) return;
        this.date = Date.now();
        sendToConsole(content, this, LogLevel.WARN);
    }

    err(content) {
        this.date = Date.now();
        sendToConsole(content, this, LogLevel.ERROR);
    }
}

export default Logger;