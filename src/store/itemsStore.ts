import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Item, Property } from '../types';

interface ItemsState {
  userItems: (Item | Property)[];
  addItem: (item: Item | Property) => void;
  removeItem: (itemId: string) => void;
  updateItem: (itemId: string, updates: Partial<Item | Property>) => void;
  getItemsByUserId: (userId: string) => (Item | Property)[];
}

export const useItemsStore = create<ItemsState>()(
  persist(
    (set, get) => ({
      userItems: [],
      addItem: (item) => 
        set((state) => ({
          userItems: [...state.userItems, item],
        })),
      removeItem: (itemId) =>
        set((state) => ({
          userItems: state.userItems.filter((item) => item.id !== itemId),
        })),
      updateItem: (itemId, updates) =>
        set((state) => ({
          userItems: state.userItems.map((item) =>
            item.id === itemId ? { ...item, ...updates } : item
          ),
        })),
      getItemsByUserId: (userId) => {
        return get().userItems.filter((item) => item.owner.id === userId);
      },
    }),
    {
      name: 'items-storage',
    }
  )
);