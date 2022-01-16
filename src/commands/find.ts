import { Command } from '@core/types';
import { dirnameCmd } from './impl';

export const commands: Command[] = [dirnameCmd];
const commandMap: Record<string, Command | undefined> = commands.reduce(
	(prev: Record<string, Command>, curr: Command) => {
		prev[curr.command] = curr;
		return prev;
	},
	{},
);

export function findCommand(commandName: string): Command {
	const command = commandMap[commandName];
	if (!command) {
		throw new Error(`Can't find command: ${commandName}`);
	}
	return command;
}
