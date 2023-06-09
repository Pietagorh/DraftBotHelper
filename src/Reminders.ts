import {User} from "discord.js";
import {ReminderTypes} from "./ReminderTypes.js";
import {reminders} from "./index.js";

export class Reminders {
	public reminders: {[userId: string]: {[reminder: string]: NodeJS.Timeout}};

	constructor() {
		this.reminders = {};
	}

	setReminder(user: User, reminderType: ReminderTypes, delay: number): void {
		if (!this.reminders[user.id]) {
			this.reminders[user.id] = {};
		}

		this.clearReminder(user, reminderType);

		this.reminders[user.id][reminderType] = setTimeout(async () => {
			await user.send(`Reminder ${reminderType}`);
			reminders.removeUnused(user, reminderType);
		}, delay);
		console.log(`${user.username} set reminder ${reminderType} for ${delay / 60000} minutes`);
	}

	removeUnused(user: User, reminderType: ReminderTypes): void {
		if (Object.keys(this.reminders[user.id]).length === 1) {
			delete this.reminders[user.id];
			return;
		}
		delete this.reminders[user.id][reminderType];
	}

	clearReminder(user: User, reminderType: ReminderTypes): void {
		if (this.reminders[user.id][reminderType]) {
			clearTimeout(this.reminders[user.id][reminderType]);
		}
	}
}