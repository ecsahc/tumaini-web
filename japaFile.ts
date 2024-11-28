import { configure } from 'japa'

configure({
  files: ['tests/**/*.ts'],
  timeout: 5000,
  before: () => {
    // Setup code before tests run
  },
  after: () => {
    // Cleanup code after tests run
  },
})
