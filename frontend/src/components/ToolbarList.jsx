import React from 'react'
import { Toolbar, IconButton, Typography } from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'

function ToolbarList({ title, clickNew }) {
    return (
        <Toolbar variant='dense' disableGutters sx={{ minHeight: 20, height: 20 }}>
            <IconButton component={Link} to='/' edge='start'>
                <ArrowBackOutlinedIcon />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center' }}>
                {title}
            </Typography>
            <IconButton color='inherit' edge='end' component={Link} to={clickNew}>
                <AddIcon />
            </IconButton>
        </Toolbar>
    )
}

export default ToolbarList