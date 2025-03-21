import { OrderStatus, Prisma } from "@prisma/client";
import { ScrollTextIcon } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";

import BackButton from "./back-button";

interface OrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true;
            avatarImageUrl: true;
          };
        };
        orderProducts: {
          include: {
            product: true;
          };
        };
      };
    }>
  >;
}

const getStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return "Pendente";
    case OrderStatus.FINISHED:
      return "Finalizado";
    case OrderStatus.IN_PREPARATION:
      return "Em preparo";
    default:
      return "Pendente";
  }
};

const statusLabelVerify = (status: OrderStatus) => {
  if (status === OrderStatus.FINISHED) {
    return "bg-green-500 text-white";
  }
  if (status === OrderStatus.PENDING) {
    return "bg-gray-200 text-gray-600";
  }
  if (status === OrderStatus.IN_PREPARATION) {
    return "bg-orange-500 text-white";
  }
};

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <div className="space-y-6 p-6">
      <BackButton />
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <div className="h2 text-lg font-semibold">Meus Pedidos</div>
      </div>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="space-y-4 p-5">
            <div
              className={`w-fit rounded-full px-2 py-1 text-xs font-semibold text-white ${statusLabelVerify(order.status)} `}
            >
              {getStatusLabel(order.status)}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5">
                <Image
                  fill
                  className="rounded-lg"
                  src={order.restaurant.avatarImageUrl}
                  alt={order.restaurant.name}
                />
              </div>
              <p className="text-sm font-semibold">{order.restaurant.name}</p>
            </div>
            <Separator />
            <div className="space-y-2">
              {order.orderProducts.map((orderProduct) => (
                <div key={orderProduct.id} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
                    {orderProduct.quantity}
                  </div>
                  <p className="text-sm">{orderProduct.product.name}</p>
                </div>
              ))}
            </div>
            <Separator />
            <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderList;
