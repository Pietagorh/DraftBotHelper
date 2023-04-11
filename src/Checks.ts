import {Message} from "discord.js";
import {config} from "./config.js";

export type Check = (message: Message) => boolean;

export function isDraftBotId(message: Message): boolean {
	return message.author.id === config.draftbotId;
}

export function hasContent(message: Message): boolean {
	return !!message.content;
}

export function contentStartsWith(text: string): Check {
	return (message: Message) => hasContent(message) && message.content.startsWith(text);
}

export function isInteractionReply(message: Message): boolean {
	return !!message.interaction
}

export function not(func: Check): Check {
	return (message: Message) => !func(message);
}
