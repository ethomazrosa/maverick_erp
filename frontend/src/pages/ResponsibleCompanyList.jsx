import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Typography, Toolbar, IconButton, Grid, Card, Button, DialogTitle,
    CardContent, CardMedia, CardActionArea, CardActions, DialogActions, Dialog
} from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useGet, useDelete } from '../hooks/useApi'
import { ProgressBar } from '../components'

function ResponsibleCompany() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState(null)
    const getResponsibleCompanies = useGet('http://127.0.0.1:8000/registrations/responsible_companies/')
    const deleteResponsibleCompany = useDelete(`http://127.0.0.1:8000/registrations/responsible_companies/${selectedCompany}/`)
    const [responsibleCompanies, setResponsibleCompanies] = useState([])

    useEffect(() => {
        getResponsibleCompanies()
            .then(response => {
                setResponsibleCompanies(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error.response.data)
                setLoading(false)
            })
        // eslint-disable-next-line
    }, [])

    function handleClickDelete(companyId) {
        setSelectedCompany(companyId)
        setOpenConfirmation(true)
    }

    function deleteCompany() {
        setLoading(true)
        deleteResponsibleCompany()
            .then(response => {
                // setOpenConfirmation(false)
                // setLoading(false)
                navigate(0)
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
                <IconButton component={Link} to='/' edge='start'>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center' }}>
                    Empresas Responsáveis
                </Typography>
                <IconButton color='inherit' component={Link} to='/responsible_companies/:new' edge='end'>
                    <AddIcon />
                </IconButton>
            </Toolbar>
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
            <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
                <DialogTitle>Tem certeza que deseja excluir a empresa responsável?</DialogTitle>
                <DialogActions>
                    <Button variant='contained' onClick={() => setOpenConfirmation(false)} autoFocus>Não</Button>
                    <Button variant='outlined' onClick={deleteCompany}>Sim</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ResponsibleCompany