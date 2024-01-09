import React, { useEffect, useState } from 'react'
import {
    Container, Paper, Box, TextField, Typography, Button,
    IconButton, Avatar, Grid
} from '@mui/material'
import { useGet, usePut } from '../hooks/useApi'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Constants } from '../utils/constants'
import { ProgressBar } from '../components'

function Profile() {

    const navigate = useNavigate()
    const [userCookie] = useCookies([Constants.ID_USER_COOKIE])
    const userId = userCookie[Constants.ID_USER_COOKIE]
    const userFirstName = userCookie[Constants.FIRST_NAME_COOKIE]
    const userLastname = userCookie[Constants.LAST_NAME_COOKIE]
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({})
    const putProfile = usePut(`http://127.0.0.1:8000/users/profiles/${userId}/`, true)
    const getProfile = useGet(`http://127.0.0.1:8000/users/profiles/${userId}/`)

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleImage(e) {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] })
    }

    useEffect(() => {
        getProfile()
            .then(response => {
                setFormData(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error.response.data)
                setLoading(false)
            })
        // eslint-disable-next-line
    }, [])

    function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)
        if (typeof formData.profile_picture === 'string' || formData.profile_picture === null) {
            const { profile_picture, ...noPicture } = formData
            putProfile(noPicture)
                .then(response => {
                    setLoading(false)
                    navigate('/')
                })
                .catch(error => {
                    console.log(error.response.data)
                    setLoading(false)
                })
        } else {
            putProfile(formData)
                .then(response => {
                    setLoading(false)
                    navigate('/')
                })
                .catch(error => {
                    console.log(error.response.data)
                    setLoading(false)
                })
        }
    }

    if (loading) {
        return <ProgressBar />
    }

    return (
        <>
            <Container component='main' maxWidth='sm'>
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '2rem'
                    }}
                >
                    <Typography component='h1' variant='h5'>
                        Perfil de {userFirstName + ' ' + userLastname}
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                        <Grid container>
                            <Grid item xs={12} sm={6} textAlign='center'>
                                <IconButton color='primary' aria-label='upload picture' component='label'>
                                    <input hidden accept='image/*' type='file' name='profile_picture' onChange={handleImage} />
                                    <Avatar
                                        alt=''
                                        src={formData.profile_picture}
                                        sx={{
                                            width: {
                                                xs: '10rem',
                                                md: '12rem'
                                            },
                                            height: {
                                                xs: '10rem',
                                                md: '12rem'
                                            }
                                        }}
                                    />
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='identification_number'
                                    label='CPF'
                                    name='identification_number'
                                    type='number'
                                    autoFocus
                                    // disabled
                                    value={formData.identification_number || ''}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='phone_number'
                                    label='Telefone'
                                    name='phone_number'
                                    type='number'
                                    value={formData.phone_number || ''}
                                    onChange={handleChange}
                                />
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    sx={{ mt: 2 }}
                                >
                                    Atualizar
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </>
    )
}

export default Profile