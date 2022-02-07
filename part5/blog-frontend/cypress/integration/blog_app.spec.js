describe('Blog app', function () {
  const user = {
    'blogs': [],
    'username': 'test',
    'name': 'test',
    'password': 'test'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('[data-testid="loginForm"]').should('be.visible')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('[data-testid="username"]').type('test')
      cy.get('[data-testid="password"]').type('test')
      cy.get('[data-testid="loginButton"]').click()

      cy.contains('You have successfully logged in!')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('[data-testid="username"]').type('test')
      cy.get('[data-testid="password"]').type('123')
      cy.get('[data-testid="loginButton"]').click()
      cy.contains('Wrong credentials')
    })
  })


  describe('When logged in', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000')
      cy.get('[data-testid="username"]').type('test')
      cy.get('[data-testid="password"]').type('test')
      cy.get('[data-testid="loginButton"]').first().click()
    })

    it('a blog can be created', function () {
      cy.contains('Create new blog').click()
      cy.get('[data-testid="title"]').type('test')
      cy.get('[data-testid="author"]').type('test')
      cy.get('[data-testid="url"]').type('test.com')
      cy.get('[data-testid="addBlog"]').last().click()

      cy.contains('test')
    })

    it('user can like a blog', function () {
      cy.contains('view').click()
      cy.contains('test').get('[data-testid="likeButton"]').click()
      cy.get('[data-testid="likes"]').contains('1')
    })

    it('user can delete a blog', function () {
      cy.contains('Create new blog').click()
      cy.get('[data-testid="title"]').type('test2')
      cy.get('[data-testid="author"]').type('test2')
      cy.get('[data-testid="url"]').type('test2')
      cy.get('[data-testid="addBlog"]').click()

      cy.contains('view').click()
      cy.get('[data-testid="removeButton"]').click()
      cy.on('windows:confirm', () => true)
    })

    it('existing blogs are sorted', async function () {
      const response = await cy.request('POST', 'http://localhost:3003/api/login', { username: user.username, password: user.password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))

      const b1 = ({
        title: 'test1',
        author: 'test1',
        url: 'test1',
        likes: 1,
      })

      const b2 = ({
        title: 'test2',
        author: 'test2',
        url: 'test2',
        likes: 2,
      })

      const b3 = ({
        title: 'test3',
        author: 'test3',
        url: 'test3',
        likes: 3,
      })

      cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs/',
        body: b1,
        headers: {
          Authorization: `bearer ${response.body.token}`
        },
      })

      cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs/',
        body: b2,
        headers: {
          Authorization: `bearer ${response.body.token}`
        },
      })

      cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs/',
        body: b3,
        headers: {
          Authorization: `bearer ${response.body.token}`
        },
      })

      cy.get('.blog>.info').should((items) => {
        expect(items[0].innerHTML).to.contain('test3 test3')
        expect(items[1].innerHTML).to.contain('test2 test2')
        expect(items[2].innerHTML).to.contain('test1 test1')
      })
    })
  })
})