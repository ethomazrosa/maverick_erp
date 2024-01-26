import React from 'react'
import { Grid, TextField, Autocomplete } from '@mui/material'
import { NumericFormat, PatternFormat } from 'react-number-format'

function FormFields({ personTypes, states, formik }) {
    return (
        <>
            <Grid item xs={12} sm={4} lg={3}>
                <Autocomplete
                    disablePortal
                    id='person_type_ac'
                    options={personTypes}
                    onChange={(e, value) => {
                        formik.setFieldValue('person_type', value?.code || '')
                    }}
                    onBlur={formik.handleBlur}
                    value={personTypes.find(pt => pt.code === formik.values.person_type)}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            id='person_type'
                            label='Tipo'
                            fullWidth
                            error={formik.touched.person_type && Boolean(formik.errors.person_type)}
                            helperText={formik.touched.person_type && formik.errors.person_type} />
                    }
                />
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
                <PatternFormat
                    id='identification_number'
                    label='CPF/CNPJ'
                    fullWidth
                    customInput={TextField}
                    format={formik.values.person_type === 'PF' ? '###.###.###-##' : '##.###.###/####-##'}
                    mask='_'
                    onValueChange={v => formik.setFieldValue('identification_number', v.floatValue ?? '')}
                    onBlur={formik.handleBlur}
                    value={formik.values.identification_number}
                    error={formik.touched.identification_number && Boolean(formik.errors.identification_number)}
                    helperText={formik.touched.identification_number && formik.errors.identification_number}
                />
            </Grid>
            {formik.values.person_type === 'PF' && (
                <Grid item xs={12} sm={4} lg={6}>
                    <TextField
                        id='name'
                        label='Nome'
                        fullWidth
                        required
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        {...formik.getFieldProps('name')}
                    />
                </Grid>
            )}
            {formik.values.person_type === 'PJ' && (
                <>
                    <Grid item xs={12} sm={4} lg={6}>
                        <TextField
                            id='brand_name'
                            label='Nome Fantasia'
                            fullWidth
                            required
                            error={formik.touched.brand_name && Boolean(formik.errors.brand_name)}
                            helperText={formik.touched.brand_name && formik.errors.brand_name}
                            {...formik.getFieldProps('brand_name')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={8}>
                        <TextField
                            id='company_name'
                            label='Razão Social'
                            fullWidth
                            required
                            error={formik.touched.company_name && Boolean(formik.errors.company_name)}
                            helperText={formik.touched.company_name && formik.errors.company_name}
                            {...formik.getFieldProps('company_name')}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3} lg={2}>
                        <TextField
                            id='municipal_registration'
                            label='Inscrição Municipal'
                            fullWidth
                            {...formik.getFieldProps('municipal_registration')}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3} lg={2}>
                        <TextField
                            id='state_registration'
                            label='Inscrição Estadual'
                            fullWidth
                            {...formik.getFieldProps('state_registration')}
                        />
                    </Grid>
                </>
            )}
            <Grid item xs={12} sm={4} lg={8}>
                <TextField
                    id='email'
                    label='E-Mail'
                    fullWidth
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    {...formik.getFieldProps('email')}
                />
            </Grid>
            <Grid item xs={6} sm={4} lg={2}>
                <PatternFormat
                    id='phone'
                    label='Telefone Fixo'
                    fullWidth
                    customInput={TextField}
                    format='(##) ####-####'
                    mask='_'
                    onValueChange={v => formik.setFieldValue('phone', v.floatValue ?? '')}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                />
            </Grid>
            <Grid item xs={6} sm={4} lg={2}>
                <PatternFormat
                    id='mobile_phone'
                    label='Telefone Celular'
                    fullWidth
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
            <Grid item xs={12} sm={4} lg={5}>
                <TextField
                    id='address_name'
                    label='Logradouro'
                    fullWidth
                    error={formik.touched.address_name && Boolean(formik.errors.address_name)}
                    helperText={formik.touched.address_name && formik.errors.address_name}
                    {...formik.getFieldProps('address_name')}
                />
            </Grid>
            <Grid item xs={4} sm={4} lg={2}>
                <NumericFormat
                    id='address_number'
                    label='Número'
                    fullWidth
                    customInput={TextField}
                    thousandSeparator='.'
                    decimalSeparator=','
                    decimalScale={0}
                    allowNegative={false}
                    onValueChange={v => formik.setFieldValue('address_number', v.floatValue ?? '')}
                    onBlur={formik.handleBlur}
                    value={formik.values.address_number}
                    error={formik.touched.address_number && Boolean(formik.errors.address_number)}
                    helperText={formik.touched.address_number && formik.errors.address_number}
                />
            </Grid>
            <Grid item xs={8} sm={4} lg={5}>
                <TextField
                    id='address_complement'
                    label='Complemento'
                    fullWidth
                    error={formik.touched.address_complement && Boolean(formik.errors.address_complement)}
                    helperText={formik.touched.address_complement && formik.errors.address_complement}
                    {...formik.getFieldProps('address_complement')}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    id='neighborhood'
                    label='Bairro'
                    fullWidth
                    error={formik.touched.neighborhood && Boolean(formik.errors.neighborhood)}
                    helperText={formik.touched.neighborhood && formik.errors.neighborhood}
                    {...formik.getFieldProps('neighborhood')}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    id='city'
                    label='Cidade'
                    fullWidth
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                    {...formik.getFieldProps('city')}
                />
            </Grid>
            <Grid item xs={8} sm={4}>
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
            <Grid item xs={4} sm={4} lg={2}>
                <PatternFormat
                    id='postal_code'
                    label='CEP'
                    fullWidth
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
        </>
    )
}

export default FormFields