import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Flex,
  VStack,
  Heading,
  Image,
  Grid,
  GridItem,
  Select,
  HStack,
  Text,
  Divider,
  Button,
  AspectRatio,
} from "@chakra-ui/react";
import { OrderItemContext } from "../../context/OrderItemProvider";
import { useCustomer } from "../../context/CustomerProvider";
import { StyleContext } from "../../context/StyleProvider";
import { ColorContext } from "../../context/ColorProvider";

export default function Cart() {
  const { orderItems } = useContext(OrderItemContext);
  const { customer } = useCustomer();
  const { styles } = useContext(StyleContext);
  const { colors } = useContext(ColorContext);
  const history = useHistory();
  // console.log(orderItems);
  // console.log(customer);

  if (!customer) {
    return <div>Add items to cart</div>;
  }

  const userOrderItems = orderItems.filter(
    (orderItem) =>
      orderItem.order.customer_id === customer.id &&
      orderItem.order.status === "created"
  );
  // console.log(userOrderItems);

  const totalItemCount = userOrderItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalSubtotal = userOrderItems.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );
  const shippingTotal = 5.95;
  const taxes = totalSubtotal * 0.11;
  const totalAmount = totalSubtotal + shippingTotal + taxes;

  function handleCheckout() {
    // Assuming userOrderItems contains a single order with all items
    const orderId = userOrderItems[0].order_id;

    fetch(`/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "paid" }),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  }

  return (
    <Container maxW="95%" p={0}>
      <Flex h="100vh" py={"60px"}>
        <VStack
          w="full"
          h="full"
          p={0}
          mt={10}
          spacing={10}
          alignItems="flex-start"
        >
          <Heading size="xl">Shopping Cart ({totalItemCount} items)</Heading>
          {userOrderItems.map((item) => {
            const orderStyle = styles.find(
              (style) => style.id === item.style_id
            );

            if (orderStyle) {
              const sku = orderStyle.skus.find((sku) => sku.id === item.sku_id);
              const colorDetail = colors.find(
                (color) => color.id === sku?.color_id
              );

              if (sku && colorDetail) {
                return (
                  <Grid
                    templateColumns="250px repeat(3, 1fr)"
                    gap={5}
                    key={item.id}
                  >
                    <GridItem colSpan={1} h="140px">
                      <AspectRatio ratio={3 / 4} w={"120px"}>
                        <Image
                          boxSize="120px"
                          objectFit="cover"
                          borderRadius="lg"
                          src={sku.image}
                        ></Image>
                      </AspectRatio>
                    </GridItem>
                    <GridItem colStart={2} colEnd={2} h="140px">
                      {orderStyle.style_name} - {colorDetail.color}
                    </GridItem>
                    <GridItem colStart={3} colEnd={3} h="140px">
                      Qty:
                      <Select placeholder={`${item.quantity}`}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </Select>
                    </GridItem>
                    <GridItem colStart={4} colEnd={4} h="140px">
                      Subtotal: ${item.subtotal.toFixed(2)}
                    </GridItem>
                  </Grid>
                );
              }
            }
            return null;
          })}
        </VStack>
        <VStack
          w="60%"
          h="60%"
          p={10}
          mt={10}
          spacing={10}
          alignItems="flex-start"
          bg="gray.50"
        >
          <Heading size="xl">Order Summary</Heading>
          <VStack spacing={4} alignItems="stretch" w="full">
            <HStack justifyContent="space-between">
              <Text color="gray.600">Subtotal</Text>
              <Heading size="sm">${totalSubtotal.toFixed(2)}</Heading>
            </HStack>
            <HStack justifyContent="space-between">
              <Text color="gray.600">Shipping</Text>
              <Heading size="sm">${shippingTotal.toFixed(2)}</Heading>
            </HStack>
            <HStack justifyContent="space-between">
              <Text color="gray.600">Taxes (estimated)</Text>
              <Heading size="sm">${taxes.toFixed(2)}</Heading>
            </HStack>
            <Divider />
            <HStack justifyContent="space-between">
              <Text color="gray.600">Total</Text>
              <Heading size="lg">${totalAmount.toFixed(2)}</Heading>
            </HStack>
          </VStack>
          <Button
            w={"full"}
            mt={6}
            size={"lg"}
            py={"7"}
            bg={"green.800"}
            color={"white"}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
              bg: "green.700",
            }}
            onClick={() => {
              handleCheckout();
              history.push("/order-confirmed");
            }}
          >
            Checkout
          </Button>
        </VStack>
      </Flex>
    </Container>
  );
}
