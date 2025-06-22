import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import 'dotenv/config';

const commands = [
  {
    name: 'wyr',
    description: 'Get a random “Would You Rather” question',
    type: 1, 
    integration_types: [1], 
    contexts: [0, 1], 
  },
  {
    name: 'clanch',
    description: 'Clan Channel Information',
    type: 1,
    integration_types: [1], 
    contexts: [0, 1],
  }
];
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

(async () => {
  try {
    console.log('Registering commands…');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID!),
      { body: commands }
    );
    console.log('Global commands registered');
  } catch (error) {
    console.error('Command registration failed:', error);
  }
})();