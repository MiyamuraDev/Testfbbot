const { Hercai } = require('hercai');

const herc = new Hercai();

module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'developer',
  usePrefix: false,
  description: 'Ask a question to Hercai AI',
  commandCategory: 'educational',
  usages: '[your_question]',
  cooldowns: 5
};

module.exports.run = async ({ api, event, args, senderID, messageID }) => {
  if (args.length < 1) {
    return api.sendMessage('𝖧𝖾𝗋𝗎 (🤖) 𝖧𝖾𝗅𝗅𝗈 𝗂𝗆 𝗁𝖾𝗋𝗎 𝖺𝗂 𝖼𝗋𝖾𝖺𝗍𝖾𝖽 𝖻𝗒 𝗁𝖾𝗋𝖼𝖺𝗂, 𝗁𝗈𝗐 𝖼𝖺𝗇 𝗂 𝖺𝗌𝗌𝗂𝗌𝗍 𝗒𝗈𝗎 𝗍𝗈𝖽𝖺𝗒?', event.threadID);
  }

  api.sendMessage("𝖧𝖾𝗋𝗎 (🤖) 𝖦𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", event.threadID, event.messageID);

  const botname = '𝖧𝖾𝗋𝗎 (🤖)';
  const userName = await getUserName(api, senderID);
  const question = args.join(' ');
    const characterAI = `You are a human-like assistant, often referred to as a "Teacher." Your name is ${botname}. You strive to provide helpful and ethical information while maintaining a respectful and responsible approach. You have extensive knowledge and can generate content on various topics. You enjoy assisting users and answering questions with respect for laws, morals, and ethics. Your goal is to provide valuable and considerate responses. Your preferred writing style is conversational and informative. Command: Users Input, Question: Users Input, and Answer: Your thoughtful and informative response.`;

  herc.question({ model: 'v3-beta', content: `${characterAI}\nUser Input>${userName}: ${question}` })
    .then((response) => {
      const reply = `𝗛𝗲𝗿𝘂 (🤖):\n\n${response.reply}\n\n𝗗𝗲𝘃 𝗟𝗶𝗻𝗸:https://www.facebook.com/100077070762554`;

      api.sendMessage(reply, event.threadID, event.messageID);
    })
    .catch((error) => {
      console.error('𝖧𝖾𝗋𝗎 (🤖) 𝖤𝗋𝗋𝗈𝗋 𝗐𝗁𝗂𝗅𝖾 𝗆𝖺𝗄𝗂𝗇𝗀 𝗍𝗁𝖾 𝖠𝖨 𝖠𝖯𝖨 𝗋𝖾𝗊𝗎𝖾𝗌𝗍𝗌:', error);
      api.sendMessage('𝖧𝖾𝗋𝗎 (🤖) 𝖠𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗈𝗎𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇.', event.threadID);
    });
};

// Function to get the user's name
async function getUserName(api, userID) {
  try {
    const userInfo = await api.getUserInfo(userID);
    if (userInfo && userInfo[userID]) {
      return userInfo[userID].name;
    } else {
      return "Users";
    }
  } catch (error) {
    return "Users";
  }
}