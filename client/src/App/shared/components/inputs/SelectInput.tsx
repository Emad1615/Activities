import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps,
} from '@mui/material';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type Props<T extends FieldValues> = {
  label: string;
  id?: string;
  items: { value: string; text: string }[];
} & UseControllerProps<T> &
  Partial<SelectProps>;
export default function SelectInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        id={props.id}
        label={props.label}
        value={field.value || ''}
        onChange={field.onChange}
        variant="outlined"
      >
        {props.items.map(
          (item: { value: string; text: string }, idx: number) => (
            <MenuItem value={item.value} key={idx}>
              {item.text}
            </MenuItem>
          )
        )}
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
