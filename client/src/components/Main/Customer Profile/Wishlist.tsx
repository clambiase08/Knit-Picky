import React from "react";
import { useCustomer } from "../../../context/CustomerProvider";
import {
  Flex,
  Image,
  Grid,
  GridItem,
  AspectRatio,
  VStack,
  Heading,
  Button,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

interface Style {
  id: number;
  style_name: string;
  skus: { image: string }[];
  price: number;
}

interface Wishlist {
  customer_id: number;
  id: number;
  styles: Style[];
}

interface Customer {
  customer: {
    id: number;
    wishlist?: Wishlist;
  };
}

export default function Wishlist() {
  const { customer } = useCustomer() as Customer;

  const wishlistItems = customer.wishlist?.styles.map((style) => {
    return (
      <>
        <GridItem colSpan={1}>
          <Flex alignItems="center" h="140px" mx={2}>
            <AspectRatio ratio={3 / 4} w={"100px"}>
              <Image
                boxSize="120px"
                objectFit="cover"
                borderRadius="lg"
                src={`http://localhost:3000/${style.skus[0].image}`}
              ></Image>
            </AspectRatio>
          </Flex>
        </GridItem>
        <GridItem colStart={2} colEnd={3} h="140px">
          <Flex h="140px" alignItems="center">
            {style.style_name}
          </Flex>
        </GridItem>
        <GridItem colStart={4} colEnd={5}>
          <Flex h="140px" alignItems="center">
            Price: ${style.price.toFixed(2)}
          </Flex>
        </GridItem>
        <GridItem colStart={6} colEnd={6}>
          <Flex justifyContent="space-between" alignItems="center" h="140px">
            <HStack justifyContent="flex-start" spacing={10}>
              <Button
                w={"full"}
                size={"md"}
                bg={"green.800"}
                color={"white"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                  bg: "green.700",
                }}
                // onClick={() => history.push(`/profile/${customer?.first_name}`)}
              >
                Shop Item
              </Button>
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
                // onClick={() => handleDeleteClick(item)}
              />
            </HStack>
          </Flex>
        </GridItem>
      </>
    );
  });

  return (
    <Flex h="100" py={"20px"}>
      <VStack
        w="full"
        h="full"
        p={5}
        mt={10}
        spacing={10}
        alignItems="flex-start"
      >
        <Heading size="xl">Wishlist</Heading>
        <Grid templateColumns="120px 1fr 1fr 1fr 50px" gap={5}>
          {wishlistItems}
        </Grid>
      </VStack>
    </Flex>
  );
}
