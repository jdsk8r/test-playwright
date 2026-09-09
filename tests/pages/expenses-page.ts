import { Locator, Page, expect } from '@playwright/test';

export class ExpensesPage {
  readonly page: Page;
  readonly addNewExpenseButton: Locator;
  readonly newExpenseForm: Locator;
  readonly newExpenseTitle: Locator;
  readonly newExpenseAmount: Locator;
  readonly newExpenseDate: Locator;
  readonly addExpenseButton: Locator;
  readonly cancelButton: Locator;
  readonly expenseItems: Locator;
  readonly yearFilter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addNewExpenseButton = page.locator('[cy-data-selector="add-new-expense"]');
    this.newExpenseForm = page.locator('[cy-data-selector="new-expense-form"]');
    this.newExpenseTitle = page.locator('[cy-data-selector="new-expense-title"]');
    this.newExpenseAmount = page.locator('[cy-data-selector="new-expense-amount"]');
    this.newExpenseDate = page.locator('[cy-data-selector="new-expense-date"]');
    this.addExpenseButton = page.locator('[cy-data-selector="add-expense"]');
    this.cancelButton = page.locator('[cy-data-selector="cancel"]');
    this.expenseItems = page.locator('[cy-data-selector="expense-item"]');
    this.yearFilter = page.locator('[cy-data-selector="year-filter"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async openNewExpenseForm() {
    await this.addNewExpenseButton.click();
  }

  async fillNewExpense({ title, amount, date }: { title: string; amount: number; date: Date }) {
    await this.newExpenseTitle.fill(title);
    await this.newExpenseAmount.fill(String(amount));
    await this.newExpenseDate.fill(toInputDate(date));
  }

  async submitNewExpense() {
    await this.addExpenseButton.click();
  }

  expenseItemByTitle(title: string): Locator {
    return this.expenseItems.filter({
      has: this.page.locator('[cy-data-selector="expenseDescription"]', { hasText: title }),
    });
  }

  async expectExpenseVisible(title: string) {
    await expect(this.expenseItemByTitle(title)).toBeVisible();
  }
}

export function toInputDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
