import { Entity, PrimaryKey, Property } from 'typeorm';

// In clean architecture, the domain entity is plain and framework-agnostic.
// Here we define a User entity with minimal fields.
export class User {
  public id: number;
  public email: string;
  public passwordHash: string;
  public role: string; // e.g., 'admin', 'user'

  constructor(id: number, email: string, passwordHash: string, role: string = 'user') {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
  }
}
