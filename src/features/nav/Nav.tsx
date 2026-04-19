import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { DRAWER_WIDTH } from "../../shared/constants/componentsSizes";
import { routes } from "../../shared/constants/routes";
import type { navItemProps } from "../../shared/types/common.types";

const navItems: navItemProps[] = routes;

type DrawerContentProps = {
  onNavigate?: () => void;
};

function DrawerContent({ onNavigate }: DrawerContentProps) {
  const location = useLocation();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: (theme) =>
          `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.secondary.light} 100%)`,
      }}
    >
      <Box sx={{ px: 3, py: 4, textAlign: "center" }}>
        <Box
          component={RouterLink}
          to="/home"
          onClick={onNavigate}
          sx={{ display: "inline-block" }}
        >
          <Box
            component="img"
            src={logo}
            alt="Wedding Planner logo"
            sx={{
              display: "block",
              width: "100%",
              maxWidth: 180,
              height: "auto",
              mx: "auto",
            }}
          />
        </Box>
      </Box>

      <Divider />

      <List sx={{ px: 1.5, py: 2 }}>
        {navItems.map((item) => {
          const isHomeRoute = item.path === "/home";
          const isSelected = isHomeRoute
            ? location.pathname === "/" || location.pathname === "/home"
            : location.pathname.startsWith(item.path);

          return (
            <ListItemButton
              key={item.path}
              component={RouterLink}
              to={item.path}
              onClick={onNavigate}
              selected={isSelected}
              sx={{
                mb: 0.75,
                borderRadius: 2,
                color: isSelected ? "primary.main" : "text.secondary",
                "&.Mui-selected": {
                  backgroundColor: "secondary.main",
                  fontWeight: 600,
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "secondary.dark",
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: isSelected ? 700 : 500 }}>
                    {item.label}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((open) => !open);
  };

  const drawer = <DrawerContent onNavigate={() => setMobileOpen(false)} />;

  return (
    <>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "sticky",
          top: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
          <Typography
            variant="h6"
            sx={{ color: "primary.main", fontSize: "1rem", fontWeight: 700 }}
          >
            Wedding Planner
          </Typography>

          <Button
            variant="outlined"
            color="primary"
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 999,
            }}
          >
            Show menu
          </Button>
        </Toolbar>
      </Box>

      <Box
        component="nav"
        aria-label="Wedding planner pages"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          <DrawerContent />
        </Drawer>
      </Box>
    </>
  );
}
