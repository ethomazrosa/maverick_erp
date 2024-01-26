import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Container, Grid } from '@mui/material'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { useDelete, useGet, usePost, usePut } from '../../hooks/useApi'
import {
    ProgressBar, ToolbarRegistration, ErrorSnackbar,
    DeleteConfirmationDialog
} from '../../components'
import FormFields from './FormFields'

const validationSchema = object({
    name: string().required('Por favor preencha o nome.'),
    description: string().required('Por favor preencha a descrição.'),
    price: string().required('Por favor preencha o preço.'),
    profit_percentage: string().required('Por favor preencha a % de lucro.'),
})

const emptyProduct = {
    id: '',
    name: '',
    description: '',
    ncm_naladish: '',
    o_cst: '',
    cfop: '',
    measurement_unit: '',
    price: '',
    profit_percentage: '',
    icms_base_calc: '',
    icms_price: '',
    icms_rate: '',
    ipi_price: '',
    ipi_rate: '',
    sale_price: ''
}

function Product() {

    const params = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState(emptyProduct)
    const [errorMessage, setErrorMessage] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const getProduct = useGet(`/api/registrations/products/${params.id}/`)
    const putProduct = usePut(`/api/registrations/products/${params.id}/`)
    const postProduct = usePost(`/api/registrations/products/`)
    const deleteProduct = useDelete(`/api/registrations/products/${params.id}/`)
    const formik = useFormik({
        initialValues: product,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)
            if (params.id !== ':new') {
                putProduct(values)
                    .then(response => {
                        setLoading(false)
                        navigate('/products/')
                    })
                    .catch(error => {
                        setErrorMessage(JSON.stringify(error.response.data))
                        setOpenSnackbar(true)
                        setLoading(false)
                    })
            } else {
                postProduct(values)
                    .then(response => {
                        setLoading(false)
                        navigate('/products/')
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
            getProduct()
                .then(response => {
                    setProduct(response)
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

    useEffect(() => {
        formik.values.sale_price = formik.values.price * (1 + (formik.values.profit_percentage / 100))
        // eslint-disable-next-line
    }, [formik.values.price, formik.values.profit_percentage])

    function handleDelete() {
        setLoading(true)
        deleteProduct()
            .then(response => {
                navigate('/products/')
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
                backTo='/products/'
                idRegistration={params.id}
                title={formik.values.name || 'Novo Produto'}
                clickDelete={() => setOpenConfirmation(true)}
            />
            <Container component='main' maxWidth='xl' disableGutters sx={{ mt: '2rem' }}>
                <Box component='form' id='form' onSubmit={formik.handleSubmit}>
                    <Grid container justifyContent='start' columnSpacing={2} rowSpacing={2}>
                        <FormFields formik={formik} />
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

export default Product