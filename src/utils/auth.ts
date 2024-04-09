const bcrypt = require('bcrypt');

export async function hashPassword(password : string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export async function compareHashes(password : string, hash : string) {
    return await bcrypt.compare(password, hash);
}