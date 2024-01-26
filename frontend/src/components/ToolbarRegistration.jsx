import React from 'react'
import { Toolbar, IconButton, Typography } from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Link } from 'react-router-dom'

function ToolbarRegistration({ backTo, idRegistration, title, clickDelete }) {
    return (
        <Toolbar variant='dense' disableGutters sx={{ minHeight: 20, height: 20 }}>
            <IconButton component={Link} to={backTo} edge='start'>
                <ArrowBackOutlinedIcon />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center' }}>
                {title}
            </Typography>
            {idRegistration !== ':new' && (
                <IconButton color='error' edge='end' onClick={clickDelete}>
                    <DeleteOutlinedIcon />
                </IconButton>
            )}
            <IconButton color='inherit' edge='end' form='form' type='submit'>
                <SaveOutlinedIcon />
            </IconButton>
        </Toolbar>
    )
}

export default ToolbarRegistration