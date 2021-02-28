describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const newUser = {
      name: 'romikooo',
      username: 'romkkk',
      password: 'romiko',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', newUser)
    const another = {
      name: 'romiko',
      username: 'romiko',
      password: 'romiko',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', another)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('Login')
      cy.login({ username: 'romkkk', password: 'romiko' })
      cy.contains('romikooo logged in')
    })

    it('fails with wrong credentials', () => {
      cy.contains('Login')
      cy.get('#username').type('unknown')
      cy.get('#password').type('unknown')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe.only('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'romkkk', password: 'romiko' })
    })

    it('A blog can be created', () => {
      cy.createBlog({
        title: 'new blog creation',
        author: 'romikoooo',
        url: 'romkkk.com',
        likes: 0,
      })

      cy.contains('new blog creation romikoooo')
    })

    it('A blog can be liked', () => {
      cy.createBlog({
        title: 'new blog creation',
        author: 'romikoooo',
        url: 'romkkk.com',
        likes: 0,
      })
      cy.contains('new blog creation romikoooo').contains('View').click()
      cy.contains('0').contains('Like').click()
      cy.contains('1')
    })

    it('A blog can be deleted user who created it', () => {
      cy.createBlog({
        title: 'new blog creation',
        author: 'romikoooo',
        url: 'romkkk.com',
        likes: 0,
      })
      cy.contains('new blog creation romikoooo').contains('View').click()
      cy.contains('delete blog').contains('remove').click()

      cy.get('html').should('not.contain', 'new blog creation romikoooo')
    })

    it('A blog can not be deleted user who did not create it', () => {
      cy.createBlog({
        title: 'new blog creation',
        author: 'romikoooo',
        url: 'romkkk.com',
        likes: 0,
      })

      cy.get('#logout').click()

      cy.login({ username: 'romiko', password: 'romiko' })

      cy.contains('new blog creation romikoooo').contains('View').click()
      cy.get('html').should('not.contain', 'delete blog')
    })

    it('Most liked blog at the top', () => {
      cy.createBlog({
        title: 'blog 1',
        author: 'romikoooo',
        url: 'romkkk.com',
        likes: 120,
      })

      cy.createBlog({
        title: 'blog 2',
        author: 'romikoooo',
        url: 'romkkk.com',
        likes: 76,
      })

      cy.createBlog({
        title: 'blog 3',
        author: 'romikoooo',
        url: 'romkkk.com',
        likes: 122,
      })

      cy.contains('View').click()
      cy.contains('122')
    })
  })
})
