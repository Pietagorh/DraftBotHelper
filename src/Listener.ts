import {Events, Message} from "discord.js";
import {Check} from "./Checks.js";

export interface Listener {
	readonly checks: Check[];
	listeningToEvents: Events[];
	execute(message: Message, fromEvent: Events): void | Promise<void>
}