import { Box, Divider, Paper, Typography } from '@mui/material';
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
  onSubmit?: (data: TFormData) => void;
  resolver: Resolver<TFormData>;
};

export default function AccountFormWrapper<TFormData extends FieldValues>({
  title,
  icon,
  children,
  resolver,
  onSubmit,
}: Props<TFormData>) {
  const methods = useForm<TFormData>({ resolver, mode: 'onTouched' });
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
          <Typography variant="h4" color="text.secondary" fontWeight={600}>
            {title}
          </Typography>
          <Divider color="secondary" />
          <form onSubmit={methods.handleSubmit(() => {})}>{children}</form>
        </Box>
      </Paper>
    </FormProvider>
  );
}
