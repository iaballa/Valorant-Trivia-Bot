import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  SlashCommandBuilder,
  ModalBuilder,
  Events,
} from "discord.js";

import questions from "../questions.json";

export const data = new SlashCommandBuilder()
  .setName("trivia")
  .setDescription("Asks a Valorant Trivia Question!");

export async function execute(interaction: CommandInteraction) {
  const randomIndex = Math.floor(Math.random() * questions.length);
  const randomQuestion = questions[randomIndex];

  const button = new ButtonBuilder()
    .setCustomId("triv_button")
    .setLabel("Guess")
    .setStyle(ButtonStyle.Primary);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

  await interaction.reply({
    content: randomQuestion.question,
    components: [row],
  });
}
