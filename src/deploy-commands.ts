import { REST, Routes } from "discord.js";
import { config } from "./config";
import { commands } from "./commands/index";

const commandsData = Object.values(commands).map((command) => command.data);
const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

type DeployCommandsProps = { guildId: string };

export async function deployCommands({ guildId }: DeployCommandsProps) {
  try {
    console.log("Started refreshing app (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId),
      {
        body: commandsData,
      }
    );

    console.log("Successfully reloaded app (/) commands.");
  } catch (error) {
    console.error(error);
  }
}

export function normalize(input: string) {
  return input.trim().replace(/\s+/g, " ").toLowerCase();
}
