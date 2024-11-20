import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { DateTime } from 'luxon'
import Roles from '#enums/roles'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      fullName: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: 'password123',
      roleId: Roles.USER, // Default role, can be overridden in seeders
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      // emailVerifiedAt: DateTime.now(),
    }
  })
  .build()
