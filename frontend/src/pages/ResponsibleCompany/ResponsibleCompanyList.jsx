import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Typography, IconButton, Grid, Card,
    CardContent, CardMedia, CardActionArea, CardActions,
} from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useGet, useDelete } from '../../hooks/useApi'
import {
    ProgressBar, ToolbarList, ErrorSnackbar,
    DeleteConfirmationDialog
} from '../../components'

function ResponsibleCompanyList() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState(null)
    const getResponsibleCompanies = useGet('/api/registrations/responsible_companies/')
    const deleteResponsibleCompany = useDelete(`/api/registrations/responsible_companies/${selectedCompany}/`)
    const [responsibleCompanies, setResponsibleCompanies] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)

    useEffect(() => {
        getResponsibleCompanies()
            .then(response => {
                setResponsibleCompanies(response)
                setLoading(false)
            })
            .catch(error => {
                setErrorMessage(JSON.stringify(error.response.data))
                setOpenSnackbar(true)
                setLoading(false)
            })
        // eslint-disable-next-line
    }, [])

    function handleClickDelete(companyId) {
        setSelectedCompany(companyId)
        setOpenConfirmation(true)
    }

    function handleDelete() {
        setLoading(true)
        deleteResponsibleCompany()
            .then(response => {
                navigate(0)
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
            <ToolbarList
                title='Empresas Responsáveis'
                clickNew='/responsible_companies/:new'
            />
            <Grid
                container
                sx={{
                    mt: 2,
                    display: 'flex',
                    alignItems: 'stretch'
                }}
                rowSpacing={2}
                columnSpacing={2}>
                {responsibleCompanies.map((company) => {
                    return (
                        <Grid item xs={6} sm={4} lg={3} key={company.id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardActionArea
                                    component={Link}
                                    to={`/responsible_companies/${company.id}`}
                                >
                                    <CardMedia
                                        component='img'
                                        image={company.logo}
                                        alt={company.brand_name}
                                        sx={{ height: 125, objectFit: 'contain' }}
                                    />
                                </CardActionArea>
                                <CardContent sx={{ px: 1.5, py: 0, flexGrow: 1 }}>
                                    <Typography variant='h6'>
                                        {company.brand_name}
                                    </Typography>
                                    <Typography variant='body2' color='text.secondary' sx={{ display: { xs: 'none', sm: 'block' } }}>
                                        {company.company_name}<br />
                                        {company.email}<br />
                                        {company.mobile_phone}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ pt: 0, alignSelf: 'flex-end' }}>
                                    <IconButton color='error' sx={{ p: 0 }} onClick={() => handleClickDelete(company.id)}>
                                        <DeleteOutlinedIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
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

export default ResponsibleCompanyList