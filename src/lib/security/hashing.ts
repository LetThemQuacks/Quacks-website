import { createHash, randomBytes, timingSafeEqual } from 'crypto';

interface hashedText {
    hash: string;
    salt: string;
}

export function hash(text: string, default_salt: string | null = null): hashedText {
    const salt = !default_salt ? randomBytes(16).toString('hex') : default_salt;
    
    let result_hash = text;
    for (let i = 0; i < 3; i++) result_hash = createHash('sha512').update(result_hash + salt).digest('hex');

    return {
        hash: result_hash,
        salt: salt
    };
}

export function compare(pwd_input: string, pwd_db: string) {
    const pwd_input_buffer = Buffer.from(pwd_input, 'hex');
    const pwd_db_buffer = Buffer.from(pwd_db, 'hex');
    return timingSafeEqual(pwd_input_buffer, pwd_db_buffer);
}

