import React, { useContext } from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  Stack,
  Checkbox,
  VStack,
  Heading,
  Circle,
  Icon,
} from "@chakra-ui/react";
import { ColorContext } from "../../../context/ColorProvider";
import { AiOutlineDollar } from "react-icons/ai";

export default function FilterSidebar({
  setSelectedColorIds,
  selectedColorIds,
  setSelectedPriceRanges,
  selectedPriceRanges,
}: {
  setSelectedColorIds: (colorIds: number[]) => void;
  selectedColorIds: number[];
  setSelectedPriceRanges: (priceRanges: string[]) => void;
  selectedPriceRanges: string[];
}) {
  const { colors } = useContext(ColorContext);
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")} mt={10}>
      <Box
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        justifyContent="left"
      >
        <Flex
          h="20"
          alignItems="center"
          mx="1"
          justifyContent="flex-start"
          mt={"230px"}
        >
          <VStack alignContent="flex-start">
            <Heading fontSize="xl" fontWeight={700} mt={10}>
              Filter by:
            </Heading>
            <Flex align="flex-start" alignItems="center" mt={"5"}>
              <Circle size="20px" bg="coral" mr={2}></Circle>
              <Text
                fontWeight="semibold"
                fontSize="lg"
                mt={"15"}
                mb={"3.5"}
                textAlign="left"
              >
                Color
              </Text>
            </Flex>
            <Stack spacing={2} ml={"7"} align="start">
              {colors.map((color) => {
                return (
                  <Checkbox
                    key={color.id}
                    colorScheme="gray"
                    onChange={(e) => {
                      let newSelectedColorIds = [...selectedColorIds];
                      if (e.target.checked) {
                        newSelectedColorIds.push(color.id);
                      } else {
                        newSelectedColorIds = newSelectedColorIds.filter(
                          (id) => id !== color.id
                        );
                      }
                      setSelectedColorIds(newSelectedColorIds);
                      // console.log(newSelectedColorIds);
                    }}
                  >
                    {color.color}
                  </Checkbox>
                );
              })}
            </Stack>
            <Flex align="flex-start" alignItems="center" mt={"5"}>
              <Icon as={AiOutlineDollar} boxSize="25px" mr={2} />
              <Text
                mt={"15"}
                mb={"3.5"}
                textAlign="left"
                fontWeight="semibold"
                fontSize="lg"
              >
                Price
              </Text>
            </Flex>
            <Stack spacing={2} ml={0} align="start">
              {["Under $10", "$10 - $20", "Over $20"].map((priceRange) => {
                return (
                  <Checkbox
                    key={priceRange}
                    colorScheme="gray"
                    onChange={(e) => {
                      let newSelectedPriceRanges = [...selectedPriceRanges];
                      if (e.target.checked) {
                        newSelectedPriceRanges.push(priceRange);
                      } else {
                        newSelectedPriceRanges = newSelectedPriceRanges.filter(
                          (range) => range !== priceRange
                        );
                      }
                      setSelectedPriceRanges(newSelectedPriceRanges);
                      // console.log(newSelectedPriceRanges);
                    }}
                  >
                    {priceRange}
                  </Checkbox>
                );
              })}
            </Stack>
          </VStack>
        </Flex>
      </Box>
      <Box ml={{ base: 0, md: 60 }} p="0"></Box>
    </Box>
  );
}
