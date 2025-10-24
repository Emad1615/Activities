import ProfileAbout from '../section/ProfileAbout';
import ProfileEvents from '../section/ProfileEvents';
import ProfileFollow from '../section/ProfileFollow';
import ProfilePhotos from '../section/ProfilePhotos';
import ActivitiesTable from '../section/table/ActivitiesTable';

export const tabs: TabType[] = [
  { label: 'About', tab: ProfileAbout },
  { label: 'Photos', tab: ProfilePhotos },
  { label: 'Events', tab: ProfileEvents },
  { label: 'Followers', tab: ProfileFollow },
  { label: 'Following', tab: ProfileFollow },
];

export const eventTabs: TabType[] = [
  { label: 'Future Events', tab: 'div' },
  { label: 'Past Events', tab: 'div' },
  { label: 'Hosting Events', tab: 'div' },
  { label: 'Going Events', tab: 'div' },
  { label: 'Events Report', tab: ActivitiesTable },
];
