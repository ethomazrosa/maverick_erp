import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Constants } from '../../utils/constants'
import { useGet } from '../../hooks/useApi'
import { Avatar, Menu, MenuItem, Box, IconButton, Typography } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'

function DrawerMenu() {

    const navigate = useNavigate()
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [userCookie] = useCookies([Constants.ID_USER_COOKIE])
    const userId = userCookie[Constants.ID_USER_COOKIE]
    const getProfile = useGet(`http://127.0.0.1:8000/users/profiles/${userId}/`)
    const [profile_picture, setProfilePicture] = useState('')

    function handleOpenUserMenu(event) {
        setAnchorElUser(event.currentTarget)
    }
    function handleCloseUserMenu() {
        setAnchorElUser(null)
    }

    function logoutUser() {
        const cookies = document.cookie.split(';')
        for (const cookie of cookies) {
            const eqPos = cookie.indexOf('=')
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
        }
        navigate('/auth')
    }

    useEffect(() => {
        getProfile()
            .then(response => {
                setProfilePicture(response.profile_picture)
            })
            .catch(error => console.log(error.response.data))
        // eslint-disable-next-line
    }, [])

    return (
        <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='' src={profile_picture} />
            </IconButton>
            <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem
                    key='profile'
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to='/profiles'
                >
                    <AccountCircleOutlinedIcon sx={{ mr: '1rem' }} />
                    <Typography textAlign='center'>Perfil</Typography>
                </MenuItem>
                <MenuItem key='logout' onClick={logoutUser}>
                    <ExitToAppOutlinedIcon sx={{ mr: '1rem' }} />
                    <Typography textAlign='center'>Sair</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default DrawerMenu