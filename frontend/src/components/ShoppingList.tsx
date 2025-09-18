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
import { createShoppingItemRequest, updateShoppingItemRequest, deleteShoppingItemRequest } from '../store/actions';

const ShoppingList: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.shoppingList);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<any>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', description: '', quantity: 1, completed: false });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleAddItem = () => {
    setEditingItem(null);
    setDeletingItem(null);
    setFormData({ name: '', description: '', quantity: 1, completed: false });
    setDialogOpen(true);
  };

  const handleEditItem = (item: any) => {
    setDeletingItem(null);
    setEditingItem(item);
    setFormData({ name: item.name, description: item.description, quantity: item.quantity, completed: item.completed });
    setDialogOpen(true);
  };

  const handleDeleteItem = (item: any) => {
    setEditingItem(null);
    setDeletingItem(item);
    setDialogOpen(true);
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingItem(null);
    setFormData({ name: '', description: '', quantity: 1, completed: false });
  };

  const handleSubmit = () => {
    if (deletingItem) {
      dispatch(deleteShoppingItemRequest(deletingItem.id));
    } else {

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
    }

    handleCloseDialog();
    setSnackbar({
      open: true,
      message: deletingItem ? 'Item deleted successfully' : editingItem ? 'Item updated successfully' : 'Item added successfully',
      severity: 'success'
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // const completedCount = items.filter(item => item.completed).length;
  // const totalCount = items.length;

  return (
    <>
      <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 2, mb: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom color="inherit">
          Shopping List
        </Typography>
      </Box>
      <Container maxWidth="md" sx={{ py: 4 }}>
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

        {!loading && items.length === 0 ?
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                Your shopping list is empty {`:(`}
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAddItem} startIcon={<Add />}> Add your first item</Button>
            </Box>
          </Paper> : <ShoppingItemList
            items={items}
            onAddItem={handleAddItem}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
            loading={loading}
          />
        }

        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {deletingItem ? 'Delete Item?' : editingItem ? 'Edit Item' : 'Add New Item'}
          </DialogTitle>
          <DialogContent>
            {deletingItem ? <Typography variant="h6" color="text.secondary">Are you sure you want to delete this item? This can not be undone.</Typography> : (
              <>
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
                      onChange={(e) => setFormData({ ...formData, completed: e.target.checked ? true : false })}
                      color="primary"
                    />
                  }
                />}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {deletingItem ? 'Delete' : editingItem ? 'Update' : 'Add'}
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
      </Container>
    </>
  );
};

export default ShoppingList;
