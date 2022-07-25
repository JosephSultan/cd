import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import * as React from 'react';
import renderRichTextOptions from '../theme/renderRichTextOptions';
import type { IArticleProps } from '../types/interfaces';

import { getImage } from 'gatsby-plugin-image';

function Article({
  mainImage,
  title,
  author,
  bodyText,
  createdAt,
  updatedAt,
  buttonLink,
}: IArticleProps) {
  const mainImageData: unknown = mainImage;
  const topImage = getImage(mainImageData as IGatsbyImageData);

  // Format the dates shown at the bottom of every article page
  const publishDate: string =
    createdAt !== updatedAt
      ? `Publisert: ${createdAt} (oppdatert: ${updatedAt})`
      : `Publisert: ${createdAt}`;

  // Make string that will be used to show
  // a list of authors (with comma separators if there are more than one)
  let authorsToShow: string = '';
  author ? (authorsToShow = 'Av: ') : '';
  // Skip if author is not passed as props to this component
  if (author) {
    author.forEach((el, index) => {
      if (index < author.length - 1 && author.length !== 1) {
        authorsToShow =
          authorsToShow + el?.firstName + ' ' + el?.lastName + ', ';
      } else {
        authorsToShow = authorsToShow + el?.firstName + ' ' + el?.lastName;
      }
    });
  }

  return (
    <Box pt={[12, 16, 16, 24]}>
      <Heading
        as='h1'
        fontSize={['4xl', '6xl', '6xl', '7xl']}
        textAlign={['center', 'left', 'left', 'left']}
        pb={4}
      >
        {title}
      </Heading>
      {mainImage && (
        <>
          {topImage ? (
            <Image
              as={GatsbyImage}
              image={topImage}
              rounded='md'
              shadow='lg'
              alt={mainImage.description || ''}
              width='100%'
            />
          ) : null}
          <Text
            as='p'
            textAlign='left'
            ml={2}
            px={4}
            py={2}
            bgColor='#efefef'
            fontSize={['sm', 'sm', 'sm', 'md']}
          >
            <em>{mainImage.description}</em>
          </Text>
        </>
      )}
      <Text as='div' my={[5, 10, 10, 10]} textAlign='left'>
        {renderRichText(bodyText, renderRichTextOptions())}
      </Text>

      <Text
        fontSize={['sm', 'sm', 'sm', 'sm']}
        fontStyle='italic'
        pb={[4, 16]}
        textAlign='left'
      >
        {publishDate}
        <br />
        {authorsToShow}
      </Text>
      <Box>
        <Button
          as={GatsbyLink}
          to={buttonLink}
          variant='standard'
          mb={16}
          _hover={{ textDecor: 'none' }}
        >
          Gå tilbake
        </Button>
      </Box>
    </Box>
  );
}

export default Article;
