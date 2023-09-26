import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StyleContext } from "../context/StyleProvider";
import { ColorContext } from "../context/ColorProvider";
import { OrderContext } from "../context/OrderProvider";
import { useCustomer } from "../context/CustomerProvider";
import { useHistory } from "react-router-dom";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  Circle,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { handleAddOrderItem } from "../api/orders";

type RouteParams = {
  id: string;
};

export default function ProductDetailPage() {
  const { id } = useParams<RouteParams>();
  const { styles } = useContext(StyleContext);
  const { colors } = useContext(ColorContext);
  const { orders, handleAddToOrder } = useContext(OrderContext);
  const { customer } = useCustomer();
  const history = useHistory();
  const [selectedColorId, setSelectedColorId] = useState<number | undefined>(
    undefined
  );

  const order = customer
    ? orders.find(
        (order) =>
          order.customer_id === customer.id && order.status === "created"
      )
    : null;

  const style = styles.find((style) => style.id === parseInt(id));
  const defaultImage = style?.skus[0]?.image || "";
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    defaultImage
  );
  const [selectedSkuId, setSelectedSkuId] = useState<number | null>(null);

  useEffect(() => {
    setSelectedImage(defaultImage);
  }, [defaultImage]);

  if (!style) {
    return <div>Style not found</div>;
  }

  const styleValue = style ?? null;
  const orderValue = order ?? null;

  const images = style.skus.map((sku) => sku.image);

  const colorIds = style.skus.map((sku) => sku.color_id);

  const colorDetail = colors.map((color) => ({
    color: color.color,
    id: color.id,
  }));

  function handleAddToCart() {
    if (selectedSkuId === null) {
      console.error("No SKU selected");
      return;
    } else {
      const itemToAdd = {
        quantity: 1,
        subtotal: styleValue.price,
        order_id: orderValue?.id,
        style_id: styleValue.id,
        sku_id: selectedSkuId,
      };
      const orderId = order?.id;
      handleAddOrderItem(orderId, itemToAdd)
        .then((addedItem) => {
          if (order) {
            handleAddToOrder(addedItem, order);
          } else {
            console.log("Order is null or undefined");
          }
        })
        .catch((err) => {
          console.error("Error adding item to cart", err);
        });
    }
  }

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={`http://localhost:3000/${selectedImage}`}
            fit={"cover"}
            align={"center"}
            w={"80%"}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {style.style_name}
            </Heading>
            <Text color={"gray.900"} fontWeight={300} fontSize={"2xl"}>
              ${style.price.toFixed(2)}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider borderColor={"gray.200"} />}
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text color={"gray.500"} fontSize={"2xl"} fontWeight={"300"}>
                {style.description}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={"green.800"}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Colors
              </Text>

              <Flex display="flex" gap={2} mt={2}>
                {colorIds.map((colorId, index) => {
                  const color = colorDetail.find(
                    (color) => color.id === colorId
                  );
                  if (!color) return null;

                  return (
                    <Circle
                      key={colorId}
                      bg={color.color}
                      size="30px"
                      borderColor={"black"}
                      borderWidth={"1px"}
                      boxShadow={
                        colorId === selectedColorId
                          ? `0 0 0 3px ${"black"}`
                          : "none"
                      }
                      onClick={() => {
                        setSelectedImage(images[index]);
                        setSelectedSkuId(style.skus[index].id);
                        setSelectedColorId(colorId);
                      }}
                    ></Circle>
                  );
                })}
              </Flex>
            </Box>
          </Stack>
          {customer && (
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
                handleAddToCart();
                history.push("/cart");
              }}
            >
              Add to cart
            </Button>
          )}

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
