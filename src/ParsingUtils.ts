import {TimeStringInfos} from "./resources/TimeStringInfos.js";
import {EmbedAuthorData, Message, User} from "discord.js";
import {client} from "./index.js";

export function millisecondsFromString(text: string): number {
	let time = 0;

	for (const timeInfo of TimeStringInfos.SHORT_TIME_INFO) {
		const split = text.trim().split(timeInfo.symbol);
		if (split.length !== 1) {
			time += parseInt(split[0].trim()) * timeInfo.inMilliseconds;
		}
	}

	return time;
}

export async function userFromEmbedAuthor(author: EmbedAuthorData): Promise<User> {
	return await client.users.fetch(author.iconURL.slice("https://cdn.discordapp.com/avatars/".length).split("/")[0]);
}

export async function messageRepliedTo(message: Message): Promise<Message> {
	return await message.channel.messages.fetch(message.reference.messageId)
}