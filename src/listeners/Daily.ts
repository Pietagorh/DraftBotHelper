import {Listener} from "../Listener.js";
import {Message} from "discord.js";
import {commandNameIs, embedAuthorIncludes, isDraftBotId} from "../Checks.js";
import {reminders} from "../index.js";
import {ReminderTypes} from "../ReminderTypes.js";

export const listener: Listener = {
	checks: [
		isDraftBotId,
		commandNameIs("dailybonus"),
		embedAuthorIncludes(", vous avez reçu votre récompense journalière !")
	],

	async execute(message: Message): Promise<void> {
		const user = message.interaction.user;
		reminders.setReminder(user, ReminderTypes.DAILY, 22 * 60 * 60 * 1000 /*22h*/);
	}
};