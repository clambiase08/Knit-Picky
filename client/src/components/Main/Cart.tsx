import React, { useContext } from "react";
import {
  Container,
  Flex,
  VStack,
  Heading,
  Image,
  Grid,
  GridItem,
  // Select,
} from "@chakra-ui/react";
import { OrderItemContext } from "../../context/OrderItemProvider";
import { useCustomer } from "../../context/CustomerProvider";
import { StyleContext } from "../../context/StyleProvider";
import { ColorContext } from "../../context/ColorProvider";

export default function Cart() {
  const { orderItems } = useContext(OrderItemContext);
  const { customer } = useCustomer();
  const { styles } = useContext(StyleContext);
  const { colors } = useContext(ColorContext);
  // console.log(orderItems);
  // console.log(customer);

  if (!customer) {
    return <div>Add items to cart</div>;
  }

  const userOrderItems = orderItems.filter(
    (orderItem) =>
      orderItem.order.customer_id === customer.id &&
      orderItem.order.status === "created"
  );

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
          <Heading size="xl">
            Shopping Cart ({userOrderItems.length} items)
          </Heading>
          {userOrderItems.map((item) => {
            const orderStyle = styles.find(
              (style) => style.id === item.style_id
            );

            if (orderStyle) {
              const sku = orderStyle.skus.find((sku) => sku.id === item.sku_id);
              const colorDetail = colors.find(
                (color) => color.id === sku?.color_id
              );

              if (sku && colorDetail) {
                return (
                  <Grid
                    templateColumns="250px repeat(3, 1fr)"
                    gap={5}
                    key={item.id}
                  >
                    <GridItem colSpan={1} h="100px">
                      <Image
                        boxSize="120px"
                        objectFit="cover"
                        borderRadius="lg"
                        src={sku.image}
                      ></Image>
                    </GridItem>
                    <GridItem colStart={2} colEnd={2} h="100px">
                      {orderStyle.style_name} - {colorDetail.color}
                    </GridItem>
                    <GridItem colStart={3} colEnd={3} h="100px">
                      Qty: {item.quantity}
                    </GridItem>
                    <GridItem colStart={4} colEnd={4} h="100px">
                      Subtotal: ${item.subtotal}
                    </GridItem>
                  </Grid>
                );
              }
            }
            return null; // Handle the case when sku or colorDetail is undefined
          })}
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

//   return (
//     <Container maxW="95%" p={0}>
//       <Flex h="100vh" py={"60px"}>
//         <VStack
//           w="full"
//           h="full"
//           p={0}
//           mt={10}
//           spacing={10}
//           alignItems="flex-start"
//         >
//           <Heading size="xl">
//             Shopping Cart ({userOrderItems.length} items)
//           </Heading>
//           {userOrderItems.map((item) => {
//             const orderStyle = styles.find(
//               (style) => style.id === item.style_id
//             );

//             if (orderStyle) {
//               const filteredOrderItems = userOrderItems.filter(
//                 (item) => item.order.status === "created"
//               );

//               return filteredOrderItems.map((item) => {
//                 const sku = orderStyle.skus.find(
//                   (sku) => sku.id === item.sku_id
//                 );
//                 const colorDetail = colors.find(
//                   (color) => color.id === sku?.color_id
//                 );

//                 if (sku && colorDetail) {
//                   // Check if sku and colorDetail are defined
//                   return (
//                     <Grid
//                       templateColumns="250px repeat(3, 1fr)"
//                       gap={5}
//                       key={item.id}
//                     >
//                       <GridItem colSpan={1} h="10">
//                         <Image
//                           boxSize="120px"
//                           objectFit="cover"
//                           borderRadius="lg"
//                           src={sku.image}
//                         ></Image>
//                       </GridItem>
//                       <GridItem colStart={2} colEnd={2} h="10">
//                         {orderStyle.style_name} - {colorDetail.color}
//                       </GridItem>
//                       <GridItem colStart={3} colEnd={3} h="10">
//                         Qty: {item.quantity}
//                       </GridItem>
//                       <GridItem colStart={4} colEnd={4} h="10">
//                         Subtotal: ${item.subtotal}
//                       </GridItem>
//                     </Grid>
//                   );
//                 } else {
//                   return null; // Handle the case when sku or colorDetail is undefined
//                 }
//               });
//             } else {
//               return null;
//             }
//           })}
//         </VStack>
//         <VStack
//           w="full"
//           h="full"
//           p={10}
//           spacing={10}
//           alignItems="flex-start"
//           bg="gray.50"
//         ></VStack>
//       </Flex>
//     </Container>
//   );
// }
