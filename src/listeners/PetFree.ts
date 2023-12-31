import {Listener} from "../Listener.js";
import {Events, Message} from "discord.js";
import {embedAuthorIncludes, isDraftBotId, isInteractionReply, not} from "../Checks.js";
import {reminders} from "../index.js";
import {ReminderTypes} from "../ReminderTypes.js";
import {userFromEmbedAuthor} from "../ParsingUtils.js";

export const listener: Listener = {
	checks: [
		isDraftBotId,
		embedAuthorIncludes(", libération d'un familier"),
		not(isInteractionReply)
	],

	listeningToEvents: [Events.MessageCreate],

	async execute(message: Message): Promise<void> {
		reminders.setReminder(await userFromEmbedAuthor(message.embeds[0].author), ReminderTypes.PET_FREE, 60 * 60 * 1000 /* 1h */);
	}
};