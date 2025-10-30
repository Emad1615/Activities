import Events from '../section/Events';
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
  { label: 'Future Events', tab: Events, type: 'future' },
  { label: 'Past Events', tab: Events, type: 'past' },
  { label: 'Hosting Events', tab: Events, type: 'host' },
  { label: 'Going Events', tab: Events, type: 'going' },
  { label: 'Events Report', tab: ActivitiesTable, type: 'report' },
];
