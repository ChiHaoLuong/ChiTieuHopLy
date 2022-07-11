import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const SourceModel = types
  .model("Source")
  .props({
    id: types.optional(types.string, ""),
    type: types.optional(types.string, ""),
    moneyBalance: types.optional(types.number, 0),
    preMoneyBalance: types.optional(types.number, 0),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type SourceType = Instance<typeof SourceModel>
export interface Source extends SourceType {}
type SourceSnapshotType = SnapshotOut<typeof SourceModel>
export interface SourceSnapshot extends SourceSnapshotType {}
export const createSourceDefaultModel = () => types.optional(SourceModel, {})
