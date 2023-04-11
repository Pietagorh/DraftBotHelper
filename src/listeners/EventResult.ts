import {Listener} from "../Listener.js";
import {Message} from "discord.js";
import {contentStartsWith, isDraftBotId, isInteractionReply, not} from "../Checks.js";
import {client, reminders} from "../index.js";
import {ReminderTypes} from "../ReminderTypes.js";
import {millisecondsFromString} from "../ParsingUtils.js";
import {EffectsConstants} from "../resources/EffectConstants.js";

export const listener: Listener = {
	checks: [
		isDraftBotId,
		contentStartsWith(":newspaper: ** Journal de <@"),
		not(isInteractionReply)
	],

	async execute(message: Message): Promise<void> {
		const userId = message.content.split("<@")[1].split(">")[0];
		let delay = 9.75 * 60 * 1000; // 9m45s
		if (message.content.includes("** | :clock10: Temps perdu : **")) {
			delay += millisecondsFromString(message.content.split("** | :clock10: Temps perdu : **")[1].split("** |")[0]);
		}
		if (message.content.endsWith(":")) {
				delay += EffectsConstants.DURATION[`:${message.content.split(":").slice(-2, -1)[0]}:` as keyof typeof EffectsConstants.DURATION];
		}
		reminders.setReminder(await client.users.fetch(userId), ReminderTypes.REPORT, delay);
	}
};