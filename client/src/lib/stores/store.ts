import { createContext } from 'react';
import CounterStore from './counterStore';
import UIStore from './uiStore';
import { ActivityStore } from './activityStore';
import { ProfileEventsStore } from './profileEventsStore';

interface IStore {
  counterStore: CounterStore;
  uiStore: UIStore;
  activityStore: ActivityStore;
  ProfileEventsStore: ProfileEventsStore;
}
export const store: IStore = {
  counterStore: new CounterStore(),
  uiStore: new UIStore(),
  activityStore: new ActivityStore(),
  ProfileEventsStore: new ProfileEventsStore(),
};

export const StoreContext = createContext(store);
