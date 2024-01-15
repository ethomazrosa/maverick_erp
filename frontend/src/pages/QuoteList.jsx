import React from 'react'
import { Box, Toolbar, IconButton, Typography } from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'

function QuoteList() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', heigth: '100%' }}>
            <Toolbar variant='dense' disableGutters sx={{ minHeight: 20, height: 20 }}>
                <IconButton component={Link} to='/' edge='start'>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center' }}>
                    Orçamentos
                </Typography>
                <IconButton color='inherit' edge='end' component={Link} to='/quotes/:new'>
                    <AddIcon />
                </IconButton>
            </Toolbar>
            <Box sx={{ display: 'flex', flexGrow: 1, mt: 1 }}>
                <Box sx={{
                    flexGrow: 1,
                    width: 250,
                    '& .header': {
                        backgroundColor: 'secondary.main',

                    },
                }}>

                </Box>
            </Box>
        </Box>
    )
}

export default QuoteList