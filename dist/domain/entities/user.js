"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.isDarkMode = props.isDarkMode;
        this.profilePicture = props.profilePicture;
        this.workspaces = props.workspaces;
        this.createdAt = props.createdAt;
        this.editedAt = props.editedAt;
        this.avatarUrl = props.avatarUrl;
    }
}
exports.User = User;
