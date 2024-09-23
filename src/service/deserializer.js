export const ticketData = async (data, groupId, orderId) => {
  switch (groupId) {
    case "status":
      return await ticketDataByStatus(data, groupId, orderId);
    case "user":
      return await ticketDataByUser(data, groupId, orderId);
    case "priority":
      return await ticketDataByPriority(data, groupId, orderId);
    default:
      return await ticketDataByStatus(data, groupId, orderId);
  }
};

export const ticketDataByStatus = async (data, groupId, orderId) => {
  const { tickets, users } = data;
  // Group tickets by status
  const processedTickets = {
    Todo: [],
    "In progress": [],
    Backlog: [],
    Done: [],
    Canceled: [],
  };

  tickets.forEach((ticket) => {
    const user = users.find((user) => user.id === ticket.userId);
    const ticketWithUser = {
      ...ticket,
      userName: user?.name || "Unknown User",
      userAvailable: user?.available || false,
    };

    if (processedTickets[ticket.status]) {
      processedTickets[ticket.status].push(ticketWithUser);
    } else {
      // In case there's an unknown status, add it as a separate group
      processedTickets[ticket.status] = [ticketWithUser];
    }
  });

  const sortedData = Object.keys(processedTickets).map((status) => {
    let tickets = processedTickets[status];

    // Sort tickets based on orderId
    if (orderId === "priority") {
      tickets = tickets.sort((a, b) => a.priority - b.priority);
    } else if (orderId === "title") {
      tickets = tickets.sort((a, b) => a.title.localeCompare(b.title));
    }

    return {
      title: status,
      data: tickets,
    };
  });

  return sortedData;
};

export const ticketDataByUser = async (data, groupId, orderId) => {
  const { tickets, users } = data;

  return users.map((user) => {
    let userTickets = tickets.filter((ticket) => ticket.userId === user.id);

    // Sort tickets based on orderId
    if (orderId === "priority") {
      userTickets = userTickets.sort((a, b) => a.priority - b.priority);
    } else if (orderId === "title") {
      userTickets = userTickets.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Initialize status counts for the user
    const statusCounts = {
      Todo: 0,
      "In progress": 0,
      Backlog: 0,
      Done: 0,
      Canceled: 0,
    };

    // Count the tickets by status
    userTickets.forEach((ticket) => {
      if (statusCounts.hasOwnProperty(ticket.status)) {
        statusCounts[ticket.status]++;
      }
    });

    return {
      name: user.name,
      available: user.available,
      tickets: userTickets,
      stats: statusCounts,
    };
  });
};

export const ticketDataByPriority = async (data, groupId, orderId) => {
  const { tickets, users } = data;

  // Define priority levels
  const priorityMap = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No priority",
  };

  // Initialize the result array with priority levels
  const processedTickets = Object.keys(priorityMap).map((priorityLevel) => ({
    name: priorityMap[priorityLevel],
    tickets: [],
    stats: {
      urgent: 0,
      high: 0,
      medium: 0,
      low: 0,
      nopriority: 0,
    },
  }));

  // Loop through tickets and group them by priority
  tickets.forEach((ticket) => {
    const user = users.find((user) => user.id === ticket.userId);
    const priorityGroup = processedTickets.find(
      (group) => group.name === priorityMap[ticket.priority]
    );

    if (priorityGroup) {
      priorityGroup.tickets.push({
        ...ticket,
        userName: user.name,
        userAvailable: user.available,
      });

      // Update stats based on priority
      if (ticket.priority === 4) priorityGroup.stats.urgent++;
      if (ticket.priority === 3) priorityGroup.stats.high++;
      if (ticket.priority === 2) priorityGroup.stats.medium++;
      if (ticket.priority === 1) priorityGroup.stats.low++;
      if (ticket.priority === 0) priorityGroup.stats.nopriority++;
    }
  });

  // Sort tickets in each priority group if orderId is specified
  processedTickets.forEach((group) => {
    if (orderId === "priority") {
      group.tickets = group.tickets.sort((a, b) => a.priority - b.priority);
    } else if (orderId === "title") {
      group.tickets = group.tickets.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }
  });

  return processedTickets;
};
