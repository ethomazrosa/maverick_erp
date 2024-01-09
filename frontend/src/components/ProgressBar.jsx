import React from 'react'
import { Grid, CircularProgress } from '@mui/material'

function ProgressBar() {
    return (
        <Grid container justifyContent='center' alignItems='center' style={{ height: '80vh' }}>
            <CircularProgress />
        </Grid>
    )
}

export default ProgressBar