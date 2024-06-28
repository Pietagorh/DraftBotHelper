import {User} from "discord.js";
import {ReminderTypes, UnlimitedReminders} from "./ReminderTypes.js";
import {reminders} from "./index.js";

export class Reminders {
	public uniqueReminders: {[userId: string]: {[reminder: string]: NodeJS.Timeout}};
	public unlimitedReminders: {[userId: string]: {[reminderType: string]: {"going": number, "reminders": NodeJS.Timeout[]}}};

	constructor() {
		this.uniqueReminders = {};
		this.unlimitedReminders = {};
	}

	public setReminder(user: User, reminderType: ReminderTypes, delay: number): void {
		console.log(`${user.username} set reminder ${reminderType} for ${delay / 60000} minutes`);
		if (UnlimitedReminders.includes(reminderType)) {
			return this.setUnlimitedReminder(user, reminderType, delay);
		}
		this.setUniqueReminder(user, reminderType, delay);
	}

	private setUniqueReminder(user: User, reminderType: ReminderTypes, delay: number): void {
		if (!this.uniqueReminders[user.id]) {
			this.uniqueReminders[user.id] = {};
		}

		this.clearUniqueReminder(user, reminderType);
		this.uniqueReminders[user.id][reminderType] = setTimeout(async () => {
			await user.send(`Reminder ${reminderType}`);
			reminders.removeUnusedUnique(user, reminderType);
		}, delay);
	}

	private setUnlimitedReminder(user: User, reminderType: ReminderTypes, delay: number): void {
		if (!this.unlimitedReminders[user.id][reminderType]) {
			this.unlimitedReminders[user.id][reminderType] = {"going": 0, "reminders": []};
		}

		this.unlimitedReminders[user.id][reminderType].going++;
		this.unlimitedReminders[user.id][reminderType].reminders.push(
			setTimeout(async () => {
				await user.send(`Reminder ${reminderType}`);
				this.unlimitedReminders[user.id][reminderType].going--;
				reminders.removeUnusedUnlimited(user, reminderType);
			}, delay)
		);
	}

	private removeUnusedUnique(user: User, reminderType: ReminderTypes): void {
		if (Object.keys(this.uniqueReminders[user.id]).length === 1) {
			delete this.uniqueReminders[user.id];
			return;
		}
		delete this.uniqueReminders[user.id][reminderType];
	}

	private removeUnusedUnlimited(user: User, reminderType: ReminderTypes): void {
		if (this.unlimitedReminders[user.id][reminderType].going === 0) {
			if (Object.keys(this.unlimitedReminders[user.id]).length === 1) {
				delete this.unlimitedReminders[user.id];
				return;
			}
			delete this.unlimitedReminders[user.id][reminderType];
		}
	}

	public clearUniqueReminder(user: User, reminderType: ReminderTypes): void {
		if (this.uniqueReminders[user.id][reminderType]) {
			clearTimeout(this.uniqueReminders[user.id][reminderType]);
		}
		this.removeUnusedUnique(user, reminderType);
	}
}