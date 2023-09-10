import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StyleContext } from "../../context/StyleProvider";
import { ColorContext } from "../../context/ColorProvider";
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

type RouteParams = {
  id: string;
};

export default function ProductDetailPage() {
  const { id } = useParams<RouteParams>();
  const { styles } = useContext(StyleContext);
  const { colors } = useContext(ColorContext);

  const style = styles.find((style) => style.id === parseInt(id));
  const defaultImage = style?.skus[0]?.image || "";
  // console.log(defaultImage);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    defaultImage
  );

  useEffect(() => {
    // Update selectedImage after the component mounts
    setSelectedImage(defaultImage);
  }, [defaultImage]);

  if (!style) {
    return <div>Style not found</div>;
  }

  const images = style.skus.map((sku) => sku.image);

  const colorIds = style.skus.map((sku) => sku.color_id);
  // console.log(images);

  const colorDetail = colors.map((color) => ({
    color: color.color,
    id: color.id,
  }));

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
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
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
                      onClick={() => setSelectedImage(images[index])}
                    ></Circle>
                  );
                })}
              </Flex>
            </Box>
          </Stack>

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
          >
            Add to cart
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
