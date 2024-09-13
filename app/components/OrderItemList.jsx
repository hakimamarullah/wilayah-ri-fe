import React from "react";
import { CartItemCard } from "./CartItemCard";

const OrderItemList = () => {
  const dummyData = [
    {
      cartId: "12345",
      provider: "Verizon",
      itemId: "98765",
      simNumber: "123456789012345",
      price: 50.99,
      validity: "2024-12-31",
      description: "Unlimited data plan with free calls and texts.",
      accessToken: "abcd1234",
    },
    {
      cartId: "23456",
      provider: "AT&T",
      itemId: "87654",
      simNumber: "987654321012345",
      price: 40.00,
      validity: "2024-11-15",
      description: "10GB data plan with international calling.",
      accessToken: "efgh5678",
    },
    {
      cartId: "34567",
      provider: "T-Mobile",
      itemId: "76543",
      simNumber: "567890123456789",
      price: 30.75,
      validity: "2024-10-01",
      description: "5GB data plan with unlimited texting.",
      accessToken: "ijkl9012",
    },
    {
      cartId: "45678",
      provider: "Sprint",
      itemId: "65432",
      simNumber: "098765432109876",
      price: 25.50,
      validity: "2024-09-20",
      description: "2GB data plan with 500 minutes of talk time.",
      accessToken: "mnop3456",
    }
  ];
  return (
    <div>
      {dummyData.map((item) => (
        <CartItemCard
          key={item.itemId}
          cartId={item.cartId}
          provider={item.provider}
          itemId={item.itemId}
          simNumber={item.simNumber}
          price={item.price}
          validity={item.validity}
          description={item.description}
          accessToken={item.accessToken}
        />
      ))}
    </div>
  );
};

export default OrderItemList;
