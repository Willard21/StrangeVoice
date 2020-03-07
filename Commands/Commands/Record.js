const Command = require("../BaseCommand")
const fs = require("fs")

// make a new stream for each time someone starts to talk
function generateOutputFile(channel, member) {
	// use IDs instead of username cause some people have stupid emojis in their name
	const fileName = `./recordings/${channel.id}-${member.id}-${Date.now()}.pcm`;
	return fs.createWriteStream(fileName);
}

class Record extends Command {
	constructor() {
		super({})
	}

	async Execute(message, args) {
		let channelName = args.join(" ")
		if (!message.guild) {
			return message.reply('This command only works in a server.');
		}
		const voiceChannels = Array.from(message.guild.channels.cache.values()).filter(c => c.name === "General")
		let voiceChannel = voiceChannels.length ? voiceChannels[0] : null
		if (!voiceChannel || voiceChannel.type !== 'voice') {
			return message.reply(`I couldn't find the voice channel ${channelName}. Can you spell?`);
		}
		voiceChannel.join().then(conn => {
			message.reply('ready!');
			// create our voice receiver
			const receiver = conn.receiver

			conn.on('speaking', (user, speaking) => {
				if (speaking) {
				message.channel.send(`I'm listening to ${user}`);
				// this creates a 16-bit signed PCM, stereo 48KHz PCM stream.
				const audioStream = receiver.createStream(user);
				// create an output stream so we can dump our data in a file
				const outputStream = generateOutputFile(voiceChannel, user);
				// pipe our audio data into the file stream
				audioStream.pipe(outputStream);
				outputStream.on("data", console.error);
				// when the stream ends (the user stopped talking) tell the user
				audioStream.on('end', () => {
					message.channel.send(`I'm no longer listening to ${user}`);
				});
				}
			});
		}).catch(console.error);
		// if(message.content.startsWith(config.prefix+'leave')) {
		// 	let [command, ...channelName] = message.content.split(" ");
		// 	let voiceChannel = message.guild.channels.find("name", channelName.join(" "));
		// 	voiceChannel.leave();
		// }
	}
}

module.exports = Record