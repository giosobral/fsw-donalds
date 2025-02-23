"use client";

import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { redirect, useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ProductHeaderProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const { back } = useRouter();
  const { slug } = useParams();

  const handleRedirectToCustomerOrders = () => {
    redirect(`/${slug}/orders`);
  };

  return (
    <div className="relative min-h-[300px] w-full bg-orange-50">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={back}
      >
        <ChevronLeftIcon />
      </Button>
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-contain"
      />
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full"
        onClick={handleRedirectToCustomerOrders}
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default ProductHeader;
