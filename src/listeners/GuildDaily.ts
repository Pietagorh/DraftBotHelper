import {Listener} from "../Listener.js";
import {Events, Message} from "discord.js";
import {commandNameIs, embedTitleIncludes, isDraftBotId} from "../Checks.js";
import {reminders} from "../index.js";
import {ReminderTypes} from "../ReminderTypes.js";

export const listener: Listener = {
	checks: [
		isDraftBotId,
		commandNameIs("guilddailybonus"),
		embedTitleIncludes("Récompense de la guilde ")
	],

	listeningToEvents: [Events.MessageUpdate],

	execute(message: Message): void {
		reminders.setReminder(message.interaction.user, ReminderTypes.GUILD_DAILY, 22 * 60 * 60 * 1000 /* 22h */);
	}
};