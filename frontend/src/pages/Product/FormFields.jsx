import React from 'react'
import { Grid, TextField } from '@mui/material'
import { NumericFormat, PatternFormat } from 'react-number-format'

function FormFields({ formik }) {
    return (
        <>
            <Grid item xs={12} sm={4}>
                <TextField
                    id='name'
                    label='Nome'
                    fullWidth
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    {...formik.getFieldProps('name')}
                />
            </Grid>
            <Grid item xs={12} sm={8}>
                <TextField
                    id='description'
                    label='Descrição'
                    fullWidth
                    multiline
                    rows={5}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    {...formik.getFieldProps('description')}
                />
            </Grid>
            <Grid item xs={6} sm={3} lg={2}>
                <NumericFormat
                    id='price'
                    label='Valor de Compra'
                    fullWidth
                    customInput={TextField}
                    thousandSeparator='.'
                    decimalSeparator=','
                    decimalScale={2}
                    fixedDecimalScale
                    prefix='R$ '
                    allowNegative={false}
                    onValueChange={v => formik.setFieldValue('price', v.floatValue ?? '')}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                />
            </Grid>
            <Grid item xs={6} sm={2} lg={1.5}>
                <NumericFormat
                    id='profit_percentage'
                    label='% de Lucro'
                    fullWidth
                    customInput={TextField}
                    decimalSeparator=','
                    decimalScale={2}
                    suffix='%'
                    allowNegative={false}
                    onValueChange={v => formik.setFieldValue('profit_percentage', v.floatValue ?? '')}
                    onBlur={formik.handleBlur}
                    value={formik.values.profit_percentage}
                    error={formik.touched.profit_percentage && Boolean(formik.errors.profit_percentage)}
                    helperText={formik.touched.profit_percentage && formik.errors.profit_percentage}
                />
            </Grid>
            <Grid item xs={6} sm={3} lg={2}>
                <NumericFormat
                    id='sale_price'
                    label='Valor de Venda'
                    fullWidth
                    disabled
                    customInput={TextField}
                    thousandSeparator='.'
                    decimalSeparator=','
                    decimalScale={2}
                    fixedDecimalScale
                    prefix='R$ '
                    {...formik.getFieldProps('sale_price')}
                />
            </Grid>
            <Grid item xs={6} sm={1.5} lg={2}>
                <TextField
                    id='measurement_unit'
                    label='Unidade de Medida'
                    fullWidth
                    {...formik.getFieldProps('measurement_unit')}
                />
            </Grid>
            <Grid item xs={6} sm={2.5} lg={1.5}>
                <PatternFormat
                    id='ncm_naladish'
                    label='NCM/Naladish'
                    fullWidth
                    customInput={TextField}
                    format='####.##.##'
                    mask='_'
                    onValueChange={v => formik.setFieldValue('ncm_naladish', v.floatValue ?? '')}
                    onBlur={formik.handleBlur}
                    value={formik.values.ncm_naladish}
                />
            </Grid>
            <Grid item xs={6} sm={3} lg={1.5}>
                <TextField
                    id='o_cst'
                    label='O/CST'
                    fullWidth
                    {...formik.getFieldProps('o_cst')}
                />
            </Grid>
            <Grid item xs={6} sm={3} lg={1.5}>
                <TextField
                    id='cfop'
                    label='CFOP'
                    fullWidth
                    {...formik.getFieldProps('cfop')}
                />
            </Grid>
            <Grid item xs={6} sm={3} lg={2}>
                <NumericFormat
                    id='icms_base_calc'
                    label='Base de Cálculo ICMS'
                    fullWidth
                    customInput={TextField}
                    thousandSeparator='.'
                    decimalSeparator=','
                    decimalScale={2}
                    fixedDecimalScale
                    prefix='R$ '
                    allowNegative={false}
                    onValueChange={v => formik.setFieldValue('icms_base_calc', v.floatValue ?? '')}
                    onBlur={formik.handleBlur}
                    value={formik.values.icms_base_calc}
                />
            </Grid>
            <Grid item xs={6} sm={3} lg={2}>
                <NumericFormat
                    id='icms_price'
                    label='Valor ICMS'
                    fullWidth
                    customInput={TextField}
                    thousandSeparator='.'
                    decimalSeparator=','
                    decimalScale={2}
                    fixedDecimalScale
                    prefix='R$ '
                    allowNegative={false}
                    onValueChange={v => formik.setFieldValue('icms_price', v.floatValue ?? '')}
                    onBlur={formik.handleBlur}
                    value={formik.values.icms_price}
                />
            </Grid>
            <Grid item xs={6} sm={2} lg={1.5}>
                <NumericFormat
                    id='icms_rate'
                    label='Alíquota ICMS'
                    fullWidth
                    customInput={TextField}
                    decimalSeparator=','
                    decimalScale={2}
                    suffix='%'
                    allowNegative={false}
                    onValueChange={v => formik.setFieldValue('icms_rate', v.floatValue ?? '')}
                    onBlur={formik.handleBlur}
                    value={formik.values.icms_rate}
                />
            </Grid>
            <Grid item xs={6} sm={3} lg={2}>
                <NumericFormat
                    id='ipi_price'
                    label='Valor IPI'
                    fullWidth
                    customInput={TextField}
                    thousandSeparator='.'
                    decimalSeparator=','
                    decimalScale={2}
                    fixedDecimalScale
                    prefix='R$ '
                    allowNegative={false}
                    onValueChange={v => formik.setFieldValue('ipi_price', v.floatValue ?? '')}
                    onBlur={formik.handleBlur}
                    value={formik.values.ipi_price}
                />
            </Grid>
            <Grid item xs={6} sm={2} lg={1.5}>
                <NumericFormat
                    id='ipi_rate'
                    label='Alíquota IPI'
                    fullWidth
                    customInput={TextField}
                    decimalSeparator=','
                    decimalScale={2}
                    suffix='%'
                    allowNegative={false}
                    onValueChange={v => formik.setFieldValue('ipi_rate', v.floatValue ?? '')}
                    onBlur={formik.handleBlur}
                    value={formik.values.ipi_rate}
                />
            </Grid>
        </>
    )
}

export default FormFields