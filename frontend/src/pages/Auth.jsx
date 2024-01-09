import React, { useState, useEffect } from 'react'
import { Alert, Avatar, Grid, Box, Paper, Typography, TextField, Button } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useCookies } from 'react-cookie'
import { Constants } from '../utils/constants'
import { useNavigate } from 'react-router-dom'
import { usePost, useGet } from '../hooks/useApi'
import { ProgressBar } from '../components'

function Auth() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    // eslint-disable-next-line
    const [token, setToken] = useCookies([Constants.TOKEN_NAME_COOKIE])
    const [errorMessage, setErrorMessage] = useState('')
    const postLogin = usePost('http://127.0.0.1:8000/auth/', false, true)
    const getCurrentUser = useGet('http://127.0.0.1:8000/users/current_user/')

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        setLoading(true)
        postLogin({
            username: formData.get('username'),
            password: formData.get('password'),
        })
            .then(response => {
                setToken(Constants.TOKEN_NAME_COOKIE, response.token, { path: '/' })
            })
            .catch(error => {
                setErrorMessage('Usuário ou senha inválidos')
                setLoading(false)
            })
    }

    useEffect(() => {
        if (token[Constants.TOKEN_NAME_COOKIE] && token[Constants.TOKEN_NAME_COOKIE] !== undefined) {
            getCurrentUser()
                .then(response => {
                    setToken(Constants.ID_USER_COOKIE, response[0]['id'], { path: '/' })
                    setToken(Constants.USERNAME_COOKIE, response[0]['username'], { path: '/' })
                    setToken(Constants.EMAIL_COOKIE, response[0]['email'], { path: '/' })
                    setToken(Constants.FIRST_NAME_COOKIE, response[0]['first_name'], { path: '/' })
                    setToken(Constants.LAST_NAME_COOKIE, response[0]['last_name'], { path: '/' })
                    setLoading(false)
                    navigate('/')
                })
                .catch(error => {
                    console.log(error.response.data)
                    setLoading(false)
                })
        }
        // eslint-disable-next-line
    }, [token])

    if (loading) {
        return <ProgressBar />
    }

    return (
        <Grid
            container
            alignItems='center'
            justifyContent='center'
            sx={{ backgroundColor: 'primary.main', minHeight: '100vh' }}>
            <Paper
                elevation={5}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '2rem',
                    maxWidth: '444px'
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Entrar
                </Typography>

                {errorMessage ? (<Alert severity='error'>{errorMessage}</Alert>) : ''}

                <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='username'
                        label='Usuário'
                        name='username'
                        autoFocus
                    // onChange={() => setErrorMessage('')}
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Senha'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                    // onChange={() => setErrorMessage('')}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Entrar
                    </Button>
                </Box>
            </Paper>
        </Grid>
    )
}

export default Auth