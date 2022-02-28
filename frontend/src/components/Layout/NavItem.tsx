import * as React from 'react';
import {
  Flex,
  Icon,
} from '@chakra-ui/react';
import type { IconType } from 'react-icons';

interface INavItem {
  icon: IconType;
  children: React.ReactNode;
}

const NavItem = ({ icon, children }: INavItem ) => (
  <Flex
    align="center"
    px="4"
    pl="4"
    py="3"
    cursor="pointer"
    color="inherit"
    _hover={{
      bg: 'gray.100',
      color: 'gray.900',
    }}
    role="group"
    fontWeight="semibold"
    transition=".15s ease"
  >
    {icon ? (
      <Icon
        mx="2"
        boxSize="4"
        _groupHover={{
          color: 'gray.600',
        }}
        as={icon}
      />
    ) : null}
    {children}
  </Flex>
);

export default NavItem;
