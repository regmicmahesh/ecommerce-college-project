import { createEffect, type Component } from "solid-js";
import { Route, Router, Routes } from "@solidjs/router";
import Navbar from "./components/Navbar";
import { useUser } from "./store/UserStore";
import supabase from "./services/supabase";
import ItemList from "./pages/ItemList";
import { ItemsProvider } from "./store/ItemsStore";
import { CartProvider } from "./store/CartStore";
import ItemDetail from "./pages/ItemDetail";
import { Toaster } from "solid-toast";
import { CartList } from "./pages/CartList";

const App: Component = () => {
  const { setSession } = useUser();

  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session!);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session!);
    });
  }, []);

  return (
    <>
      <CartProvider>
        <Toaster />
        <Navbar />
        <ItemsProvider>
          <Routes>
            <Route path="/" component={ItemList} />
            <Route path="/item/:id" component={ItemDetail} />
            <Route path="/cart" component={CartList} />
          </Routes>
        </ItemsProvider>
      </CartProvider>
    </>
  );
};

export default App;
