export default class CurrentUserDTO {
    constructor(user) {
    this.id = user._id?.toString?.() || user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    }
}