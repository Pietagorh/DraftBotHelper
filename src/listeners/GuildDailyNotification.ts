import {Listener} from "../Listener.js";
import {Message} from "discord.js";
import {embedHasAuthor, embedTitleIncludes, hasContent, isDraftBotId, isInteractionReply, not} from "../Checks.js";
import {reminders} from "../index.js";
import {ReminderTypes} from "../ReminderTypes.js";

export const listener: Listener = {
	checks: [
		isDraftBotId,
		not(isInteractionReply),
		embedTitleIncludes("Notification de guilde :"),
		embedHasAuthor,
		hasContent
	],

	execute(message: Message): void {
		const user = message.author;
		reminders.setReminder(user, ReminderTypes.GUILD_DAILY, 22 * 60 * 60 * 1000 /* 22h */);
	}
};