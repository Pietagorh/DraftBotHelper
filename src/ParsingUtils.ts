const timeInfos = [
	{
		symbol: "H",
		inMilliseconds: 360000
	},
	{
		symbol: "Min",
		inMilliseconds: 60000
	},
	{
		symbol: "S",
		inMilliseconds: 1000
	}
]

export function millisecondsFromString(text: string): number {
	let time = 0;

	for (const timeInfo of timeInfos) {
		const split = text.trim().split(timeInfo.symbol);
		if (split.length !== 1) {
			time += parseInt(split[0].trim()) * timeInfo.inMilliseconds;
		}
	}

	return time;
}