import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useGet } from '../../hooks/useApi'
import { ProgressBar, ToolbarList, ErrorSnackbar } from '../../components'

function CustomerList() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const getCustomers = useGet('/api/registrations/customers/')
    const [customers, setCustomers] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const columns = [
        {
            headerClassName: 'header',
            field: 'id',
            headerName: 'ID',
            minWidth: 50,
            flex: 1,
            valueFormatter: (params) => {
                return String(params.value).padStart(3, '0')
            }
        },
        {
            headerClassName: 'header',
            field: 'name',
            headerName: 'Nome',
            flex: 8,
            valueGetter: (params) => {
                if (params.row.person_type === 'PF') {
                    return params.row.name
                } else {
                    return params.row.brand_name
                }
            }
        },
        {
            headerClassName: 'header',
            field: 'identification_number',
            headerName: 'CPF/CNPJ',
            flex: 8,
            type: 'number',
            valueGetter: (params) => {
                if (params.row.person_type === 'PF') {
                    return String(params.row.identification_number)
                        .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
                } else {
                    return String(params.row.identification_number)
                        .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
                }
            }
        },
    ]
    if (useMediaQuery(useTheme().breakpoints.up('sm'))) {
        columns.push(
            {
                headerClassName: 'header',
                field: 'mobile_phone',
                headerName: 'Telefone Celular',
                flex: 6,
                type: 'number',
                valueFormatter: (params) => {
                    return String(params.value).replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
                }
            },
            {
                headerClassName: 'header',
                field: 'email',
                headerName: 'E-Mail',
                flex: 6
            },
        )
    }

    useEffect(() => {
        getCustomers()
            .then(response => {
                setCustomers(response)
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
        navigate(`/customers/${params.id}`)
    }

    if (loading) {
        return <ProgressBar />
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <ToolbarList
                    title='Clientes'
                    clickNew='/customers/:new'
                />
                <Box sx={{ display: 'flex', flexGrow: 1, mt: 1 }}>
                    <Box sx={{
                        flexGrow: 1,
                        width: 250,
                        '& .header': {
                            backgroundColor: 'secondary.main',

                        },
                    }}>
                        <DataGrid
                            rows={customers}
                            columns={columns}
                            onRowClick={handleRowClick}
                            editMode='row'
                            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                            // autoPageSize
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                                sorting: {
                                    sortModel: [{ field: 'id', sort: 'desc' }],
                                },
                            }}
                            pageSizeOptions={[10, 25, 50, 100]}
                            sx={{
                                '.MuiDataGrid-cell:focus': {
                                    outline: 'none'
                                },
                                '& .MuiDataGrid-row:hover': {
                                    cursor: 'pointer'
                                },
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

export default CustomerList