import React, { ReactElement } from "react";
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { GiPlantsAndAnimals, GiYarn, GiFarmer } from "react-icons/gi";

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function AboutUs() {
  return (
    <Container maxW={"100%"} pt={20}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            color={"green.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("green.50", "green.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            Our Story
          </Text>
          <Heading mt={5}>
            A digitally native ecommerce platform with intention
          </Heading>
          <Text color={"gray.500"} fontSize={"lg"} py={10}>
            Here at Knit Picky, we are committed to providing high quality yarns
            that have been hand crafted at our circular farms in South America.
            All our artisans are paid a living wage, and our animals are free to
            roam the Peruvian hills. We believe that happy animals make better
            yarns, and better yarns make happy knitters.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={
                <Icon as={GiPlantsAndAnimals} color={"blue.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("blue.100", "blue.900")}
              text={"Sustainably Sourced"}
            />
            <Feature
              icon={<Icon as={GiYarn} color={"green.500"} w={5} h={5} />}
              iconBg={useColorModeValue("green.100", "green.900")}
              text={"High Quality Fibres"}
            />
            <Feature
              icon={<Icon as={GiFarmer} color={"yellow.800"} w={5} h={5} />}
              iconBg={useColorModeValue("yellow.500", "yellow.900")}
              text={"Fair Trade Farming"}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={"md"}
            alt={"feature image"}
            src={"http://localhost:3000/assets/about.JPG"}
            objectFit={"cover"}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
