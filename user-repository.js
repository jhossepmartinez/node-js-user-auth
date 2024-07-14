import DBLocal from 'db-local';
const { Schema } = new DBLocal({ path: './db' });
import crypto from 'crypto';

const User = Schema('User', {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

export class UserRepository {
    static create ({ username, password }) {
        // Validate username and password
        if (typeof username !== 'string') throw new Error('username must be a string');
        if (username.length < 3) throw new Error('username must have at least 3 characters');

        if (typeof password !== 'string') throw new Error('password must be a string');
        if (password.length < 6) throw new Error('password must have at least 6 characters');

        const user = User.findOne({ username });
        if (user) throw new Error('username already exists');
        
        const id = crypto.randomUUID();

        User.create({
            _id: id,
            username,
            password
        }).save();

        return id;
    }

    static login ({ username, password }) {}
}
