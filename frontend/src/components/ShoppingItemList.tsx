import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Box,
  Chip,
  Skeleton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { ShoppingItem } from '../types';
import { toggleShoppingItemRequest, deleteShoppingItemRequest } from '../store/actions';

interface ShoppingItemListProps {
  items: ShoppingItem[];
  onEditItem: (item: ShoppingItem) => void;
  loading: boolean;
}

const ShoppingItemList: React.FC<ShoppingItemListProps> = ({ items, onEditItem, loading }) => {
  const dispatch = useDispatch();

  const handleToggleComplete = (item: ShoppingItem) => {
    dispatch(toggleShoppingItemRequest(item.id));
  };

  const handleDeleteItem = (item: ShoppingItem) => {
    dispatch(deleteShoppingItemRequest(item.id));
  };

  if (loading && items.length === 0) {
    return (
      <Box>
        {[1, 2, 3].map((i) => (
          <Box key={i} sx={{ mb: 1 }}>
            <Skeleton variant="rectangular" height={56} />
          </Box>
        ))}
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No items in your shopping list yet
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Click the + button to add your first item
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: '100%' }}>
      {items.map((item) => (
        <ListItem
          key={item.id}
          disablePadding
          sx={{
            mb: 1,
            borderRadius: 1,
            bgcolor: item.completed ? 'action.hover' : 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <ListItemButton
            onClick={() => handleToggleComplete(item)}
            sx={{
              textDecoration: item.completed ? 'line-through' : 'none',
              opacity: item.completed ? 0.7 : 1,
            }}
          >
            <Checkbox
              checked={item.completed}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleComplete(item);
              }}
              color="primary"
            />
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: item.completed ? 'line-through' : 'none',
                      color: item.completed ? 'text.secondary' : 'text.primary',
                    }}
                  >
                    {item.name}
                  </Typography>
                  {item.quantity > 1 && (
                    <Chip
                      label={item.quantity}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  )}
                </Box>
              }
              secondary={
                <Typography variant="caption" color="text.secondary">
                  {item.description}
                </Typography>
              }
            />
          </ListItemButton>
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => onEditItem(item)}
              sx={{ mr: 1 }}
            >
              <Edit />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDeleteItem(item)}
              color="error"
            >
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default ShoppingItemList;
