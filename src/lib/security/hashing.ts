import { createHash, randomBytes, timingSafeEqual } from 'crypto';
import { SAID_PEPPER_STR } from '$env/static/private';

interface hashedText {
    hash: string;
    salt: string;
}

export function hash(text: string): string {
    return createHash('sha512').update(text).digest('hex');
}

export function calculate_said(aes: string, rsa: string): string {
    return hash(aes + rsa + SAID_PEPPER_STR)
}

export function hash_password(text: string, default_salt: string | null = null): hashedText {
    const salt = !default_salt ? randomBytes(16).toString('hex') : default_salt;
    
    let result_hash = text;
    for (let i = 0; i < 3; i++) result_hash = hash(result_hash + salt);

    return {
        hash: result_hash,
        salt: salt
    };
}

export function compare(first: string, second: string) {
    const first_buffer = Buffer.from(first, 'hex');
    const second_buffer = Buffer.from(second, 'hex');
    return timingSafeEqual(first_buffer, second_buffer);
}

