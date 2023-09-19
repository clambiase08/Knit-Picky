import React, { useContext } from "react";
import { BestSellerContext } from "../context/BestSellerProvider";
// import ProductCard from "../ProductCard";
import AltProductCard from "./AltProductCard";
import { SimpleGrid, Box } from "@chakra-ui/react";

export default function BestSellers() {
  const { bestsellers } = useContext(BestSellerContext);
  // console.log(bestsellers);

  const styleCards = bestsellers.map((style) => {
    const colorIds = style.skus.map((sku) => sku.color_id);
    const images = style.skus.map((sku) => sku.image);
    // console.log(colorIds);
    // console.log(images);

    return (
      <AltProductCard
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
