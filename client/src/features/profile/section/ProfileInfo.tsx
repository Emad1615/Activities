import { EditNoteOutlined } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import { fnDateFormat } from '../../../lib/utils/helper';

type Props = {
  userInfo: User;
  handleEditMode: Dispatch<SetStateAction<boolean>>;
  isCurrentUser: boolean;
};
export default function ProfileInfo({
  userInfo,
  handleEditMode,
  isCurrentUser,
}: Props) {
  return (
    <Box sx={{ my: 3 }}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mb={2}
      >
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <EditNoteOutlined
            sx={(theme) => ({
              fontSize: 20,
              color: theme.palette.info.main,
              cursor: 'pointer',
              transition: 'transform 0.3s ',
              '&:hover': {
                transform: 'scale(1.3)',
              },
            })}
            onClick={() => {
              if (isCurrentUser) handleEditMode((prev) => !prev);
            }}
          />
          <Typography
            variant="subtitle2"
            color="text.secondary"
            textTransform={'capitalize'}
          >
            Name -
          </Typography>
          <Typography variant="body2" textTransform={'lowercase'}>
            {userInfo.displayName}
          </Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <EditNoteOutlined
            sx={(theme) => ({
              fontSize: 20,
              color: theme.palette.info.main,
              cursor: 'pointer',
              transition: 'transform 0.3s ',
              '&:hover': {
                transform: 'scale(1.3)',
              },
            })}
            onClick={() => {
              if (isCurrentUser) handleEditMode((prev) => !prev);
            }}
          />
          <Typography
            variant="subtitle2"
            color="text.secondary"
            textTransform={'capitalize'}
          >
            Birth Date -
          </Typography>
          <Typography variant="body2" textTransform={'lowercase'}>
            {fnDateFormat(new Date(userInfo.birthDate!))}
          </Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <EditNoteOutlined
            sx={(theme) => ({
              fontSize: 20,
              color: theme.palette.info.main,
              cursor: 'pointer',
              transition: 'transform 0.3s ',
              '&:hover': {
                transform: 'scale(1.3)',
              },
            })}
            onClick={() => {
              if (isCurrentUser) handleEditMode((prev) => !prev);
            }}
          />
          <Typography
            variant="subtitle2"
            color="text.secondary"
            textTransform={'capitalize'}
          >
            Gender -
          </Typography>
          <Typography variant="body2" textTransform={'lowercase'}>
            {userInfo.gender ? 'Male' : 'Female'}
          </Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <EditNoteOutlined
            sx={(theme) => ({
              fontSize: 20,
              color: theme.palette.info.main,
              cursor: 'pointer',
              transition: 'transform 0.3s ',
              '&:hover': {
                transform: 'scale(1.3)',
              },
            })}
            onClick={() => {
              if (isCurrentUser) handleEditMode((prev) => !prev);
            }}
          />
          <Typography
            variant="subtitle2"
            color="text.secondary"
            textTransform={'capitalize'}
          >
            Phone -
          </Typography>
          <Typography variant="body2" textTransform={'lowercase'}>
            {userInfo.phoneNumber || 'N/A'}
          </Typography>
        </Stack>
      </Box>
      <Box
        display={'flex'}
        gap={1}
        sx={{ height: 300, my: 3, borderLeft: '2px solid #eeee', px: 1 }}
      >
        <Typography
          variant="body1"
          color="text.secondary"
          textTransform={'capitalize'}
          sx={{ width: 'fit-content' }}
        >
          Bio:
        </Typography>
        <Typography
          variant="body2"
          textTransform={'lowercase'}
          fontStyle={'italic'}
          sx={{
            overflowY: 'auto',
            whiteSpace: 'pre-wrap',
            textAlign: 'justify',
            width: 'fit-content',
            maxWidth: '100%',
            lineHeight: '1.8',
            px: 1,
          }}
          flexGrow={1}
        >
          {userInfo.bio || 'no information'}
        </Typography>
      </Box>
    </Box>
  );
}
