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
}: {
  setSelectedColorIds: (colorIds: number[]) => void;
  selectedColorIds: number[];
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
                key={color.id} // Add a unique key
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
      </Box>
      <Box ml={{ base: 0, md: 60 }} p="4"></Box>
    </Box>
  );
}
