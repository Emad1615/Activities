import ProfileAbout from '../section/ProfileAbout';
import ProfilePhotos from '../section/ProfilePhotos';
import ActivitiesTable from '../section/table/ActivitiesTable';

export const tabs = [
  { label: 'About', tab: <ProfileAbout /> },
  { label: 'Photos', tab: <ProfilePhotos /> },
  { label: 'Events', tab: <ActivitiesTable /> },
  { label: 'Followers', tab: <></> },
  { label: 'Following', tab: <></> },
];
