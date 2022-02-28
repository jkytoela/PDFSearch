import * as React from 'react';
import {
  Button,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  ChakraProvider,
} from '@chakra-ui/react';
import { FiMenu, FiSearch, FiPlus } from 'react-icons/fi';
import SidebarContent from './SidebarContent';

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const sidebar = useDisclosure();
  return (
    <ChakraProvider>
      <Box
        as="section"
        bg="gray.50"
        minH="100vh"
      >
        <SidebarContent display={{ base: 'none', md: 'unset' }} />
        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"
        >
          <DrawerOverlay />
          <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
          <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            px="4"
            bg="white"
            borderBottomWidth="1px"
            borderColor="inherit"
            h="14"
          >
            <IconButton
              aria-label="Menu"
              display={{ base: 'inline-flex', md: 'none' }}
              onClick={sidebar.onOpen}
              icon={<FiMenu />}
              size="sm"
            />
            <InputGroup w="96" display={{ base: 'none', md: 'flex' }}>
              <InputLeftElement color="gray.500">
                <FiSearch />
              </InputLeftElement>
              <Input placeholder="Search..." />
            </InputGroup>

            <Button leftIcon={<FiPlus />} colorScheme="gray" variant="solid">
              Upload
            </Button>
          </Flex>

          <Box as="main" p="4">
            {children}
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Layout;
