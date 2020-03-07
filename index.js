const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const commands = new (require("./Commands/handler"))(`${__dirname}/Commands/Commands`)
const fs = require("fs");
const WavDecoder = require("wav-decoder");
const Pitchfinder = require("pitchfinder");
var pcm = require('pcm-util');

const http = require('http');
var express = require("express");
var app = express();
app.use(express.static('public'));

console.log("Creating a server");

var server = app.listen(8080, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});

app.get("/mmm", function(req, res){
	res.end("HI");
})
function generateSongs(){
	let lowTone = getPitch(/* File location */);
	let highTone = getPitch(/* File location */);
	if(highTone < lowTone) return null;
	let song = getSongs(lowTone, highTone);
}	

function getPitch(filePath){
	const detectPitch = new Pitchfinder.DynamicWavelet();
	const buffer = fs.readFileSync(filePath); //Conversion from pcm to wav required
	const decoded = WavDecoder.decode.sync(buffer);
	const float32Array = decoded.channelData[0];
	console.log("Detection Process");
	return detectPitch(float32Array);
}

// Testing pitch acquisition
console.log("Classifying audio");
console.log(getPitch("440Hz_44100Hz_16bit_05sec.wav"));
/*
client.on("ready", async () => {
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
	client.user.setActivity(`with your emotions`)
	if (!fs.existsSync("./recordings/")) fs.mkdirSync("./recordings/")
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
	cmd.Execute(message, args).catch(console.error)
});
client.login(config.token);*/