import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { isEmpty } from "validate.js"
import { SourceSnapshot } from "../source/source"

/**
 * Model description here for TypeScript hints.
 */
export const ExpensesModel = types.model("Expenses").props({
  id: types.optional(types.string, ""),
  moneyAmount: types.optional(types.number, 0),
  date: types.optional(types.string, ""),
  note: types.optional(types.string, ""),
  title: types.optional(types.string, ""),
  source: types.frozen({} as SourceSnapshot),
  preMoneyAmount: types.optional(types.number, 0),
})
type ExpensesType = Instance<typeof ExpensesModel>
export interface Expenses extends ExpensesType {}
type ExpensesSnapshotType = SnapshotOut<typeof ExpensesModel>
export interface ExpensesSnapshot extends ExpensesSnapshotType {}
export const createExpensesDefaultModel = () => types.optional(ExpensesModel, {})

export const ExpensesStoreModel = types
  .model("Expenses")
  .props({
    listIncomeData: types.frozen([] as ExpensesSnapshot[]),
    listExpensesData: types.frozen([] as ExpensesSnapshot[]),
    sourceData: types.frozen([] as SourceSnapshot[]),
    titleData: types.frozen(
      [] as {
        id: string
        type: string
      }[],
    ),
  })
  .actions((self) => ({
    updateMoneySourceData: (type: "income" | "expenses", updateId: string, moneyAmount: number) => {
      const index: number = self.sourceData.findIndex((i) => i?.id === updateId)
      self.sourceData[index].preMoneyBalance = self.sourceData[index].moneyBalance
      if (type === "income") {
        self.sourceData[index].moneyBalance += moneyAmount
      } else {
        self.sourceData[index].moneyBalance -= moneyAmount
      }
    },
  }))
  .actions((self) => ({
    addExpenses: (data: ExpensesSnapshot) => {
      if (isEmpty(self.listExpensesData)) self.listExpensesData = [data]
      else self.listExpensesData.push(data)
      self.updateMoneySourceData("expenses", data?.id, data?.moneyAmount)
    },
    addIncome: (data: ExpensesSnapshot) => {
      if (isEmpty(self.listIncomeData)) self.listIncomeData = [data]
      else self.listIncomeData.push(data)
      self.updateMoneySourceData("income", data?.id, data?.moneyAmount)
    },
    // TODO: EDIT
    // editExpenses: (data: ExpensesSnapshot) => {
    //   const index: number = self.listExpensesData.findIndex((i) => i?.id === data?.id)
    //   const dataMoneyBackup: number = self.listExpensesData[index].moneyAmount
    //   self.listExpensesData[index] = data
    //   const indexTypeData: number = self.sourceData.findIndex((i) => i?.id === data?.id)
    //   self.sourceData[indexTypeData].moneyBalance -= data?.moneyAmount
    //   const diffMoney: number = dataMoneyBackup - data?.moneyAmount
    //   // if(diffMoney >= 0){

    //   // }
    // },
    // TODO: DELETE
    // deleteExpenses: (expenses: ExpensesSnapshot) => {
    //   const indexTypeData: number = self.sourceData.findIndex((i) => i?.id === expenses?.source?.id)
    //   self.sourceData[indexTypeData].moneyBalance += expenses?.moneyAmount
    //   const arrAfterEdit: ExpensesSnapshot[] = self.listExpensesData.filter(
    //     (i) => i?.id !== expenses?.id,
    //   )
    //   self.listExpensesData = arrAfterEdit
    // },

    addTypeData: (type: SourceSnapshot) => {
      if (isEmpty(self.sourceData)) self.sourceData = [type]
      else self.sourceData.push(type)
    },
    deleteTypeData: (id: string) => {
      const arrAfterEdit: SourceSnapshot[] = self.sourceData.filter((i) => i?.id !== id)
      self.sourceData = arrAfterEdit
    },
    addTitleData: (type: string) => {
      const id: string =
        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      if (isEmpty(self.titleData))
        self.titleData = [
          {
            id,
            type,
          },
        ]
      else
        self.titleData.push({
          id,
          type,
        })
    },
    deleteTitleData: (id: string) => {
      const arrAfterEdit: { id: string; type: string }[] = self.titleData.filter(
        (i) => i?.id !== id,
      )
      self.titleData = arrAfterEdit
    },
  }))

type ExpensesStoreType = Instance<typeof ExpensesStoreModel>
export interface ExpensesStore extends ExpensesStoreType {}
type ExpensesStoreSnapshotType = SnapshotOut<typeof ExpensesStoreModel>
export interface ExpensesStoreSnapshot extends ExpensesStoreSnapshotType {}
export const createExpensesStoreDefaultModel = () => types.optional(ExpensesStoreModel, {})
