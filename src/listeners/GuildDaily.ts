import {Listener} from "../Listener.js";
import {Message} from "discord.js";
import {commandNameIs, embedTitleIncludes, isDraftBotId} from "../Checks.js";
import {reminders} from "../index.js";
import {ReminderTypes} from "../ReminderTypes.js";

export const listener: Listener = {
	checks: [
		isDraftBotId,
		commandNameIs("guilddailybonus"),
		embedTitleIncludes("Récompense de la guilde ")
	],

	execute(message: Message): void {
		const user = message.interaction.user;
		reminders.setReminder(user, ReminderTypes.GUILD_DAILY, 22 * 60 * 60 * 1000 /* 22h */);
	}
};