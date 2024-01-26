import React from 'react'
import { Box, Grid } from '@mui/material'
import { DataGrid, ptBR } from '@mui/x-data-grid'

function QuoteItems({ rows, columns }) {
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
                        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 10, }, },
                            sorting: { sortModel: [{ field: 'number', sort: 'asc' }], },
                        }}
                        pageSizeOptions={[10, 25, 50, 100]}
                    />
                </Box>
            </Box>
        </Grid>
    )
}

export default QuoteItems