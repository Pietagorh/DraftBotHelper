import {Events, Message} from "discord.js";
import {Check} from "./Checks.js";

export interface Listener {
	readonly checks: Check[];
	execute(message: Message, fromEvent: Events): void
	listeningToEvents: Events[];
}