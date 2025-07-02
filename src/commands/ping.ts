import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Returns pong!");

export async function execute(interaction: CommandInteraction) {
  return interaction.reply({
    content: "Pong!",
  });
}
