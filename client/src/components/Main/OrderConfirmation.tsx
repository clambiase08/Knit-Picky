import React from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Grid,
  GridItem,
  Icon,
  Heading,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { GiScooter } from "react-icons/gi";
import { useCustomer } from "../../context/CustomerProvider";

export default function OrderConfirmation() {
  const history = useHistory();
  const { customer } = useCustomer();

  return (
    <Container maxW="80%" pt={60} ml={40} pl={40} pr={80}>
      <Grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={1}>
          <Icon as={GiScooter} h="100%" w="100%" />
        </GridItem>
        <GridItem colSpan={4}>
          <Heading size="lg">Thank you for your order!</Heading>
          {/* <Text mt={2} color="gray.600">
            Order number is: TEST
          </Text> */}
          <Text mt={2} color="gray.600">
            You can track your order in "My orders"
          </Text>
        </GridItem>
        <GridItem colSpan={4}>
          <HStack justifyContent="flex-start" spacing={10}>
            <Button
              w={"full"}
              mt={6}
              size={"lg"}
              py={"7"}
              bg={"green.800"}
              color={"white"}
              // textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
                bg: "green.700",
              }}
              onClick={() => history.push(`/profile/${customer?.first_name}`)}
            >
              My Orders
            </Button>
            <Button
              w={"full"}
              mt={6}
              size={"lg"}
              py={"7"}
              bg={"green.800"}
              color={"white"}
              // textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
                bg: "green.700",
              }}
              onClick={() => history.push("/shop-all")}
            >
              Continue Shopping
            </Button>
          </HStack>
        </GridItem>
      </Grid>
    </Container>
  );
}
