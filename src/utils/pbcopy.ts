import child_process from 'child_process'

export function pbcopy(text: string):void {
	const proc = child_process.spawn('pbcopy'); 
	proc.stdin.write(text); 
	proc.stdin.end();
}