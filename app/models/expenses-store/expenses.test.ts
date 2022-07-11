import { ExpensesModel } from "./expenses-store"

test("can be created", () => {
  const instance = ExpensesModel.create({})

  expect(instance).toBeTruthy()
})
