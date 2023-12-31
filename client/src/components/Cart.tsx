import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Flex,
  VStack,
  Heading,
  Image,
  Grid,
  GridItem,
  HStack,
  Text,
  Divider,
  Button,
  AspectRatio,
  IconButton,
  NumberInputField,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useCustomer } from "../context/CustomerProvider";
import { StyleContext } from "../context/StyleProvider";
import { ColorContext } from "../context/ColorProvider";
import { OrderContext } from "../context/OrderProvider";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { OrderItem } from "../types/types";
import {
  updateOrderItems,
  deleteOrderItem,
  updateOrderStatus,
  handleCreateOrder,
} from "../api/orders";

export default function Cart() {
  const { customer } = useCustomer();
  const { styles } = useContext(StyleContext);
  const { colors } = useContext(ColorContext);
  const {
    orders,
    handleDeleteItem,
    handleUpdateQty,
    handleUpdateOrderItems,
    handleUpdateOrderStatus,
    handleAddOrder,
  } = useContext(OrderContext);
  const history = useHistory();

  const userOrders = orders.filter(
    (order) => order.customer_id === customer?.id && order.status === "created"
  );

  const userOrderItems = userOrders.flatMap((order) => order.orderitems);

  useEffect(() => {
    const updatedUserOrderItems = userOrders.flatMap(
      (order) => order.orderitems
    );
    const updatedTotalSubtotal = updatedUserOrderItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );
    setTotalSubtotal(updatedTotalSubtotal);
  }, [userOrders]);

  const initialTotalSubtotal = userOrderItems.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );
  const [totalSubtotal, setTotalSubtotal] = useState(initialTotalSubtotal);

  const totalItemCount = userOrderItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const shippingTotal = totalItemCount ? 5.95 : 0;
  const taxes = totalSubtotal * 0.11;
  const totalAmount = totalSubtotal + shippingTotal + taxes;

  function handleDeleteClick(item: OrderItem) {
    const orderId = userOrders[0]?.id;
    const itemId = item?.id ?? 0;
    deleteOrderItem(orderId, itemId).then(() => handleDeleteItem(item));
  }

  const handleQtyChange = (itemToUpdate: OrderItem, newQuantity: number) => {
    handleUpdateQty(itemToUpdate, newQuantity);

    const price = itemToUpdate.style?.price ?? 0;

    const updatedItem = {
      quantity: newQuantity,
      subtotal: newQuantity * price,
    };

    const orderId = userOrders[0]?.id;
    const itemId = itemToUpdate?.id ?? 0;

    updateOrderItems(updatedItem, orderId, itemId)
      .then((updatedItemFromServer) => {
        const updatedTotalSubtotal = userOrders.reduce(
          (sum, order) =>
            sum +
            order.orderitems.reduce(
              (subSum, item) => subSum + item.subtotal,
              0
            ),
          0
        );
        setTotalSubtotal(updatedTotalSubtotal);

        handleUpdateOrderItems(itemToUpdate, updatedItemFromServer, orderId);
      })
      .catch((error) => {
        console.error("Error updating order item:", error);
      });
  };

  function handleCheckout() {
    const orderId = userOrderItems[0]?.order_id ?? 0;

    updateOrderStatus(orderId)
      .then((data) => handleUpdateOrderStatus(orders, orderId, data))
      .catch((error) => {
        console.error("Error updating order status:", error);
      })
      .then(() =>
        handleCreateOrder(customer)
          .then((data) => {
            handleAddOrder(data);
          })
          .catch((error) => {
            console.error("Error creating new order:", error);
          })
      );
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
                    templateColumns="120px 1fr 1fr 1fr 1fr 50px"
                    gap={5}
                    key={item.id}
                  >
                    <GridItem colSpan={1}>
                      <Flex alignItems="center" h="140px">
                        <AspectRatio ratio={3 / 4} w={"120px"}>
                          <Image
                            boxSize="120px"
                            objectFit="cover"
                            borderRadius="lg"
                            src={sku.image}
                          ></Image>
                        </AspectRatio>
                      </Flex>
                    </GridItem>
                    <GridItem colStart={2} colEnd={4} h="140px">
                      <Flex h="140px" alignItems="center">
                        {orderStyle.style_name} - {colorDetail.color}
                      </Flex>
                    </GridItem>
                    <GridItem colStart={4} colEnd={4}>
                      <Flex h="140px" alignItems="center">
                        Qty:
                        <NumberInput
                          mx={5}
                          size="sm"
                          maxW={20}
                          defaultValue={item.quantity}
                          min={1}
                          max={5}
                          onChange={(value) => {
                            const newQuantity = parseInt(value);
                            handleQtyChange(item, newQuantity);
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Flex>
                    </GridItem>
                    <GridItem colStart={5} colEnd={5}>
                      <Flex h="140px" alignItems="center">
                        Subtotal: ${item.subtotal.toFixed(2)}
                      </Flex>
                    </GridItem>
                    <GridItem colStart={6} colEnd={6}>
                      <Flex h="140px" alignItems="center">
                        <IconButton
                          variant="outline"
                          size="sm"
                          aria-label="delete item"
                          icon={<SmallCloseIcon />}
                          border="2px solid"
                          borderColor="green.800"
                          _hover={{
                            transform: "translateY(2px)",
                            boxShadow: "lg",
                            border: "green.700",
                          }}
                          onClick={() => handleDeleteClick(item)}
                        />
                      </Flex>
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
          {totalAmount > 0 ? (
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
                history.push("/checkout");
              }}
            >
              Checkout
            </Button>
          ) : (
            <Button
              isLoading
              w={"full"}
              mt={6}
              size={"lg"}
              py={"7"}
              loadingText="Add Items to Cart"
              bg={"green.800"}
              color={"white"}
              textTransform={"uppercase"}
              variant="solid"
            >
              Submit
            </Button>
          )}
        </VStack>
      </Flex>
    </Container>
  );
}
