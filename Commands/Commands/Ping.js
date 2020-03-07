const Command = require("../BaseCommand")

class Ping extends Command {
	constructor() {
		super({
			Alias: [
				"pong"
			]
		})
	}

	async Execute(message, args) {
		const m = await message.channel.send("Ping?");
		m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
	}
}

module.exports = Ping