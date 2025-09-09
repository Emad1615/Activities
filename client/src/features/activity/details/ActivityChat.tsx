import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router';
import { useComments } from '../../../lib/hooks/comment/useComment';
import { timeAgo } from '../../../lib/utils/helper';
import { useForm, type FieldValues } from 'react-hook-form';
import type React from 'react';
import { observer } from 'mobx-react-lite';

const ActivityChat = observer(function ActivityChat() {
  const { id } = useParams();
  const { commentStore } = useComments(id);
  const {
    handleSubmit,
    reset,
    register,
    formState: { isSubmitted },
  } = useForm();
  const addComment = async (data: FieldValues) => {
    try {
      await commentStore.hubConnection?.invoke('SendComment', {
        activityId: id,
        body: data.body,
      });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(addComment)();
    }
  };
  return (
    <Paper sx={{ borderRadius: 'none', mb: 3 }}>
      <Typography
        p={2}
        textAlign={'center'}
        bgcolor={'primary.main'}
        color="white"
        fontWeight={'bold'}
        fontSize={'1rem'}
        textTransform={'capitalize'}
      >
        Chat about this event
      </Typography>
      <Box sx={{ borderRadius: 'none', p: 1 }} gap={2}>
        <form>
          <TextField
            {...register('body', {
              required: true,
            })}
            label="Enter your comment (Enter to submit or SHIFT + Enter for new line)"
            variant="filled"
            multiline
            sx={{ width: '100%' }}
            onKeyDown={handleKeyPress}
            slotProps={{
              input: {
                endAdornment: isSubmitted ? (
                  <CircularProgress size={15} color="secondary" />
                ) : null,
              },
            }}
          />
        </form>
        <Divider sx={{ py: 1 }} />
        <Box sx={{ height: 400, overflow: 'auto' }}>
          {commentStore.comments.map((comment) => (
            <Box key={comment.id} display="flex" m={2}>
              <Avatar
                src={comment.imageUrl}
                alt={comment.displayName + ' Image'}
                sx={{ mr: 2 }}
              />
              <Box display={'flex'} flexDirection={'column'} flexGrow={1}>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Typography
                    component={Link}
                    to={`/profile/${comment.userId}`}
                    variant="subtitle2"
                    sx={{ textDecoration: 'none', color: 'grey.800' }}
                  >
                    {comment.displayName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {timeAgo(comment.createDateTime)}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ whiteSpace: 'pre-wrap' }}
                >
                  {comment.body}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
});

export default ActivityChat;
