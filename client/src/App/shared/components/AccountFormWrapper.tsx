import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import {
  FormProvider,
  useForm,
  type FieldValues,
  type Resolver,
} from 'react-hook-form';
type Props<TFormData extends FieldValues> = {
  icon?: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  onSubmit: (data: TFormData) => Promise<void>;
  resolver?: Resolver<TFormData>;
  reset: boolean;
  SubmitButtonText: string;
};

export default function AccountFormWrapper<TFormData extends FieldValues>({
  title,
  icon,
  children,
  resolver,
  onSubmit,
  reset,
  SubmitButtonText,
}: Props<TFormData>) {
  const methods = useForm<TFormData>({ resolver, mode: 'onTouched' });
  const handleOnSubmit = async (data: TFormData) => {
    await onSubmit(data);
    if (reset) {
      methods.reset();
    }
  };
  return (
    <FormProvider {...methods}>
      <Paper
        elevation={3}
        sx={{
          py: 3,
          px: 4,
          mx: 'auto',
          maxWidth: '740px',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          alignItems="center"
          justifyContent={'center'}
        >
          {icon}
          <Typography
            variant="overline"
            color="text.secondary"
            fontWeight={600}
            fontSize={'1rem'}
          >
            {title}
          </Typography>
          <Divider color="secondary" />
          <form
            onSubmit={methods.handleSubmit(handleOnSubmit)}
            style={{ width: '100%' }}
          >
            {children}
            <Button
              variant="contained"
              type="submit"
              disabled={
                !methods.formState.isValid || methods.formState.isSubmitting
              }
              sx={{ textAlign: 'center', display: 'block', mx: 'auto', mt: 2 }}
            >
              {SubmitButtonText}
            </Button>
          </form>
        </Box>
      </Paper>
    </FormProvider>
  );
}
