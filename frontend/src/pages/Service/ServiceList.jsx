import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import { ProgressBar, ToolbarList, ErrorSnackbar } from '../../components'
import { useGet } from '../../hooks/useApi'

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
    const getServices = useGet('/api/registrations/services/')
    const [services, setServices] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)

    useEffect(() => {
        getServices()
            .then(response => {
                setServices(response)
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
        navigate(`/services/${params.id}`)
    }

    if (loading) {
        return <ProgressBar />
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <ToolbarList
                    title='Serviços'
                    clickNew='/services/:new'
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

export default ServiceList