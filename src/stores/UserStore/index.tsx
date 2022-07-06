import { observable, action, computed, makeObservable } from "mobx";
import { RootStoreModel } from "../RootStore";

export interface IUserStore {
  info: any;
}

export class UserStore implements IUserStore {
  private rootStore: RootStoreModel | undefined;

  @observable info: any = {};

  constructor(rootStore?: RootStoreModel) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @computed get getInfo(): string {
    console.log("실행", this.info);
    return this.info;
  }
  @computed get getMemberId(): number {
    return this.info.memberId;
  }
  @computed get getName(): string {
    return this.info.name;
  }
  @computed get getNickname(): string {
    return this.info.nickname;
  }
  @computed get getIntroduce(): string {
    return this.info.introduce;
  }
  @action setInfo = (info: string): void => {
    this.info = info;
  };
  @action setName = (name: string): void => {
    this.info = { ...this.info, name: name };
  };
}
