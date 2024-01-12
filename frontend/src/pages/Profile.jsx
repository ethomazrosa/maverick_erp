import React, { useEffect, useState } from 'react'
import {
    Container, Paper, Box, TextField, Typography, Button,
    IconButton, Avatar, Grid, Snackbar, Alert,
} from '@mui/material'
import { useGet, usePut } from '../hooks/useApi'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Constants } from '../utils/constants'
import { ProgressBar } from '../components'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { PatternFormat } from 'react-number-format'

const validationSchema = object({
    identification_number: string().required('Por favor preencha o CPF.'),
    phone_number: string().required('Por favor preencha o telefone.')
})

const emptyProfile = {
    id: '',
    identification_number: '',
    phone_number: '',
    profile_picture: '',
    employee: ''
}

function Profile() {

    const navigate = useNavigate()
    const [userCookie] = useCookies([Constants.ID_USER_COOKIE])
    const userId = userCookie[Constants.ID_USER_COOKIE]
    const userFirstName = userCookie[Constants.FIRST_NAME_COOKIE]
    const userLastname = userCookie[Constants.LAST_NAME_COOKIE]
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState(emptyProfile)
    const [errorMessage, setErrorMessage] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const putProfile = usePut(`/api/users/profiles/${userId}/`, true)
    const getProfile = useGet(`/api/users/profiles/${userId}/`)
    const formik = useFormik({
        initialValues: profile,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)
            if (typeof profile.profile_picture === 'string' || profile.profile_picture === null) {
                const { profile_picture, ...noPicture } = values
                putProfile(noPicture)
                    .then(response => {
                        setLoading(false)
                        navigate('/')
                    })
                    .catch(error => {
                        setErrorMessage(JSON.stringify(error.response.data))
                        setOpenSnackbar(true)
                        setLoading(false)
                    })
            } else {
                putProfile(values)
                    .then(response => {
                        setLoading(false)
                        navigate('/')
                    })
                    .catch(error => {
                        setErrorMessage(JSON.stringify(error.response.data))
                        setOpenSnackbar(true)
                        setLoading(false)
                    })
            }
        }
    })

    useEffect(() => {
        getProfile()
            .then(response => {
                setProfile(response)
                setLoading(false)
            })
            .catch(error => {
                setErrorMessage(JSON.stringify(error.response.data))
                setOpenSnackbar(true)
                setLoading(false)
            })
        // eslint-disable-next-line
    }, [])

    function handleImage(e) {
        setProfile({ ...profile, [e.target.name]: e.target.files[0] })
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
                        padding: '2rem',
                        gap: 2
                    }}
                >
                    <Typography component='h1' variant='h5'>
                        Perfil de {userFirstName + ' ' + userLastname}
                    </Typography>
                    <Box component='form' id='form' onSubmit={formik.handleSubmit}>
                        <Grid container>
                            <Grid item xs={12} sm={6} textAlign='center'>
                                <IconButton color='primary' aria-label='upload picture' component='label'>
                                    <input hidden accept='image/*' type='file' name='profile_picture' onChange={handleImage} />
                                    <Avatar
                                        alt=''
                                        src={profile.profile_picture}
                                        sx={{
                                            width: {
                                                xs: '11rem',
                                                md: '13rem'
                                            },
                                            height: {
                                                xs: '11rem',
                                                md: '13rem'
                                            }
                                        }}
                                    />
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <PatternFormat
                                            id='identification_number'
                                            label='CPF'
                                            fullWidth
                                            customInput={TextField}
                                            format='###.###.###-##'
                                            mask='_'
                                            //autoFocus
                                            onValueChange={v => formik.setFieldValue('identification_number', v.floatValue ?? '')}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.identification_number}
                                            error={formik.touched.identification_number && Boolean(formik.errors.identification_number)}
                                            helperText={formik.touched.identification_number && formik.errors.identification_number}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <PatternFormat
                                            id='phone_number'
                                            label='Telefone'
                                            fullWidth
                                            customInput={TextField}
                                            format='(##) ##### ####'
                                            mask='_'
                                            onValueChange={v => formik.setFieldValue('phone_number', v.floatValue ?? '')}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.phone_number}
                                            error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                                            helperText={formik.touched.phone_number && formik.errors.phone_number}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button form='form' type='submit' fullWidth variant='contained'>
                                            Atualizar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Profile