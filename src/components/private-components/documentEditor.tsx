import { gql, useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Heading } from '@chakra-ui/react';
import * as React from 'react';
import DocumentLibrary from '../documentLibrary';
import LoadingSpinner from '../loading-spinner';
import ShowSingleFileFromDocumentLibrary from '../showSingleFileFromDocumentLibrary';

const TABLESIZE = 'sm'; // Font size of the table (sm, md, lg)

export default function DocumentEditor() {
  const QUERY = gql`
    query MenuQuery {
      menu: serviceMenu(id: "3ZMDi88bv5KLPFanE7JxPa") {
        menu1
        menu1File {
          sys {
            id
            firstPublishedAt
            publishedAt
          }
          title
          url
          fileName
          description
        }
        menu2
        menu2File {
          sys {
            id
            firstPublishedAt
            publishedAt
          }
          title
          url
          fileName
          description
        }
        menu3
        menu3File {
          sys {
            id
            firstPublishedAt
            publishedAt
          }
          title
          url
          fileName
          description
        }
        menu4
        menu4File {
          sys {
            id
            firstPublishedAt
            publishedAt
          }
          title
          url
          fileName
          description
        }
        menu5
        menu5FilesCollection {
          items {
            sys {
              id
              firstPublishedAt
              publishedAt
            }
            title
            url
            fileName
          }
        }
        menu6
        menu6FilesCollection {
          items {
            sys {
              id
              firstPublishedAt
              publishedAt
            }
            title
            url
            fileName
          }
        }
      }
    }
  `;

  const { data, error, loading } = useQuery(QUERY);

  if (loading) {
    return (
      <Box>
        <LoadingSpinner spinnerMessage='Autentiserer bruker' />
      </Box>
    );
  }

  const { menu } = data || {};

  const { user, isAuthenticated, error: authError } = useAuth0();
  const userRoles = user['https:/gartnerihagen-askim.no/roles'];
  const isAdmin = userRoles.includes('admin');
  const isEditor = userRoles.includes('editor');

  if (error) {
    return <div>Det har oppstått en feil... {error.message}</div>;
  }

  if (!isAuthenticated) {
    return <h1>Ikke autentisert</h1>;
  }

  if (!(isEditor || isAdmin)) {
    return <h1>Ikke redaktør- eller admin-tilgang</h1>;
  }

  return (
    <Box
      maxW={['97%', '95%', '95%', '70%', '50%']}
      my={8}
      pt={[8, 16, 8, 16]}
      pb={[8, 8, 8, 16]}
      textAlign='center'
    >
      <Box
        bg='primaryLight'
        px={4}
        py={8}
        mb={8}
        rounded='md'
        shadow='lg'
        align='left'
      >
        <Heading as='h1' size='xl' textColor='black' mb={0} textAlign='center'>
          Rediger dokumenter
        </Heading>
      </Box>
      <Heading
        textAlign={['center', 'center', 'left', 'left']}
        as='h2'
        size='xl'
        pt={[0, 0, 8, 8]}
        pb={[0, 0, 4, 4]}
        maxWidth='95vw'
      >
        {menu?.menu1}
      </Heading>
      <ShowSingleFileFromDocumentLibrary
        file={menu?.menu1File}
        size={TABLESIZE}
      />
      <Heading
        textAlign={['center', 'center', 'left', 'left']}
        as='h2'
        size='xl'
        pt={[0, 0, 8, 8]}
        pb={[0, 0, 4, 4]}
        maxWidth='95vw'
      >
        {menu?.menu2}
      </Heading>
      <ShowSingleFileFromDocumentLibrary
        file={menu?.menu2File}
        size={TABLESIZE}
      />
      <Heading
        textAlign={['center', 'center', 'left', 'left']}
        as='h2'
        size='xl'
        pt={[0, 0, 8, 8]}
        pb={[0, 0, 4, 4]}
        maxWidth='95vw'
      >
        {menu?.menu3}
      </Heading>
      <ShowSingleFileFromDocumentLibrary
        file={menu?.menu3File}
        size={TABLESIZE}
      />
      <Heading
        textAlign={['center', 'center', 'left', 'left']}
        as='h2'
        size='xl'
        pt={[0, 0, 8, 8]}
        pb={[0, 0, 4, 4]}
        maxWidth='95vw'
      >
        {menu?.menu4}
      </Heading>
      <ShowSingleFileFromDocumentLibrary
        file={menu?.menu4File}
        size={TABLESIZE}
      />
      <Heading
        textAlign={['center', 'center', 'left', 'left']}
        as='h2'
        size='xl'
        pt={[0, 0, 8, 8]}
        pb={[0, 0, 4, 4]}
        maxWidth='95vw'
      >
        {menu?.menu5}
      </Heading>
      <DocumentLibrary
        content={menu?.menu5FilesCollection?.items}
        size={TABLESIZE}
        hasDeleteAccess={isAdmin || isEditor}
      />

      <Box textAlign={['center', 'center', 'left', 'left']} pb={[12, 12, 4, 4]}>
        <Button
          minW={['40%', '40%', '20%', '20%']}
          minH='3rem'
          variant='standard-light'
          onClick={() => console.log('clicked')}
          _hover={{ bg: 'hoverButtonColor' }}
        >
          Last opp fil
        </Button>
      </Box>
      <Heading
        textAlign={['center', 'center', 'left', 'left']}
        as='h2'
        size='xl'
        pt={[0, 0, 8, 8]}
        pb={[0, 0, 4, 4]}
        maxWidth='95vw'
      >
        {menu?.menu6}
      </Heading>
      <DocumentLibrary
        content={menu?.menu6FilesCollection?.items}
        size={TABLESIZE}
        hasDeleteAccess={isAdmin || isEditor}
      />

      <Box
        textAlign={['center', 'center', 'left', 'left']}
        pb={[12, 12, 4, 4]}
        className='file-input'
      >
        <input
          type='file'
          id='file'
          className='file'
          multiple
          accept='.doc,.docx,.xls,.xlsx, .xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf, .txt, '
          name='file'
          onChange={(e) => console.log(e.target.files[0].name)}
        />

        <label htmlFor='file'>Velg filer</label>
      </Box>
    </Box>
  );
}

// File upload component, some ideas: https://gist.github.com/brenopolanski/5efe54b46cad0882b3ce41dc8db64608