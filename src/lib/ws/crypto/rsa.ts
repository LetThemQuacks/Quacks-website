import { arrayBufferToBase64, base64ToArrayBuffer } from "./arraybuffers";

class RSA_Cipher {
    private_key: CryptoKey | null = null;
    exported_public_key: string | null = null;

    async generateKeys(length: number) {
        const { privateKey, publicKey } = await crypto.subtle.generateKey(
            {
                name: 'RSA-OAEP',
                modulusLength: length,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: 'SHA-256',
            },
            true,
            ['encrypt', 'decrypt']
        )
    
        const public_key_spki = await crypto.subtle.exportKey('spki', publicKey);
        const public_key = this.spkiToPEM(public_key_spki)
        this.exported_public_key = public_key;

        const private_key = await crypto.subtle.exportKey('pkcs8', privateKey);
        await this.importKey(private_key)

        return { public_key }
    }
    
    private spkiToPEM(spki_key: ArrayBuffer) {
        const key_b64 = arrayBufferToBase64(spki_key);
        const key_pem = this.formatAsPem(key_b64);
        return btoa(key_pem);
    }
    
    private formatAsPem(key_b64: string) {
        let pem_key = '-----BEGIN PUBLIC KEY-----\n';
        let str = key_b64;
        while(str.length > 0) {
            pem_key += str.substring(0, 64) + '\n';
            str = str.substring(64);
        }
        pem_key = pem_key + "-----END PUBLIC KEY-----";
        return pem_key;
    }

    async importKey(exported_private_key: ArrayBuffer) {
        // https://stackoverflow.com/a/61147526
        this.private_key = await crypto.subtle.importKey(
                    'pkcs8',
                    exported_private_key,
                    {
                        name: "RSA-OAEP",
                        hash: "SHA-1",         // Replace SHA-256 with SHA-1
                    },
                    true,
                    ["decrypt"]
                )
    }
    
    async decrypt(cipher_text: string) {
        if (!this.private_key) throw Error('RSA key has not been imported correctly.')
        return await crypto.subtle.decrypt(
            { name: "RSA-OAEP" },
            this.private_key,
            base64ToArrayBuffer(cipher_text)
        );
    }
}

export default RSA_Cipher;

