module.exports = {
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
};
