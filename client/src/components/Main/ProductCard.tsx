import React, { useContext } from "react";
import { ColorContext } from "../../context/ColorProvider";
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
// import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface ProductCardProps {
  style_name: string;
  price: number;
  color_ids: number[];
}

const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

export default function ProductCard({
  style_name,
  price,
  color_ids,
}: ProductCardProps) {
  const { colors } = useContext(ColorContext);
  const colorDetail = colors.map((color) => ({
    color: color.color,
    id: color.id,
  }));
  // const trackColor = useColorModeValue("gray.200", "gray.700");

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
            backgroundImage: `url(${IMAGE})`,
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
            height={230}
            width={282}
            objectFit={"cover"}
            src={IMAGE}
            alt="#"
          />
        </Box>
        <Stack mt={10}>
          <Flex display="flex" gap={1}>
            {color_ids.map((colorId) => {
              const color = colorDetail.find((c) => c.id === colorId);
              if (!color) return null;

              return (
                <Circle
                  key={colorId}
                  // value={100}
                  bg={color.color}
                  size="20px"
                  // thickness="8px"
                  // trackColor={trackColor}
                  // capIsRound
                  borderColor={"black"}
                  borderWidth={"1px"}
                >
                  {/* <CircularProgressLabel /> */}
                </Circle>
              );
            })}
          </Flex>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
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
