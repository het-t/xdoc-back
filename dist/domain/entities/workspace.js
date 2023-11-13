"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workspace = void 0;
class Workspace {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.icon = props.icon;
        this.favourites = props.favourites;
        this.createdAt = props.createdAt;
        this.editedAt = props.editedAt;
    }
}
exports.Workspace = Workspace;
