import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { Constants } from '../../utils/constants'
import { AppBar, Box, Toolbar, Drawer, IconButton, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

// Components
import DrawerItemList from './DrawerItemList'
import DrawerMenu from './DrawerMenu'

const drawerWidth = 300

function ResponsiveDrawer(props) {
    const { window } = props
    const navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [token] = useCookies([Constants.TOKEN_NAME_COOKIE])

    useEffect(() => {
        if (!token[Constants.TOKEN_NAME_COOKIE] || token[Constants.TOKEN_NAME_COOKIE] === undefined)
            navigate('/auth')
        // eslint-disable-next-line
    }, [token])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const container = window !== undefined ? () => window().document.body : undefined

    return (
        <Box sx={{ display: 'flex', backgroundColor: 'primary.main', minHeight: '100vh' }}>
            <AppBar
                elevation={0}
                position='fixed'
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color='inherit'
                        edge='start'
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h4' noWrap component='div' align='center' sx={{ flexGrow: 1 }}>
                        ERP Lan & Cia
                    </Typography>
                    <DrawerMenu />
                </Toolbar>
            </AppBar>
            <Box component='nav' sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
                <Drawer
                    container={container}
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <DrawerItemList />
                </Drawer>
                <Drawer
                    variant='permanent'
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', borderColor: 'primary.main', width: drawerWidth },
                    }}
                    open
                >
                    <DrawerItemList />
                </Drawer>
            </Box>
            <Box component='main' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: 1 }}>
                <Toolbar />
                <Box sx={{
                    backgroundColor: 'background.default',
                    borderRadius: '8px',
                    p: 2,
                    flexGrow: 1
                }}>
                    {props.content}
                </Box>
            </Box>
        </Box>
    )
}

export default ResponsiveDrawer