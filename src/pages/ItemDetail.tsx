import { createSignal, For, type Component, createEffect } from "solid-js";
import Item from "../components/Item";
import supabase from "../services/supabase";
import { useItems } from "../store/ItemsStore";
import { A, useParams } from "@solidjs/router";
import { useCart } from "../store/CartStore";
import toast from "solid-toast";

type ItemDetailRouteParams = { id: string };

const ItemDetail: Component = () => {
  const { items, getItemById } = useItems();
  const { id } = useParams<ItemDetailRouteParams>();
  const item = getItemById(parseInt(id));

  const { addItem } = useCart();

  const handleClick = () => {
    addItem({ item: item!, quantity: quantity() });
    toast.success("Item added to cart!", { position: "bottom-right" });
  };

  const [quantity, setQuantity] = createSignal(1);

  return (
    <>
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={item?.image}
            />
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                {item?.category_name}
              </h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                {item?.name}
              </h1>
              <div class="flex mb-4"></div>
              <p class="leading-relaxed">{item?.description}</p>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
              <div class="flex">
                <span class="title-font font-medium text-2xl text-gray-900">
                  Rs. {item?.price}
                </span>
                <div class="custom-number-input h-10 ml-auto w-64">
                  <div class="flex flex-row w-20 ml-auto h-10 rounded-lg relative bg-transparent mt-0 justify-content-right">
                    <button
                      onClick={() => setQuantity(Math.max(quantity() - 1, 0))}
                      data-action="decrement"
                      class=" bg-indigo-500 text-white hover:text-indigo-700 hover:bg-indigo-400 h-full w-20 rounded-l cursor-pointer outline-none py-2"
                    >
                      <span class="m-auto text-l font-thin">−</span>
                    </button>
                    <input
                      type="number"
                      class="outline-none focus:outline-none text-center w-full bg-indigo-300 font-semibold text-md hover:text-black focus:text-black py-2 md:text-basecursor-default flex items-center text-indigo-700  outline-none"
                      name="custom-input-number"
                      value={quantity()}
                    ></input>
                    <button
                      onClick={() => setQuantity(quantity() + 1)}
                      class="bg-indigo-500 text-white hover:text-indigo-700 hover:bg-indigo-400 h-full w-20 rounded-r cursor-pointer py-2"
                    >
                      <span class="m-auto text-l font-thin">+</span>
                    </button>
                  </div>
                </div>
                <button
                  class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  onClick={handleClick}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ItemDetail;
