import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Image, Heading, Text, Link, Button } from '@chakra-ui/react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import renderRichTextOptions from '../../theme/renderRichTextOptions';
import { format, parseISO } from 'date-fns';
import norwegian from 'date-fns/locale/nb';

const PrivateInfo = (props) => {
  // Get slug of current post
  const { slug } = props;
  const postNodes = props?.postData?.privatePosts?.nodes || [];
  // Find the post with the same slug as the current page
  const postToShow = postNodes.find((post) => post.slug === slug);
  const { title, bodyText, featuredImage, createdAt, updatedAt } = postToShow;

  // Format article dates
  const createdAtFormated = format(parseISO(createdAt), 'dd. LLLL yyyy', {
    locale: norwegian,
  });
  const updatedAtFormated = format(parseISO(updatedAt), 'dd. LLLL yyyy', {
    locale: norwegian,
  });

  // Show publish date on article. Update date only if updated.
  const publishDate =
    createdAt !== updatedAt
      ? `Publisert: ${createdAtFormated} (oppdatert: ${updatedAtFormated})`
      : `Publisert: ${createdAtFormated}`;

  const topImage = featuredImage?.fluid ? (
    <Image
      as={GatsbyImage}
      fluid={featuredImage.fluid}
      shadow='lg'
      alt={featuredImage.description}
    />
  ) : null;

  return (
    <Box w='95vw' ml='0' pr={['0', '0', '5vw', '30vw']}>
      <Heading
        as='h1'
        fontSize={['4xl', '4xl', '6xl', '6xl']}
        textAlign={['center', 'left', 'left', 'left']}
        pb={2}
      >
        {title}
      </Heading>
      {topImage}
      <Text as='div' my={[5, 10, 10, 10]}>
        {renderRichText(bodyText, renderRichTextOptions)}
      </Text>

      <Text
        fontSize={['sm', 'sm', 'sm', 'sm']}
        fontStyle='italic'
        pb={8}
        textAlign='left'
      >
        {publishDate}
      </Text>

      <Box align='left'>
        <Button
          as={GatsbyLink}
          to={`/informasjon/`}
          color='black'
          variant='standard'
          mb={16}
          _hover={{ textDecor: 'none' }}
        >
          Gå tilbake
        </Button>
      </Box>
    </Box>
  );
};

export default PrivateInfo;