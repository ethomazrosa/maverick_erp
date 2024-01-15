import React, { useState } from 'react'
import { Box, Toolbar, IconButton, Typography, Container, Grid } from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Link, useParams } from 'react-router-dom'

function Quote() {

    const params = useParams()

    return (
        <>
            <Toolbar variant='dense' disableGutters sx={{ minHeight: 20, height: 20 }}>
                <IconButton component={Link} to='/quotes/' edge='start'>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center' }}>
                    Novo Orçamento
                </Typography>
                <IconButton color='inherit' edge='end' form='form' type='submit'>
                    <SaveOutlinedIcon />
                </IconButton>
            </Toolbar>
            <Container component='main' maxWidth='lg' disableGutters sx={{ mt: '2rem' }}>
                <Box component='form' id='form'>
                    <Grid container justifyContent='start' columnSpacing={2} rowSpacing={2}>

                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default Quote