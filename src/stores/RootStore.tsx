import { BoardStore } from "./BoardStore";
import { UserStore } from "./UserStore";

export interface RootStoreModel {
	boardStore: BoardStore;
	userStore: UserStore;
}
export class RootStore {
	boardStore: BoardStore;
	userStore: UserStore;

	constructor() {
		this.boardStore = new BoardStore();
		this.userStore = new UserStore(this);
	}
}
