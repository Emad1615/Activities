import { Box, Button, Divider, Typography } from '@mui/material';
import { useProfile } from '../../../lib/hooks/profile/useProfile';
import { useParams } from 'react-router';
import { useState } from 'react';
import ProfileInfo from './ProfileInfo';
import ProfileForm from '../form/ProfileForm';

export default function ProfileAbout() {
  const { id } = useParams();
  const { userProfile, isCurrentUser } = useProfile(id);
  const [editMode, setEditMode] = useState<boolean>(false);
  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography variant="subtitle1">
          About {userProfile?.displayName}
        </Typography>
        {isCurrentUser && (
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => setEditMode((prev) => !prev)}
          >
            {editMode ? 'Cancel' : 'Edit Profile'}
          </Button>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />
      {editMode ? (
        <ProfileForm userInfo={userProfile!} handleEditMode={setEditMode} />
      ) : (
        <ProfileInfo
          userInfo={userProfile!}
          handleEditMode={setEditMode}
          isCurrentUser={isCurrentUser}
        />
      )}
    </Box>
  );
}
