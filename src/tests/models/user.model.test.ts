// src/tests/models/user.model.test.ts

import User from '../../models/user.model';
import { hash } from 'bcrypt';

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
}));

describe('User model', () => {
    beforeEach(() => {
        (hash as jest.Mock).mockClear();
    });

    it('should create a user instance', () => {
        // --- Correção Aqui ---
        // Não usamos mais o construtor para definir valores
        const user = new User();
        user.username = 'testuser';
        user.password = 'password123';
        // --- Fim da Correção ---

        expect(user.username).toBe('testuser'); // Deve passar
        expect(user.password).toBe('password123');
        expect(user.id).toBeUndefined();
    });

    it('should hash the password on hashPassword call', async () => {
        const plainPassword = 'password123';
        const hashedPassword = 'hashedPassword';
        (hash as jest.Mock).mockResolvedValue(hashedPassword);

        // --- Correção Aqui ---
        const user = new User();
        user.username = 'testuser';
        user.password = plainPassword;
        // --- Fim da Correção ---
        
        await user.hashPassword(); // Agora deve encontrar a função

        expect(hash).toHaveBeenCalledWith(plainPassword, 10);
        expect(user.password).toBe(hashedPassword);
    });
});