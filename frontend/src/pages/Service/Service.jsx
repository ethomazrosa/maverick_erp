import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TextField, Box, Container, Grid } from '@mui/material'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { NumericFormat } from 'react-number-format'
import { useDelete, useGet, usePost, usePut } from '../../hooks/useApi'
import {
    ProgressBar, ToolbarRegistration, ErrorSnackbar,
    DeleteConfirmationDialog
} from '../../components'

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
    const [errorMessage, setErrorMessage] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const getService = useGet(`/api/registrations/services/${params.id}/`)
    const putService = usePut(`/api/registrations/services/${params.id}/`)
    const postService = usePost(`/api/registrations/services/`)
    const deleteService = useDelete(`/api/registrations/services/${params.id}/`)
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
                        setErrorMessage(JSON.stringify(error.response.data))
                        setOpenSnackbar(true)
                        setLoading(false)
                    })
            } else {
                postService(values)
                    .then(response => {
                        setLoading(false)
                        navigate('/services/')
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
        if (params.id !== ':new') {
            getService()
                .then(response => {
                    setService(response)
                    setLoading(false)
                })
                .catch(error => {
                    setErrorMessage(JSON.stringify(error.response.data))
                    setOpenSnackbar(true)
                    setLoading(false)
                })
        }
        else {
            setLoading(false)
        }
        // eslint-disable-next-line
    }, [])

    function handleDelete() {
        setLoading(true)
        deleteService()
            .then(response => {
                navigate('/services/')
            })
            .catch(error => {
                setErrorMessage(JSON.stringify(error.response.data))
                setOpenSnackbar(true)
                setLoading(false)
            })
    }

    if (loading) {
        return <ProgressBar />
    }

    return (
        <>
            <ToolbarRegistration
                backTo='/services/'
                idRegistration={params.id}
                title={formik.values.name || 'Novo Serviço'}
                clickDelete={() => setOpenConfirmation(true)}
            />
            <Container component='main' maxWidth='xl' disableGutters sx={{ mt: '2rem' }}>
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
                        <Grid item xs={6} sm={3} lg={2}>
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
                                onValueChange={v => formik.setFieldValue('price', v.floatValue ?? '')}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                                error={formik.touched.price && Boolean(formik.errors.price)}
                                helperText={formik.touched.price && formik.errors.price}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <DeleteConfirmationDialog
                isOpened={openConfirmation}
                onClose={() => setOpenConfirmation(false)}
                handleDelete={handleDelete}
            />
            <ErrorSnackbar
                isOpened={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default Service