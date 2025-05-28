import { ReactNode } from "react";

export type SummaryCardsProps = {
  icon: ReactNode;
  title: string;
  amount: number;
  sizeTextAmount?: "small" | "large";
  isButtonAddTransaction?: boolean;
};
