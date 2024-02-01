import React from 'react'
import { Box, Grid } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'

function EditToolbar(props) {
    const { clickNew } = props

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button color='inherit' startIcon={<AddIcon />} onClick={clickNew}>
                Adicionar
            </Button>
        </Box>
    )
}

function QuoteItems({ rows, columns, processRowUpdate, clickNew }) {
    return (
        <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <Box sx={{
                    flexGrow: 1,
                    width: 250,
                    '& .header': { backgroundColor: 'secondary.main' },
                }}>
                    <DataGrid
                        autoHeight
                        rows={rows}
                        columns={columns}
                        editMode="row"
                        processRowUpdate={processRowUpdate}
                        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                        initialState={{
                            sorting: { sortModel: [{ field: 'number', sort: 'asc' }], },
                        }}
                        slots={{
                            footer: EditToolbar,
                        }}
                        slotProps={{
                            footer: { clickNew },
                        }}
                    />
                </Box>
            </Box>
        </Grid>
    )
}

export default QuoteItems