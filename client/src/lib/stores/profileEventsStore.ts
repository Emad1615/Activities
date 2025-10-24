import { makeAutoObservable } from 'mobx';

export class ProfileEventsStore {
  Filter: string = 'future';
  constructor() {
    makeAutoObservable(this);
  }
  setFilter = (value: string) => {
    this.Filter = value;
  };
}
