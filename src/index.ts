#!/usr/bin/env node
import { Command } from 'commander';
import { executeCommand } from './commands';
import { register } from './register';
import { homedir } from 'os';

const program = new Command();
program.option('-d, --debug', 'output extra debugging');
program.option('-r, --register', 'register commands to shell');

// options
program.parse(process.argv);
const options = program.opts();
if (options.debug) console.log(options);

if (options.register) {
	register({
		// TODO: zshrc 외의 shell도 지원하도록 작업
		shellRcFilePath: `${homedir()}/.zshrc`,
	});
} else {
	main();
}

async function main() {
	const [commandName, ...args] = program.args;
	executeCommand(commandName, args);
}
