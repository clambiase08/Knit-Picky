import React, { useContext } from "react";
import { StyleContext } from "../../../context/StyleProvider";
import ProductCard from "../ProductCard";
import { SimpleGrid, Box } from "@chakra-ui/react";

export default function ShopAll() {
  const { styles } = useContext(StyleContext);
  console.log(styles);

  const styleCards = styles.map((style) => {
    return (
      <ProductCard
        key={style.id}
        style_name={style.style_name}
        price={style.price}
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
