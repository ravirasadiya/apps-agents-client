import React, { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import { useRouter } from "next/router";
import menuItems from "@/helper/sidebar-menu";

export default function Menu() {
  const router = useRouter();
  const [sideBarItems, setSidebarItems] = useState(menuItems);
  const handleActive = (key: any) => {
    router.replace(key.url);
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
            <ul key={submenu.key} className="draw_ul">
              <li
                className={submenu.className}
                onClick={() => handleActive(submenu)}
              >
                <Link href={submenu.url}>{submenu.title}</Link>
                {/* <Link href={submenu.url.toString()}>{submenu.title}</Link> */}
              </li>
            </ul>
          ))}
        </div>
      ))}
    </Box>
  );
}
