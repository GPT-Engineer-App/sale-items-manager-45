import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Button, useToast, Text } from "@chakra-ui/react";
// Stripe related imports and initialization have been removed as they cannot be used

const BuyModal = ({ isOpen, onClose, selectedItem, onItemBought }) => {
  const [nameOnCard, setNameOnCard] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
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
      onItemBought(selectedItem.id);

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
              <FormLabel>Name on Card</FormLabel>
              <Input value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Credit Card Number</FormLabel>
              <Input value={creditCardNumber} onChange={(e) => setCreditCardNumber(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Expiry (MM/YY)</FormLabel>
              <Input value={expiry} onChange={(e) => setExpiry(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>CVV</FormLabel>
              <Input value={cvv} onChange={(e) => setCvv(e.target.value)} />
            </FormControl>
            <Text mb={4}>
              <strong>Total:</strong> ${selectedItem.price}
            </Text>
            <Button type="submit" colorScheme="blue">
              Charge ${selectedItem.price}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BuyModal;
