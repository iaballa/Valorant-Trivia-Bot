import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
} from "discord.js";

import entries from "../questions.json";
import { user_interactions } from "..";

// Each entry in the JSON file has a question and answer
interface Entry {
  question: string;
  answer: string;
}

// Map to save specific questions to specific users
export const entry_map = new Map<string, Entry>();

// create trivia command
export const data = new SlashCommandBuilder()
  .setName("trivia")
  .setDescription("Asks a Valorant Trivia Question!");

// execution of trivia command
export async function execute(interaction: CommandInteraction) {
  console.log("executed");
  // randomly choose a question from questions.json file
  const randomIndex = Math.floor(Math.random() * entries.length);
  const entry = entries[randomIndex];

  // assign question to user
  console.log("setting user to " + interaction.user.id);
  entry_map.set(interaction.user.id, entry);
  // const current_question = user_questions.get(interaction.user.id)?.question;

  // create Guess button and action row
  const button = new ButtonBuilder()
    .setCustomId("triv_button")
    .setLabel("Guess")
    .setStyle(ButtonStyle.Primary);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

  console.log("Question Asked: ", entry.question);

  user_interactions.set(interaction.user.id, interaction);

  // Show Ephemeral message to user with question and Guess Button
  await interaction.reply({
    content: entry.question,
    components: [row],
    flags: MessageFlags.Ephemeral,
  });
}
