import React from 'react'
import { Snackbar, Alert } from '@mui/material'

function ErrorSnackbar({ isOpened, onClose, errorMessage }) {
    return (
        <Snackbar open={isOpened} autoHideDuration={6000} onClose={onClose}>
            <Alert severity="error" sx={{ width: '100%' }}>
                {errorMessage}
            </Alert>
        </Snackbar>
    )
}

export default ErrorSnackbar