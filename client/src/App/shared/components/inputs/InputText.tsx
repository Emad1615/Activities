import { TextField, type TextFieldProps } from '@mui/material';
import {
  useController,
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type Props<T extends FieldValues> = { id?: string } & UseControllerProps<T> &
  TextFieldProps;

export default function InputText<T extends FieldValues>({
  id,
  control,
  ...props
}: Props<T>) {
  const formContext = useFormContext<T>();
  const effectiveControll = control || formContext.control;
  if (!effectiveControll) {
    throw new Error(
      'InputText must be used within a FormProvider or with a control prop.'
    );
  }
  const { field, fieldState } = useController({
    ...props,
    control: effectiveControll,
  });
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
