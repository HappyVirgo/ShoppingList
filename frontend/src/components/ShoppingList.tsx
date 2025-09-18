import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TextareaAutosize as Textarea,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Select,
  MenuItem as Option,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types';
import ShoppingItemList from './ShoppingItemList';
import { createShoppingItemRequest, updateShoppingItemRequest } from '../store/actions';

const ShoppingList: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.shoppingList);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', description: '', quantity: 1, completed: false });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleAddItem = () => {
    setEditingItem(null);
    setFormData({ name: '', description: '', quantity: 1, completed: false });
    setDialogOpen(true);
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setFormData({ name: item.name, description: item.description, quantity: item.quantity, completed: item.completed });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingItem(null);
    setFormData({ name: '', description: '', quantity: 1, completed: false });
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      setSnackbar({
        open: true,
        message: 'Item name is required',
        severity: 'error'
      });
      return;
    }

    if (editingItem) {
      dispatch(updateShoppingItemRequest(editingItem.id, formData));
    } else {
      dispatch(createShoppingItemRequest(formData));
    }

    handleCloseDialog();
    setSnackbar({
      open: true,
      message: editingItem ? 'Item updated successfully' : 'Item added successfully',
      severity: 'success'
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            Shopping List
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {completedCount} of {totalCount} items completed
          </Typography>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <ShoppingItemList 
          items={items} 
          onEditItem={handleEditItem}
          loading={loading}
        />

        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
          onClick={handleAddItem}
        >
          <Add />
        </Fab>

        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingItem ? 'Edit Item' : 'Add New Item'}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Item Name"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              minRows={3}
              margin="dense"
              label="Description"
              fullWidth
              variant="outlined"
              autoFocus
              multiline
              helperText="0/100"
              value={formData.description}
              onChange={(e: any) => setFormData({ ...formData, description: e.target.value })}
            />
            <Select
              placeholder='How Many?'
              margin="dense"
              label="Quantity"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value as string) || 1 })}
              > 
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
            </Select>
            {editingItem && <FormControlLabel
              label="Purchased"
              control={
                <Checkbox
                  checked={formData.completed}
                  onChange={(e) => setFormData({ ...formData, completed: e.target.checked ? true: false })}
                  color="primary"
                />
              }
            />}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingItem ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert 
            onClose={handleSnackbarClose} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default ShoppingList;
