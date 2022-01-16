import { Command } from 'commander';
import { executeCommand } from './commands';

const program = new Command();
program.option('-d, --debug', 'output extra debugging');

// options
program.parse(process.argv);
const options = program.opts();
if (options.debug) console.log(options);

async function main() {
	const [commandName, ...args] = program.args;
	executeCommand(commandName, args);
}
main();
