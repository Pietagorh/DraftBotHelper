import {Listener} from "../Listener.js";
import {Events, Message} from "discord.js";
import {embedHasAuthor, embedTitleIncludes, hasContent, isDraftBotId, isInteractionReply, not} from "../Checks.js";
import {reminders} from "../index.js";
import {ReminderTypes} from "../ReminderTypes.js";
import {userFromEmbedAuthor} from "../ParsingUtils.js";

export const listener: Listener = {
	checks: [
		isDraftBotId,
		not(isInteractionReply),
		embedTitleIncludes("Notification de guilde :"),
		embedHasAuthor,
		hasContent
	],

	listeningToEvents: [Events.MessageCreate],

	async execute(message: Message): Promise<void> {
		reminders.setReminder(await userFromEmbedAuthor(message.embeds[0].author), ReminderTypes.GUILD_DAILY, 22 * 60 * 60 * 1000 /* 22h */);
	}
};