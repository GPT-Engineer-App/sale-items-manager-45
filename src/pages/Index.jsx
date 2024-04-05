import React, { useState, useContext } from "react";
import { Box, Heading, Text, Input, Button, Grid, Image, Select, Flex, Spacer, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Textarea, useToast } from "@chakra-ui/react";
import BuyModal from "./BuyModal";
import LoginModal from "./Login";
import SignupModal from "./Signup";
import { FaPlus, FaSearch } from "react-icons/fa";
import { UserContext } from "../contexts/UserContext";

const items = [
  {
    id: 1,
    title: "Vintage Armchair",
    description: "Beautiful vintage armchair in great condition.",
    image: "https://images.unsplash.com/photo-1707197724068-185ff219329b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYXJtY2hhaXJ8ZW58MHx8fHwxNzExOTE1NTQ2fDA&ixlib=rb-4.0.3&q=80&w=1080",
    condition: "Used - Very Good",
    zipCode: "12345",
    status: "For Sale",
    price: 150,
  },
  {
    id: 2,
    title: "Modern Dining Table",
    description: "Sleek and modern dining table, seats 6 comfortably.",
    image: "https://images.unsplash.com/photo-1685644201646-9e836c398c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkaW5pbmclMjB0YWJsZXxlbnwwfHx8fDE3MTE5MTU1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
    condition: "New",
    zipCode: "67890",
    status: "For Sale",
    price: 500,
  },
  // Add more items...
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("For Sale");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isBuyModalOpen, onOpen: onOpenBuyModal, onClose: onCloseBuyModal } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const { isOpen: isSignupOpen, onOpen: onOpenSignup, onClose: onCloseSignup } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const toast = useToast();

  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    condition: "",
    zipCode: "",
    price: "",
    image: null,
  });

  const handleImageChange = (e) => {
    setNewItem({ ...newItem, image: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (newItem.image) {
      console.log("Image to upload:", newItem.image.name);
    }
    console.log("New item submitted:", newItem);
    onClose();
    toast({
      title: "Item posted.",
      description: "Your item has been successfully posted for sale.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleBuy = (item) => {
    onOpenBuyModal();
    setSelectedItem(item);
  };

  const onItemBought = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, status: "Sold" };
      }
      return item;
    });
    console.log("Updated items:", updatedItems);
    toast({
      title: "Item bought.",
      description: "You have successfully bought this item.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  console.log("All items:", items);

  const filteredItems = items.filter((item) => {
    const matchesSearchTerm = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCondition = selectedCondition === "" || item.condition === selectedCondition;
    const matchesStatus = selectedStatus === "" || item.status === selectedStatus;

    console.log("Filtering item:", item);
    console.log("Search term match:", matchesSearchTerm);
    console.log("Condition match:", matchesCondition);
    console.log("Status match:", matchesStatus);

    return matchesSearchTerm && matchesCondition && matchesStatus;
  });

  console.log("Filtered items:", filteredItems);

  const { user, logout } = useContext(UserContext);

  return (
    <Box p={8}>
      <Flex align="center" mb={8} direction={{ base: "row", md: "row" }} flexWrap="wrap">
        <Heading as="h1" size="xl" mr={4} mb={{ base: 4, md: 0 }}>
          Marketplace
        </Heading>
        <Spacer />
        <Spacer />
        {user ? (
          <>
            <Text mr={4}>Welcome, {user.firstName}!</Text>
            <Button colorScheme="blue" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button colorScheme="blue" mr={{ base: 2, md: 4 }} onClick={onOpenLogin}>
              Login
            </Button>
            <Button colorScheme="blue" onClick={onOpenSignup}>
              Sign Up
            </Button>
          </>
        )}
        {user && (
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={onOpen} ml={4}>
            Post an Item
          </Button>
        )}
      </Flex>

      <Flex mb={8} direction="column" gap={4}>
        <Input
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);

            const filteredItems = items.filter((item) => {
              const matchesSearchTerm = item.title.toLowerCase().includes(e.target.value.toLowerCase()) || item.description.toLowerCase().includes(e.target.value.toLowerCase());
              const matchesCondition = selectedCondition === "" || item.condition === selectedCondition;
              const matchesStatus = selectedStatus === "" || item.status === selectedStatus;
              return matchesSearchTerm && matchesCondition && matchesStatus;
            });
            console.log("Filtered items:", filteredItems);
          }}
        />
        <Select placeholder="Condition" value={selectedCondition} onChange={(e) => setSelectedCondition(e.target.value)}>
          <option value="New">New</option>
          <option value="Used - Like New">Used - Like New</option>
          <option value="Used - Very Good">Used - Very Good</option>
          <option value="Used - Good">Used - Good</option>
          <option value="Used - Acceptable">Used - Acceptable</option>
        </Select>
      </Flex>

      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={8}>
        {filteredItems.map((item) => (
          <Box key={item.id} borderWidth={1} borderRadius="lg" p={4} position="relative">
            <Image src={item.image} alt={item.title} mb={4} />
            <Heading as="h2" size="md" mb={2}>
              {item.title}
            </Heading>
            <Text mb={2}>{item.description}</Text>
            <Text mb={2}>
              <strong>Condition:</strong> {item.condition}
            </Text>
            <Text mb={2}>
              <strong>Location:</strong> {item.zipCode}
            </Text>
            <Text mb={2}>
              <strong>Price:</strong> ${item.price}
            </Text>

            {user && item.status === "For Sale" && (
              <Button colorScheme="green" size="sm" mt={4} onClick={() => handleBuy(item)}>
                Buy
              </Button>
            )}
          </Box>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post an Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input name="title" value={newItem.title} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea name="description" value={newItem.description} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Condition</FormLabel>
              <Select name="condition" value={newItem.condition} onChange={handleInputChange}>
                <option value="">Select condition</option>
                <option value="New">New</option>
                <option value="Used - Like New">Used - Like New</option>
                <option value="Used - Very Good">Used - Very Good</option>
                <option value="Used - Good">Used - Good</option>
                <option value="Used - Acceptable">Used - Acceptable</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Zip Code</FormLabel>
              <Input name="zipCode" value={newItem.zipCode} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Price</FormLabel>
              <Input name="price" type="number" value={newItem.price} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Image</FormLabel>
              <Input type="file" onChange={handleImageChange} accept="image/*" />
            </FormControl>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <BuyModal isOpen={isBuyModalOpen} onClose={onCloseBuyModal} selectedItem={selectedItem} onItemBought={onItemBought} />
      <LoginModal isOpen={isLoginOpen} onClose={onCloseLogin} />
      <SignupModal isOpen={isSignupOpen} onClose={onCloseSignup} />
    </Box>
  );
};

export default Index;
