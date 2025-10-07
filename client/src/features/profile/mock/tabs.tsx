import ProfileAbout from '../section/ProfileAbout';
import ProfileFollow from '../section/ProfileFollow';
import ProfilePhotos from '../section/ProfilePhotos';
import ActivitiesTable from '../section/table/ActivitiesTable';

export const tabs = [
  { label: 'About', tab: ProfileAbout },
  { label: 'Photos', tab: ProfilePhotos },
  { label: 'Events', tab: ActivitiesTable },
  { label: 'Followers', tab: ProfileFollow },
  { label: 'Following', tab: ProfileFollow },
];
