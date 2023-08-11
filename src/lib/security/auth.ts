import { hash, compare } from "./hashing";

interface PwdObj {
    hash: string;
    salt: string;
}

export const verifyPassword = (password: string, pwd_db: PwdObj) => { 
    const pwd_hash_db = pwd_db.hash;
    const salt = pwd_db.salt;
     
    const pwd_input = password.toString();
    const pwd_hash = hash(pwd_input, salt).hash;
     
    return compare(pwd_hash, pwd_hash_db);
}
