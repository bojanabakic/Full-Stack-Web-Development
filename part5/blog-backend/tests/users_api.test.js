const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

describe('when a new user is added', () => {
  test('it will return an error if the password has less then 3 characters', async () => {
    await api.post('/api/users').send({
      "username": "Test",
      "name": "Test Name1",
      "password": "1"
    }).expect(404)
  })

  test('it will return an error if the username has less then 3 characters', async () => {
    await api.post('/api/users').send({
      "username": "Te",
      "name": "Test Name2",
      "password": "123456"
    }).expect(404)
  })

  test('it will succeed if all parameters are correct', async () => {
    const responseGetBefore = await api.get('/api/users')
    const usersB = responseGetBefore.body

    await api.post('/api/users').send({
      "username": "Test2",
      "name": "Test Name2",
      "password": "123456"
    }).expect(200)
    
    const responseGetAfter = await api.get('/api/users')
    const usersA = responseGetAfter.body
    expect(usersA).toHaveLength(usersB.length + 1)
  })
})