import {Listener} from "../Listener.js";
import {Events, Message} from "discord.js";
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

	listeningToEvents: [Events.MessageCreate],

	execute(message: Message): void {
		const user = message.author;
		reminders.clearReminder(user, ReminderTypes.REPORT);
	}
};