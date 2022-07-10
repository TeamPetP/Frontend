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
  @observable editPetpGramState = false;
  @observable createPetMeetingBoardState = false;

  @observable petpGramPostId = 0;
  @observable petMeetingId = 0;

  @observable editProfile = false;

  @computed get getSignInState(): boolean {
    return this.signInState;
  }
  @computed get getSignUpState(): boolean {
    return this.signUpState;
  }
  @computed get getPetPGramPostIdState(): number {
    return this.petpGramPostId;
  }
  @computed get getCreatePetpGramState(): boolean {
    return this.createPetpGramState;
  }
  @computed get getEditPetpGramState(): boolean {
    return this.editPetpGramState;
  }
  @computed get getEditProfile(): boolean {
    return this.editProfile;
  }
  @computed get getCreatePetMeetingBoardState(): boolean {
    return this.createPetMeetingBoardState;
  }
  @computed get getPetMeetingIdState(): number {
    return this.petMeetingId;
  }
}
