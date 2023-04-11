import {TimeStringInfos} from "./resources/TimeStringInfos.js";

export function millisecondsFromString(text: string): number {
	let time = 0;

	for (const timeInfo of TimeStringInfos.SHORT_TIME_INFO) {
		const split = text.trim().split(timeInfo.symbol);
		if (split.length !== 1) {
			time += parseInt(split[0].trim()) * timeInfo.inMilliseconds;
		}
	}

	return time;
}