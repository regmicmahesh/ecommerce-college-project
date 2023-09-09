import {
  Component,
  createSignal,
  createContext,
  useContext,
  Accessor,
  ComponentProps,
} from "solid-js";
import type { Session } from "@supabase/supabase-js";
import { Item } from "./ItemsStore";

type CartItem = {
  item: Item;
  quantity: number;
};

interface ICartItemStore {
  items: Accessor<CartItem[]>;
  setItems: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  clearItems: () => void;
  getTotal: () => { totalPrice: number; totalQuantity: number };
}

const CartContext = createContext<ICartItemStore>();

export const CartProvider: Component<any> = (props) => {
  const [items, setItems] = createSignal<CartItem[]>([]);
  const currentItems = {
    items,
    setItems,
    clearItems: () => setItems([]),
    addItem: (newItem: CartItem) => {
      const item = items().find((i) => i.item.id === newItem.item.id);
      if (item) {
        item.quantity += newItem.quantity;
      } else {
        setItems([...items(), newItem]);
      }
    },
    getTotal: () => {
      return {
        totalPrice: items().reduce((acc, item) => {
          return acc + item.item.price * item.quantity;
        }, 0),
        totalQuantity: items().reduce((acc, item) => {
          return acc + item.quantity;
        }, 0),
      };
    },
  };

  return (
    <CartContext.Provider value={currentItems}>
      {props.children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext)!;
}
