import React, { useState, useContext } from "react";
import { Box, Heading, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    signup({ firstName, lastName, address, email, phoneNumber, username });
    toast({
      title: "Account created.",
      description: "Your account has been successfully created.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/");
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={8}>
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>First Name</FormLabel>
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Last Name</FormLabel>
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Address</FormLabel>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Phone Number</FormLabel>
          <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Username</FormLabel>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
