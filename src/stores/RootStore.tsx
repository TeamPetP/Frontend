import { BoardStore } from "./BoardStore";
import { UserStore } from "./UserStore";
import { ModalStore } from "./ModalStore/index";
export interface RootStoreModel {
	boardStore: BoardStore;
	userStore: UserStore;
	modalStore: ModalStore;
}
export class RootStore {
	boardStore: BoardStore;
	userStore: UserStore;
	modalStore: ModalStore;

	constructor() {
		this.boardStore = new BoardStore();
		this.userStore = new UserStore(this);
		this.modalStore = new ModalStore();
	}
}
