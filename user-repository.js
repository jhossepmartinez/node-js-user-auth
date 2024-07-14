import DBLocal from 'db-local';
const { Schema } = new DBLocal({ path: './db' });
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './config.js';

const User = Schema('User', {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

export class UserRepository {
    static async create({ username, password }) {
        Validation.username(username);
        Validation.password(password);

        const user = User.findOne({ username });
        if (user) throw new Error('username already exists');

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);


        const id = crypto.randomUUID();

        User.create({
            _id: id,
            username,
            password: hashedPassword
        }).save();

        return id;
    }

    static async login({ username, password }) {
        Validation.username(username);
        Validation.password(password);

        const user = User.findOne({ username });

        if (!user) throw new Error('username does not exist');

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error('password is not valid');

        const { password: _, ...publicUser } = user;

        return publicUser;
    }
}

class Validation {
    static username(username) {
        if (typeof username !== 'string') throw new Error('username must be a string');
        if (username.length < 3) throw new Error('username must have at least 3 characters');
    }

    static password(password) {
        if (typeof password !== 'string') throw new Error('password must be a string');
        if (password.length < 6) throw new Error('password must have at least 6 characters');
    }
}
