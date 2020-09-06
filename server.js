const Discord = require("discord.js")

const { prefix } = require("./config.json")
const bot = new Discord.Client()  

bot.on("ready", () =>  { 
  console .log("i iam ready") 
  //I SAID to move your mouse!
  }); 
//let me type!
bot.commands = new Discord.Collection(); 
bot.aliases = new Discord.Collection(); 

["command"].forEach(handler => { 
  require(`./handlers/${handler}`)(bot) 
  }); 

bot.on("message", async message => { 
  if(message.author.bot) return;
  if(!message.guild) return;
  if(!message.content.startsWith(prefix)) return;  
  
   // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);
  //arguments 
  const args = message.content.slice(prefix.length).trim().split(/ +/g); 
  const cmd = args.shift().toLowerCase(); 
  
  if(cmd.length === 0) return; 
  let command = bot.commands.get(cmd); 
  //if none , run it by alias 
  if(!command) command = bot.commands.get(bot.aliases.get(cmd)); 
  
  //if a command is finally found, run the command 
  if(command) 
  command.run(bot, message, args); 
}); 

bot.login(process.env.TOKEN)
 