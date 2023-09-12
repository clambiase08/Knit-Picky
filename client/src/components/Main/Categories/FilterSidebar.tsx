import React, { useContext } from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { ColorContext } from "../../../context/ColorProvider";

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
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Box
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="xl" fontWeight={600} mt={10}>
            Filter by:
          </Text>
        </Flex>
        <Text>Color</Text>
        <Stack spacing={2} ml={10} direction="column">
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
                }}
              >
                {color.color}
              </Checkbox>
            );
          })}
        </Stack>
        <Text>Price</Text>
        <Stack spacing={2} ml={10} direction="column">
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
                }}
              >
                {priceRange}
              </Checkbox>
            );
          })}
        </Stack>
      </Box>
      <Box ml={{ base: 0, md: 60 }} p="4"></Box>
    </Box>
  );
}
