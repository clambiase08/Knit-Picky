import React, { useContext, useState } from "react";
import { StyleContext } from "../../../context/StyleProvider";
import ProductCard from "../ProductCard";
import { Flex, SimpleGrid, HStack } from "@chakra-ui/react";
import FilterSidebar from "./FilterSidebar";
import { ColorContext } from "../../../context/ColorProvider";

export default function ShopAll() {
  const { styles } = useContext(StyleContext);
  const { colors } = useContext(ColorContext);
  const [selectedColorIds, setSelectedColorIds] = useState<number[]>(
    colors.map((color) => color.id)
  );
  const styleCards = styles
    .filter((style) => {
      const colorIds = style.skus.map((sku) => sku.color_id);
      return (
        selectedColorIds.length === 0 ||
        colorIds.some((id) => selectedColorIds.includes(id))
      );
    })
    .map((style) => {
      const colorIds = style.skus.map((sku) => sku.color_id);
      const images = style.skus.map((sku) => sku.image);

      return (
        <ProductCard
          key={style.id}
          id={style.id}
          style_name={style.style_name}
          price={style.price}
          color_ids={colorIds}
          images={images}
        />
      );
    });

  return (
    <HStack justifyContent="flex-start">
      <Flex>
        <FilterSidebar
          setSelectedColorIds={setSelectedColorIds}
          selectedColorIds={selectedColorIds}
        />
        <SimpleGrid pr={"40"} columns={4} spacing={3} mt={20}>
          {styleCards}
        </SimpleGrid>
      </Flex>
    </HStack>
  );
}
