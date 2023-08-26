import { arrayBufferToBase64, stringToArrayBuffer } from "./convert";

export const importAesKey = async (aes_key_bytes: ArrayBuffer) => {
    return await crypto.subtle.importKey(
                'raw',
                aes_key_bytes,
                { name: "AES-CBC" },
                false,
                ["encrypt", "decrypt"],
            );
}

export const encryptAes = async (str: string, key: CryptoKey) => {
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encrypted_buffer = await window.crypto.subtle.encrypt(
        {
            name: "AES-CBC",
            iv: iv,
        },
        key,
        stringToArrayBuffer(str),
    );
    return arrayBufferToBase64(encrypted_buffer)
}

