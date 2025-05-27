import { TransactionPercentagePerType } from "../_actions/action.types";

export type ChartPieTransactionsProps = {
  typesPercentage: TransactionPercentagePerType;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
};
