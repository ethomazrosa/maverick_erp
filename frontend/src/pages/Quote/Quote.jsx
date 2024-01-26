import React, { useEffect, useState } from 'react'
import { Box, Container, Grid } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import {
    ProgressBar, ToolbarRegistration, ErrorSnackbar,
    DeleteConfirmationDialog
} from '../../components'
import FormFields from './FormFields'
import QuoteItems from './DataGrid'
import { useGet, usePost, usePut, useDelete } from '../../hooks/useApi'
import { useFormik } from 'formik'
import { object, string } from 'yup'
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

    function handleDelete() {
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
            <ToolbarRegistration
                backTo='/quotes/'
                idRegistration={params.id}
                title={(params.id === ':new') ? 'Novo Orçamento' : `Orçamento ${String(quote.id).padStart(3, '0')}`}
                clickDelete={() => setOpenConfirmation(true)}
            />
            <Container component='main' maxWidth='xl' disableGutters sx={{ mt: '2rem' }}>
                <Box component='form' id='form' onSubmit={formik.handleSubmit}>
                    <Grid container justifyContent='start' columnSpacing={2} rowSpacing={2}>
                        <FormFields
                            statusList={statusList}
                            customerList={customerList}
                            formik={formik}
                        />
                        <QuoteItems
                            rows={formik.values.products}
                            columns={productColumns}
                        />
                        <QuoteItems
                            rows={formik.values.services}
                            columns={serviceColumns}
                        />
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

export default Quote