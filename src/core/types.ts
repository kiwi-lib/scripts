import { AsyncFunction, Function } from '@kiwi-lib/utils';

export interface Command<T extends any[] = any[]> {
	command: string;
	task: Function<T, void> | AsyncFunction<T, void>;
}
