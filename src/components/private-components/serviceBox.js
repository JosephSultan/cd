// ServiceBox
// Providing the user with useful links to documents etc.

import React from 'react';
import { useStaticQuery, graphql, Link as GatsbyLink } from 'gatsby';
import { Box, Link, Stack, Text } from '@chakra-ui/react';

// Define custom servicebox buttons as clickable links
// Button title and link URL are fetched from Contentful
// The first four buttons link to one document per button
// The two last buttons (5 and 6) are multi document buttons and should go to pages
// fetching all documents for menu5files and menu6files

const MenuButton = (props) => {
  if (!props.multiLink) {
    return (
      <Box
        as='a'
        w={['95vw', '95vw', '30%', '30%']}
        h={['4rem', '6rem']}
        p={3}
        bg='tertiaryButton'
        rounded='md'
        shadow='lg'
        d='flex'
        alignItems='center'
        justifyContent='center'
        fontSize={['md', '2xl', '2xl', '2xl']}
        fontWeight='600'
        href={props.linkTo || null}
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
  } else {
    return (
      <Box
        as={GatsbyLink}
        to={props.to || '#'}
        w={['95vw', '95vw', '30%', '30%']}
        h={['4rem', '6rem']}
        p={3}
        bg='tertiaryButton'
        rounded='md'
        shadow='lg'
        d='flex'
        alignItems='center'
        justifyContent='center'
        fontSize={['md', '2xl', '2xl', '2xl']}
        fontWeight='600'
        href={props.linkTo || null}
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
};

export default function ServiceBox() {
  // Get text and links for menu items from Contentful
  // In Contentful, the field serviceMenuTitle should equal "infomeny"
  const data = useStaticQuery(graphql`
    query MyQuery {
      menuItems: contentfulServiceMenu(serviceMenuTitle: { eq: "infomeny" }) {
        id
        menu1
        menu1File {
          file {
            url
          }
        }
        menu2
        menu2File {
          file {
            url
          }
        }
        menu3
        menu3File {
          file {
            url
          }
        }
        menu4
        menu4File {
          file {
            url
          }
        }
        menu5
        menu5Files {
          file {
            url
          }
        }
        menu6
        menu6Files {
          file {
            url
          }
        }
      }
    }
  `);

  const { menuItems } = data || [];

  return (
    <Box pt={[4, 8, 8, 16]} pb={[8, 8, 16, 16]} textAlign='left'>
      <Stack
        direction={['column', 'column', 'row', 'row']}
        justify='space-between'
        py={['2', '2', '8', '8']}
      >
        <MenuButton linkTo={menuItems?.menu1File.file.url}>
          <Text variant='dark' textAlign='center'>
            {menuItems?.menu1}
          </Text>
        </MenuButton>

        <MenuButton linkTo={menuItems?.menu2File.file.url}>
          <Text variant='dark' textAlign='center'>
            {menuItems?.menu2}
          </Text>
        </MenuButton>
        <MenuButton linkTo={menuItems?.menu3File.file.url}>
          <Text variant='dark' textAlign='center'>
            {menuItems?.menu3}
          </Text>
        </MenuButton>
      </Stack>
      <Stack
        direction={['column', 'column', 'row', 'row']}
        justify='space-between'
        pt={0}
      >
        <MenuButton linkTo={menuItems?.menu4File.file.url}>
          <Text variant='dark' textAlign='center'>
            {menuItems?.menu4}
          </Text>
        </MenuButton>
        <MenuButton multiLink to='/informasjon/referater'>
          <Text variant='dark' textAlign='center'>
            {menuItems?.menu5}
          </Text>
        </MenuButton>
        <MenuButton multiLink to='/informasjon/dokumenter'>
          <Text variant='dark' textAlign='center'>
            {menuItems?.menu6}
          </Text>
        </MenuButton>
      </Stack>
    </Box>
  );
}

// TODO
// Make pages for these two links:
// "Referater fra årsmøter"
// "Diverse dokumenter"
//
// Should link to pages with all content in that category
