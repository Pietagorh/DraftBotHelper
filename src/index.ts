import {DBHelper} from "./DBHelper.js";
import {Reminders} from "./Reminders.js";
import {readdir} from "fs";
import {config} from "./config.js";
import {Message, GatewayIntentBits as Intents, Events} from "discord.js";
import {Listener} from "./Listener.js";
import {Check} from "./Checks.js";

export const client = new DBHelper({intents: [Intents.Guilds, Intents.GuildMessages, Intents.MessageContent]});
export const reminders = new Reminders();

client.once(Events.ClientReady, () => {
    console.log("Started");
});

const listeners: Listener[] = [];
readdir("./dist/listeners", (err, files) => {
	files.forEach(file => {
		if (file.endsWith(".map")) {
			return;
		}
		import(`./listeners/${file}`).then(module => {
			listeners.push(module.listener);
		});
	});
})

client.on(Events.MessageCreate, (message: Message) => {
	for (const listener of listeners) {
		if (listener.checks.every((check: Check) => check(message))) {
			listener.execute(message);
		}
	}
});

process.on("uncaughtException", (error) => {
	console.log(error.stack);
	// process.exit();
});

client.login(config.token).then();