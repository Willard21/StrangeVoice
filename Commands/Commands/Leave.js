const Command = require("../BaseCommand")

class Say extends Command {
	constructor() {
		super({})
	}

	async Execute(message, args) {
		let channelName = args.join(" ")
		const voiceChannels = Array.from(message.guild.channels.cache.values()).filter(c => c.name === "General")
		let voiceChannel = voiceChannels.length ? voiceChannels[0] : null
		if (!voiceChannel || voiceChannel.type !== 'voice') {
			return message.reply(`I couldn't find the voice channel ${channelName}. Can you spell?`);
		}
		voiceChannel.leave()
	}
}

module.exports = Say