import { Tooltip } from "@chakra-ui/react";
import { SVGComponent } from "../components";
import { ticketData } from "./deserializer";
import axios from "axios";

// - Urgent (Priority level 4)
// - High (Priority level 3)
// - Medium (Priority level 2)
// - Low (Priority level 1)
// - No priority (Priority level 0)

export const getPriorityIcon = (status) => {
  switch (status) {
    case 0:
      return (
        <Tooltip label="No priority" aria-label="Priority Tooltip">
          <SVGComponent.IconNoPriority />
        </Tooltip>
      );
    case 1:
      return (
        <Tooltip label="Low priority" aria-label="Priority Tooltip">
          <SVGComponent.IconLowPriority />
        </Tooltip>
      );
    case 2:
      return (
        <Tooltip label="Medium priority" aria-label="Priority Tooltip">
          <SVGComponent.IconMediumPriority />
        </Tooltip>
      );
    case 3:
      return (
        <Tooltip label="High priority" aria-label="Priority Tooltip">
          <SVGComponent.IconHighPriority />
        </Tooltip>
      );
    case 4:
      return (
        <Tooltip label="Urgent priority" aria-label="Priority Tooltip">
          <SVGComponent.IconUrgentPriorityColour />
        </Tooltip>
      );
    default:
      return (
        <Tooltip label="No priority" aria-label="Priority Tooltip">
          <SVGComponent.IconNoPriority />
        </Tooltip>
      );
  }
};

export const getStatusIcon = (status) => {
  switch (status) {
    case "No priority":
      return <SVGComponent.IconNoPriority />;
    case "Low":
      return <SVGComponent.IconLowPriority />;
    case "Medium":
      return <SVGComponent.IconMediumPriority />;
    case "High":
      return <SVGComponent.IconHighPriority />;
    case "Urgent":
      return <SVGComponent.IconUrgentPriorityColour />;
    case "Todo":
      return <SVGComponent.IconToDo />;
    case "In progress":
      return <SVGComponent.IconInProgress />;
    case "Backlog":
      return <SVGComponent.IconBacklog />;
    case "Done":
      return <SVGComponent.IconDone />;
    case "Canceled":
      return <SVGComponent.IconCancelled />;
    default:
      return <SVGComponent.IconInProgress />;
  }
};

export const loadData = async (groupId, orderId) => {
  try {
    return await axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then(async (res) => {
        const processedTickets = await ticketData(res.data, groupId, orderId);
        // console.log("processData ::", processedTickets); // REMOVE this after work done
        return processedTickets;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error("Error submitting the data:", error);
  }
};

export const getRandomKey = () => Math.floor(Math.random() * 10000 + 1);
