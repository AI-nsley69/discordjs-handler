import dotenv from 'dotenv';
import setup from '../init/setup.js';
import Options from './options.js';
import Logger from '../modules/logger.js';
import {
    initClient,
    initCommands
} from '../init/init.js';

class Bot {
    constructor(options = undefined) {
        if (!options) options = new Options();
        this.options = options;
        // Grab the secrets from a .env file
        dotenv.config();
        this.secrets = process.env;
    }

    setup() {
        setup(this.options);
    }

    init() {
        // this.client = initClient(this);
        this.logger = new Logger(this.options.config.dir);
        const cmdReturn = initCommands(this);
        this.commands = cmdReturn.cmds;
        this.commandGroups = cmdReturn.groups;
    }
}

export default Bot;