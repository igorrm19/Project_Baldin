/* eslint-disable no-undef */
// Mock import.meta.env by mocking the file that uses it
jest.mock('./src/App/shared/features/login/constants/servicesConstants', () => ({
  servicesURL: { url: 'http://localhost:3000/users' },
  servicesMessage: {
    success: "User created successfully",
    error: "Failed to create user",
    update: "User updated successfully",
    delete: "User deleted successfully",
    get: "User fetched successfully",
  },
  servicesHeaders: {
    contentType: "application/json",
    accept: "application/json",
    authorization: "Bearer "
  }
}), { virtual: true });

// Also mock it for other possible paths if needed (absolute/relative)
// But virtual mocks with relative paths are tricky.
