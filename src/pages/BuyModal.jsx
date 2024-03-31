import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
// Stripe related imports and initialization have been removed as they cannot be used

const BuyModal = ({ isOpen, onClose, itemId, onItemBought }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulating payment success without Stripe
    const paymentSuccessful = true;

    if (!paymentSuccessful) {
      toast({
        title: "Payment failed.",
        description: "There was an issue with your payment.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      onItemBought(itemId);

      onClose();

      toast({
        title: "Payment successful.",
        description: "Your payment has been processed successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Buy Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Address</FormLabel>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Credit Card</FormLabel>
              <Input value={creditCard} onChange={(e) => setCreditCard(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Pay with Stripe
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BuyModal;
