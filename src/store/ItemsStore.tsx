import {
  Component,
  createSignal,
  createContext,
  useContext,
  Accessor,
  ComponentProps,
} from "solid-js";
import type { Session } from "@supabase/supabase-js";

export type Item = {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  category_name: string;
};

interface IItemStore {
  items: Accessor<Item[]>;
  setItems: (items: Item[]) => void;
  getItemById: (id: number) => Item | undefined;
  clearItems: () => void;
}

const ItemsContext = createContext<IItemStore>();

export const ItemsProvider: Component<any> = (props) => {
  const [items, setItems] = createSignal<Item[]>([]);
  const currentItems = {
    items,
    setItems,
    clearItems: () => setItems([]),
    getItemById: (id: number) => items().find((item) => item.id === id),
  };

  return (
    <ItemsContext.Provider value={currentItems}>
      {props.children}
    </ItemsContext.Provider>
  );
};

export function useItems() {
  return useContext(ItemsContext)!;
}
