import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  Flex,
  Box,
  Stack,
  Select,
  Text,
} from "@chakra-ui/react";
import SVGComponent from "./SVGComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ServerQuickActions = () => {
  const { groupId, orderId } = useParams(); // Get the dynamic route params

  const [selectedgroup, setSelectedgroup] = useState(groupId || "");
  const [selectedOrder, setSelectedOrder] = useState(orderId || "");

  const navigate = useNavigate();

  const handleGroupingChange = async (e) => {
    const group = e.target.value;
    setSelectedgroup(group);
    const newPath = `/${group}${orderId ? `/${orderId}` : ""}`;
    navigate(newPath);
  };

  const handleOrderingChange = async (e) => {
    const order = e.target.value;
    setSelectedOrder(order);
    const newPath = `/${groupId ? groupId : "-"}${order ? `/${order}` : ""}`;
    navigate(newPath);
  };

  useEffect(() => {
    setSelectedgroup(groupId || "");
    setSelectedOrder(orderId || "");
  }, [groupId, orderId]);

  return (
    <Flex justifyContent="middle">
      <Popover placement="bottom" isLazy>
        <PopoverTrigger>
          <Button
            leftIcon={<SVGComponent.IconDisplay />}
            variant="outline"
            w="fit-content"
            fontSize="sm"
            h={8}
            px={2}
            ml={2}
          >
            Display
            <Box boxSize={5}>
              <SVGComponent.IconDown />
            </Box>
          </Button>
        </PopoverTrigger>
        <PopoverContent ml={4} _focus={{ boxShadown: "none" }} bg="#f4f5f9">
          <PopoverBody w="full">
            <Box mb={1}>
              <Flex>
                <Text flex={1} fontSize="sm">
                  Grouping
                </Text>
                <Stack spacing={3}>
                  <Select
                    variant="outline"
                    placeholder="Select View"
                    width="125px"
                    fontSize="sm"
                    bg="white"
                    h={8}
                    value={selectedgroup}
                    onChange={handleGroupingChange}
                  >
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                  </Select>
                </Stack>
              </Flex>
            </Box>
            <Flex>
              <Text flex={1} fontSize="sm">
                Ordering
              </Text>
              <Stack spacing={3}>
                <Select
                  variant="outline"
                  placeholder="Sort by"
                  width="125px"
                  fontSize="sm"
                  bg="white"
                  h={8}
                  value={selectedOrder}
                  onChange={handleOrderingChange}
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </Select>
              </Stack>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default ServerQuickActions;
