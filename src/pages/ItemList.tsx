import { createSignal, For, type Component, createEffect } from "solid-js";
import Item from "../components/Item";
import supabase from "../services/supabase";
import { useItems } from "../store/ItemsStore";
import { A } from "@solidjs/router";

const ItemsList: Component = () => {
  const { items, setItems } = useItems();

  const [searchTerm, setSearchTerm] = createSignal<string>("");

  const fetchItems = async () => {
    const { data, error } = await supabase.from("items").select();
    if (error) {
      console.log(error);
    } else if (data) {
      setItems(data);
    }
  };

  createEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <form class="p-5" onSubmit={handleSubmit}>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Items..."
            required
            value={searchTerm()}
            onInput={(e) => setSearchTerm(e.currentTarget.value)}
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>

      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            <For
              each={items().filter((i) =>
                i.name.toLowerCase().includes(searchTerm().toLowerCase())
              )}
            >
              {(item) => (
                <A
                  href={`/item/${item.id}`}
                  class="block lg:w-1/4 md:w-1/2 p-4 w-full"
                >
                  <Item
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    category={item.category_name}
                  />
                </A>
              )}
            </For>
          </div>
        </div>
      </section>
    </>
  );
};

export default ItemsList;
