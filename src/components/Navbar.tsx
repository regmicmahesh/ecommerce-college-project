import { createSignal, Component } from "solid-js";
import supabase from "../services/supabase";
import { useUser } from "../store/UserStore";
import { A } from "@solidjs/router";
import Dismiss from "solid-dismiss";
import { useCart } from "../store/CartStore";

const Navbar: Component = () => {
  const { session } = useUser();

  const [open, setOpen] = createSignal(false);

  let btnEl: any;

  const { items } = useCart();

  const handleClick = async () => {
    if (session()) {
      // user is logged in
      await supabase.auth.signOut();
      return;
    }

    // user is logged out
    const res = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (res.error) {
      alert(res.error.message);
    }
  };

  return (
    <>
      <header class="text-gray-600 body-font">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <A
            class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            href="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span class="ml-3 text-xl">HamroPasal</span>
          </A>
          <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <A class="mr-5 hover:text-gray-900" href="/cart">
              <button
                type="button"
                class="relative inline-flex items-center p-3 text-sm font-medium text-center text-green-900 rounded-lg focus:ring-none focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>

                <span class="sr-only">Notifications</span>
                <div class="absolute inline-flex items-center justify-center w-6 h-6   text-black rounded-full -top-1 -right-1 dark:border-gray-900">
                  {items().length}
                </div>
              </button>
            </A>
            {session() && (
              <a class="mr-5 hover:text-gray-900">{session()?.user.email}</a>
            )}
          </nav>
          <button
            class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            onClick={handleClick}
          >
            {session() ? "Logout" : "Login"}
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
