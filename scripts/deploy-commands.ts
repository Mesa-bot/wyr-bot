import fetch from 'node-fetch';
import 'dotenv/config';

const commands = [
  {
    name: 'wyr',
    description: 'Get a random “Would You Rather” question',
    type: 1,
    integration_types: [1], // User Install
    contexts: [0, 1], // GUILD, BOT_DM
  },
  {
    name: 'clanch',
    description: 'Clan Channel Information',
    type: 1,
    integration_types: [1],
    contexts: [0, 1],
  }
];

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
};

const clientId = process.env.CLIENT_ID!;
const guildId = process.env.GUILD_ID!;

async function registerCommands() {
  try {
    console.log('📤 Registering GUILD commands (fast)...');
    let res = await fetch(
      `https://discord.com/api/v10/applications/${clientId}/guilds/${guildId}/commands`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify(commands),
      }
    );
    console.log('✅ Guild response:', await res.json());

    console.log('📤 Registering GLOBAL commands (DM-ready)...');
    res = await fetch(
      `https://discord.com/api/v10/applications/${clientId}/commands`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify(commands),
      }
    );
    console.log('✅ Global response:', await res.json());
  } catch (err) {
    console.error('❌ Registration failed:', err);
  }
}

registerCommands();
