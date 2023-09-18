import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  useCustomer,
  CustomerContextType,
} from "../../../context/CustomerProvider";
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
import { StyleContext } from "../../../context/StyleProvider";
import { Style } from "../../types";

export default function Wishlist() {
  const { customer, setCustomer } = useCustomer() as CustomerContextType;
  const { styles } = useContext(StyleContext);
  const history = useHistory();

  function findStyleById(styleId: number): Style {
    return (
      styles.find((style) => style.id === styleId) || {
        id: -1,
        price: 0,
        style_name: "",
        skus: [
          {
            color_id: 0,
            id: 0,
            image: "",
            sku: "",
            style_id: -1,
          },
        ],
      }
    );
  }
  function handleDeleteItem(deletedItemId: number): void {
    setCustomer({
      ...customer,
      wishlist_items: customer!.wishlist_items?.filter(
        (item) => item.id !== deletedItemId
      ),
    });
  }

  function handleDelete(itemId: number): void {
    const wishlistItemToDelete = customer?.wishlist_items?.find(
      (item) => item.style_id === itemId
    );
    if (wishlistItemToDelete) {
      fetch(`/wishlist_items/${wishlistItemToDelete.id}`, {
        method: "DELETE",
      }).then(() => handleDeleteItem(wishlistItemToDelete.id));
    }
  }

  const wishlistItems = (customer?.wishlist_items || []).map((item) => {
    const style: Style = findStyleById(item.style_id);

    if (style.id === -1) {
      return null;
    }

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
                onClick={() => history.push(`/product/${style.id}`)}
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
                onClick={() => handleDelete(style.id)}
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
