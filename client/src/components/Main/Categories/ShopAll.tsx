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

  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

  const styleCards = styles
    .filter((style) => {
      const colorIds = style.skus.map((sku) => sku.color_id);
      const price = style.price;

      const colorFilterPassed =
        selectedColorIds.length === 0 ||
        colorIds.some((id) => selectedColorIds.includes(id));

      const priceFilterPassed =
        selectedPriceRanges.length === 0 ||
        selectedPriceRanges.includes(getPriceRange(price));

      return colorFilterPassed && priceFilterPassed;
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

  function getPriceRange(price: number): string {
    if (price < 10) {
      return "Under $10";
    } else if (price >= 10 && price <= 20) {
      return "$10 - $20";
    } else {
      return "Over $20";
    }
  }

  return (
    <HStack justifyContent="flex-start">
      <Flex>
        <FilterSidebar
          setSelectedColorIds={setSelectedColorIds}
          selectedColorIds={selectedColorIds}
          setSelectedPriceRanges={setSelectedPriceRanges}
          selectedPriceRanges={selectedPriceRanges}
        />
        <SimpleGrid pr={"40"} columns={4} spacing={3} mt={20}>
          {styleCards}
        </SimpleGrid>
      </Flex>
    </HStack>
  );
}
