import { makeAutoObservable } from "mobx";
export default class CounterStore {
  title = "Counter store";
  count = 5;
  events: string[] = [`initial count is ${this.count}`];
  constructor() {
    makeAutoObservable(this);
  }
  increment = (amount = 1) => {
    this.count += amount;
    this.events.push(`Counter is incremented by ${amount}`);
  };
  decrement = (amount = 1) => {
    if (this.count != 0) {
      this.count -= amount;
      this.events.push(`Counter is incremented by ${amount}`);
    } else this.count = 0;
  };
  get eventCounts(){
    return this.events.length;
  }
}
