import React from 'react'
import { Grid, Paper } from '@mui/material'

function Dashboard() {

    return (
        <>
            <Grid container columnSpacing={2} rowSpacing={2}>
                <Grid item textAlign='center' lg={8} sm={6} xs={12}>
                    <Paper sx={{ height:'5rem', padding: '1rem' }}>
                        Em
                    </Paper>
                </Grid>
                <Grid item textAlign='center' lg={4} sm={6} xs={12}>
                    <Paper sx={{ height:'5rem', padding: '1rem' }}>
                        breve
                    </Paper>
                </Grid>
                <Grid item textAlign='center' lg={5} sm={6} xs={12}>
                    <Paper sx={{ height:'5rem', padding: '1rem' }}>
                        aqui
                    </Paper>
                </Grid>
                <Grid item textAlign='center' lg={5} sm={6} xs={12}>
                    <Paper sx={{ height:'5rem', padding: '1rem' }}>
                        estará
                    </Paper>
                </Grid>
                <Grid item textAlign='center' lg={2} sm={6} xs={12}>
                    <Paper sx={{ height:'5rem', padding: '1rem' }}>
                        o
                    </Paper>
                </Grid>
                <Grid item textAlign='center' lg={12} sm={6} xs={12}>
                    <Paper sx={{ height:'5rem', padding: '1rem' }}>
                        dashboard
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard