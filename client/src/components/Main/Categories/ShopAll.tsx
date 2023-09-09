import React, { useContext } from "react";
import { StyleContext } from "../../../context/StyleProvider";
import ProductCard from "../ProductCard";
import { SimpleGrid, Box } from "@chakra-ui/react";

export default function ShopAll() {
  const { styles } = useContext(StyleContext);
  console.log(styles);

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
    <Box as="main" mt="20">
      <SimpleGrid px={"40"} columns={4} spacing={3}>
        {styleCards}
      </SimpleGrid>
    </Box>
  );
}
