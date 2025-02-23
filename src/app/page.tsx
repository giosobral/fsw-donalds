import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

const HomePage = async () => {
  const restaurant = await getRestaurantBySlug("fsw-donalds");

  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-red-100 px-6 pt-24">
      <h3 className="p-6 text-lg font-semibold">
        Clique no ícone para acessar o Restaurante
      </h3>

      <Link href={`/${restaurant.slug}/`}>
        <div className="flex flex-col items-center gap-2">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={82}
            height={82}
          />
          <h2 className="font-semibold">{restaurant?.name}</h2>
        </div>
      </Link>
    </div>
  );
};

export default HomePage;
