import { observable, action, computed, makeObservable } from "mobx";
import { RootStoreModel } from "../RootStore";

export interface IUserStore {
	id: string;
	name?: string;
	pic?: string;
}

export class UserStore implements IUserStore {
	private rootStore: RootStoreModel | undefined;

	@observable id = "test";
	@observable name = "태민";
	@observable pic = "";

	constructor(rootStore?: RootStoreModel) {
		this.rootStore = rootStore;
		makeObservable(this);
	}

	@computed get getName(): string {
		console.log("실행", this.name);
		return this.name;
	}

	@action setName = (name: string): void => {
		// this.rootStore?.authStore.id
		this.name = name;
		console.log(this.name);
	};
}
