# Setup
To get started with the bot, you can install the module:
```
mkdir my-bot
cd my-bot
yarn install discordjs-handler
```
In this example, we created a folder called `my-bot` where we installed the discordjs-handler.

# Using the handler
Get started by creating an `index.js` file, where you can for example put:
```js
import { Bot, Options } from 'discordjs-handler';
// Create new options for the bot
const options = new Options()
    // .setCommands('./_commands', 'admin', 'template');

// Setup a new bot
const bot = new Bot(options);
// Tell the bot to setup everything, this will ensure you have the right file structure and can also be tuned in the options.
bot.setup();
```
In the example code, we're creating a new Options object that is used to control the Bot object that is containing all of the information about your bot. You can check out the [configuration](CONFIGURATION.md) guide to learn about the Options object.

`bot.setup()` is used to setup the file structure and fill out the configs with default values. You may see a new commands, events and configs folder. Please tune the `configs/bot.json` file that was created, and add your token to the `.env` file that the bot created. On your first startup, the bot won't work right away, as you need to update the values. It is however still recommended to keep the setup on every startup, as it'll help with regenerating the files incase something goes wrong or it gets updated.

# Writing commands
This part is still work in progress, I have not added the support for this (yet).