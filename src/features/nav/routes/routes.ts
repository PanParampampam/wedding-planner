import type { navItemProps } from "../types/Nav.types";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const home: navItemProps = { label: "Home", path: "/home", icon: HomeIcon };
const guestList: navItemProps = {
  label: "Guests",
  path: "/guests",
  icon: PeopleIcon,
};
const budget: navItemProps = {
  label: "Budget",
  path: "/budget",
  icon: AttachMoneyIcon,
};

export const routes: navItemProps[] = [home, guestList, budget];
