import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
    return (
        <Box sx={{
            height: "100%",
            width: "100%", 
            display: 'flex', 
            justifyContent: "center", 
            alignItems: "center"
        }}>
            <CircularProgress />
        </Box>
    );
}
