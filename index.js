const Discord = require("discord.js");
const client = new Discord.Client();
//const config = require("./config.json");
const commands = new (require("./Commands/handler"))(`${__dirname}/Commands/Commands`)
const fs = require("fs");
let songs = require("./song_list.json")
fs.readFile("song_list.json", (err, data) => {
	if(err) throw err;
	//var obj;
	//obj = JSON.parse(data);
});

function getSongs(lf,hf){
	var lowf, highf;
	for(i = 0; i < songs.length; i++)
	{
		lowf = songs[i]["low frequency"];
		highf = songs[i]["high frequency"];
		if(lowf >= lf && highf <= hf)
		{
			console.log(songs[i]);
		}
	}
}

getSongs(100,600);


const WavDecoder = require("wav-decoder");
const Pitchfinder = require("pitchfinder");
const upload = require("express-fileupload");
const bodyParser = require('body-parser');

const http = require('http');
var express = require("express");
var app = express();
app.use(express.static('public'));
app.use(upload());
app.use(bodyParser.urlencoded({extended: false}));

console.log("Creating a server");

var server = app.listen(8080, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});

app.post("/mmm", function(req, res){
	if(req.files){
		console.log("We got the files!!");
		let lowKey = req.files.audio1;
		let highKey = req.files.audio2;
		console.log(lowKey);
		console.log(highKey);
		console.log("LowKey:" + getPitch(lowKey.data));
		console.log("highKey:" + getPitch(highKey.data));
	}
})
function generateSongs(){
	let lowTone = getPitch(/* File location */);
	let highTone = getPitch(/* File location */);
	if(highTone < lowTone) return null;
	let song = getSongs(lowTone, highTone);
}	

function getPitch(bufferData){
	const detectPitch = new Pitchfinder.DynamicWavelet();
	const buffer = bufferData; //Conversion from pcm to wav required
	const decoded = WavDecoder.decode.sync(buffer);
	const float32Array = decoded.channelData[0];
	console.log("Detection Process");
	return detectPitch(float32Array);
}

// Testing pitch acquisition
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