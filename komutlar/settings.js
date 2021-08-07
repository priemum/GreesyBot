const Discord = require('discord.js')
const disbut = require('discord-buttons') 
const db = require("quick.db") 
const moment = require("moment")

moment.locale('tr')


exports.run = async (client, message, args) => {
  if(!message.author.hasPermissions("MANAGE_GUILD")) return message.reply(":x: Your Permission Not Found! `MANAGE_GUILD`.")
let sayacrakam = db.fetch(`counterNumber_${message.guild.id}`)
let sayackanal = db.fetch(`counterChannel_${message.guild.id}`)
let kufur = db.fetch(`kufur_${message.guild.id}`)
let otorolkanal = db.fetch(`autoroleChannel_${message.guild.id}`)
let otorolrol = db.fetch(`autoroleRole_${message.guild.id}`)
let banlog = db.fetch(`banlog_${message.guild.id}`)
/*Times*/
//moment.locale("en").format("LLL")
let ccm = db.fetch(`counterNumberTime_${message.guild.id}`)
let chm = db.fetch(`counterChannelTime_${message.guild.id}`)
let bdm = db.fetch(`badwordTime_${message.guild.id}`)
let acm = db.fetch(`autoroleRoleTime_${message.guild.id}`)
let akm = db.fetch(`autoroleChannelTime_${message.guild.id}`)

//moment(Date.now()).locale("en").format("LLL");

const embed = new Discord.MessageEmbed()
.setColor("#146ca4")
.setTitle(message.guild.name,"| Settings")
.setDescription(`

Counter Number: ${sayacrakam || "Not Set!"} (${ccm || ""})
Counter Channel: ${sayackanal || "Not Set!"} (${chm || ""})
BadWord Blocker: ${kufur || "Not Set!"} (${bdm || ""})
AutoRole Role: ${otorolrol || "Not Set!"} (${acm || ""})
AutoRole Log: ${otorolkanal || "Not Set!"} (${akm || ""})
BanLog: ${banlog || "Not Set!"}












`)
const resethepsi = new disbut.MessageButton()
.setStyle("red")
.setLabel("Reset All")
.setEmoji("✔")
.setID("reset")
client.on("clickButton", async (button) => {
  //if(button.clicker.hasPermission("MANAGE_GUILD")) button.reply.send(":x: Your Permission Not Found!", true) 
  
  db.delete(`counterNumber_${message.guild.id}`)
  db.delete(`counterChannel_${message.guild.id}`)
  db.delete(`kufur_${message.guild.id}`)
  db.delete(`autoroleChannel_${message.guild.id}`)
  db.delete(`autoroleRole_${message.guild.id}`)
  db.delete(`banlog_${message.guild.id}`)
  
  await button.reply.send("<:evetbei:867465536736460810> | **Succesfully!**")
  
  
  
 });
message.channel.send('', {embed:embed, buttons: resethepsi})



};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["ayarlar"]
};
exports.help = {
	name: 'settings',
	description: 'Botu Yeniden Başlatır.',
	usage: 'yardim'
};