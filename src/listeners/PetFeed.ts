import {Listener} from "../Listener.js";
import {Events, Message} from "discord.js";
import {embedDescriptionIncludesAny, isDraftBotId} from "../Checks.js";
import {reminders} from "../index.js";
import {ReminderTypes} from "../ReminderTypes.js";
import {messageRepliedTo} from "../ParsingUtils.js";
import {PetRarities} from "../resources/PetRarities.js";


export const listener: Listener = {
	checks: [
		isDraftBotId,
		embedDescriptionIncludesAny(["** est heureu", "** saute de joie !", "** ne semble pas avoir aimé..."])
	],

	listeningToEvents: [Events.MessageCreate],

	async execute(message: Message): Promise<void> {
		reminders.setReminder((await messageRepliedTo(message)).interaction.user, ReminderTypes.PET_FEED, 10 * 1000 /* 1h */ * PetRarities[message.embeds[0].description.slice(2).split(" ")[0]]);
	}
};