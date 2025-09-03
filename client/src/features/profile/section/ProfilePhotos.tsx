import {
  Box,
  Button,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useProfile } from '../../../lib/hooks/profile/useProfile';
import { useParams } from 'react-router';
import { useState } from 'react';
import PhotoUploadWidget from '../../../App/shared/components/PhotoUploadWidget';
import { Star } from '@mui/icons-material';

export default function ProfilePhotos() {
  const { id } = useParams();
  const {
    userProfile,
    loadingPhoto,
    userPhoto,
    isCurrentUser,
    loadingImage,
    uploadImage,
    DeletePhoto,
    loadingDelete,
    SetAsMain,
    loadingAsMain,
  } = useProfile(id);
  const [editMode, setEditMode] = useState<boolean>(false);
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
  if (userPhoto == null)
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
  const handlerUploadImage = async (file: Blob) => {
    await uploadImage(file, {
      onSuccess: () => {
        setEditMode(false);
      },
    });
  };
  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography variant="subtitle1">Photos</Typography>
        {isCurrentUser && (
          <Button
            variant="outlined"
            size="small"
            sx={{ mb: 1 }}
            onClick={() => setEditMode((prevValue) => !prevValue)}
          >
            {editMode ? 'Cancel' : 'Add Photo'}
          </Button>
        )}
      </Box>
      <Divider sx={{ my: 1 }} />
      {editMode ? (
        <PhotoUploadWidget
          uploadImage={handlerUploadImage}
          loadingImage={loadingImage}
        />
      ) : (
        <ImageList
          sx={{
            height: 400,
            transform: 'translateZ(0)',
            overflow: 'auto',
          }}
          cols={5}
          rowHeight={170}
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
                      'rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
                  }}
                  position="top"
                  actionIcon={
                    <>
                      {isCurrentUser && (
                        <>
                          <IconButton
                            onClick={() => {
                              if (item.url !== userProfile?.imageUrl)
                                SetAsMain(item);
                            }}
                            disabled={loadingAsMain}
                            sx={{
                              color:
                                item.url === userProfile?.imageUrl
                                  ? 'yellow'
                                  : 'white',
                            }}
                          >
                            <Star />
                          </IconButton>
                          {item.url !== userProfile?.imageUrl && (
                            <IconButton
                              onClick={() => DeletePhoto(item.id)}
                              disabled={loadingDelete}
                              sx={(theme) => ({
                                color: theme.palette.error.light,
                              })}
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </>
                      )}
                    </>
                  }
                  actionPosition="left"
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      )}
    </Box>
  );
}
