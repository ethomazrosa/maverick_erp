import React, { useEffect, useState } from 'react'
import { Box, Snackbar, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useGet } from '../hooks/useApi'
import { ProgressBar, ToolbarList, ErrorSnackbar } from '../components'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

function QuoteList() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const getQuotes = useGet('/api/sales/quotes/?depth=1')
    const [quotes, setQuotes] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const columns = [
        {
            headerClassName: 'header',
            field: 'id',
            headerName: 'ID',
            minWidth: 50,
            flex: 1,
            valueFormatter: ({ value }) => {
                return String(value).padStart(3, '0')
            }
        },
        {
            headerClassName: 'header',
            field: 'customer',
            headerName: 'Cliente',
            flex: 3,
            valueGetter: (params) => {
                return params.row.customer.person_type === 'PJ' ? params.row.customer.brand_name : params.row.customer.name
            }
        },
        {
            headerClassName: 'header',
            field: 'totalAmount',
            headerName: 'Valor Total',
            type: 'number',
            flex: 2,
            valueGetter: (params) => {
                return params.row.products.reduce((sum, product) => {
                    return sum + (product.price * product.quantity)
                }, 0) + params.row.services.reduce((sum, service) => {
                    return sum + (service.price * service.quantity)
                }, 0)
            },
            valueFormatter: ({ value }) => {
                return Number(value).toLocaleString(undefined, { style: 'currency', currency: 'BRL' })
            }
        }
    ]
    if (useMediaQuery(useTheme().breakpoints.up('sm'))) {
        columns.push(
            {
                headerClassName: 'header',
                field: 'date',
                headerName: 'Data',
                type: 'date',
                flex: 1.2,
                valueGetter: ({ value }) => new Date(value),
            },
            {
                headerClassName: 'header',
                field: 'service_description',
                headerName: 'Descrição Serviço',
                flex: 4
            }
        )
    }

    useEffect(() => {
        getQuotes()
            .then(response => {
                setQuotes(response)
                setLoading(false)
            })
            .catch(error => {
                setErrorMessage(JSON.stringify(error.response.data))
                setOpenSnackbar(true)
                setLoading(false)
            })
        // eslint-disable-next-line
    }, [])

    const handleRowClick = (params) => {
        navigate(`/quotes/${params.id}`)
    }

    if (loading) {
        return <ProgressBar />
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <ToolbarList
                    title='Orçamentos'
                    clickNew='/quotes/:new'
                />
                <Box sx={{ display: 'flex', flexGrow: 1, mt: 1 }}>
                    <Box sx={{
                        flexGrow: 1,
                        width: 250,
                        '& .header': { backgroundColor: 'secondary.main' },
                    }}>
                        <DataGrid
                            rows={quotes}
                            columns={columns}
                            onRowClick={handleRowClick}
                            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                            //density='compact'
                            initialState={{
                                pagination: { paginationModel: { pageSize: 10, }, },
                                sorting: { sortModel: [{ field: 'id', sort: 'desc' }], },
                            }}
                            pageSizeOptions={[10, 25, 50, 100]}
                            sx={{
                                '.MuiDataGrid-cell:focus': { outline: 'none' },
                                '& .MuiDataGrid-row:hover': { cursor: 'pointer' },
                                border: 0
                            }}
                        />
                    </Box>
                </Box>
            </Box>
            <ErrorSnackbar
                isOpened={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default QuoteList