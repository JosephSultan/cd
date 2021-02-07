import React from "react";
import Layout from "../layouts/layout";
import { Box, Heading } from "@chakra-ui/react";
import PrivateServiceBox from "./privateServicebox";
import ArticleGrid from "../../components/sections/articleGrid";
import PrivateInfoList from "./privateInfoList";
import SEO from "../seo";

export default function PrivateMain() {
  return (
    <Layout>
      <SEO />
      <Box w="95vw" ml="0" pr={["0", "0", "5vw", "30vw"]}>
        <PrivateServiceBox />
        <PrivateInfoList />
        <Heading
          as="h1"
          size="2xl"
          pt={[0, 0, 8, 8]}
          pb={[0, 0, 4, 4]}
          textAlign="left"
          maxWidth="95vw"
        >
          Siste blogginnlegg
        </Heading>
        <ArticleGrid />
      </Box>
    </Layout>
  );
}
