import React from 'react'
import { Grid, TextField, Autocomplete } from '@mui/material'

function FormFields({ statusList, customerList, formik }) {
    return (
        <>
            <Grid item xs={12} sm={3.5} xl={1.75}>
                <Autocomplete
                    disablePortal
                    id='status_ac'
                    options={statusList}
                    onChange={(e, value) => {
                        formik.setFieldValue('status', value?.code || '')
                    }}
                    onBlur={formik.handleBlur}
                    value={statusList.find(st => st.code === formik.values.status)}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            id='status'
                            label='Status'
                            fullWidth
                            error={formik.touched.status && Boolean(formik.errors.status)}
                            helperText={formik.touched.status && formik.errors.status}
                        />
                    }
                />
            </Grid>
            <Grid item xs={12} sm={3.5} xl={1.75}>
                <TextField
                    id='seller'
                    label='Vendedor'
                    fullWidth
                    error={formik.touched.seller && Boolean(formik.errors.seller)}
                    helperText={formik.touched.seller && formik.errors.seller}
                    {...formik.getFieldProps('seller')}
                />
            </Grid>
            <Grid item xs={6} sm={2.5} xl={1.25}>
                <TextField
                    id='date'
                    label='Data'
                    fullWidth
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date}
                    {...formik.getFieldProps('date')}
                />
            </Grid>
            <Grid item xs={6} sm={2.5} xl={1.25}>
                <TextField
                    id='expiration_date'
                    label='Data de Validade'
                    fullWidth
                    error={formik.touched.expiration_date && Boolean(formik.errors.expiration_date)}
                    helperText={formik.touched.expiration_date && formik.errors.expiration_date}
                    {...formik.getFieldProps('expiration_date')}
                />
            </Grid>
            <Grid item xs={12} xl={6}>
                <TextField
                    id='contact'
                    label='Contato'
                    fullWidth
                    {...formik.getFieldProps('contact')}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Autocomplete
                    disablePortal
                    id='customer_ac'
                    options={customerList}
                    onChange={(e, value) => {
                        formik.setFieldValue('customer', value?.code || '')
                    }}
                    onBlur={formik.handleBlur}
                    value={customerList.find(ct => ct.code === formik.values.customer)}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            id='customer'
                            label='Cliente'
                            fullWidth
                            error={formik.touched.customer && Boolean(formik.errors.customer)}
                            helperText={formik.touched.customer && formik.errors.customer} />
                    }
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Autocomplete
                    disablePortal
                    id='service_location_ac'
                    options={customerList}
                    onChange={(e, value) => {
                        formik.setFieldValue('service_location', value?.code || '')
                    }}
                    onBlur={formik.handleBlur}
                    value={customerList.find(ct => ct.code === formik.values.service_location)}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            id='service_location'
                            label='Local do Serviço'
                            fullWidth
                            error={formik.touched.service_location && Boolean(formik.errors.service_location)}
                            helperText={formik.touched.service_location && formik.errors.service_location} />
                    }
                />
            </Grid>
            <Grid item xs={12} xl={6}>
                <TextField
                    id='service_description'
                    label='Descrição do Serviço'
                    fullWidth
                    multiline
                    rows={3}
                    error={formik.touched.service_description && Boolean(formik.errors.service_description)}
                    helperText={formik.touched.service_description && formik.errors.service_description}
                    {...formik.getFieldProps('service_description')}
                />
            </Grid>
            <Grid item xs={12} sm={4} xl={2}>
                <TextField
                    id='payment_method'
                    label='Forma de Pagamento'
                    fullWidth
                    multiline
                    rows={3}
                    error={formik.touched.payment_method && Boolean(formik.errors.payment_method)}
                    helperText={formik.touched.payment_method && formik.errors.payment_method}
                    {...formik.getFieldProps('payment_method')}
                />
            </Grid>
            <Grid item xs={12} sm={4} xl={2}>
                <TextField
                    id='deadline'
                    label='Prazo de Entrega'
                    fullWidth
                    multiline
                    rows={3}
                    error={formik.touched.deadline && Boolean(formik.errors.deadline)}
                    helperText={formik.touched.deadline && formik.errors.deadline}
                    {...formik.getFieldProps('deadline')}
                />
            </Grid>
            <Grid item xs={12} sm={4} xl={2}>
                <TextField
                    id='warranty'
                    label='Garantia'
                    fullWidth
                    multiline
                    rows={3}
                    error={formik.touched.warranty && Boolean(formik.errors.warranty)}
                    helperText={formik.touched.warranty && formik.errors.warranty}
                    {...formik.getFieldProps('warranty')}
                />
            </Grid>
        </>
    )
}

export default FormFields