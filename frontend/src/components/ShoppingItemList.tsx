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
  Button,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { ShoppingItem } from '../types';
import { toggleShoppingItemRequest } from '../store/actions';

interface ShoppingItemListProps {
  items: ShoppingItem[];
  onAddItem: () => void;
  onEditItem: (item: ShoppingItem) => void;
  onDeleteItem: (item: ShoppingItem) => void;
  loading: boolean;
}

const ShoppingItemList: React.FC<ShoppingItemListProps> = ({ items, onAddItem, onEditItem, onDeleteItem, loading }) => {
  const dispatch = useDispatch();

  const handleToggleComplete = (item: ShoppingItem) => {
    dispatch(toggleShoppingItemRequest(item.id));
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

  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Typography variant="h6" sx={{ alignSelf: 'center', mr: 2 }}> Your Items </Typography>
      <Button onClick={onAddItem} variant="contained">Add Item</Button>
    </Box>
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
              onClick={() => onDeleteItem(item)}
              color="error"
            >
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
    </>
  );
};

export default ShoppingItemList;
