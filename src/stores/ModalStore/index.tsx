import { makeObservable, observable, computed } from "mobx";

export interface IModalStore {
	signInState: boolean;
	signUpState: boolean;
}

export class ModalStore implements IModalStore {
	constructor() {
		makeObservable(this);
	}
	@observable signInState = false;
	@observable signUpState = false;
	@observable createPetpGramState = false;
	@observable editProfile = false;

	@computed get getSignInState(): boolean {
		return this.signInState;
	}
	@computed get getSignUpState(): boolean {
		return this.signUpState;
	}
	@computed get getCreatePetpGramState(): boolean {
		return this.createPetpGramState;
	}
	@computed get getEditProfile(): boolean {
		return this.editProfile;
	}
}
