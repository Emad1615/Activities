import { Box, type SxProps, type Theme } from '@mui/material';
import type { ReactNode } from 'react';
type Props = {
  sx?: SxProps<Theme>;
  children: ReactNode;
};
export default function CustomCell({ sx, children }: Props) {
  return (
    <Box
      component={'span'}
      sx={{
        height: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
