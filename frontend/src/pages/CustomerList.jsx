import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Typography, Toolbar, IconButton, Box } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import AddIcon from '@mui/icons-material/Add'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useGet } from '../hooks/useApi'
import { ProgressBar } from '../components'

function CustomerList() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const getCustomers = useGet('http://127.0.0.1:8000/registrations/customers/')
    const [customers, setCustomers] = useState([])

    const columns = [
        {
            headerClassName: 'header',
            field: 'id',
            headerName: 'ID',
            minWidth: 40,
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
                valueFormatter: (params) =>{
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
                console.log(error.response.data)
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
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Toolbar variant='dense' disableGutters sx={{ minHeight: 20, height: 20 }}>
                <IconButton component={Link} to='/' edge='start'>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center' }}>
                    Clientes
                </Typography>
                <IconButton color='inherit' edge='end' component={Link} to='/customers/:new'>
                    <AddIcon />
                </IconButton>
            </Toolbar>
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
    )
}

export default CustomerList