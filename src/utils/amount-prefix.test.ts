import "@testing-library/jest-dom";

import { getAmountPrefix } from "./amount-prefix";

import { TransactionType } from "../../_app_prisma/generated/prisma";

describe("getAmountPrefix", () => {
  it("should return + for deposit", () => {
    const typeMockDeposit = TransactionType.DEPOSIT;
    expect(getAmountPrefix(typeMockDeposit)).toBe("+");
  });

  it("should return - for expense", () => {
    const typeMockExpense = TransactionType.EXPENSE;
    expect(getAmountPrefix(typeMockExpense)).toBe("-");
  });
});
