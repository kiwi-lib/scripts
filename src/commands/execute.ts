import { findCommand } from './find';

export async function executeCommand(
	commandName: string,
	args: any[],
): Promise<void> {
	const command = findCommand(commandName);
	await command.task(args);
	process.exit(0);
}
