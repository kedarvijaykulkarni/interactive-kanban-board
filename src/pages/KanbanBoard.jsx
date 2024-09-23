import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { ServerQuickActions, SVGComponent, Ticket } from "../components";
import { useEffect, useState } from "react";
import { getRandomKey, getStatusIcon, loadData } from "../service/utils"; // Removed getRandomKey
import { useParams } from "react-router-dom";

const KanbanBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]); // Initialize as empty array
  const { groupId, orderId } = useParams(); // Get the dynamic route params

  const reloadData = async () => {
    let res = [];
    setIsLoading(true);
    setResult(res);
    res = await loadData(groupId, orderId);
    setResult(res);
    setIsLoading(false);
  };

  useEffect(() => {
    reloadData();
  }, [groupId, orderId]);

  return (
    <Box>
      <Box as="section" py={2} bg="white">
        <ServerQuickActions reloadData={reloadData} />
      </Box>

      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {isLoading && <Text>Loading...</Text>}
        {Array.isArray(result) &&
          result.length > 0 &&
          result.map((section) => (
            <GridItem
              key={`section-${getRandomKey()}`}
              px={2}
              w="100%"
              overflowY={"auto"}
              height="calc(100vh - 100px)"
            >
              <Flex border={1} py={2}>
                <Text as="span" pt={1} width="28px">
                  {groupId === "user" ? (
                    <Avatar
                      name={section.name}
                      src="https://bit.ly/sage-adebayo"
                      width="18px"
                      height="18px"
                      pos={"relative"}
                      bg={"gray.300"}
                      _after={{
                        content: '""',
                        w: 2,
                        h: 2,
                        bg: section.available ? "green.300" : "gray.300", // Check userAvailable
                        border: "2px solid white",
                        rounded: "full",
                        pos: "absolute",
                        bottom: 0,
                        right: -2,
                      }}
                    />
                  ) : (
                    getStatusIcon(section.name || section.title)
                  )}{" "}
                  {/* Adjust icon logic */}
                </Text>
                <Text as="div" fontWeight={600} flex={1}>
                  {section.name || section.title} {/* Show `name` or `title` */}
                  <Text as="span" ml={3} color="gray.500" fontWeight={500}>
                    {section?.tickets?.length || section?.data?.length || 0}{" "}
                    {/* Use tickets or data length */}
                  </Text>
                </Text>

                <IconButton
                  aria-label={""}
                  icon={<SVGComponent.IconAdd />}
                  bg={"transparent"}
                  variant={"outline"}
                  _focus={{ outline: "none" }}
                  size={"md"}
                  border={0}
                  h={7}
                />

                <IconButton
                  aria-label={""}
                  icon={<SVGComponent.IconThreeDotMenu />}
                  bg={"transparent"}
                  variant={"outline"}
                  _focus={{ outline: "none" }}
                  size={"md"}
                  border={0}
                  h={7}
                />
              </Flex>
              {Array.isArray(section?.tickets || section?.data) &&
                (section.tickets || section.data).map((ticket) => (
                  <Box my={2} key={`ticket-${getRandomKey()}`}>
                    <Ticket data={ticket} />
                  </Box>
                ))}
            </GridItem>
          ))}
      </Grid>
    </Box>
  );
};

export default KanbanBoard;
