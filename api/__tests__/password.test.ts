import { compareSync, genSaltSync, hashSync } from "bcrypt-ts"
import { test, expect } from "bun:test"

test("パスワード", () => {
  const password = "1234"
  const salt = genSaltSync(10)
  const hashedPassword = hashSync(password, salt)
  const result = compareSync(password, hashedPassword)
  expect(result).toBeTruthy()
})
