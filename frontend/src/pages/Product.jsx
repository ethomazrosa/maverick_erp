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
import { NumericFormat, PatternFormat } from 'react-number-format'
import { useDelete, useGet, usePost, usePut } from '../hooks/useApi'
import { ProgressBar } from '../components'

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
    ipi_rate: ''
}

function Product() {

    const params = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState(emptyProduct)
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const getProduct = useGet(`http://127.0.0.1:8000/registrations/products/${params.id}/`)
    const putProduct = usePut(`http://127.0.0.1:8000/registrations/products/${params.id}/`)
    const postProduct = usePost(`http://127.0.0.1:8000/registrations/products/`)
    const deleteProduct = useDelete(`http://127.0.0.1:8000/registrations/products/${params.id}/`)
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
                        console.log(error.response.data)
                        setLoading(false)
                    })
            } else {
                postProduct(values)
                    .then(response => {
                        setLoading(false)
                        navigate('/products/')
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
            getProduct()
                .then(response => {
                    setProduct(response)
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

    function handleDeleteProduct() {
        setLoading(true)
        deleteProduct()
            .then(response => {
                navigate('/products/')
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
                <IconButton component={Link} to='/products/' edge='start'>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center' }}>
                    {product.name || 'Novo Produto'}
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
                                label='Valor de Compra'
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
                        <Grid item xs={6} sm={4} lg={1.5}>
                            <NumericFormat
                                id='profit_percentage'
                                label='% de Lucro'
                                fullWidth
                                customInput={TextField}
                                decimalSeparator=','
                                decimalScale={2}
                                suffix='%'
                                allowNegative={false}
                                onValueChange={v => formik.setFieldValue('profit_percentage', v.floatValue)}
                                onBlur={formik.handleBlur}
                                value={formik.values.profit_percentage}
                                error={formik.touched.profit_percentage && Boolean(formik.errors.profit_percentage)}
                                helperText={formik.touched.profit_percentage && formik.errors.profit_percentage}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} lg={2.5}>
                            <TextField
                                id='measurement_unit'
                                label='Unidade de Medida'
                                fullWidth
                                {...formik.getFieldProps('measurement_unit')}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3} lg={2}>
                            <PatternFormat
                                id='ncm_naladish'
                                label='NCM/Naladish'
                                fullWidth
                                customInput={TextField}
                                format='####.##.##'
                                mask='_'
                                onValueChange={v => formik.setFieldValue('ncm_naladish', v.floatValue)}
                                onBlur={formik.handleBlur}
                                value={formik.values.ncm_naladish}
                            />
                        </Grid>
                        <Grid item xs={6} sm={2} lg={1.5}>
                            <TextField
                                id='o_cst'
                                label='O/CST'
                                fullWidth
                                {...formik.getFieldProps('o_cst')}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3} lg={1.5}>
                            <TextField
                                id='cfop'
                                label='CFOP'
                                fullWidth
                                {...formik.getFieldProps('cfop')}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} lg={3}>
                            <NumericFormat
                                id='icms_base_calc'
                                label='Base de Cáluclo ICMS'
                                fullWidth
                                customInput={TextField}
                                thousandSeparator='.'
                                decimalSeparator=','
                                decimalScale={2}
                                fixedDecimalScale
                                prefix='R$ '
                                allowNegative={false}
                                onValueChange={v => formik.setFieldValue('icms_base_calc', v.floatValue)}
                                onBlur={formik.handleBlur}
                                value={formik.values.icms_base_calc}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} lg={3}>
                            <NumericFormat
                                id='icms_price'
                                label='Valor ICMS'
                                fullWidth
                                customInput={TextField}
                                thousandSeparator='.'
                                decimalSeparator=','
                                decimalScale={2}
                                fixedDecimalScale
                                prefix='R$ '
                                allowNegative={false}
                                onValueChange={v => formik.setFieldValue('icms_price', v.floatValue)}
                                onBlur={formik.handleBlur}
                                value={formik.values.icms_price}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} lg={1.5}>
                            <NumericFormat
                                id='icms_rate'
                                label='Alíquota ICMS'
                                fullWidth
                                customInput={TextField}
                                decimalSeparator=','
                                decimalScale={2}
                                suffix='%'
                                allowNegative={false}
                                onValueChange={v => formik.setFieldValue('icms_rate', v.floatValue)}
                                onBlur={formik.handleBlur}
                                value={formik.values.icms_rate}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} lg={3}>
                            <NumericFormat
                                id='ipi_price'
                                label='Valor IPI'
                                fullWidth
                                customInput={TextField}
                                thousandSeparator='.'
                                decimalSeparator=','
                                decimalScale={2}
                                fixedDecimalScale
                                prefix='R$ '
                                allowNegative={false}
                                onValueChange={v => formik.setFieldValue('ipi_price', v.floatValue)}
                                onBlur={formik.handleBlur}
                                value={formik.values.ipi_price}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} lg={1.5}>
                            <NumericFormat
                                id='ipi_rate'
                                label='Alíquota IPI'
                                fullWidth
                                customInput={TextField}
                                decimalSeparator=','
                                decimalScale={2}
                                suffix='%'
                                allowNegative={false}
                                onValueChange={v => formik.setFieldValue('ipi_rate', v.floatValue)}
                                onBlur={formik.handleBlur}
                                value={formik.values.ipi_rate}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
                <DialogTitle>Tem certeza que deseja excluir o produto?</DialogTitle>
                <DialogActions>
                    <Button variant='contained' onClick={() => setOpenConfirmation(false)} autoFocus>Não</Button>
                    <Button variant='outlined' onClick={handleDeleteProduct}>Sim</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Product