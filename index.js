const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const commands = new (require("./Commands/handler"))(`${__dirname}/Commands/Commands`)

const fs = require("fs");
const WavDecoder = require("wav-decoder");
const Pitchfinder = require("pitchfinder");

client.on("ready", async () => {
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
	client.user.setActivity(`Serving ${client.guilds.size} servers`)

	await commands.loadCommands()
	client.commands = commands
})

client.on("guildCreate", guild => {
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async message => {
	if(message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;
	
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	let command = args.shift().toLowerCase();

	//Resolve alias to full command name
	if(client.commands.Commands.Aliases[command] !== undefined){
		command = client.commands.Commands.Aliases[command]
	}
	//See if command exists
	if(!client.commands.Commands.All.includes(command)){
		return
	}

	//Execute the command
	const cmd = client.commands.resolveCommand(command)
	cmd.Execute(message, args).catch(error => message.sendError(error))
});
client.login(config.token);