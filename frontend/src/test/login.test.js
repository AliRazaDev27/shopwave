import { test, expect } from 'vitest'
import authService from '../store/features/auth/authService.js'

test('login user', async () => {
  const user = await authService.loginUser({ email: 'admin@email.com', password: 'admin' })
  console.log(user)
  expect(user).toBeDefined()
})
