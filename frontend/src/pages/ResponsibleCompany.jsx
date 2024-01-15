import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
    Typography, Toolbar, IconButton, Container, Box,
    Grid, Button, TextField, Snackbar, Alert, Autocomplete,
} from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { useGet, usePut, usePost } from '../hooks/useApi'
import { ProgressBar } from '../components'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { PatternFormat } from 'react-number-format'

const validationSchema = object({
    company_name: string().required('Por favor preencha a razão social.'),
    brand_name: string().required('Por favor preencha o nome fantasia.'),
    identification_number: string().required('Por favor preencha o CNPJ.'),
    email: string().email('Por favor preencha um email válido').required('Por favor preencha o email'),
    mobile_phone: string().required('Por favor preencha telefone celular.'),
    address_name: string().required('Por favor preencha o logradouro.'),
    address_number: string().required('Por favor preencha o número.'),
    neighborhood: string().required('Por favor preencha o bairro.'),
    city: string().required('Por favor preencha a cidade.'),
    state: string().required('Por favor preencha o estado.'),
    postal_code: string().required('Por favor preencha o CEP.'),
    color: string().required('Por favor preencha a cor da empresa.')
})

const emptyResponsibleCompany = {
    id: '',
    identification_number: '',
    company_name: '',
    brand_name: '',
    municipal_registration: '',
    state_registration: '',
    email: '',
    phone: '',
    mobile_phone: '',
    address_name: '',
    address_number: '',
    address_complement: '',
    neighborhood: '',
    city: '',
    state: '',
    postal_code: '',
    color: '',
    logo: ''
}

const states = [
    { label: '', code: '' },
    { label: 'Acre', code: 'AC' },
    { label: 'Alagoas', code: 'AL' },
    { label: 'Amapá', code: 'AP' },
    { label: 'Amazonas', code: 'AM' },
    { label: 'Bahia', code: 'BA' },
    { label: 'Ceará', code: 'CE' },
    { label: 'Distrito Federal', code: 'DF' },
    { label: 'Espírito Santo', code: 'ES' },
    { label: 'Goiás', code: 'GO' },
    { label: 'Maranhão', code: 'MA' },
    { label: 'Mato Grosso', code: 'MT' },
    { label: 'Mato Grosso do Sul', code: 'MS' },
    { label: 'Minas Gerais', code: 'MG' },
    { label: 'Pará', code: 'PA' },
    { label: 'Paraíba', code: 'PB' },
    { label: 'Paraná', code: 'PR' },
    { label: 'Pernambuco', code: 'PE' },
    { label: 'Piauí', code: 'PI' },
    { label: 'Rio de Janeiro', code: 'RJ' },
    { label: 'Rio Grande do Norte', code: 'RN' },
    { label: 'Rio Grande do Sul', code: 'RS' },
    { label: 'Rondônia', code: 'RO' },
    { label: 'Roraima', code: 'RR' },
    { label: 'Santa Catarina', code: 'SC' },
    { label: 'São Paulo', code: 'SP' },
    { label: 'Sergipe', code: 'SE' },
    { label: 'Tocantins', code: 'TO' },
]

function ResponsibleCompany() {

    const params = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [responsibleCompany, setResponsibleCompany] = useState(emptyResponsibleCompany)
    const [errorMessage, setErrorMessage] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const getResponsibleCompany = useGet(`/api/registrations/responsible_companies/${params.id}/`)
    const putResponsibleCompany = usePut(`/api/registrations/responsible_companies/${params.id}/`, true)
    const postResponsibleCompany = usePost(`/api/registrations/responsible_companies/`, true)
    const formik = useFormik({
        initialValues: responsibleCompany,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)
            if (params.id !== ':new') {
                if (typeof responsibleCompany.logo === 'string' || responsibleCompany.logo === null) {
                    const { logo, ...noPicture } = values
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
                    putResponsibleCompany(values)
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
                postResponsibleCompany(values)
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
        }
    })

    function handleImage(e) {
        setResponsibleCompany({ ...responsibleCompany, [e.target.name]: e.target.files[0] })
    }

    useEffect(() => {
        if (params.id !== ':new') {
            getResponsibleCompany()
                .then(response => {
                    setResponsibleCompany(response)
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
                    {responsibleCompany.brand_name}
                </Typography>
                <IconButton color='inherit' edge='end' form='form' type='submit'>
                    <SaveOutlinedIcon />
                </IconButton>
            </Toolbar>
            <Container component='main' maxWidth='lg' disableGutters sx={{ mt: '2rem' }}>
                <Box component='form' id='form' onSubmit={formik.handleSubmit}>
                    <Grid container justifyContent='start' columnSpacing={2} rowSpacing={2}>
                        <Grid item xs={12}>
                            <Button fullWidth component='label'>
                                <input hidden accept='image/*' type='file' name='logo' onChange={handleImage} />
                                <Box
                                    component='img'
                                    src={responsibleCompany.logo}
                                    alt='Logo'
                                    sx={{ height: 150, width: '100%', objectFit: 'contain' }}
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id='company_name'
                                label='Razão Social'
                                error={formik.touched.company_name && Boolean(formik.errors.company_name)}
                                helperText={formik.touched.company_name && formik.errors.company_name}
                                {...formik.getFieldProps('company_name')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id='brand_name'
                                label='Nome Fantasia'
                                error={formik.touched.brand_name && Boolean(formik.errors.brand_name)}
                                helperText={formik.touched.brand_name && formik.errors.brand_name}
                                {...formik.getFieldProps('brand_name')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} lg={2.5}>
                            <PatternFormat
                                fullWidth
                                id='identification_number'
                                label='CNPJ'
                                customInput={TextField}
                                format={'##.###.###/####-##'}
                                mask='_'
                                onValueChange={v => formik.setFieldValue('identification_number', v.floatValue ?? '')}
                                onBlur={formik.handleBlur}
                                value={formik.values.identification_number}
                                error={formik.touched.identification_number && Boolean(formik.errors.identification_number)}
                                helperText={formik.touched.identification_number && formik.errors.identification_number}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} lg={2.5}>
                            <TextField
                                fullWidth
                                id='municipal_registration'
                                label='Inscrição Municipal'
                                type='number'
                                {...formik.getFieldProps('municipal_registration')}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} lg={2.5}>
                            <TextField
                                fullWidth
                                id='state_registration'
                                label='Inscrição Estadual'
                                type='number'
                                {...formik.getFieldProps('state_registration')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4.5}>
                            <TextField
                                fullWidth
                                id='email'
                                label='Email'
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                {...formik.getFieldProps('email')}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3} lg={2}>
                            <PatternFormat
                                fullWidth
                                id='phone'
                                label='Telefone Fixo'
                                customInput={TextField}
                                format='(##) ####-####'
                                mask='_'
                                onValueChange={v => formik.setFieldValue('phone', v.floatValue ?? '')}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3} lg={2}>
                            <PatternFormat
                                fullWidth
                                id='mobile_phone'
                                label='Telefone Ceular'
                                customInput={TextField}
                                format='(##) #####-####'
                                mask='_'
                                onValueChange={v => formik.setFieldValue('mobile_phone', v.floatValue ?? '')}
                                onBlur={formik.handleBlur}
                                value={formik.values.mobile_phone}
                                error={formik.touched.mobile_phone && Boolean(formik.errors.mobile_phone)}
                                helperText={formik.touched.mobile_phone && formik.errors.mobile_phone}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={8}>
                            <TextField
                                fullWidth
                                id='address_name'
                                label='Logradouro'
                                error={formik.touched.address_name && Boolean(formik.errors.address_name)}
                                helperText={formik.touched.address_name && formik.errors.address_name}
                                {...formik.getFieldProps('address_name')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} lg={2}>
                            <TextField
                                fullWidth
                                id='address_number'
                                label='Número'
                                type='number'
                                error={formik.touched.address_number && Boolean(formik.errors.address_number)}
                                helperText={formik.touched.address_number && formik.errors.address_number}
                                {...formik.getFieldProps('address_number')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} lg={4}>
                            <TextField
                                fullWidth
                                id='address_complement'
                                label='Complemento'
                                {...formik.getFieldProps('address_complement')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                            <TextField
                                fullWidth
                                id='neighborhood'
                                label='Bairro'
                                error={formik.touched.neighborhood && Boolean(formik.errors.neighborhood)}
                                helperText={formik.touched.neighborhood && formik.errors.neighborhood}
                                {...formik.getFieldProps('neighborhood')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3}>
                            <TextField
                                fullWidth
                                id='city'
                                label='Cidade'
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                                {...formik.getFieldProps('city')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3.5}>
                            <Autocomplete
                                disablePortal
                                id='state_ac'
                                options={states}
                                onChange={(e, value) => {
                                    formik.setFieldValue('state', value?.code || '')
                                }}
                                onBlur={formik.handleBlur}
                                value={states.find(s => s.code === formik.values.state)}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        id='state'
                                        label='Estado'
                                        fullWidth
                                        error={formik.touched.state && Boolean(formik.errors.state)}
                                        helperText={formik.touched.state && formik.errors.state}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={1.5}>
                            <PatternFormat
                                fullWidth
                                id='postal_code'
                                label='CEP'
                                customInput={TextField}
                                format='#####-###'
                                mask='_'
                                onValueChange={v => formik.setFieldValue('postal_code', v.floatValue ?? '')}
                                onBlur={formik.handleBlur}
                                value={formik.values.postal_code}
                                error={formik.touched.postal_code && Boolean(formik.errors.postal_code)}
                                helperText={formik.touched.postal_code && formik.errors.postal_code}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                fullWidth
                                id='color'
                                label='Cor'
                                error={formik.touched.color && Boolean(formik.errors.color)}
                                helperText={formik.touched.color && formik.errors.color}
                                {...formik.getFieldProps('color')}
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