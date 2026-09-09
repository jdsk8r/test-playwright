import { test, expect } from '@playwright/test';
import { ExpensesPage } from './pages/expenses-page';

function uniqueTitle(prefix: string): string {
  return `${prefix}-${Date.now()}`;
}

test.describe('Add new expense', () => {
  test('form layout is displayed correctly', async ({ page }) => {
    const expenses = new ExpensesPage(page);
    await expenses.goto();

    await expenses.openNewExpenseForm();
    await expect(expenses.newExpenseForm).toBeVisible();

    const titleBox = await expenses.newExpenseTitle.boundingBox();
    const amountBox = await expenses.newExpenseAmount.boundingBox();
    const dateBox = await expenses.newExpenseDate.boundingBox();

    expect(titleBox).not.toBeNull();
    expect(amountBox).not.toBeNull();
    expect(dateBox).not.toBeNull();

    // title textbox is on the left of amount textbox
    expect(titleBox!.x).toBeLessThan(amountBox!.x);

    // date textbox is below title textbox
    expect(dateBox!.y).toBeGreaterThan(titleBox!.y);
  });

  test('adding a new expense shows it on the overview', async ({ page }) => {
    const expenses = new ExpensesPage(page);
    const title = uniqueTitle('PlaywrightExpense');

    await expenses.goto();
    await expenses.openNewExpenseForm();
    await expect(expenses.newExpenseForm).toBeVisible();

    await expenses.fillNewExpense({ title, amount: 12, date: new Date() });
    await expenses.submitNewExpense();

    await expenses.expectExpenseVisible(title);
  });

  test('cancelling the form hides it without adding an expense', async ({ page }) => {
    const expenses = new ExpensesPage(page);
    const title = uniqueTitle('ShouldNotAppear');

    await expenses.goto();
    await expenses.openNewExpenseForm();
    await expect(expenses.newExpenseForm).toBeVisible();

    await expenses.fillNewExpense({ title, amount: 5, date: new Date() });
    await expenses.cancelButton.click();

    await expect(expenses.newExpenseForm).toBeHidden();
    await expect(expenses.expenseItemByTitle(title)).toHaveCount(0);
  });
});
