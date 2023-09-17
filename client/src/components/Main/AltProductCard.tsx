import React, { useState, useContext } from "react";
import {
  Flex,
  Circle,
  Box,
  Image,
  useColorModeValue,
  Stack,
  Tooltip,
  Icon,
  chakra,
} from "@chakra-ui/react";
import { ColorContext } from "../../context/ColorProvider";
import { useHistory } from "react-router-dom";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";

interface ProductCardProps {
  id: number;
  style_name: string;
  price: number;
  color_ids: number[];
  images: string[];
}

export default function AltProductCard({
  style_name,
  price,
  color_ids,
  images,
  id,
}: ProductCardProps) {
  const { colors } = useContext(ColorContext);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedColorId, setSelectedColorId] = useState<number | undefined>(
    undefined
  );
  const [heartFill, setHeartFill] = useState(true);

  const history = useHistory();

  const colorDetail = colors.map((color) => ({
    color: color.color,
    id: color.id,
  }));

  function handleHeartClick() {
    setHeartFill((heartFill) => !heartFill);
  }

  const heartIcon = heartFill ? <HiOutlineHeart /> : <HiHeart />;

  return (
    <Stack direction="column">
      <Flex w="full" alignItems="center" justifyContent="center">
        <Box
          bg={useColorModeValue("white", "gray.800")}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative"
        >
          <Image
            src={selectedImage}
            alt={"product image"}
            roundedTop="lg"
            onClick={() => history.push(`/product/${id}`)}
          />

          <Box p="6">
            <Box display="flex" alignItems="baseline"></Box>
            <Flex mb="2" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {style_name}
              </Box>
              <Tooltip
                label="Add to wishlist"
                bg="white"
                placement={"top"}
                color={"gray.800"}
                fontSize={"1em"}
              >
                <chakra.a href={"#"} display={"flex"}>
                  <Icon
                    as={"svg"}
                    h={7}
                    w={7}
                    alignSelf={"center"}
                    onClick={handleHeartClick}
                  >
                    {heartIcon}
                  </Icon>
                </chakra.a>
              </Tooltip>
            </Flex>
            <Flex justifyContent="space-between" alignContent="center">
              <Box display="flex" alignItems="center">
                {color_ids.map((colorId, index) => {
                  const color = colorDetail.find(
                    (color) => color.id === colorId
                  );
                  if (!color) return null;

                  return (
                    <Circle
                      key={colorId}
                      bg={color.color}
                      size="20px"
                      borderColor={"black"}
                      borderWidth={"1px"}
                      mx={"2px"}
                      boxShadow={
                        colorId === selectedColorId
                          ? `0 0 0 2px ${"black"}`
                          : "none"
                      }
                      onClick={() => {
                        setSelectedImage(images[index]);
                        setSelectedColorId(colorId);
                      }}
                    ></Circle>
                  );
                })}
              </Box>
              <Box fontSize="lg" color={useColorModeValue("gray.800", "white")}>
                <Box as="span" color={"gray.600"} fontSize="lg">
                  $
                </Box>
                {price.toFixed(2)}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Stack>
  );
}
