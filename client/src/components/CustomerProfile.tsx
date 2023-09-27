import React, { useContext } from "react";
import {
  Stack,
  Flex,
  Text,
  VStack,
  useBreakpointValue,
  Box,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { useCustomer } from "../context/CustomerProvider";
import { OrderContext } from "../context/OrderProvider";
import Wishlist from "./Wishlist";

export default function CustomerProfile() {
  const { customer } = useCustomer();
  const { orders } = useContext(OrderContext);

  const userOrders = orders.filter(
    (order) => order.customer_id === customer?.id && order.status !== "created"
  );

  const userOrderItems = userOrders.flatMap((order) => order.orderitems);

  const orderAccordians = userOrders.map((order) => {
    const currentOrderItems = userOrderItems.filter(
      (orderItem) => orderItem.order_id === order.id
    );
    const totalSubtotal = currentOrderItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );
    return (
      <AccordionItem key={order.id}>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Order {order.id}
            </Box>
            <Box as="span" flex="8" textAlign="left">
              Subtotal: ${totalSubtotal.toFixed(2)}
            </Box>
            <Box as="span" flex="1" textAlign="left">
              Status: {order.status}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {currentOrderItems.map((orderItem) => {
            return (
              <Box as="span" flex="flex-start" key={orderItem.id}>
                <HStack justifyContent="flex-start"></HStack>
                <HStack justifyContent="flex-start">
                  <Heading size="sm">{orderItem.style?.style_name}</Heading>
                  <Text color="gray.600">Qty: {orderItem.quantity}</Text>
                </HStack>
              </Box>
            );
          })}
        </AccordionPanel>
      </AccordionItem>
    );
  });

  return (
    <Box>
      <Flex
        w={"full"}
        h={"40vh"}
        backgroundImage={"http://localhost:3000/assets/orderhistory.PNG"}
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
          alignItems={"flex-start"}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={2}>
            <Text
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
            >
              Welcome, {customer?.first_name}
            </Text>
            <Stack direction={"row"}>
              <Text
                color={"white"}
                fontWeight={400}
                fontSize={useBreakpointValue({ base: "lg", md: "xl" })}
              >
                See Order History:
              </Text>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
      <Accordion defaultIndex={[0]} allowMultiple>
        {orderAccordians}
      </Accordion>
      <Wishlist />
    </Box>
  );
}
