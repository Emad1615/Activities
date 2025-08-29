import { Button, styled, type ButtonProps } from '@mui/material';
import type { LinkProps } from 'react-router';

type Props = ButtonProps & Partial<LinkProps>;
export const StyledButton = styled(Button)<Props>(({ theme }) => ({
  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.text.disabled,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
}));
