import React, { useEffect, useState } from 'react'
import {
    Box, Toolbar, IconButton, Typography, Container, Grid, Snackbar,
    Alert, Dialog, DialogTitle, DialogActions, Button, TextField, Autocomplete
} from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ProgressBar } from '../components'
import { useGet, usePost, usePut, useDelete } from '../hooks/useApi'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const emptyQuote = {
    id: '',
    contact: '',
    seller: '',
    date: new Date().toISOString().split('T')[0],
    expiration_date: new Date().toISOString().split('T')[0],
    customer: '',
    service_location: '',
    service_description: '',
    payment_method: 'A combinar.',
    warranty: '1 ano para equipamentos.\n3 meses para serviços.',
    deadline: 'A combinar.',
    status: 'DRAFT',
    products: [],
    services: []
}

const statusList = [
    { label: '', code: '' },
    { label: 'Rascunho', code: 'DRAFT' },
    { label: 'Pendente', code: 'PENDING' },
    { label: 'Enviado', code: 'SENT' },
    { label: 'Aceito', code: 'ACCEPTED' }
]

const validationSchema = object({
    seller: string().required('Campo obrigatório'),
    date: string().required('Campo obrigatório'),
    expiration_date: string().required('Campo obrigatório'),
    customer: string().required('Campo obrigatório'),
    service_description: string().required('Campo obrigatório'),
    payment_method: string().required('Campo obrigatório'),
    warranty: string().required('Campo obrigatório'),
    deadline: string().required('Campo obrigatório'),
    status: string().required('Campo obrigatório'),
})

function Quote() {

    const productColumns = [
        {
            headerClassName: 'header',
            field: 'number',
            headerName: '#',
            flex: 1,
            valueFormatter: ({ value }) => {
                return String(value).padStart(3, '0')
            }
        },
        {
            headerClassName: 'header',
            field: 'product',
            headerName: 'Produto',
            editable: 'true',
            flex: 8
        },
        {
            headerClassName: 'header',
            field: 'quantity',
            headerName: 'Quantidade',
            type: 'number',
            editable: 'true',
            flex: 1
        }
    ]
    if (useMediaQuery(useTheme().breakpoints.up('sm'))) {
        productColumns.push(
            {
                headerClassName: 'header',
                field: 'price',
                headerName: 'Preço',
                type: 'number',
                editable: 'true',
                flex: 2,
                valueFormatter: ({ value }) => {
                    return Number(value).toLocaleString(undefined, { style: 'currency', currency: 'BRL' })
                }
            },
            {
                headerClassName: 'header',
                field: 'totalPrice',
                headerName: 'Preço Total',
                type: 'number',
                flex: 2,
                valueGetter: (params) => {
                    return params.row.quantity * params.row.price
                },
                valueFormatter: ({ value }) => {
                    return Number(value).toLocaleString(undefined, { style: 'currency', currency: 'BRL' })
                }
            }
        )
    }

    const serviceColumns = [
        {
            headerClassName: 'header',
            field: 'number',
            headerName: '#',
            flex: 1,
            valueFormatter: ({ value }) => {
                return String(value).padStart(3, '0')
            }
        },
        {
            headerClassName: 'header',
            field: 'service',
            headerName: 'Serviço',
            editable: 'true',
            flex: 3
        },
        {
            headerClassName: 'header',
            field: 'price',
            headerName: 'Preço',
            type: 'number',
            editable: 'true',
            flex: 2,
            valueFormatter: ({ value }) => {
                return Number(value).toLocaleString(undefined, { style: 'currency', currency: 'BRL' })
            }
        }
    ]

    const params = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [quote, setQuote] = useState(emptyQuote)
    const [customerList, setCustomerList] = useState([{ label: '', code: '' }])
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const getQuote = useGet(`/api/sales/quotes/${params.id}/`)
    const postQuote = usePost(`/api/sales/quotes/`)
    const putQuote = usePut(`/api/sales/quotes/${params.id}/`)
    const deleteQuote = useDelete(`/api/sales/quotes/${params.id}/`)
    const getCustomers = useGet('/api/registrations/customers/')
    const formik = useFormik({
        initialValues: quote,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)
            if (params.id !== ':new') {
                putQuote(values)
                    .then(response => {
                        setLoading(false)
                        navigate('/quotes/')
                    })
                    .catch(error => {
                        setErrorMessage(JSON.stringify(error.response.data))
                        setOpenSnackbar(true)
                        setLoading(false)
                    })
            } else {
                postQuote(values)
                    .then(response => {
                        setLoading(false)
                        navigate('/quotes/')
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
        getCustomers()
            .then(response => {
                const customerListAPI = response.map(customer => {
                    return {
                        label: customer.person_type === 'PJ' ? customer.brand_name : customer.name,
                        code: customer.id
                    }
                })
                customerListAPI.push({ label: '', code: '' })
                setCustomerList(customerListAPI)
            })
            .catch(error => {
                setErrorMessage(JSON.stringify(error.response.data))
                setOpenSnackbar(true)
            })
        if (params.id !== ':new') {
            getQuote()
                .then(response => {
                    setQuote(response)
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

    function handleDeleteQuote() {
        setLoading(true)
        deleteQuote()
            .then(response => {
                navigate('/quotes/')
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
            <Toolbar variant='dense' disableGutters sx={{ minHeight: 20, height: 20 }}>
                <IconButton component={Link} to='/quotes/' edge='start'>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center' }}>
                    {(params.id === ':new') ? 'Novo Orçamento' : `Orçamento ${String(quote.id).padStart(3, '0')}`}
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
            <Container component='main' maxWidth='xl' disableGutters sx={{ mt: '2rem' }}>
                <Box component='form' id='form' onSubmit={formik.handleSubmit}>
                    <Grid container justifyContent='start' columnSpacing={2} rowSpacing={2}>
                        <Grid item xs={12} sm={3.5} xl={1.75}>
                            <Autocomplete
                                disablePortal
                                id='status_ac'
                                options={statusList}
                                onChange={(e, value) => {
                                    formik.setFieldValue('status', value?.code || '')
                                }}
                                onBlur={formik.handleBlur}
                                value={statusList.find(st => st.code === formik.values.status)}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        id='status'
                                        label='Status'
                                        fullWidth
                                        error={formik.touched.status && Boolean(formik.errors.status)}
                                        helperText={formik.touched.status && formik.errors.status}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={3.5} xl={1.75}>
                            <TextField
                                id='seller'
                                label='Vendedor'
                                fullWidth
                                error={formik.touched.seller && Boolean(formik.errors.seller)}
                                helperText={formik.touched.seller && formik.errors.seller}
                                {...formik.getFieldProps('seller')}
                            />
                        </Grid>
                        <Grid item xs={6} sm={2.5} xl={1.25}>
                            <TextField
                                id='date'
                                label='Data'
                                fullWidth
                                error={formik.touched.date && Boolean(formik.errors.date)}
                                helperText={formik.touched.date && formik.errors.date}
                                {...formik.getFieldProps('date')}
                            />
                        </Grid>
                        <Grid item xs={6} sm={2.5} xl={1.25}>
                            <TextField
                                id='expiration_date'
                                label='Data de Validade'
                                fullWidth
                                error={formik.touched.expiration_date && Boolean(formik.errors.expiration_date)}
                                helperText={formik.touched.expiration_date && formik.errors.expiration_date}
                                {...formik.getFieldProps('expiration_date')}
                            />
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <TextField
                                id='contact'
                                label='Contato'
                                fullWidth
                                {...formik.getFieldProps('contact')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                disablePortal
                                id='customer_ac'
                                options={customerList}
                                onChange={(e, value) => {
                                    formik.setFieldValue('customer', value?.code || '')
                                }}
                                onBlur={formik.handleBlur}
                                value={customerList.find(ct => ct.code === formik.values.customer)}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        id='customer'
                                        label='Cliente'
                                        fullWidth
                                        error={formik.touched.customer && Boolean(formik.errors.customer)}
                                        helperText={formik.touched.customer && formik.errors.customer} />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                disablePortal
                                id='service_location_ac'
                                options={customerList}
                                onChange={(e, value) => {
                                    formik.setFieldValue('service_location', value?.code || '')
                                }}
                                onBlur={formik.handleBlur}
                                value={customerList.find(ct => ct.code === formik.values.service_location)}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        id='service_location'
                                        label='Local do Serviço'
                                        fullWidth
                                        error={formik.touched.service_location && Boolean(formik.errors.service_location)}
                                        helperText={formik.touched.service_location && formik.errors.service_location} />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <TextField
                                id='service_description'
                                label='Descrição do Serviço'
                                fullWidth
                                multiline
                                rows={3}
                                error={formik.touched.service_description && Boolean(formik.errors.service_description)}
                                helperText={formik.touched.service_description && formik.errors.service_description}
                                {...formik.getFieldProps('service_description')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} xl={2}>
                            <TextField
                                id='payment_method'
                                label='Forma de Pagamento'
                                fullWidth
                                multiline
                                rows={3}
                                error={formik.touched.payment_method && Boolean(formik.errors.payment_method)}
                                helperText={formik.touched.payment_method && formik.errors.payment_method}
                                {...formik.getFieldProps('payment_method')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} xl={2}>
                            <TextField
                                id='deadline'
                                label='Prazo de Entrega'
                                fullWidth
                                multiline
                                rows={3}
                                error={formik.touched.deadline && Boolean(formik.errors.deadline)}
                                helperText={formik.touched.deadline && formik.errors.deadline}
                                {...formik.getFieldProps('deadline')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} xl={2}>
                            <TextField
                                id='warranty'
                                label='Garantia'
                                fullWidth
                                multiline
                                rows={3}
                                error={formik.touched.warranty && Boolean(formik.errors.warranty)}
                                helperText={formik.touched.warranty && formik.errors.warranty}
                                {...formik.getFieldProps('warranty')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                <Box sx={{
                                    flexGrow: 1,
                                    width: 250,
                                    '& .header': { backgroundColor: 'secondary.main' },
                                }}>
                                    <DataGrid
                                        autoHeight
                                        rows={formik.values.products}
                                        columns={productColumns}
                                        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                                        initialState={{
                                            pagination: {
                                                paginationModel: {
                                                    pageSize: 10,
                                                },
                                            },
                                            sorting: {
                                                sortModel: [{ field: 'number', sort: 'asc' }],
                                            },
                                        }}
                                        pageSizeOptions={[10, 25, 50, 100]}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                <Box sx={{
                                    flexGrow: 1,
                                    width: 250,
                                    '& .header': { backgroundColor: 'secondary.main' },
                                }}>
                                    <DataGrid
                                        autoHeight
                                        rows={formik.values.services}
                                        columns={serviceColumns}
                                        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                                        initialState={{
                                            pagination: {
                                                paginationModel: {
                                                    pageSize: 10,
                                                },
                                            },
                                            sorting: {
                                                sortModel: [{ field: 'number', sort: 'asc' }],
                                            },
                                        }}
                                        pageSizeOptions={[10, 25, 50, 100]}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
                <DialogTitle>Tem certeza que deseja excluir o orçamento?</DialogTitle>
                <DialogActions>
                    <Button variant='contained' onClick={() => setOpenConfirmation(false)} autoFocus>Não</Button>
                    <Button variant='outlined' onClick={handleDeleteQuote}>Sim</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Quote