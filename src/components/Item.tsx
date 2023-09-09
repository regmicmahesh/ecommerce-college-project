import type { Component } from "solid-js";

export interface ItemProps {
  name: string;
  price: number;
  image: string;
  category: string;
}

export const Item: Component<ItemProps> = (props) => {
  const { name, price, image, category } = props;

  return (
    <>
      <div class="block relative h-48 rounded overflow-hidden">
        <img
          alt="ecommerce"
          class="object-cover object-center w-full h-full block"
          src={image}
        />
      </div>
      <div class="mt-4">
        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
          {category}
        </h3>
        <h2 class="text-gray-900 title-font text-lg font-medium">{name}</h2>
        <p class="mt-1">Rs. {price}</p>
      </div>
    </>
  );
};

export default Item;
