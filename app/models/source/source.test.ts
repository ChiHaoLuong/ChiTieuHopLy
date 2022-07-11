import { SourceModel } from "./source"

test("can be created", () => {
  const instance = SourceModel.create({})

  expect(instance).toBeTruthy()
})
