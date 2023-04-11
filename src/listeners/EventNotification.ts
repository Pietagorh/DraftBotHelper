import {Listener} from "../Listener.js";
import {Message} from "discord.js";
import {embedDescriptionIncludes, embedHasAuthor, hasContent, isDraftBotId, isInteractionReply, not} from "../Checks.js";
import {reminders} from "../index.js";
import {ReminderTypes} from "../ReminderTypes.js";

export const listener: Listener = {
	checks: [
		isDraftBotId,
		not(isInteractionReply),
		embedDescriptionIncludes(":flag_fr: Vous êtes arrivé à **"),
		embedHasAuthor,
		hasContent
	],

	async execute(message: Message): Promise<void> {
		const user = message.author;
		reminders.clearReminder(user, ReminderTypes.REPORT);
	}
};