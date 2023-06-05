import { GatewayIntentBits } from "discord.js";

class Options {
    constructor() {
        this.config = {
            dir: './configs',
            file: 'bot.json',
        },
        this.commands = {
            dir: './commands',
            admin: '_admin',
            template: '_template',
        },
        this.events = {
            dir: './events',
        },
        this.intents = [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent,
        ]
    }

    setConfig(dir, file) {
        this.config.dir = dir;
        this.config.file = file;
        return this;
    }

    setCommands(dir, admin, template) {
        this.commands.dir = dir;
        this.commands.admin = admin;
        this.commands.template = template;
        return this;
    }

    setEvents(dir) {
        this.dir = dir;
        return this;
    }

    addIntent(intent) {
        this.intents.push(intent);
        return this;
    }
}

export default Options;