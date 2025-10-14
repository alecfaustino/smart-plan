# Learning Points Per Section

### Prisma DB

- New (to me) Library ORM for Node.js (Object Relational Mapper)
- Replaces raw SQL queries and pg pooling.
- schema.prisma defined the db model and relationships.
- Each time the schema.prisma is created, prisma migrate creates a new file in migrations/
- a seed file can be created to populate the db with initial data for development.

### NextAuth

#### Auth Logic

```javascript

async authorize(credentials) {
  // get the list of all users
  const users = getUsers();
  // find the appropriate user
  const user = users.find((u) => u.email === credentials?.email);

  if (user && credentials?.password) {
    // use bcrypt to compare hashed
    // logically, then, on registration, store the hashed password to the db
    const isValid = await compare(credentials.password, user.passwordHash);
    if (isValid) {
      // return the minimal information needed
      return {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  }
}
```

#### JWT & Session Callbacks

```javascript

async jwt({token, user}) {
  // sign the token.id with user.id
  if (user) token.id = user.id
  return token
}

async session({session, token}) {
  // sign the session.id with token.id
  // for client side use.
  if (token) session.id = token.id as string;
  return session;
}

// This requires a types/next-auth.d.ts file to extend the default types for userSession
```

#### Sign the token with NEXT_AUTH_SECRET

- use .env to create a secret key with openssl rand -base64 32
- the purpose is to ensure that JWT can only be created from this server.
- When the client sends a request with the JWT, it can check if there's been any tampering done with this token.
