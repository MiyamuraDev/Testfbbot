module.exports.config = {
    name: "mail",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "developer",//api by mark 
    usePrefix: true,
    description: "temp mail gen by heru",
    commandCategory: "mail",
    usages: "[ask]",
    cooldowns: 2
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
    mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage(`Please type ${global.config.PREFIX}mail gen`, tid, mid);
    try {
        const res = await axios.get(`http://94.130.129.40:8370/api/gen${content}`);
        const respond = res.data.email;
        if (res.data.error) {
            api.sendMessage(`Error: ${res.data.error}`, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        } else {
            api.sendMessage(`𝙷𝙸 𝙷𝙴𝚁𝙴'𝚂 𝚈𝙾𝚄𝚁 𝚃𝙴𝙼𝙿𝙼𝙰𝙸𝙻:\n${respond}`, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while fetching the data.", tid, mid);
    }
};
