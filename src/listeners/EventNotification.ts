import {Listener} from "../Listener.js";
import {Events, Message} from "discord.js";
import {embedDescriptionIncludes, embedHasAuthor, hasContent, isDraftBotId, isInteractionReply, not} from "../Checks.js";
import {reminders} from "../index.js";
import {ReminderTypes} from "../ReminderTypes.js";
import {userFromEmbedAuthor} from "../ParsingUtils.js";

export const listener: Listener = {
	checks: [
		isDraftBotId,
		not(isInteractionReply),
		embedDescriptionIncludes(":flag_fr: Vous êtes arrivé à **"),
		embedHasAuthor,
		hasContent
	],

	listeningToEvents: [Events.MessageCreate],

	async execute(message: Message): Promise<void> {
		reminders.clearReminder(await userFromEmbedAuthor(message.embeds[0].author), ReminderTypes.REPORT);
	}
};