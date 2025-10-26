import FutureEvents from '../section/FutureEvents';
import GoingEvents from '../section/GoingEvents';
import HostingEvents from '../section/HostingEvents';
import PastEvents from '../section/PastEvents';
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
  { label: 'Future Events', tab: FutureEvents, type: 'future' },
  { label: 'Past Events', tab: PastEvents, type: 'past' },
  { label: 'Hosting Events', tab: HostingEvents, type: 'host' },
  { label: 'Going Events', tab: GoingEvents, type: 'going' },
  { label: 'Events Report', tab: ActivitiesTable, type: 'report' },
];
