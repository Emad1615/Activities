import { TextField, type TextFieldProps } from '@mui/material';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type Props<T extends FieldValues> = { id?: string } & UseControllerProps<T> &
  TextFieldProps;

export default function InputText<T extends FieldValues>({
  id,
  ...props
}: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  return (
    <TextField
      fullWidth
      {...field}
      {...props}
      id={id}
      value={field.value || ''}
      variant="filled"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      size="small"
    />
  );
}
