import React from "react";
import {
  Container,
  Flex,
  VStack,
  Heading,
  Image,
  Grid,
  GridItem,
  Select,
} from "@chakra-ui/react";

export default function Cart() {
  return (
    <Container maxW="95%" p={0}>
      <Flex h="100vh" py={"60px"}>
        <VStack
          w="full"
          h="full"
          p={0}
          mt={10}
          spacing={10}
          alignItems="flex-start"
        >
          <Heading size="xl">Shopping Cart (x items)</Heading>
          <Grid templateColumns="250px repeat(3, 1fr)" gap={5}>
            <GridItem colSpan={1} h="10">
              <Image
                boxSize="120px"
                objectFit="cover"
                borderRadius="lg"
                src={"http://localhost:3000/assets/blue-plush.png"}
              ></Image>
            </GridItem>
            <GridItem colStart={2} colEnd={2} h="10">
              Testing
            </GridItem>
            <GridItem colStart={3} colEnd={3} h="10">
              Qty
            </GridItem>
            <GridItem colStart={4} colEnd={4} h="10">
              <Select placeholder="3"></Select>
            </GridItem>
          </Grid>
        </VStack>
        <VStack
          w="full"
          h="full"
          p={10}
          spacing={10}
          alignItems="flex-start"
          bg="gray.50"
        ></VStack>
      </Flex>
    </Container>
  );
}
