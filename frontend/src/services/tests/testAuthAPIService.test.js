import { authAPIService } from '../authAPIService.js';

describe('AuthAPIService', () => {
    let api;

    beforeEach(() => {
        api = authAPIService();
    });

    test('should register a user', async () => {
        const response = await api.register(
            'some@mail.com',
            'password123',
            'bobby123',
            {
                type: 'petseeker',
                user: {
                    name: 'Petseeker1',
                    bio: '',
                },
            }
        );

        console.log(response);

        expect(response.success).toBeTruthy();
        expect(response.data.username === 'bobby123').toBeTruthy();
    });

    test('should login a user', async () => {
        const response = await api.login('bobby123', 'password123');

        console.log(response);
        expect(response.success).toBeTruthy;
        expect(response.data.access).toBeDefined();
    });

    test('should logout a user', async () => {
        const response = await api.logout();
        expect(response).toBeDefined();
    });

});