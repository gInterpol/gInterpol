const steamIDRegex = /[<!\-\- SteamID64'ü alt satıra yaz \-\->]\n(^\d{1,10}$)[\n<!\-\- SteamID64'ü alt satıra yaz \-\->]/gm


/**
 * @param {string} issue
 * @returns {Promise<string | void>}
 */
module.exports = async function(issue) {
     const query = issue.match(steamIDRegex)
     if (!query || !query.length) return

     const steamID64 = query[0].replace(/\n/gm, "")

     const res = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.APIKEY}&format=json&steamids=${steamID64}`).then(res => res.json())

     if (!res.players.length) return

     return steamID64
}