import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useActivity } from '../../../lib/hooks/activities/useActivity';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { activitySchema, type ActivitySchema } from './schema/activitySchema';
import InputText from '../../../App/shared/components/inputs/InputText';
import SelectInput from '../../../App/shared/components/inputs/SelectInput';
import { categories } from './mock/categories';
import DateTimeInput from '../../../App/shared/components/inputs/DateTimeInput';
import LocationInput from '../../../App/shared/components/inputs/LocationInput';
import { useEditActivity } from '../../../lib/hooks/activities/useEditActivity';
import { useCreateActivity } from '../../../lib/hooks/activities/useCreateActivity';

export default function ActivityForm() {
  const { handleSubmit, reset, control } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(activitySchema),
  });
  const { id } = useParams<string>();
  const { activity, activityLoading } = useActivity(id ?? '');
  const { updateActivity, isLoadingEditActivity } = useEditActivity();
  const { addActivity, isLoadingAddActivity } = useCreateActivity();
  const isSubmitting = isLoadingAddActivity || isLoadingEditActivity;
  const navigate = useNavigate();
  useEffect(() => {
    if (activity)
      reset({
        ...activity,
        location: {
          city: activity.city,
          venue: activity.venue,
          latitude: activity.latitude,
          longitude: activity.longitude,
        },
      });
  }, [activity, reset]);
  const onSubmit = (data: ActivitySchema) => {
    const { location, ...rest } = data;
    const object = { ...rest, ...location };
    try {
      if (activity) {
        updateActivity(
          { ...activity, ...object },
          {
            onSuccess: () => {
              navigate(`/activities/${activity.id}`);
            },
          }
        );
      } else {
        addActivity(object as Activity);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (activityLoading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Paper sx={{ borderRadius: 3 }}>
      <Box
        component="form"
        sx={{
          p: 2,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/**************Form Header********************* */}
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            textTransform: 'uppercase',
            borderBottom: 1,
            mb: 2,
            borderColor: 'divider',
          }}
          fontWeight={'bold'}
          color="textSecondary"
        >
          {activity ? 'Edit Activity' : 'Create Activity'}
        </Typography>
        {/**************Form Header********************* */}

        <Box display="flex" flexDirection="column" gap={1}>
          <InputText
            id="title-id"
            label="Title"
            control={control}
            name="title"
          />
          <Box display={'flex'} gap={3} alignItems={'center'}>
            <SelectInput
              id="category-id"
              items={categories}
              name="category"
              control={control}
              label={'Category'}
            />
            <DateTimeInput label="Date" control={control} name="date" />
          </Box>
          <InputText
            id="description-id"
            label="Description"
            control={control}
            name="description"
            multiline
            rows={3}
          />
          <LocationInput label="Location" name="location" control={control} />
        </Box>
        <Box
          sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}
        >
          <Button
            variant="contained"
            sx={{ textTransform: 'uppercase' }}
            color="inherit"
            size="medium"
            onClick={() => navigate('/activities')}
          >
            Cancel
          </Button>
          <Button
            sx={{ textTransform: 'uppercase' }}
            variant="contained"
            color="success"
            size="medium"
            type="submit"
            disabled={isSubmitting}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
