#!/usr/bin/env node
const [node, file, ...args]=process.argv;
const smarthomeAPI=require("tplink-smarthome-api");

const addr="192.168.109.56";
const HELP="Exampel: "+file+" [on|off]";

async function main(){
	console.log("Node: "+node);
	console.log("Datei: "+file);
	console.log("Argumente: "+JSON.stringify(args));
	console.log("");

	if(args[0]){
		const client=new smarthomeAPI.Client();
		const options={host:addr};
		console.log("Trying to Open '"+addr+"'");
		let device=null;
		try{
			device=await client.getDevice(options);
		}catch(e){
			console.log("can't connect to host ('"+addr+"') please check you Connection!")
			return(1);
		}
		console.log("Finish!");
		let turnOn=true;
		if(args[0]=="1"){turnOn=true}
		else if(args[0]=="on"){turnOn=true}
		else if(args[0]=="an"){turnOn=true}
		else if(args[0]=="online"){turnOn=true}

		else if(args[0]=="0"){turnOn=false}
		else if(args[0]=="off"){turnOn=false}
		else if(args[0]=="aus"){turnOn=false}
		else if(args[0]=="offline"){turnOn=false}
		else{console.log(HELP);return(1)}
		console.log("set power to "+(turnOn?"'ON'":"'OFF'"));
		device.setPowerState(turnOn);
		console.log("OK Finish!");

		//console.log(device)
	}else{
		console.log(HELP)
	}

}
main();
