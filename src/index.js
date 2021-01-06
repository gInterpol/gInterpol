const { writeFileSync } = require("fs")
const fetch = require("node-fetch")
const parseIssue = require("./parseIssue")

const issue_number = process.argv[2]

const list = require("../list.json")

fetch(`https:///repos/gInterpol/gInterpol/issues/${issue_number}`, {
     headers: {
          "Content-Type": "application/vnd.github+json"
     }
}).then(res => res.json()).then(async x => {
     const steamID64 = await parseIssue(x.body)

     if (!steamID64) return

     list.data.push(steamID64)
     list.lastUpdated = Date.now()

     writeFileSync("./list.json", JSON.stringify(list))
})