import * as React from 'react';
import Button from '@mui/material/Button';

export const MUIButton = ({label, variant}) => {
  return (
    <div>
      <Button variant={variant}>{label}</Button>
    </div>
  );
}
