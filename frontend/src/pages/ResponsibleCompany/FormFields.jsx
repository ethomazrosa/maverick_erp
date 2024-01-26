import React from 'react'
import { Box, Grid, Button, TextField, Autocomplete } from '@mui/material'
import { PatternFormat } from 'react-number-format'

function FormFields({ states, handleImage, formik }) {
    return (
        <>
            <Grid item xs={12}>
                <Button fullWidth component='label'>
                    <input hidden accept='image/*' type='file' name='logo' onChange={handleImage} />
                    <Box
                        component='img'
                        src={formik.values.logo}
                        alt='Logo'
                        sx={{ height: 150, width: '100%', objectFit: 'contain' }}
                    />
                </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    id='company_name'
                    label='Razão Social'
                    error={formik.touched.company_name && Boolean(formik.errors.company_name)}
                    helperText={formik.touched.company_name && formik.errors.company_name}
                    {...formik.getFieldProps('company_name')}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    id='brand_name'
                    label='Nome Fantasia'
                    error={formik.touched.brand_name && Boolean(formik.errors.brand_name)}
                    helperText={formik.touched.brand_name && formik.errors.brand_name}
                    {...formik.getFieldProps('brand_name')}
                />
            </Grid>
            <Grid item xs={12} sm={4} lg={2.5}>
                <PatternFormat
                    fullWidth
                    id='identification_number'
                    label='CNPJ'
                    customInput={TextField}
                    format={'##.###.###/####-##'}
                    mask='_'
                    onValueChange={v => formik.setFieldValue('identification_number', v.floatValue ?? '')}
                    onBlur={formik.handleBlur}
                    value={formik.values.identification_number}
                    error={formik.touched.identification_number && Boolean(formik.errors.identification_number)}
                    helperText={formik.touched.identification_number && formik.errors.identification_number}
                />
            </Grid>
            <Grid item xs={6} sm={4} lg={2.5}>
                <TextField
                    fullWidth
                    id='municipal_registration'
                    label='Inscrição Municipal'
                    type='number'
                    {...formik.getFieldProps('municipal_registration')}
                />
            </Grid>
            <Grid item xs={6} sm={4} lg={2.5}>
                <TextField
                    fullWidth
                    id='state_registration'
                    label='Inscrição Estadual'
                    type='number'
                    {...formik.getFieldProps('state_registration')}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={4.5}>
                <TextField
                    fullWidth
                    id='email'
                    label='Email'
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    {...formik.getFieldProps('email')}
                />
            </Grid>
            <Grid item xs={6} sm={3} lg={2}>
                <PatternFormat
                    fullWidth
                    id='phone'
                    label='Telefone Fixo'
                    customInput={TextField}
                    format='(##) ####-####'
                    mask='_'
                    onValueChange={v => formik.setFieldValue('phone', v.floatValue ?? '')}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                />
            </Grid>
            <Grid item xs={6} sm={3} lg={2}>
                <PatternFormat
                    fullWidth
                    id='mobile_phone'
                    label='Telefone Ceular'
                    customInput={TextField}
                    format='(##) #####-####'
                    mask='_'
                    onValueChange={v => formik.setFieldValue('mobile_phone', v.floatValue ?? '')}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile_phone}
                    error={formik.touched.mobile_phone && Boolean(formik.errors.mobile_phone)}
                    helperText={formik.touched.mobile_phone && formik.errors.mobile_phone}
                />
            </Grid>
            <Grid item xs={12} sm={12} lg={8}>
                <TextField
                    fullWidth
                    id='address_name'
                    label='Logradouro'
                    error={formik.touched.address_name && Boolean(formik.errors.address_name)}
                    helperText={formik.touched.address_name && formik.errors.address_name}
                    {...formik.getFieldProps('address_name')}
                />
            </Grid>
            <Grid item xs={12} sm={4} lg={2}>
                <TextField
                    fullWidth
                    id='address_number'
                    label='Número'
                    type='number'
                    error={formik.touched.address_number && Boolean(formik.errors.address_number)}
                    helperText={formik.touched.address_number && formik.errors.address_number}
                    {...formik.getFieldProps('address_number')}
                />
            </Grid>
            <Grid item xs={12} sm={8} lg={4}>
                <TextField
                    fullWidth
                    id='address_complement'
                    label='Complemento'
                    {...formik.getFieldProps('address_complement')}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <TextField
                    fullWidth
                    id='neighborhood'
                    label='Bairro'
                    error={formik.touched.neighborhood && Boolean(formik.errors.neighborhood)}
                    helperText={formik.touched.neighborhood && formik.errors.neighborhood}
                    {...formik.getFieldProps('neighborhood')}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <TextField
                    fullWidth
                    id='city'
                    label='Cidade'
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                    {...formik.getFieldProps('city')}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3.5}>
                <Autocomplete
                    disablePortal
                    id='state_ac'
                    options={states}
                    onChange={(e, value) => {
                        formik.setFieldValue('state', value?.code || '')
                    }}
                    onBlur={formik.handleBlur}
                    value={states.find(s => s.code === formik.values.state)}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            id='state'
                            label='Estado'
                            fullWidth
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}
                        />
                    }
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={1.5}>
                <PatternFormat
                    fullWidth
                    id='postal_code'
                    label='CEP'
                    customInput={TextField}
                    format='#####-###'
                    mask='_'
                    onValueChange={v => formik.setFieldValue('postal_code', v.floatValue ?? '')}
                    onBlur={formik.handleBlur}
                    value={formik.values.postal_code}
                    error={formik.touched.postal_code && Boolean(formik.errors.postal_code)}
                    helperText={formik.touched.postal_code && formik.errors.postal_code}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <TextField
                    fullWidth
                    id='color'
                    label='Cor'
                    error={formik.touched.color && Boolean(formik.errors.color)}
                    helperText={formik.touched.color && formik.errors.color}
                    {...formik.getFieldProps('color')}
                />
            </Grid>
        </>
    )
}

export default FormFields