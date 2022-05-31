import { ApplyOptions } from '@sapphire/decorators';
import { PaginatedMessage } from '@sapphire/discord.js-utilities';
import { ApplicationCommandRegistry, Command, CommandOptions, RegisterBehavior } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';

@ApplyOptions<CommandOptions>({
	aliases: ['pm'],
	description: 'A command that uses paginated messages.',
	generateDashLessAliases: true
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			(builder) =>
				builder //
					.setName(this.name)
					.setDescription(this.description),
			{
				guildIds: ['763877963337826335'],
				idHints: ['981302704074788914'],
				behaviorWhenNotIdentical: RegisterBehavior.Overwrite
			}
		);
	}

	public override async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply({ ephemeral: true });

		const paginatedMessage = new PaginatedMessage();

		paginatedMessage.addPageEmbed((embed) =>
			embed //
				.setTitle('page title')
		);
		paginatedMessage.addPageEmbed((embed) =>
			embed //
				.setTitle('page 2 title')
		);

		return paginatedMessage.run(interaction);
	}
}
