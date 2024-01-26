import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Container, Grid } from '@mui/material'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { useDelete, useGet, usePost, usePut } from '../../hooks/useApi'
import {
    ProgressBar, DeleteConfirmationDialog, ErrorSnackbar,
    ToolbarRegistration
} from '../../components'
import FormFields from './FormFields'

const validationSchema = object({
    person_type: string().required('Por favor escolha um tipo de pessoa.'),
    // name: string().required('Por favor preencha o nome.'),
    // company_name: string().required('Por favor preencha o nome fantasia.'),
    // brand_name: string().required('Por favor preencha a razão social.'),
    identification_number: string().required('Por favor preencha o CPF/CNPJ.'),
    email: string().email('Por favor preencha um email válido').required('Por favor preencha o email.'),
    mobile_phone: string().required('Por favor preencha o telefone celular.'),
    address_name: string().required('Por favor preencha o endereço.'),
    address_number: string().required('Por favor preencha o número.'),
    neighborhood: string().required('Por favor preencha o bairro.'),
    city: string().required('Por favor preencha a cidade.'),
    state: string().required('Por favor preencha o estado.'),
    postal_code: string().required('Por favor preencha o CEP.'),
})

const emptyCustomer = {
    id: '',
    address_name: '',
    address_number: '',
    address_complement: '',
    neighborhood: '',
    city: '',
    state: '',
    postal_code: '',
    email: '',
    phone: '',
    mobile_phone: '',
    person_type: '',
    identification_number: '',
    name: '',
    company_name: '',
    brand_name: '',
    municipal_registration: '',
    state_registration: '',
}

const personTypes = [
    { label: '', code: '' },
    { label: 'Pessoa Física', code: 'PF' },
    { label: 'Pessoa Jurídica', code: 'PJ' },
]

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

function Customer() {

    const params = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [customer, setCustomer] = useState(emptyCustomer)
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const getCustomer = useGet(`/api/registrations/customers/${params.id}/`)
    const putCustomer = usePut(`/api/registrations/customers/${params.id}/`)
    const postCustomer = usePost(`/api/registrations/customers/`)
    const deleteCustomer = useDelete(`/api/registrations/customers/${params.id}/`)
    const formik = useFormik({
        initialValues: customer,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)
            if (params.id !== ':new') {
                putCustomer(values)
                    .then(response => {
                        setLoading(false)
                        navigate('/customers/')
                    })
                    .catch(error => {
                        setErrorMessage(JSON.stringify(error.response.data))
                        setOpenSnackbar(true)
                        setLoading(false)
                    })
            } else {
                postCustomer(values)
                    .then(response => {
                        setLoading(false)
                        navigate('/customers/')
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
        if (params.id !== ':new') {
            getCustomer()
                .then(response => {
                    setCustomer(response)
                    setLoading(false)
                })
                .catch(error => {
                    setErrorMessage(JSON.stringify(error.response.data))
                    setOpenSnackbar(true)
                    setLoading(false)
                })
        }
        else {
            setLoading(false)
        }
        // eslint-disable-next-line
    }, [])

    function handleDelete() {
        setLoading(true)
        deleteCustomer()
            .then(response => {
                navigate('/customers/')
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
                backTo='/customers/'
                idRegistration={params.id}
                title={formik.values.person_type === 'PF' ? formik.values.name : formik.values.brand_name || 'Novo Cliente'}
                clickDelete={() => setOpenConfirmation(true)}
            />
            <Container component='main' maxWidth='xl' disableGutters sx={{ mt: '2rem' }}>
                <Box component='form' id='form' onSubmit={formik.handleSubmit}>
                    <Grid container justifyContent='start' columnSpacing={2} rowSpacing={2}>
                        <FormFields
                            personTypes={personTypes}
                            states={states}
                            formik={formik}
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

export default Customer