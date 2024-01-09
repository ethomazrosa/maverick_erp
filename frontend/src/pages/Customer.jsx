import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
    Typography, Toolbar, IconButton, TextField, Dialog, DialogTitle,
    Box, Container, Grid, DialogActions, Button, Autocomplete,
} from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { NumericFormat, PatternFormat } from 'react-number-format'
import { useDelete, useGet, usePost, usePut } from '../hooks/useApi'
import { ProgressBar } from '../components'

const validationSchema = object({
    person_type: string().required('Por favor escolha um tipo de pessoa.'),
    // name: string().required('Por favor preencha o nome.'),
    // company_name: string().required('Por favor preencha o nome fantasia.'),
    // brand_name: string().required('Por favor preencha a razão social.'),
    identification_number: string().required('Por favor preencha o CPF/CNPJ.'),
    email: string().required('Por favor preencha o email.'),
    mobile_phone: string().required('Por favor preencha o telefone celular.'),
    address_name: string().required('Por favor preencha o endereço.'),
    address_number: string().required('Por favor preencha o número.'),
    neighborhood: string().required('Por favor preencha o bairro.'),
    city: string().required('Por favor preencha a cidade.'),
    state: string().required('Por favor preencha o estado.'),
    postal_code: string().required('Por favor preencha o CEP.'),
})

const emptyCustomer = {
    id: '',
    address_name: '',
    address_number: '',
    address_complement: '',
    neighborhood: '',
    city: '',
    state: '',
    postal_code: '',
    email: '',
    phone: '',
    mobile_phone: '',
    person_type: '',
    identification_number: '',
    name: '',
    company_name: '',
    brand_name: '',
    municipal_registration: '',
    state_registration: '',
}

const personTypes = [
    { label: '', code: '' },
    { label: 'Pessoa Física', code: 'PF' },
    { label: 'Pessoa Jurídica', code: 'PJ' },
]

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

function Customer() {

    const params = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [customer, setCustomer] = useState(emptyCustomer)
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const getCustomer = useGet(`http://127.0.0.1:8000/registrations/customers/${params.id}/`)
    const putCustomer = usePut(`http://127.0.0.1:8000/registrations/customers/${params.id}/`)
    const postCustomer = usePost(`http://127.0.0.1:8000/registrations/customers/`)
    const deleteCustomer = useDelete(`http://127.0.0.1:8000/registrations/customers/${params.id}/`)
    const formik = useFormik({
        initialValues: customer,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)
            if (params.id !== ':new') {
                putCustomer(values)
                    .then(response => {
                        setLoading(false)
                        navigate('/customers/')
                    })
                    .catch(error => {
                        console.log(error.response.data)
                        setLoading(false)
                    })
            } else {
                postCustomer(values)
                    .then(response => {
                        setLoading(false)
                        navigate('/customers/')
                    })
                    .catch(error => {
                        console.log(error.response.data)
                        setLoading(false)
                    })
            }
        }
    })

    useEffect(() => {
        if (params.id !== ':new') {
            getCustomer()
                .then(response => {
                    setCustomer(response)
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error.response.data)
                    setLoading(false)
                })
        }
        else {
            setLoading(false)
        }
        // eslint-disable-next-line
    }, [])

    function handleDeleteCustomer() {
        setLoading(true)
        deleteCustomer()
            .then(response => {
                navigate('/customers/')
            })
            .catch(error => {
                console.log(error.response.data)
                setLoading(false)
            })
    }

    if (loading) {
        return <ProgressBar />
    }

    return (
        <>
            <Toolbar variant='dense' disableGutters sx={{ minHeight: 20, height: 20 }}>
                <IconButton component={Link} to='/customers/' edge='start'>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center' }}>
                    {formik.values.person_type === 'PF' ? customer.name : customer.brand_name || 'Novo Cliente'}
                </Typography>
                {params.id !== ':new' && (
                    <IconButton color='error' edge='end' onClick={() => setOpenConfirmation(true)}>
                        <DeleteOutlinedIcon />
                    </IconButton>
                )}
                <IconButton color='inherit' edge='end' form='form' type='submit'>
                    <SaveOutlinedIcon />
                </IconButton>
            </Toolbar>
            <Container component='main' maxWidth='lg' disableGutters sx={{ mt: '10%' }}>
                <Box component='form' id='form' onSubmit={formik.handleSubmit}>
                    <Grid container justifyContent='start' columnSpacing={2} rowSpacing={2}>
                        <Grid item xs={12} sm={4} lg={3}>
                            <Autocomplete
                                disablePortal
                                id='person_type_ac'
                                options={personTypes}
                                onChange={(e, value) => {
                                    formik.setFieldValue('person_type', value?.code || '')
                                }}
                                onBlur={formik.handleBlur}
                                value={personTypes.find(pt => pt.code === formik.values.person_type)}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        id='person_type'
                                        label='Tipo'
                                        fullWidth
                                        error={formik.touched.person_type && Boolean(formik.errors.person_type)}
                                        helperText={formik.touched.person_type && formik.errors.person_type} />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} lg={3}>
                            <PatternFormat
                                id='identification_number'
                                label='CPF/CNPJ'
                                fullWidth
                                customInput={TextField}
                                format={formik.values.person_type === 'PF' ? '###.###.###-##' : '##.###.###/####-##'}
                                mask='_'
                                onValueChange={v => formik.setFieldValue('identification_number', v.floatValue)}
                                onBlur={formik.handleBlur}
                                value={formik.values.identification_number}
                                error={formik.touched.identification_number && Boolean(formik.errors.identification_number)}
                                helperText={formik.touched.identification_number && formik.errors.identification_number}
                            />
                        </Grid>
                        {formik.values.person_type === 'PF' && (
                            <Grid item xs={12} sm={4} lg={6}>
                                <TextField
                                    id='name'
                                    label='Nome'
                                    fullWidth
                                    required
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    {...formik.getFieldProps('name')}
                                />
                            </Grid>
                        )}
                        {formik.values.person_type === 'PJ' && (
                            <>
                                <Grid item xs={12} sm={4} lg={6}>
                                    <TextField
                                        id='brand_name'
                                        label='Nome Fantasia'
                                        fullWidth
                                        required
                                        error={formik.touched.brand_name && Boolean(formik.errors.brand_name)}
                                        helperText={formik.touched.brand_name && formik.errors.brand_name}
                                        {...formik.getFieldProps('brand_name')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} lg={8}>
                                    <TextField
                                        id='company_name'
                                        label='Razão Social'
                                        fullWidth
                                        required
                                        error={formik.touched.company_name && Boolean(formik.errors.company_name)}
                                        helperText={formik.touched.company_name && formik.errors.company_name}
                                        {...formik.getFieldProps('company_name')}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3} lg={2}>
                                    <TextField
                                        id='municipal_registration'
                                        label='Inscrição Municipal'
                                        fullWidth
                                        {...formik.getFieldProps('municipal_registration')}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3} lg={2}>
                                    <TextField
                                        id='state_registration'
                                        label='Inscrição Estadual'
                                        fullWidth
                                        {...formik.getFieldProps('state_registration')}
                                    />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12} sm={4} lg={8}>
                            <TextField
                                id='email'
                                label='E-Mail'
                                fullWidth
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                {...formik.getFieldProps('email')}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} lg={2}>
                            <PatternFormat
                                id='phone'
                                label='Telefone Fixo'
                                fullWidth
                                customInput={TextField}
                                format='(##) ####-####'
                                mask='_'
                                onValueChange={v => formik.setFieldValue('phone', v.floatValue)}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} lg={2}>
                            <PatternFormat
                                id='mobile_phone'
                                label='Telefone Celular'
                                fullWidth
                                customInput={TextField}
                                format='(##) #####-####'
                                mask='_'
                                onValueChange={v => formik.setFieldValue('mobile_phone', v.floatValue)}
                                onBlur={formik.handleBlur}
                                value={formik.values.mobile_phone}
                                error={formik.touched.mobile_phone && Boolean(formik.errors.mobile_phone)}
                                helperText={formik.touched.mobile_phone && formik.errors.mobile_phone}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} lg={5}>
                            <TextField
                                id='address_name'
                                label='Logradouro'
                                fullWidth
                                error={formik.touched.address_name && Boolean(formik.errors.address_name)}
                                helperText={formik.touched.address_name && formik.errors.address_name}
                                {...formik.getFieldProps('address_name')}
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} lg={2}>
                            <NumericFormat
                                id='address_number'
                                label='Número'
                                fullWidth
                                customInput={TextField}
                                thousandSeparator='.'
                                decimalSeparator=','
                                decimalScale={0}
                                allowNegative={false}
                                onValueChange={v => formik.setFieldValue('address_number', v.floatValue)}
                                onBlur={formik.handleBlur}
                                value={formik.values.address_number}
                                error={formik.touched.address_number && Boolean(formik.errors.address_number)}
                                helperText={formik.touched.address_number && formik.errors.address_number}
                            />
                        </Grid>
                        <Grid item xs={8} sm={4} lg={5}>
                            <TextField
                                id='address_complement'
                                label='Complemento'
                                fullWidth
                                error={formik.touched.address_complement && Boolean(formik.errors.address_complement)}
                                helperText={formik.touched.address_complement && formik.errors.address_complement}
                                {...formik.getFieldProps('address_complement')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id='neighborhood'
                                label='Bairro'
                                fullWidth
                                error={formik.touched.neighborhood && Boolean(formik.errors.neighborhood)}
                                helperText={formik.touched.neighborhood && formik.errors.neighborhood}
                                {...formik.getFieldProps('neighborhood')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id='city'
                                label='Cidade'
                                fullWidth
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                                {...formik.getFieldProps('city')}
                            />
                        </Grid>
                        <Grid item xs={8} sm={4}>
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
                        <Grid item xs={4} sm={4} lg={2}>
                            <PatternFormat
                                id='postal_code'
                                label='CEP'
                                fullWidth
                                customInput={TextField}
                                format='#####-###'
                                mask='_'
                                onValueChange={v => formik.setFieldValue('postal_code', v.floatValue)}
                                onBlur={formik.handleBlur}
                                value={formik.values.postal_code}
                                error={formik.touched.postal_code && Boolean(formik.errors.postal_code)}
                                helperText={formik.touched.postal_code && formik.errors.postal_code}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
                <DialogTitle>Tem certeza que deseja excluir o serviço?</DialogTitle>
                <DialogActions>
                    <Button variant='contained' onClick={() => setOpenConfirmation(false)} autoFocus>Não</Button>
                    <Button variant='outlined' onClick={handleDeleteCustomer}>Sim</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Customer