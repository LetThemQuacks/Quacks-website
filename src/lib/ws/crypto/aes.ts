import { arrayBufferToBase64, base64ToArrayBuffer, arrayBufferToString, stringToArrayBuffer, concatArrayBuffers } from "./arraybuffers";

class AES_Cipher {
    key: CryptoKey | null = null;
    
    async importKey(key_bytes: ArrayBuffer) {
        this.key = await crypto.subtle.importKey(
                'raw',
                key_bytes,
                { name: "AES-CBC" },
                false,
                ["encrypt", "decrypt"],
            );
    }

    async encrypt(str: string) {
        if (!this.key) throw Error('AES key has not been imported correctly.');

        const iv = crypto.getRandomValues(new Uint8Array(16));
        const encrypted_buffer = await window.crypto.subtle.encrypt(
            {
                name: "AES-CBC",
                iv: iv,
            },
            this.key,
            stringToArrayBuffer(str),
        );
        return arrayBufferToBase64(concatArrayBuffers(iv, encrypted_buffer))
    }
    
    async decrypt(encrypted_b64_str: string) {
        if (!this.key) throw Error('AES key has not been imported correctly.');

        const encrypted_buffer = base64ToArrayBuffer(encrypted_b64_str);

        const iv = encrypted_buffer.slice(0, 16);
        const buffer_to_decrypt = encrypted_buffer.slice(16, encrypted_buffer.length);
        

        const decrypted_buffer = await window.crypto.subtle.decrypt(
            {
                name: "AES-CBC",
                iv: iv,
            },
            this.key,
            buffer_to_decrypt,
        );
        return arrayBufferToString(decrypted_buffer)
    }
}

export default AES_Cipher;

