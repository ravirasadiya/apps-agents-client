import React, { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import { useRouter } from "next/router";
import menuItems from "@/pages/helper/sidebar-menu";

export default function Menu() {
  const router = useRouter();
  const [sideBarItems, setSidebarItems] = useState(menuItems);
  const defaultSection = useRef("agent");
  const componentMounted = useRef<boolean>(false);
  const handleActive = (key: string) => {
    console.log("key", key);
    const activeMenuItem = menuItems.map((item) => ({
      ...item,
      className: item.key === key ? "active" : "",
    }));
    setSidebarItems(() => activeMenuItem);
  };
  return (
    <Box className="draw_link">
      {sideBarItems.map((item, index) => (
        <div key={item.key}>
          <Box className="agent_arow">
            <Typography>{item.title}</Typography>
            <KeyboardArrowDownIcon />
          </Box>
          {item.submenus.map((submenu) => (
            <ul
              key={submenu.key}
              className="draw_ul"
              onClick={() => handleActive(submenu.key)}
            >
              <li className={submenu.className}>
                <Link href={submenu.url.toString()}>{submenu.title}</Link>
              </li>
            </ul>
          ))}
        </div>
      ))}
    </Box>
  );
}
