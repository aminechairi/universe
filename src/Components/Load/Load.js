import "./Load.css"
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function CircularIndeterminate() {
  return (
    <Box className='ab_Load'>
      <CircularProgress />
    </Box>
  );
}
export default CircularIndeterminate;