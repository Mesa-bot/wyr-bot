import { Client, GatewayIntentBits, Events, Partials } from 'discord.js';
import { questions } from './questions';
import 'dotenv/config';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel]
});

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'wyr') {
    const random = questions[Math.floor(Math.random() * questions.length)];
    await interaction.reply(`${random}`);
  }

  if (interaction.commandName === 'clanch') {
    await interaction.reply('Leaders post recruitment messages in https://discord.com/channels/104739787872694272/104740000591024128. \nYou can DM them directly to apply, or follow any specific instructions they’ve included in their post.');
  }
});

client.login(process.env.DISCORD_TOKEN);
