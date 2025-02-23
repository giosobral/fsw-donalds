"use server";

import { ConsumptionMethod } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import { db } from "@/lib/prisma";

import { removeCpfPunctuation } from "../helpers/cpf";

interface CreateOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const restaurant = await getRestaurantBySlug(input.slug);

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const productWithPrice = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const productsWithPriceAndQuantity = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productWithPrice.find((p) => p.id === product.id)!.price,
  }));

  await db.order.create({
    data: {
      status: "PENDING",
      customerName: input.customerName,
      customerCpf: removeCpfPunctuation(input.customerCpf),
      orderProducts: {
        createMany: {
          data: productsWithPriceAndQuantity,
        },
      },
      total: productsWithPriceAndQuantity.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
      consumptionMethod: input.consumptionMethod,
      restaurantId: restaurant.id,
    },
  });
  revalidatePath(`/${input.slug}/orders`);
  redirect(
    `/${input.slug}/orders?cpf=${removeCpfPunctuation(input.customerCpf)}`,
  );
};
