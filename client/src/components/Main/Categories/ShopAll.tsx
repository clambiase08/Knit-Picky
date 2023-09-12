import React, { useContext } from "react";
import { StyleContext } from "../../../context/StyleProvider";
import ProductCard from "../ProductCard";
import { Flex, SimpleGrid, HStack } from "@chakra-ui/react";
import FilterSidebar from "./FilterSidebar";

export default function ShopAll() {
  const { styles } = useContext(StyleContext);
  // console.log(styles);

  const styleCards = styles.map((style) => {
    const colorIds = style.skus.map((sku) => sku.color_id);
    const images = style.skus.map((sku) => sku.image);
    // console.log(colorIds);
    // console.log(images);

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
        <FilterSidebar />
        <SimpleGrid pr={"40"} columns={4} spacing={3} mt={20}>
          {styleCards}
        </SimpleGrid>
      </Flex>
    </HStack>
  );
}
