import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
    Typography, Toolbar, IconButton, TextField, Dialog, DialogTitle,
    Box, Container, Grid, DialogActions, Button,
} from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { NumericFormat } from 'react-number-format'
import { useDelete, useGet, usePost, usePut } from '../hooks/useApi'
import { ProgressBar } from '../components'

const validationSchema = object({
    name: string().required('Por favor preencha o nome.'),
    description: string().required('Por favor preencha a descrição.'),
    price: string().required('Por favor preencha o preço.'),
})

const emptyService = {
    id: '',
    name: '',
    description: '',
    price: '',
}

function Service() {

    const params = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [service, setService] = useState(emptyService)
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const getService = useGet(`http://127.0.0.1:8000/registrations/services/${params.id}/`)
    const putService = usePut(`http://127.0.0.1:8000/registrations/services/${params.id}/`)
    const postService = usePost(`http://127.0.0.1:8000/registrations/services/`)
    const deleteService = useDelete(`http://127.0.0.1:8000/registrations/services/${params.id}/`)
    const formik = useFormik({
        initialValues: service,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)
            if (params.id !== ':new') {
                putService(values)
                    .then(response => {
                        setLoading(false)
                        navigate('/services/')
                    })
                    .catch(error => {
                        console.log(error.response.data)
                        setLoading(false)
                    })
            } else {
                postService(values)
                    .then(response => {
                        setLoading(false)
                        navigate('/services/')
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
            getService()
                .then(response => {
                    setService(response)
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

    function handleDeleteService() {
        setLoading(true)
        deleteService()
            .then(response => {
                navigate('/services/')
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
                <IconButton component={Link} to='/services/' edge='start'>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center' }}>
                    {service.name || 'Novo Serviço'}
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
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id='name'
                                label='Nome'
                                fullWidth
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                {...formik.getFieldProps('name')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                id='description'
                                label='Descrição'
                                fullWidth
                                multiline
                                rows={5}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                                {...formik.getFieldProps('description')}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} lg={3}>
                            <NumericFormat
                                id='price'
                                label='Valor'
                                fullWidth
                                customInput={TextField}
                                thousandSeparator='.'
                                decimalSeparator=','
                                decimalScale={2}
                                fixedDecimalScale
                                prefix='R$ '
                                allowNegative={false}
                                onValueChange={v => formik.setFieldValue('price', v.floatValue)}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                                error={formik.touched.price && Boolean(formik.errors.price)}
                                helperText={formik.touched.price && formik.errors.price}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
                <DialogTitle>Tem certeza que deseja excluir o serviço?</DialogTitle>
                <DialogActions>
                    <Button variant='contained' onClick={() => setOpenConfirmation(false)} autoFocus>Não</Button>
                    <Button variant='outlined' onClick={handleDeleteService}>Sim</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Service