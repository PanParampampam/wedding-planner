import { apiClient } from "src/shared/lib/apiClient";
import type { GuestInvitationStatus } from "src/shared/types/common.types";

export type HomeDashboardGuestStatus = {
  status: GuestInvitationStatus;
  children: number | null;
};

export type HomeDashboardBudgetNearestDeadlineEntry = {
  id: string;
  name: string;
  dueDate: string;
};

export type HomeDashboardData = {
  guestsOverview: HomeDashboardGuestStatus[];
  budgetOverview: {
    budget: number | null;
    plannedExpenses: number;
    actualExpenses: number;
    totalExpensesCount: number;
    nearestDeadlineEntry: HomeDashboardBudgetNearestDeadlineEntry | null;
  };
};

export const getHomeDashboard = () => {
  return apiClient<HomeDashboardData>("/api/home", { credentials: "include" });
};
