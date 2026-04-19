import type { navItemProps } from "../types/common.types";

const home: navItemProps = { label: "Home", path: "/home" };
const guestList: navItemProps = { label: "Guest List", path: "/guests" };
const budget: navItemProps = { label: "Budget", path: "/budget" };

export const routes: navItemProps[] = [home, guestList, budget];
