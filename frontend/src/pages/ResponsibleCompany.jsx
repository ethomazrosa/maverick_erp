import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
    Typography, Toolbar, IconButton, Container, Box,
    Grid, Button, TextField, Snackbar, Alert,
} from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { useGet, usePut, usePost } from '../hooks/useApi'
import { ProgressBar } from '../components'

function ResponsibleCompany() {

    const params = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const getResponsibleCompany = useGet(`http://127.0.0.1:8000/registrations/responsible_companies/${params.id}/`)
    const putResponsibleCompany = usePut(`http://127.0.0.1:8000/registrations/responsible_companies/${params.id}/`, true)
    const postResponsibleCompany = usePost(`http://127.0.0.1:8000/registrations/responsible_companies/`, true)

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleImage(e) {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] })
    }

    useEffect(() => {
        if (params.id !== ':new') {
            getResponsibleCompany()
                .then(response => {
                    setFormData(response)
                    setLoading(false)
                })
                .catch(error => {
                    setErrorMessage(JSON.stringify(error.response.data))
                    setOpenSnackbar(true)
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }
        // eslint-disable-next-line
    }, [])

    function handleSubmit(event) {
        event.preventDefault()
        const form = document.getElementById('form')
        if (form.checkValidity()) {
            setLoading(true)
            if (params.id !== ':new') {
                if (typeof formData.logo === 'string' || formData.logo === null) {
                    const { logo, ...noPicture } = formData
                    putResponsibleCompany(noPicture)
                        .then(response => {
                            setLoading(false)
                            navigate('/responsible_companies/')
                        })
                        .catch(error => {
                            setErrorMessage(JSON.stringify(error.response.data))
                            setOpenSnackbar(true)
                            setLoading(false)
                        })
                } else {
                    putResponsibleCompany(formData)
                        .then(response => {
                            setLoading(false)
                            navigate('/responsible_companies/')
                        })
                        .catch(error => {
                            setErrorMessage(JSON.stringify(error.response.data))
                            setOpenSnackbar(true)
                            setLoading(false)
                        })
                }
            } else {
                postResponsibleCompany(formData)
                    .then(response => {
                        setLoading(false)
                        navigate('/responsible_companies/')
                    })
                    .catch(error => {
                        setErrorMessage(JSON.stringify(error.response.data))
                        setOpenSnackbar(true)
                        setLoading(false)
                    })
            }
        } else {
            form.reportValidity()
        }
    }

    if (loading) {
        return <ProgressBar />
    }

    return (
        <>
            <Toolbar variant='dense' disableGutters sx={{ minHeight: 20, height: 20 }}>
                <IconButton component={Link} to='/responsible_companies' edge='start'>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center' }}>
                    {formData.brand_name}
                </Typography>
                <IconButton color='inherit' edge='end' onClick={handleSubmit}>
                    <SaveOutlinedIcon />
                </IconButton>
            </Toolbar>
            <Container component='main' maxWidth='lg' disableGutters sx={{ mt: 2 }}>
                <Box component='form' id='form'>
                    <Grid container justifyContent='start' columnSpacing={2} rowSpacing={2}>
                        <Grid item xs={12}>
                            <Button fullWidth component='label'>
                                <input hidden accept='image/*' type='file' name='logo' onChange={handleImage} />
                                <Box
                                    component='img'
                                    src={formData.logo}
                                    alt='Logo'
                                    sx={{ height: 150, width: '100%', objectFit: 'contain' }}
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id='company_name'
                                label='Razão Social'
                                name='company_name'
                                autoFocus
                                onChange={handleChange}
                                value={formData.company_name || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id='brand_name'
                                label='Nome Fantasia'
                                name='brand_name'
                                onChange={handleChange}
                                value={formData.brand_name || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                required
                                fullWidth
                                id='identification_number'
                                label='CNPJ'
                                name='identification_number'
                                type='number'
                                onChange={handleChange}
                                value={formData.identification_number || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                fullWidth
                                id='municipal_registration'
                                label='Inscrição Municipal'
                                name='municipal_registration'
                                type='number'
                                onChange={handleChange}
                                value={formData.municipal_registration || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                fullWidth
                                id='state_registration'
                                label='Inscrição Estadual'
                                name='state_registration'
                                type='number'
                                onChange={handleChange}
                                value={formData.state_registration || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                required
                                fullWidth
                                id='email'
                                label='Email'
                                name='email'
                                type='email'
                                onChange={handleChange}
                                value={formData.email || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                fullWidth
                                id='phone'
                                label='Telefone Fixo'
                                name='phone'
                                type='tel'
                                onChange={handleChange}
                                value={formData.phone || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                required
                                fullWidth
                                id='mobile_phone'
                                label='Telefone Ceular'
                                name='mobile_phone'
                                type='tel'
                                onChange={handleChange}
                                value={formData.mobile_phone || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                            <TextField
                                required
                                fullWidth
                                id='address_name'
                                label='Logradouro'
                                name='address_name'
                                onChange={handleChange}
                                value={formData.address_name || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={2}>
                            <TextField
                                required
                                fullWidth
                                id='address_number'
                                label='Número'
                                name='address_number'
                                type='number'
                                onChange={handleChange}
                                value={formData.address_number || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                fullWidth
                                id='address_complement'
                                label='Complemento'
                                name='address_complement'
                                onChange={handleChange}
                                value={formData.address_complement || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                required
                                fullWidth
                                id='neighborhood'
                                label='Bairro'
                                name='neighborhood'
                                onChange={handleChange}
                                value={formData.neighborhood || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3}>
                            <TextField
                                required
                                fullWidth
                                id='city'
                                label='Cidade'
                                name='city'
                                onChange={handleChange}
                                value={formData.city || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={2}>
                            <TextField
                                required
                                fullWidth
                                id='state'
                                label='Estado'
                                name='state'
                                onChange={handleChange}
                                value={formData.state || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3}>
                            <TextField
                                required
                                fullWidth
                                id='postal_code'
                                label='CEP'
                                name='postal_code'
                                type='number'
                                onChange={handleChange}
                                value={formData.postal_code || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                required
                                fullWidth
                                id='color'
                                label='Cor'
                                name='color'
                                onChange={handleChange}
                                value={formData.color || ''}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ResponsibleCompany