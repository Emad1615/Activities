import {
  Box,
  CircularProgress,
  debounce,
  List,
  ListItemButton,
  TextField,
  type TextFieldProps,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';
import axios from 'axios';

type Props<T extends FieldValues> = {} & UseControllerProps<T> & TextFieldProps;
export default function LocationInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<LocationIQSuggestions[]>([]);
  const [inputValue, setInputValue] = useState({});
  const locationUrl = `https://api.locationiq.com/v1/autocomplete?key=${
    import.meta.env.VITE_LOCATION_IQ_ACCESS_TOKEN
  }&limit=5&dedupe=1&`;
  useEffect(() => {
    if (field.value && typeof field.value === 'object') {
      setInputValue(field.value.venue || '');
    } else {
      setInputValue(field.value || '');
    }
  }, [field]);
  const fetchSuggestionLocation = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query && query.length < 3) {
          setSuggestions([]);
          return;
        }
        setIsLoading(true);
        try {
          const response = await axios.get<LocationIQSuggestions[]>(
            `${locationUrl}q=${query}}`
          );
          setSuggestions(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }, 500),
    [locationUrl]
  );
  const handleChange = async (value: string) => {
    field.onChange(value);
    await fetchSuggestionLocation(value);
  };
  const handleSelect = (data: LocationIQSuggestions) => {
    const city =
      data.address?.city || data.address?.town || data.address?.village;
    const venue = data.display_name;
    const latitude = data.lat;
    const longitude = data.lon;
    setInputValue(venue);
    field.onChange({
      city: city,
      venue: venue,
      latitude: latitude,
      longitude: longitude,
    });
    setSuggestions([]);
  };
  return (
    <Box display={'flex'} flexDirection={'column'} gap={1}>
      <TextField
        {...props}
        {...field}
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        variant="outlined"
        fullWidth
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
      {isLoading && <CircularProgress size="30px" />}
      {suggestions.length > 0 && (
        <List>
          {suggestions.map((item, idx) => (
            <ListItemButton
              key={idx}
              divider
              onClick={() => handleSelect(item)}
            >
              {item.display_name}
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}
