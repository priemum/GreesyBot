const fs = require("fs") 
var backkups = JSON.parse(fs.readFileSync("./Data/backups.json", "utf8"));
const Discord = require("discord.js") 
const { Client, Util, Message } = require("discord.js");


exports.run = async (client, message, args) => {
  var backups = JSON.parse(fs.readFileSync("./Data/backups.json", "utf8"));
  if (args[0] === "create") {
  let id = makeid(15); // sayı uzunluğu siz belirleyin

   const channels = message.guild.channels.cache.sort(function(a, b) { return a.position - b.position; }).array().map(c => {
      const channel = { 
        type: c.type, 
        name: c.name, 
        position: c.calculatedPosition,
      };
      if (c.parent) channel.parent = c.parent.name;
       return channel;
   });

 const roles = message.guild.roles.cache.filter(r => r.name !== "@everyone").sort(function(a, b) {
        return a.position - b.position;
 }).array().map(r => {
   const role = { 
     name: r.name, 
     color: r.color, 
     hoist: r.hoist, 
     permissions: r.permissions, 
     mentionable: r.mentionable,
     position: r.position 
   };
    return role; 
 }); 

 if (!backups[message.author.id]) backups[message.author.id] = {};
    backups[message.author.id][id] = {
            icon: message.guild.iconURL(),
            name: message.guild.name,
            owner: message.guild.ownerID,
            members: message.guild.memberCount,
            createdAt: message.guild.createdAt,
            roles,
            channels
     }; save();
    message.channel.send("Backup Created for Server And Information Sent to DM! ") 
    message.author.send(`Your BackUP ID : ${id} \n Upload: !backup upload ${id} `)
   } 
  if (args[0] === "upload") {

  let code = args[1];
    if(!code) return message.channel.send("Invalid BackUP Code! Show BackUps `!backup all` ") 
    if (!backups[message.author.id][code]){
message.reply("This BackUP ID is not you! ") 
      message.guild.channels.cache.forEach(async function(channel) { await channel.delete(); });
        
  message.guild.roles.cache.filter(role => role.members.every(member => !member.user.bot)).forEach(async function(roles) { await roles.delete(); }); 

  await backups[message.author.id][code].roles.forEach(async function(role) {
     message.guild.roles.create({ data: { 
          name: role.name,
          color: role.color,
          permissions: role.permissions,
          hoist: role.hoist,
          mentionable: role.mentionable,
          position: role.position
       }, reason: "Greesy BackUP" })
   });

 await backups[message.author.id][code].channels.filter(c => c.type == "category").forEach(ch => { 
      message.guild.channels.create(ch.name, {type: ch.type, permissionOverwrites: ch.permissionOverwriteArray });
  }); 
                                    
  await backups[message.author.id][code].channels.filter(c => c.type !== "category").forEach(ch => {
       message.guild.channels.create(ch.name,{ type: ch.type, permissionOverwrites: ch.permissionOverwriteArray}).then(c => {
         const parent = message.guild.channels.cache.filter(c => c.type == "category").find(c => c.name === ch.parent);
         c.setParent(parent).catch(err => { throw err; }) 
       });
  });
     message.guild.setName(backups[message.author.id][code].name);
     message.guild.setIcon(backups[message.author.id][code].icon);
 } 
   } 
  function makeid(length) {

        var result = "";

        var characters =

          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        var charactersLength = characters.length;

        for (var i = 0; i < length; i++) {

          result += characters.charAt(

            Math.floor(Math.random() * charactersLength)

          );

        }

        return result;

      }

      function save() {

        fs.writeFile("./Data/backups.json", JSON.stringify(backups), err => {

          if (err) {}

        });

      }

        
 };
  exports.conf = {
    enabled:true, 
    guildOnly:true, 
    aliases: []
   }; 
exports.help = {
  name: "backup"
 };