import {
  Client,
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
  ModalActionRowComponentBuilder,
} from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import { deployCommands } from "./deploy-commands";

const client = new Client({
  intents: ["Guilds", "GuildMembers", "DirectMessages"],
});

client.once("ready", () => {
  console.log("triv bot ready :3");
});

client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id });
});

// client.on("interactionCreate", async (guild) => {
//   await deployCommands({ guildId: guild.id });
// });

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "triv_button") {
      console.log("button pressed");
      const modal = new ModalBuilder()
        .setCustomId("triv_modal")
        .setTitle("Submit Your Guess!");

      const guess_input = new TextInputBuilder()
        .setCustomId("guess_input")
        .setLabel("Submit your Guess!")
        .setStyle(TextInputStyle.Short);

      const guess =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          guess_input
        );
      modal.addComponents(guess);
      await interaction.showModal(modal);
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === "triv_modal") {
      
    }
  }

  if (!interaction.isCommand()) {
    return;
  }

  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

client.login(config.DISCORD_TOKEN);
function setStyle(Short: TextInputStyle) {
  throw new Error("Function not implemented.");
}
