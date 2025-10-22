import { makeAutoObservable } from 'mobx';

export class ActivityStore {
  Filter = 'all';
  StartDate = new Date().toISOString();
  constructor() {
    makeAutoObservable(this);
  }
  setFilter = (filter: string) => {
    this.Filter = filter;
  };
  setStartDate = (Date: Date) => {
    this.StartDate = Date.toISOString();
  };
}
