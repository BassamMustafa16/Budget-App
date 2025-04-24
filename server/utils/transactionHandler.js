const db = require("../db");

async function handleTransaction(type, account_id, amount, action) {
  try {
    // Fetch the current account details from the database
    const [accountRows] = await db.query(
      "SELECT * FROM accounts WHERE id = ?",
      [account_id]
    );

    // Check if the account exists
    if (accountRows.length === 0) {
      throw new Error("Account not found");
    } else {
      // Handle transaction based on the type (Expense or Income)
      switch (type) {
        case "Expense":
          // Get the current total expenses for the account
          const currentTotalExpenses = parseFloat(
            accountRows[0].total_expenses
          );

          // Calculate the updated total expenses based on the action (Add or Subtract)
          const updatedTotalExpenses =
            action === "Add"
              ? currentTotalExpenses + parseFloat(amount)
              : currentTotalExpenses - parseFloat(amount);

          // Update the total_expenses in the accounts table
          await db.query(
            "UPDATE accounts SET total_expenses = ? WHERE id = ?",
            [updatedTotalExpenses, account_id]
          );

          // Return a success message
          return { message: "total_expenses updated successfully" };
          break;

        case "Income":
          // Get the current total incomes for the account
          const currentTotalIncomes = parseFloat(accountRows[0].total_incomes);

          // Calculate the updated total incomes based on the action (Add or Subtract)
          const updatedTotalIncomes =
            action === "Add"
              ? currentTotalIncomes + parseFloat(amount)
              : currentTotalIncomes - parseFloat(amount);

          // Update the total_incomes in the accounts table
          await db.query("UPDATE accounts SET total_incomes = ? WHERE id = ?", [
            updatedTotalIncomes,
            account_id,
          ]);

          // Return a success message
          return { message: "Accounts updated successfully" };
          break;
      }
    }
  } catch (err) {
    // Handle any errors that occur during the transaction
    throw new Error(`Error handling Expense transaction: ${err.message}`);
  }

  // Default return statement (if no logic is implemented for Income transactions)
  return { message: "Income transaction logic not implemented yet" };
}

module.exports = handleTransaction;
