
module.exports = {
    aliases: ['Demote','Demo','demo'],
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, args) => {

        var groupid = process.env.GROUPID = 14181657
        var rankpermission = process.env.RANKID = 14,15,16,17,18
        const nbx = require('noblox.js')
        const axios = require('axios')
        const Discord = require('discord.js')
        const hook = new Discord.WebhookClient(process.env.HOOKID, process.env.HOOKTOKEN)

        nbx.setCookie(process.env.COOKIE); _|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_9C04B1B7A282A685889CAC9725250E623CA0A1637C39F1EECFFE30F98B1E5E0071B608336533871AF7E72B750D453A0A5D86965EA0833A77B45FC49A6A1F060792A0E6547103839806C9DEA85B52454612CAD5CD8B0618FB10163C317F0E85A66C74A8F0187BB12DFCC0EA744E50B173091A58C74EC713A0DA42F5C568D191C3E019EA87E2A9302C3849FAB4883E5D6C708C5A0370C950263369D01CD05E6156AA5F374A6C1E6DD5E6D0D48D92AFC2D704836F48D4F5ECB985895A1BEEE512DC13D896DB188A2BF362227AD26D28A5829893229CE210D27B0D0B80E2E37FA538F791CF896C6A246F07AC720A03882109F4F76DA58643031D8D333A3FCCB4774D171D9626430F10E79EDBCEBF1C72672C258B69560545F2628BE8190509977797601717BBEAD2820BB5A63337E2AE78F305675D4C477CC75FC3455540A1B22A932A51AFB083C8C534317935F5B9C1C019231FB47DCE8E6F92D51A7039295898DBBEAB245B395F478501B9928E7B5793D28D54DD01513CF968A2925918A1E2BA2910EDFBB10C24394AF241FBD1128A97CA68FE2C32A6B313696ABA883021947D2810B05407C0AA443621F6D7C6255BB09F9F6712FE1CD9E34997463D5C81E64B2B704CF6E01EA04FA08B92FA4F883D3285FA39B10F

        let GetUserIdFromMessage = async () => {
                let memberid = message.member.id
                let response = await axios.get(`https://api.blox.link/v1/user/${memberid}`)
                let UserId = response.data.primaryAccount
                return UserId   
        }

        let UserIdUseCmds = await GetUserIdFromMessage()

        let GetUsernameFromUseCmds = async () => {
            var response = await nbx.getUsernameFromId(UserIdUseCmds)
            let GetUsernameFromUseCmd = response
            return GetUsernameFromUseCmd
          }


        let GetUserToPromote = async () => {
            var usernametopromote = args[0]
            let response = await nbx.getIdFromUsername(usernametopromote)
            let UserIdToPromoteRun = response
            return UserIdToPromoteRun
          };
      
          
          let UserIdToPromote = await GetUserToPromote()
          let UsernameUseCmds = await GetUsernameFromUseCmds()        

          let FindUserUseCmdRank = async () => {
            let response = await nbx.getRankInGroup(groupid, UserIdUseCmds)
            let FindUserUseCmdRankId = response
            return FindUserUseCmdRankId
          };
      
          let FindUserToPromoteRank = async () => {
            let response = await nbx.getRankInGroup(groupid, UserIdToPromote)
            let FindUserToPromoteRankId = response
            return FindUserToPromoteRankId
          };
      
          let UserRankIdToUseCmd = await FindUserUseCmdRank()
          let UserRankIdToPromote = await FindUserToPromoteRank()

          if (UserIdUseCmds == UserIdToPromote) {
            let FailToRankYourSelf = new Discord.MessageEmbed()
                    .setDescription(`You can not demote yourself.`)
                    .setColor('#e67e22')
                    .setTimestamp()
                    .setFooter(`Automatically Ranking by Cha#3336`);
    
                    message.channel.send(FailToRankYourSelf);
          }
    
          if (UserRankIdToUseCmd <= UserRankIdToPromote) {
            let FailToRankHigher = new Discord.MessageEmbed()
                    .setDescription(`You can not demote users the rank higher than you.`)
                    .setColor('#e67e22')
                    .setTimestamp()
                    .setFooter(`Automatically Ranking by Cha#3336`);
    
                    message.channel.send(FailToRankHigher);
          }
    
          if (UserRankIdToUseCmd > UserIdToPromote || UserRankIdToUseCmd >= rankpermission) {
    
            let PromoteUserInGroup = async () => {
              let response = await nbx.demote(groupid, UserIdToPromote)
              let RankedOnGroup = response
              return RankedOnGroup
            }
    
            await PromoteUserInGroup()
    
            let AfterRanked = async () => {
              let response = await nbx.getRankNameInGroup(groupid, UserIdToPromote)
              let GetRankAfterPromote = response
              return GetRankAfterPromote
            }
    
            let GetRoleInGroup = await AfterRanked()
            console.log(`${UserIdUseCmds} ranked user ${UserIdToPromote} as rank ${GetRoleInGroup}`)
            
            let Promoted = new Discord.MessageEmbed()
                    .setDescription(`Demoted the user ${args[0]} to rank ${GetRoleInGroup}.`)
                    .setColor('#e74c3c')
                    .setTimestamp()
                    .setFooter(`Automatically Ranking by Cha#3336`);
    
                    message.channel.send(Promoted);
    
            let PromotedLogs = new Discord.MessageEmbed()
                    .setDescription(`${UsernameUseCmds} demoted the user ${args[0]} to rank ${GetRoleInGroup}.`)
                    .setTimestamp()
                    .setFooter(`Automatically Ranking by Cha#3336`);
    
                    hook.send(PromotedLogs);
        }
    
          else {
            let FailToRankWithoutPermission = new Discord.MessageEmbed()
                    .setDescription(`You do not have permission to use command.`)
                    .setColor('#e67e22')
                    .setTimestamp()
                    .setFooter(`Automatically Ranking by Cha#3336`);
    
                    message.channel.send(FailToRankWithoutPermission);
          }
}

}
