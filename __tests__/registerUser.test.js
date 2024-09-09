// const request = require('supertest');
// const app = require('../index'); // Index dosyanızın yolu

// describe('User Registration Tests', () => {
//   it('should register a user successfully', async () => {
//     const response = await request(app)
//       .post('/api/auth/register')
//       .send({
//         username: 'testuser',
//         email: 'testuser@example.com',
//         password: 'Test1234!',
//         role: 'user'
//       });
//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty('data');
//     expect(response.body.data).toHaveProperty('username', 'testuser');
//   });

//   it('should return 400 for invalid username', async () => {
//     const response = await request(app)
//       .post('/api/auth/register')
//       .send({
//         username: '',
//         email: 'testuser@example.com',
//         password: 'Test1234!',
//         role: 'user'
//       });
//     expect(response.status).toBe(400);
//     expect(response.body.errors).toBeDefined();
//     expect(response.body.errors[0].msg).toBe('Username is required.');
//   });

//   it('should return 400 for invalid email', async () => {
//     const response = await request(app)
//       .post('/api/auth/register')
//       .send({
//         username: 'testuser',
//         email: 'invalid-email',
//         password: 'Test1234!',
//         role: 'user'
//       });
//     expect(response.status).toBe(400);
//     expect(response.body.errors).toBeDefined();
//     expect(response.body.errors[0].msg).toBe('Please enter a valid email address.');
//   });

//   it('should return 400 for invalid password', async () => {
//     const response = await request(app)
//       .post('/api/auth/register')
//       .send({
//         username: 'testuser',
//         email: 'testuser@example.com',
//         password: 'short',
//         role: 'user'
//       });
//     expect(response.status).toBe(400);
//     expect(response.body.errors).toBeDefined();
//     expect(response.body.errors[0].msg).toBe('Password must be between 8 and 64 characters.');
//   });

//   it('should return 400 for invalid role', async () => {
//     const response = await request(app)
//       .post('/api/auth/register')
//       .send({
//         username: 'testuser',
//         email: 'testuser@example.com',
//         password: 'Test1234!',
//         role: 'invalidrole'
//       });
//     expect(response.status).toBe(400);
//     expect(response.body.errors).toBeDefined();
//     expect(response.body.errors[0].msg).toBe('Role must be either "user" or "admin".');
//   });
// });
