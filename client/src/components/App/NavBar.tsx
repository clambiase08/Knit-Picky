import React from "react";
import { NavLink } from "react-router-dom";
import { useCustomer } from "../../context/CustomerProvider";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  route?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Shop All",
    route: "/shop-all",
  },
  {
    label: "Categories",
    children: [
      {
        label: "Best Sellers",
        subLabel: "See our top selling styles",
        route: "/best-sellers",
      },
      {
        label: "Yarns",
        subLabel: "Explore our sustainable yarns",
        route: "/yarns",
      },
      {
        label: "Accessories",
        subLabel: "Notions for your next project",
        route: "/accessories",
      },
    ],
    route: "shop-all",
  },
  {
    label: "About Us",
    route: "/about",
  },
  {
    label: "Contact",
    route: "/contact",
  },
];

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const { handleLogout, customer } = useCustomer();

  return (
    <Box as="header" position="fixed" top={0} w="100%" zIndex={2}>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <NavLink to="/">
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              fontWeight={800}
              fontSize={"xl"}
              color={useColorModeValue("gray.800", "white")}
            >
              Knit Picky
            </Text>
          </NavLink>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {customer ? (
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"green.800"}
              _hover={{
                bg: "green.700",
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <NavLink to="/login">
                <Button
                  fontSize={"sm"}
                  fontWeight={400}
                  variant={"link"}
                  verticalAlign={"bottom"}
                >
                  Sign In
                </Button>
              </NavLink>
              <NavLink to="/signup">
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"green.800"}
                  _hover={{
                    bg: "green.700",
                  }}
                >
                  Sign Up
                </Button>
              </NavLink>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity></Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <NavLink key={navItem.label} to={navItem.route ?? "/"}>
          <Box>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Box
                  as="a"
                  p={2}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Box>
              </PopoverTrigger>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                >
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        </NavLink>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ route, label, subLabel }: NavItem) => {
  return (
    <NavLink to={route ?? "/"}>
      <Box
        role={"group"}
        display={"block"}
        p={2}
        rounded={"md"}
        _hover={{ bg: useColorModeValue("green.100", "gray.900") }}
      >
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "green.700" }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={"sm"}>{subLabel}</Text>
          </Box>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon color={"green.400"} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Box>
    </NavLink>
  );
};
