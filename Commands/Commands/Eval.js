const Command = require("../BaseCommand")

class Eval extends Command {
	constructor() {
		super({})
	}

	async Execute(message, args) {
		message.channel.send(eval(args.join(" ")))
	}
}

module.exports = Eval