const Command = require("../BaseCommand")

class Say extends Command {
	constructor() {
		super({})
	}

	async Execute(message, args) {
		const sayMessage = args.join(" ")
		message.delete().catch(O_o=>{})
		message.channel.send(sayMessage)
	}
}

module.exports = Say