"use strict";
// import { Entity, PrimaryKey, Property } from 'typeorm';
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// In clean architecture, the domain entity is plain and framework-agnostic.
// Here we define a User entity with minimal fields.
class User {
    id;
    email;
    passwordHash;
    role; // e.g., 'admin', 'user'
    constructor(id, email, passwordHash, role = 'user') {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
    }
}
exports.User = User;
