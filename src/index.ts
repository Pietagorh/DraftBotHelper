import {DBHelper} from "./DBHelper.js";
import {Reminders} from "./Reminders.js";
import {readdir, readFileSync} from "fs";
import {Events, GatewayIntentBits as Intents, Message} from "discord.js";
import {Listener} from "./Listener.js";
import {Check} from "./Checks.js";

export const client = new DBHelper({intents: [Intents.Guilds, Intents.GuildMessages, Intents.MessageContent]});
export const reminders = new Reminders();
// Dégueulasse mais ça marchait pas sinon, aucune idée de pourquoi
export const config = JSON.parse(readFileSync("./config.json", "utf-8")) as unknown as {token: string, draftbotId: string};

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
});

async function executeListeners(message: Message, fromEvent: Events): Promise<void> {
	for (const listener of listeners) {
		if (listener.listeningToEvents.includes(fromEvent) && listener.checks.every((check: Check) => check(message))) {
			await listener.execute(message, fromEvent);
			return;
		}
	}
}

client.on(Events.MessageCreate, async (message: Message) => {
	await executeListeners(message, Events.MessageCreate);
});
client.on(Events.MessageUpdate, async (message: Message) => {
	await executeListeners(message, Events.MessageUpdate);
});

process.on("uncaughtException", (error) => {
	console.log(error.stack);
	// process.exit();
});

client.login(config.token).then();