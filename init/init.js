import { Client } from 'discord.js';
import fs from 'fs';
import path from 'path';

function initClient(bot) {
    const client = new Client({ intents: bot.intents })
    client.login(bot.secrets.token);
    return client;
}
// Todo, asyncify
function initCommands(bot) {
    path.basename(process.cwd());

    let cmds = new Map();
    const groups = fs.readdirSync(bot.options.commands.dir, { withFileTypes: true })
        .filter(f => f.isDirectory())
        .map(d => d.name);

    groups.forEach(group => {
        // Skip if template
        if (group === bot.options.commands.template) return;

        const newPath = path.join(bot.options.commands.dir, group);
        fs.readdirSync(newPath)
            .filter(f => f.endsWith('.js'))
            .forEach(async f => {
                const cmd = await import(path.join(newPath, f));
                cmd.default.setGroup(group);
                this.commands.set(f.replace('.js', ''), cmd.default);
            });
    });

    return {
        cmds,
        groups
    }
}

export {
    initClient,
    initCommands,
}