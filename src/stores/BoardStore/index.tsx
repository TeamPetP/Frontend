import { makeObservable, observable, action } from "mobx";

export interface IBoardStore {
	arr: Array<Record<string, string>>;
}

export class BoardStore implements IBoardStore {
	constructor() {
		makeObservable(this);
	}
	@observable arr = [{ string: "string" }];

	@action getBoard = (): Array<Record<string, string>> => {
		return this.arr;
	};
}
