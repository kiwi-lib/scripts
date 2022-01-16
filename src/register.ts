import { commands } from './commands/find';
import { Command } from '@core/types';
import { appendFileSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface RegisterParams {
	shellRcFilePath: string;
}

// @kiwi-lib/scripts의 commands를 shell에 등록
export function register({ shellRcFilePath }: RegisterParams): void {
	const shellScripts: string[] = [];
	for (const command of commands) {
		shellScripts.push(makeShellScript(command));
	}

	const kiwiLibScriptFilePath = join(__dirname, '../shell-script.sh');
	createKiwiLibScriptFile(kiwiLibScriptFilePath, shellScripts);
	registerToShell(shellRcFilePath, kiwiLibScriptFilePath);
}

// node 커맨드를 호출하는 shell script를 생성
function makeShellScript({ command }: Command): string {
	return `${command}() {
	kiwi-scripts ${command}
}`;
}

// .../scripts/shell-script.sh 파일을 생성
function createKiwiLibScriptFile(
	kiwiLibScriptFilePath: string,
	shellScripts: string[],
): void {
	const kiwiLibScriptFileContent = `${shellScripts.join('\n\n')}`;
	writeFileSync(kiwiLibScriptFilePath, kiwiLibScriptFileContent, 'utf-8');
}

// ShellRc에 source 스크립트가 있는지 확인하고 없으면 추가
function registerToShell(
	shellRcFilePath: string,
	kiwiLibScriptFilePath: string,
): void {
	const shellRcFileContent = readFileSync(shellRcFilePath, 'utf-8');
	const sourceCommand = `source ${kiwiLibScriptFilePath}`;
	if (shellRcFileContent.includes(sourceCommand)) return;

	appendFileSync(shellRcFilePath, '\n' + sourceCommand + '\n', 'utf-8');
}
