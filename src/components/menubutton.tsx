import { Box } from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import * as React from 'react';
import type { IMenuButton } from '../types/interfaces';

export default function MenuButton(props: IMenuButton) {
  if (!props.multiLink) {
    return (
      <Box
        as='a'
        href={props.linkTo || '#'}
        target='_blank'
        rel='noopener noreferrer'
        w={['auto', 'auto', '30%', '30%']}
        h={['4rem', '6rem']}
        p={3}
        bg='tertiaryButton'
        rounded='md'
        shadow='lg'
        display='flex'
        alignItems='center'
        justifyContent='center'
        fontSize={['md', 'xl', 'xl', 'xl']}
        fontWeight='600'
        _hover={{
          transform: 'scale(1.02)',
          transitionDuration: '0.1s',
          textColor: 'white',
        }}
        _active={{
          transform: 'scale(1.00)',
        }}
      >
        {props.children}
      </Box>
    );
  } else {
    return (
      <Box
        as={GatsbyLink}
        to={props.to || '#'}
        w={['auto', 'auto', '30%', '30%']}
        h={['4rem', '6rem']}
        p={3}
        bg='tertiaryButton'
        rounded='md'
        shadow='lg'
        display='flex'
        alignItems='center'
        justifyContent='center'
        fontSize={['md', 'xl', 'xl', 'xl']}
        fontWeight='600'
        target='_blank'
        rel='noopener noreferrer'
        _hover={{
          transform: 'scale(1.02)',
          transitionDuration: '0.1s',
          textColor: 'white',
        }}
        _active={{
          transform: 'scale(1.00)',
        }}
      >
        {props.children}
      </Box>
    );
  }
}
