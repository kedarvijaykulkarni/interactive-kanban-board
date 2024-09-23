import { Box, Heading, Text } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

const Error = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Page not found
      </Heading>
      <Text color={"gray.500"}>Please check the path.</Text>
    </Box>
  );
};

export default Error;
