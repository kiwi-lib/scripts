import { Command } from '../../core/types';
import { pbcopy } from '../../utils';

export const dirnameCmd: Command = {
	command: 'dirname',
	task: dirname,
};

function dirname(): void {
	const _dirname = process.cwd();
	console.log(_dirname);
	pbcopy(_dirname);
}
