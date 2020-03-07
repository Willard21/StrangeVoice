const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
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
	var songList = new Array();
	for(i = 0; i < songs.length; i++){
		lowf = songs[i]["low frequency"];
		highf = songs[i]["high frequency"];
		if(lowf >= lf && highf <= hf){
			songList.push(songs[i]);
		}
	}
	return songList;
}

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
		let freqArray = Object.values(req.files);
		let pitch = getKTP(freqArray);
		console.log("LowKey:" + pitch[0]);
		console.log("highKey:" + pitch[1]);
		console.log(JSON.stringify(getSongs(pitch[0], pitch[1])));
		let resData = "{'LowKey':" + pitch[0] + ",";
			resData += "'HighKey':" + pitch[1] + ",";
			resData += "'songs:'" + JSON.stringify(getSongs(pitch[0], pitch[1])) + "};";
		res.send(resData);
	}
})

function getKTP(freqArray){
	let lowPitch = 20000;
	let highPitch = null;
	let pitchVal = null;
	let total = 0;
	let countCorrect = 0;
	for(i = 0; i < freqArray.length; i++){
		pitchVal = getPitch(freqArray[i].data);
		if(pitchVal != null){
			console.log("   Pitch: " + pitchVal); 
			if(pitchVal > highPitch){
				highPitch = pitchVal;
			}
			if(pitchVal < lowPitch){
				lowPitch = pitchVal;
			}
		}
	}
	return [lowPitch, highPitch];
}

function getPitch(bufferData){
	const detectPitch = new Pitchfinder.DynamicWavelet();
	const buffer = bufferData; //Conversion from pcm to wav required
	const decoded = WavDecoder.decode.sync(buffer);
	const float32Array = decoded.channelData[0];
	console.log("Detection Process");
	return detectPitch(float32Array);
}

