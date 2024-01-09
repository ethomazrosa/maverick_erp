import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Typography, Toolbar, IconButton, Box } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import AddIcon from '@mui/icons-material/Add'
import { ProgressBar } from '../components'
import { useGet } from '../hooks/useApi'

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
        flex: 8
    },
    {
        headerClassName: 'header',
        field: 'price',
        headerName: 'Valor de Compra',
        flex: 4,
        type: 'number',
        valueFormatter: (params) => {
            return Number(params.value).toLocaleString(undefined, { style: 'currency', currency: 'BRL' })
        },
    },
]

function ServiceList() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const getServices = useGet('http://127.0.0.1:8000/registrations/services/')
    const [services, setServices] = useState([])

    useEffect(() => {
        getServices()
            .then(response => {
                setServices(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error.response.data)
                setLoading(false)
            })
        // eslint-disable-next-line
    }, [])

    const handleRowClick = (params) => {
        navigate(`/services/${params.id}`)
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
                    Serviços
                </Typography>
                <IconButton color='inherit' edge='end' component={Link} to='/services/:new'>
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
                        rows={services}
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

export default ServiceList