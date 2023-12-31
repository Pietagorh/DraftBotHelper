import {User} from "discord.js";
import {ReminderTypes, UnlimitedReminders} from "./ReminderTypes.js";
import {reminders} from "./index.js";

type UnlimitedReminder = {"going": number, "reminders": NodeJS.Timeout[]}

export class Reminders {
	public reminders: {[userId: string]: {[reminder: string]: NodeJS.Timeout | UnlimitedReminder}};

	constructor() {
		this.reminders = {};
	}

	setReminder(user: User, reminderType: ReminderTypes, delay: number): void {
		if (!this.reminders[user.id]) {
			this.reminders[user.id] = {};
		}

		console.log(`${user.username} set reminder ${reminderType} for ${delay / 60000} minutes`);
		if (UnlimitedReminders.includes(reminderType)) {
			return this.setUnlimitedReminder(user, reminderType, delay);
		}
		this.setUniqueReminder(user, reminderType, delay);
	}

	setUniqueReminder(user: User, reminderType: ReminderTypes, delay: number): void {
		this.clearReminder(user, reminderType);
		this.reminders[user.id][reminderType] = setTimeout(async () => {
			await user.send(`Reminder ${reminderType}`);
			reminders.removeUnused(user, reminderType);
		}, delay);
	}

	setUnlimitedReminder(user: User, reminderType: ReminderTypes, delay: number): void {
		if (!this.reminders[user.id][reminderType]) {
			this.reminders[user.id][reminderType] = {"going": 0, "reminders": []};
		}

		(<UnlimitedReminder> this.reminders[user.id][reminderType]).going++;
		(<UnlimitedReminder> this.reminders[user.id][reminderType]).reminders.push(
			setTimeout(async () => {
				await user.send(`Reminder ${reminderType}`);
				(<UnlimitedReminder> this.reminders[user.id][reminderType]).going--;
				reminders.removeUnusedUnlimited(user, reminderType);
			}, delay)
		);
	}

	removeUnused(user: User, reminderType: ReminderTypes): void {
		if (Object.keys(this.reminders[user.id]).length === 1) {
			delete this.reminders[user.id];
			return;
		}
		delete this.reminders[user.id][reminderType];

	}

	removeUnusedUnlimited(user: User, reminderType: ReminderTypes): void {
		if ((<UnlimitedReminder> this.reminders[user.id][reminderType]).going === 0) {
			this.removeUnused(user, reminderType);
		}
	}

	clearReminder(user: User, reminderType: ReminderTypes): void {
		if (UnlimitedReminders.includes(reminderType)) {
			throw new Error(`Tried to clear unlimited reminder ${reminderType} for ${user.username}`);
		}
		if (this.reminders[user.id][reminderType]) {
			clearTimeout(<NodeJS.Timeout> this.reminders[user.id][reminderType]);
		}
	}
}