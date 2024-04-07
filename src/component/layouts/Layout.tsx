import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import React, { ReactNode, useState } from "react";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Button } from "@mui/material";

import Menu from "./Menu";
import { useRouter } from "next/router";
import {
  clearLocalStorage,
  LocalStorageKeys,
} from "@/pages/helper/local-storage-wrapper";
const drawerWidth = 250;

type LayoutProps = {
  children: ReactNode;
};

const drawer = (
  <div className="dara_bx_cont_min">
    <Toolbar className="dra_logo">
      <Link href="/">LOGO HERE</Link>
    </Toolbar>
    <Divider />
    <Menu />
    <Divider />
  </div>
);

// Remove this const when copying and pasting into your project.

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const _router = useRouter();
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const loggedOut = () => {
    clearLocalStorage(LocalStorageKeys.ACCESS_TOKEN);
    clearLocalStorage(LocalStorageKeys.REFRESH_TOKEN);
    _router.push("/login");
  };

  return (
    <div>
      <header>Header</header>
      <main>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            className="header"
            position="fixed"
            sx={{
              width: { lg: `calc(100% - ${drawerWidth}px)` },
              ml: { lg: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { lg: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Link href="" className="had_logo">
                LOGO HERE
              </Link>
              <Box className="right-header">
                <ul>
                  <li className="d-none-mob">
                    <Box className="blnc-box">
                      <img src="/img/wallet.svg" alt="" />
                      $0, 000
                    </Box>
                  </li>
                  <li>
                    <Button className="ntfctn-box">
                      <NotificationsNoneIcon />
                      <Box className="ntfctn-nmbr">9</Box>
                    </Button>
                  </li>
                  <li>
                    <Button className="settings-box">
                      <SettingsOutlinedIcon />
                    </Button>
                  </li>
                  <li>
                    <Link href="" className="user-block">
                      <Person2OutlinedIcon />
                    </Link>
                    <Button onClick={loggedOut} className="def-btn">
                      Logout
                    </Button>
                  </li>
                </ul>
              </Box>
            </Toolbar>
          </AppBar>
          <Box
            className="draw_bx"
            component="nav"
            sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              className="for_prnt_draw"
              variant="temporary"
              open={mobileOpen}
              onTransitionEnd={handleDrawerTransitionEnd}
              onClose={handleDrawerClose}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", lg: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", lg: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { lg: `calc(100% - ${drawerWidth}px)` },
            }}
            className="min_bx_page"
          >
            {/* <Toolbar /> */}
            {children}
          </Box>
        </Box>
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;
