const menuItems = [
  {
    title: "Agent",
    index: 0,
    display: true,
    key: "agent",
    submenus: [
      {
        index: 0,
        title: "Summary",
        key: "summary",
        url: "/",
        className: "active",
      },
      {
        index: 1,
        title: "Reports",
        key: "reports",
        url: "/reports-agents",
        className: "",
      },
      {
        index: 2,
        title: "Deals",
        key: "deals-agents",
        url: "/deals-agents",
        className: "",
      },
      {
        index: 3,
        title: "Player Results",
        key: "player-results",
        url: "/player-results",
        className: "",
      },
      {
        index: 4,
        title: "Settlements",
        key: "settlements",
        url: "/settlements",
        className: "",
      },
      {
        index: 5,
        title: "Settings",
        key: "settings",
        url: "/settings",
        className: "",
      },
    ],
  },
  {
    title: "Players",
    index: 0,
    display: true,
    key: "players",
    submenus: [
      {
        index: 0,
        title: "Summary",
        key: "summary",
        url: "/",
        className: "",
      },
      {
        index: 1,
        title: "Deals",
        key: "deals-agents",
        url: "/deals-agents",
        className: "",
      },
      {
        index: 2,
        title: "Player Results",
        key: "player-results",
        url: "/player-results",
        className: "",
      },
      {
        index: 3,
        title: "Settlements",
        key: "settlements",
        url: "/settlements",
        className: "",
      },
      {
        index: 4,
        title: "Settings",
        key: "settings",
        url: "/settings",
        className: "",
      },
    ],
  },
];

export default { menuItems };
