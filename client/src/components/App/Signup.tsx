import React from "react";
import { useCustomer } from "../../context/CustomerProvider";
import { useHistory } from "react-router-dom";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";

export default function Signup() {
  const history = useHistory();

  const { handleLogin, fetchCustomer } = useCustomer();

  function handleSubmit(e: any) {
    e.preventDefault();
    const { email, password, first_name, last_name } = e.target.elements;
    handleLogin(
      {
        email: email.value,
        password: password.value,
        first_name: first_name.value,
        last_name: last_name.value,
      },
      "signup"
    );
    fetchCustomer();
    history.push("/");
  }

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign up</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="first-name" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input type="name" name="first_name" />
            </FormControl>
            <FormControl id="last-name" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input type="name" name="last_name" />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={6}>
              <Button colorScheme={"blue"} variant={"solid"} type="submit">
                Sign up
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
