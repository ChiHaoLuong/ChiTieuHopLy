import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SourceSnapshot } from "../source/source"

/**
 * Model description here for TypeScript hints.
 */

export const LoanModel = types.model("Loan").props({
  id: types.optional(types.string, ""),
  loanType: types.optional(types.string, ""),
  people: types.optional(types.string, ""),
  AmountOfLoan: types.optional(types.number, 0),
  startDate: types.optional(types.string, ""),
  endDate: types.optional(types.string, ""),
  preMoneyBalance: types.optional(types.number, 0),
  source: types.frozen({} as SourceSnapshot),
})
type LoanType = Instance<typeof LoanModel>
export interface Loan extends LoanType {}
type LoanSnapshotType = SnapshotOut<typeof LoanModel>
export interface LoanSnapshot extends LoanSnapshotType {}
export const LoanDefaultModel = () => types.optional(LoanModel, {})

export const LoanStoreModel = types
  .model("LoanStore")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type LoanStoreType = Instance<typeof LoanStoreModel>
export interface LoanStore extends LoanStoreType {}
type LoanStoreSnapshotType = SnapshotOut<typeof LoanStoreModel>
export interface LoanStoreSnapshot extends LoanStoreSnapshotType {}
export const createLoanStoreDefaultModel = () => types.optional(LoanStoreModel, {})
