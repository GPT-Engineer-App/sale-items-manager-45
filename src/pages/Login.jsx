import React, { useState, useContext } from "react";
import { Box, Heading, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ email });
    toast({
      title: "Logged in.",
      description: "You have successfully logged in.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/");
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={8}>
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
