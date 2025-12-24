export default class UserRepository {
    constructor(userDao) {
    this.userDao = userDao;
    }

    getAll() {
    return this.userDao.getUsers();
    }

    getById(id) {
    return this.userDao.getUserById(id);
    }

    getByEmail(email) {
    return this.userDao.getUserByEmail(email);
    }

    create(data) {
    return this.userDao.createUser(data);
    }

    updateById(id, update) {
    return this.userDao.updateUserById(id, update);
    }
}