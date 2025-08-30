import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useProfile } from '../../../lib/hooks/profile/useProfile';
import { useParams } from 'react-router';

export default function ProfilePhotos() {
  const { id } = useParams();
  const { loadingPhoto, userPhoto } = useProfile(id);
  if (loadingPhoto)
    return (
      <>
        <Stack
          direction={'row'}
          gap={1}
          alignItems={'center'}
          justifyContent={'flex-start'}
        >
          {Array.from({ length: 3 }, (x: number) => x + 1).map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rectangular"
              width={250}
              height={250}
            />
          ))}
        </Stack>
      </>
    );
  if (userPhoto?.length == 0 || userPhoto == null)
    return (
      <Typography
        variant="subtitle1"
        textAlign={'center'}
        color="text.secondary"
        py={2}
      >
        No photos found
      </Typography>
    );
  return (
    <ImageList
      sx={{
        width: 500,
        height: 450,
        transform: 'translateZ(0)',
      }}
      rowHeight={200}
      gap={1}
    >
      {userPhoto.map((item) => {
        return (
          <ImageListItem key={item.id}>
            <img
              srcSet={`${item.url.replace(
                '/upload/',
                '/upload/w_500,h_500,c_fill,dpr_2,f_auto,g_face/'
              )}`}
              src={`${item.url.replace(
                '/upload/',
                '/upload/w_500,h_500,c_fill,dpr_2,f_auto,g_face/'
              )}`}
              alt={'User profile image'}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                '& .MuiImageListItemBar-actionIcon': {
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                },
                '& .MuiImageListItemBar-titleWrap': {
                  p: 0,
                },
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              position="top"
              actionIcon={
                <>
                  <IconButton sx={{ color: 'white' }}>
                    <StarBorderIcon />
                  </IconButton>
                  <IconButton sx={{ color: 'white' }}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}
