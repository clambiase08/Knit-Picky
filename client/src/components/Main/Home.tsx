import React from "react";
import { useHistory } from "react-router-dom";
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Box,
  SimpleGrid,
  Center,
  Image,
} from "@chakra-ui/react";

export default function Home() {
  const history = useHistory();
  return (
    <Box>
      <Flex
        w={"full"}
        h={"100vh"}
        backgroundImage={"url(assets/banner.JPG)"}
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
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
            <Text
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
            >
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
              eiusmod tempor
            </Text>
            <Stack direction={"row"}>
              <Button
                bg={"whiteAlpha.300"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "whiteAlpha.500" }}
                onClick={() => history.push("/bestsellers")}
              >
                Explore best sellers
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
      <Text
        mt={"50px"}
        textAlign={"center"}
        fontWeight={700}
        fontSize={useBreakpointValue({ base: "2xl", md: "3xl" })}
      >
        What are you looking for?
      </Text>
      <Center>
        <Flex my={20}>
          <SimpleGrid px={20} columns={[3, null, 4]} spacing="40px">
            <Box>
              <Image
                src="/assets/shop-all.png"
                maxHeight={"400px"}
                onClick={() => history.push("/shop-all")}
              />
              <Text textAlign={"center"} fontWeight={"bold"} mt={"10px"}>
                SHOP ALL
              </Text>
            </Box>
            <Box>
              <Image
                src="/assets/best-sellers.png"
                maxHeight={"400px"}
                onClick={() => history.push("/bestsellers")}
              />
              <Text textAlign={"center"} fontWeight={"bold"} mt={"10px"}>
                BEST SELLERS
              </Text>
            </Box>
            <Box>
              <Image
                src="/assets/yarns.png"
                maxHeight={"400px"}
                onClick={() => history.push("/yarns")}
              />
              <Text textAlign={"center"} fontWeight={"bold"} mt={"10px"}>
                YARNS
              </Text>
            </Box>
            <Box>
              <Image
                src="/assets/accessories.png"
                maxHeight={"400px"}
                onClick={() => history.push("/accessories")}
              />
              <Text textAlign={"center"} fontWeight={"bold"} mt={"10px"}>
                ACCESSORIES
              </Text>
            </Box>
          </SimpleGrid>
        </Flex>
      </Center>
    </Box>
  );
}
