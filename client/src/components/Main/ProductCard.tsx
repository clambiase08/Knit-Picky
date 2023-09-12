import React, { useContext, useState } from "react";
import { ColorContext } from "../../context/ColorProvider";
import { useHistory } from "react-router-dom";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Circle,
  Flex,
} from "@chakra-ui/react";

interface ProductCardProps {
  id: number;
  style_name: string;
  price: number;
  color_ids: number[];
  images: string[];
}

export default function ProductCard({
  style_name,
  price,
  color_ids,
  images,
  id,
}: ProductCardProps) {
  const { colors } = useContext(ColorContext);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const history = useHistory();

  const colorDetail = colors.map((color) => ({
    color: color.color,
    id: color.id,
  }));

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${selectedImage})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={260}
            width={282}
            objectFit={"fill"}
            src={selectedImage}
            alt="#"
            onClick={() => history.push(`/product/${id}`)}
          />
        </Box>
        <Stack mt={10}>
          <Flex display="flex" gap={1} mt={2}>
            {color_ids.map((colorId, index) => {
              const color = colorDetail.find((color) => color.id === colorId);
              if (!color) return null;

              return (
                <Circle
                  key={colorId}
                  bg={color.color}
                  size="20px"
                  borderColor={"black"}
                  borderWidth={"1px"}
                  onClick={() => setSelectedImage(images[index])}
                ></Circle>
              );
            })}
          </Flex>
          <Heading mt={1} fontSize={"xl"} fontFamily={"body"} fontWeight={500}>
            {style_name}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text color={"gray.600"}>${price.toFixed(2)}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
