import React from 'react'
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material'

function DeleteConfirmationDialog({ isOpened, onClose, handleDelete }) {
    return (
        <Dialog open={isOpened} onClose={onClose}>
            <DialogTitle>Tem certeza que deseja excluir?</DialogTitle>
            <DialogActions>
                <Button variant='contained' onClick={onClose} autoFocus>Não</Button>
                <Button variant='outlined' onClick={handleDelete}>Sim</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteConfirmationDialog