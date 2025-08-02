import type { DateTimePickerProps } from "@mui/x-date-pickers";
import {
  type UseControllerProps,
  type FieldValues,
  useController,
} from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

type Props<T extends FieldValues> = {} & UseControllerProps<T> &
  DateTimePickerProps;
export default function DateTimeInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  return (
      <DateTimePicker
        {...props}
        sx={{ width: "100%" }}
        value={field.value ? new Date(field.value) : null}
        onChange={(value) => field.onChange(new Date(value!))}
        slotProps={{
          textField: {
            onBlur: field.onBlur,
            error: !!fieldState.error,
            helperText: fieldState.error?.message,
          },
        }}
      />
  );
}
