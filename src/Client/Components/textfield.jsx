import * as React from 'react';
import TextField from '@mui/material/TextField';

export const MUITextField = ({id, label, text, setText}) => {
  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
      <TextField
        id={id}
        label={label}
        value={text}
        onChange={handleChange}
      />
  );
}