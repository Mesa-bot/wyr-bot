import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import 'dotenv/config';

const commands = [
  new SlashCommandBuilder()
    .setName('wyr')
    .setDescription('Get a random “Would You Rather” question'),
  new SlashCommandBuilder()
    .setName('clanch')
    .setDescription('Clan Channel Info'),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

(async () => {
  try {
    console.log('Registering guild and global commands…');
    
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!),
      { body: commands }
    );
    console.log('Guild commands registered.');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID!),
      { body: commands }
    );
    console.log('Global commands registered');
  } catch (error) {
    console.error('Command registration failed:', error);
  }
})();