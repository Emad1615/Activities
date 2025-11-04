import { Avatar, Chip, Stack, Typography } from '@mui/material';
import type { GridCellParams } from '@mui/x-data-grid';
import CustomCell from '../../../../App/shared/CustomCell';
import { fnFormat } from '../../../../lib/utils/helper';

export function RenderCellActivityName({ params }: { params: GridCellParams }) {
  const { title, category } = params.row ?? {};
  return (
    <Stack
      direction={'row'}
      gap={1}
      alignItems={'center'}
      justifyContent={'flex-start'}
      py={1}
      sx={{
        height: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Avatar
        variant="rounded"
        src={`/images/categoryImages/${category}.jpg`}
      />
      <Typography
        title={title}
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        variant="subtitle2"
        color="primary"
      >
        {title}
      </Typography>
    </Stack>
  );
}

type CategoryKey = 'drinks' | 'travel' | 'film' | 'culture' | 'food' | 'music';
export function RenderCellCategory({ params }: { params: GridCellParams }) {
  const { category } = (params.row as Activity) ?? {};
  const categoryOptions: Record<
    CategoryKey,
    {
      label: string;
      color: 'error' | 'info' | 'primary' | 'secondary' | 'success' | 'warning';
    }
  > = {
    drinks: { label: 'Drinks', color: 'error' as const },
    travel: { label: 'Travel', color: 'info' as const },
    film: { label: 'Film', color: 'primary' as const },
    culture: { label: 'Culture', color: 'secondary' as const },
    food: { label: 'Food', color: 'success' as const },
    music: { label: 'Music', color: 'warning' as const },
  };
  const { label, color } =
    categoryOptions[category as keyof typeof categoryOptions] ||
    categoryOptions['drinks' as keyof typeof categoryOptions];
  return (
    <CustomCell>
      <Chip size="small" color={color} variant="outlined" label={label} />
    </CustomCell>
  );
}

export function RenderCellDescription({ params }: { params: GridCellParams }) {
  const { description } = (params.row as Activity) ?? {};

  return (
    <CustomCell>
      <Typography
        title={description}
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        variant="overline"
      >
        {description}
      </Typography>
    </CustomCell>
  );
}
export function RenderCellDate({ params }: { params: GridCellParams }) {
  const { date } = (params.row as Activity) ?? {};

  return <CustomCell>{fnFormat(new Date(date))}</CustomCell>;
}
export function RenderCellLocation({ params }: { params: GridCellParams }) {
  const { city, venue } = (params.row as Activity) ?? {};

  return <CustomCell>{`${city}, ${venue}`}</CustomCell>;
}
