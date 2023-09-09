import { Component, For } from "solid-js";
import { useCart } from "../store/CartStore";
import toast from "solid-toast";
import supabase from "../services/supabase";
import { useUser } from "../store/UserStore";
import { useNavigate } from "@solidjs/router";

export const CartList: Component = () => {
  const { items, getTotal, clearItems } = useCart();
  const { session } = useUser();

  const navigate = useNavigate();

  const handleClick = async () => {
    if (session() == null) {
      toast.error("Please login to place order!", {
        position: "bottom-right",
      });
      return navigate("/");
    }

    if (session() != null) {
      const orders = items().map((item) => {
        return {
          item_id: item.item.id,
          quantity: item.quantity,
          user_id: session()!.user.id,
        };
      });

      const { error } = await supabase.from("order").insert(orders);

      if (error) {
        toast.error(error.message, {
          position: "bottom-right",
        });
        return;
      } else {
        toast.success("Order placed successfully!", {
          position: "bottom-right",
        });

        clearItems();

        navigate("/");
      }
    }
  };

  return (
    <div class="flex my-5">
      <div class="relative overflow-x-auto mx-auto my-5">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">
                Item
              </th>
              <th scope="col" class="px-6 py-3">
                Quantity
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            <For each={items()}>
              {(item) => (
                <tr class="bg-white border-b">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item.item.name}
                  </th>
                  <td class="px-6 py-4">{item.quantity}</td>
                  <td class="px-6 py-4">Rs. {item.item.price}</td>
                  <td class="px-6 py-4">
                    Rs. {item.item.price * item.quantity}
                  </td>
                </tr>
              )}
            </For>
          </tbody>
          <tfoot class="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">
                TOTAL
              </th>
              <th scope="col" class="px-6 py-3">
                {getTotal().totalQuantity}
              </th>
              <th scope="col" class="px-6 py-3"></th>
              <th scope="col" class="px-6 py-3">
                Rs. {getTotal().totalPrice}
              </th>
            </tr>
          </tfoot>
        </table>

        <div class="flex">
          <button
            type="button"
            class="mt-5 ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleClick}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};
