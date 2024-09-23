import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { getPriorityIcon, getRandomKey, getStatusIcon } from "../service/utils";

const Ticket = ({ data }) => {
  return (
    <Card maxW="md" key={`card-${data.id}`}>
      <CardHeader pt={3} pb={0} px={5}>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Box flex="1">
              <Text color="gray.500">{data.id}</Text>
            </Box>
            {/* Conditionally render Avatar only if userName is available */}
            {data.userName && (
              <Tooltip label={data.userName} aria-label="Avatar Tooltip">
                <Avatar
                  name={data.userName}
                  src={
                    data.userName === "Suresh"
                      ? "https://bit.ly/sage-adebayo"
                      : `https://bit.ly/${data.userName.replace(" ", "-")}`
                  }
                  width="36px"
                  height="36px"
                  pos={"relative"}
                  bg={"gray.300"}
                  _after={{
                    content: '""',
                    w: 3,
                    h: 3,
                    bg: data.userAvailable ? "green.300" : "gray.300", // Check userAvailable
                    border: "2px solid white",
                    rounded: "full",
                    pos: "absolute",
                    bottom: 0,
                    right: -2,
                  }}
                />
              </Tooltip>
            )}
          </Flex>
        </Flex>

        {/* Conditionally render Status and Title */}
        <Flex>
          {data.status && (
            <Text as="span" px={0} width="21px" pt="2px">
              <Tooltip label={data.status} aria-label="Status Tooltip">
                {getStatusIcon(data.status)}
              </Tooltip>
            </Text>
          )}
          <Heading noOfLines={2} flex={1} size="sm">
            {data.title}
          </Heading>
        </Flex>
      </CardHeader>

      <CardBody pt={2} pb={3} px={5}>
        <Flex>
          {/* Priority Icon */}
          <IconButton
            aria-label={""}
            icon={getPriorityIcon(data.priority)}
            bg={"transparent"}
            variant={"outline"}
            _focus={{ outline: "none" }}
            size={"md"}
            borderColor={"gray.300"}
            boxSize={8}
          ></IconButton>

          {/* Tags rendering */}
          {Array.isArray(data?.tag) && data.tag.length > 0 && (
            <Box
              ml={3}
              px={3}
              borderRadius="5px"
              border="1px"
              borderColor="gray.200"
            >
              {data?.tag.map((tag) => (
                <Text as="div" fontSize="small" key={`tag-${getRandomKey()}`}>
                  <Icon viewBox="0 0 200 200" h={8} mr={1} color="gray.300">
                    <path
                      fill="currentColor"
                      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                    />
                  </Icon>
                  {tag}
                </Text>
              ))}
            </Box>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Ticket;
