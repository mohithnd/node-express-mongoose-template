const userRepository = require("../repositories/user.repository");

class UserService {
  async getAllUsers() {
    return await userRepository.findAll();
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error("User Not Found");
    }
    return user;
  }

  async getUserByEmail(email) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User Not Found");
    }
    return user;
  }

  async createUser(data) {
    return await userRepository.create(data);
  }

  async updateUser(id, data) {
    const updatedUser = await userRepository.update(id, data);
    if (!updatedUser) {
      throw new Error("User Not Found");
    }
    return updatedUser;
  }

  async deleteUser(id) {
    const deletedUser = await userRepository.delete(id);
    if (!deletedUser) {
      throw new Error("User not found");
    }
    return deletedUser;
  }
}

module.exports = new UserService();
