const steamIDRegex = /<!-- SteamID64'ü alt satıra yaz -->(\n|\r\n)(.*?)(\n|\r\n)<!-- SteamID64'ü üst satıra yaz -->/gm
const fetch = require("node-fetch")

/**
 * @param {string} issue
 * @returns {Promise<string | void>}
 */
module.exports = async function(issue) {
     const query = steamIDRegex.exec(issue)
     if (!query) return

     const steamID64 = query[2]

     const { response } = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.APIKEY}&format=json&steamids=${steamID64}`).then(res => res.json())

     if (!response.players.length) return

     return steamID64
}
