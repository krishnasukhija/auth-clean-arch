// import { Entity, PrimaryKey, Property } from 'typeorm';

// In clean architecture, the domain entity is plain and framework-agnostic.
// Here we define a User entity with minimal fields.

export type RoleType = 'admin' | 'user' | undefined;


export class User {
  public id?: string;
  public email: string;
  public passwordHash: string;
  public role?: RoleType; // e.g., 'admin', 'user'

  constructor(id: string, email: string, passwordHash: string, role: RoleType = 'user') {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
  }
}
