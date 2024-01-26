import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Typography, Toolbar, IconButton, Container, Box, Grid } from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { useGet, usePut, usePost } from '../../hooks/useApi'
import { ProgressBar, ErrorSnackbar } from '../../components'
import FormFields from './FormFields'
import { useFormik } from 'formik'
import { object, string } from 'yup'


const validationSchema = object({
    company_name: string().required('Por favor preencha a razão social.'),
    brand_name: string().required('Por favor preencha o nome fantasia.'),
    identification_number: string().required('Por favor preencha o CNPJ.'),
    email: string().email('Por favor preencha um email válido').required('Por favor preencha o email'),
    mobile_phone: string().required('Por favor preencha telefone celular.'),
    address_name: string().required('Por favor preencha o logradouro.'),
    address_number: string().required('Por favor preencha o número.'),
    neighborhood: string().required('Por favor preencha o bairro.'),
    city: string().required('Por favor preencha a cidade.'),
    state: string().required('Por favor preencha o estado.'),
    postal_code: string().required('Por favor preencha o CEP.'),
    color: string().required('Por favor preencha a cor da empresa.')
})

const emptyResponsibleCompany = {
    id: '',
    identification_number: '',
    company_name: '',
    brand_name: '',
    municipal_registration: '',
    state_registration: '',
    email: '',
    phone: '',
    mobile_phone: '',
    address_name: '',
    address_number: '',
    address_complement: '',
    neighborhood: '',
    city: '',
    state: '',
    postal_code: '',
    color: '',
    logo: ''
}

const states = [
    { label: '', code: '' },
    { label: 'Acre', code: 'AC' },
    { label: 'Alagoas', code: 'AL' },
    { label: 'Amapá', code: 'AP' },
    { label: 'Amazonas', code: 'AM' },
    { label: 'Bahia', code: 'BA' },
    { label: 'Ceará', code: 'CE' },
    { label: 'Distrito Federal', code: 'DF' },
    { label: 'Espírito Santo', code: 'ES' },
    { label: 'Goiás', code: 'GO' },
    { label: 'Maranhão', code: 'MA' },
    { label: 'Mato Grosso', code: 'MT' },
    { label: 'Mato Grosso do Sul', code: 'MS' },
    { label: 'Minas Gerais', code: 'MG' },
    { label: 'Pará', code: 'PA' },
    { label: 'Paraíba', code: 'PB' },
    { label: 'Paraná', code: 'PR' },
    { label: 'Pernambuco', code: 'PE' },
    { label: 'Piauí', code: 'PI' },
    { label: 'Rio de Janeiro', code: 'RJ' },
    { label: 'Rio Grande do Norte', code: 'RN' },
    { label: 'Rio Grande do Sul', code: 'RS' },
    { label: 'Rondônia', code: 'RO' },
    { label: 'Roraima', code: 'RR' },
    { label: 'Santa Catarina', code: 'SC' },
    { label: 'São Paulo', code: 'SP' },
    { label: 'Sergipe', code: 'SE' },
    { label: 'Tocantins', code: 'TO' },
]

function ResponsibleCompany() {

    const params = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [responsibleCompany, setResponsibleCompany] = useState(emptyResponsibleCompany)
    const [errorMessage, setErrorMessage] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const getResponsibleCompany = useGet(`/api/registrations/responsible_companies/${params.id}/`)
    const putResponsibleCompany = usePut(`/api/registrations/responsible_companies/${params.id}/`, true)
    const postResponsibleCompany = usePost(`/api/registrations/responsible_companies/`, true)
    const formik = useFormik({
        initialValues: responsibleCompany,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)
            if (params.id !== ':new') {
                if (typeof responsibleCompany.logo === 'string' || responsibleCompany.logo === null) {
                    const { logo, ...noPicture } = values
                    putResponsibleCompany(noPicture)
                        .then(response => {
                            setLoading(false)
                            navigate('/responsible_companies/')
                        })
                        .catch(error => {
                            setErrorMessage(JSON.stringify(error.response.data))
                            setOpenSnackbar(true)
                            setLoading(false)
                        })
                } else {
                    putResponsibleCompany(values)
                        .then(response => {
                            setLoading(false)
                            navigate('/responsible_companies/')
                        })
                        .catch(error => {
                            setErrorMessage(JSON.stringify(error.response.data))
                            setOpenSnackbar(true)
                            setLoading(false)
                        })
                }
            } else {
                postResponsibleCompany(values)
                    .then(response => {
                        setLoading(false)
                        navigate('/responsible_companies/')
                    })
                    .catch(error => {
                        setErrorMessage(JSON.stringify(error.response.data))
                        setOpenSnackbar(true)
                        setLoading(false)
                    })
            }
        }
    })

    function handleImage(e) {
        setResponsibleCompany({ ...responsibleCompany, [e.target.name]: e.target.files[0] })
    }

    useEffect(() => {
        if (params.id !== ':new') {
            getResponsibleCompany()
                .then(response => {
                    setResponsibleCompany(response)
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

    if (loading) {
        return <ProgressBar />
    }

    return (
        <>
            <Toolbar variant='dense' disableGutters sx={{ minHeight: 20, height: 20 }}>
                <IconButton component={Link} to='/responsible_companies' edge='start'>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center' }}>
                    {formik.values.brand_name}
                </Typography>
                <IconButton color='inherit' edge='end' form='form' type='submit'>
                    <SaveOutlinedIcon />
                </IconButton>
            </Toolbar>
            <Container component='main' maxWidth='xl' disableGutters sx={{ mt: '2rem' }}>
                <Box component='form' id='form' onSubmit={formik.handleSubmit}>
                    <Grid container justifyContent='start' columnSpacing={2} rowSpacing={2}>
                        <FormFields
                            states={states}
                            handleImage={handleImage}
                            formik={formik}
                        />
                    </Grid>
                </Box>
            </Container>
            <ErrorSnackbar
                isOpened={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default ResponsibleCompany