import { arrayBufferToBase64, base64ToArrayBuffer } from "./convert";

const formatAsPem = (key_b64: string) => {
    let pem_key = '-----BEGIN PUBLIC KEY-----\n';
    let str = key_b64;
    while(str.length > 0) {
        pem_key += str.substring(0, 64) + '\n';
        str = str.substring(64);
    }
    pem_key = pem_key + "-----END PUBLIC KEY-----";
    return pem_key;
}

const spkiToBase64PEM = (spki_key: ArrayBuffer) => {
    const key_b64 = arrayBufferToBase64(spki_key);
    const key_pem = formatAsPem(key_b64);
    return btoa(key_pem);
}


export const generateRsaKeys = async (length: number) => {
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

    const exported_public_key = spkiToBase64PEM(public_key_spki)
    const exported_private_key = await crypto.subtle.exportKey('pkcs8', privateKey);

    return { exported_private_key, exported_public_key }
}

export const importPrivateKey = async (exported_private_key: ArrayBuffer) => {
    // https://stackoverflow.com/a/61147526
    return await crypto.subtle.importKey(
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

export const decryptRsaBase64 = async (rsa_b64: string, private_key: CryptoKey) => {
    return await crypto.subtle.decrypt({ name: "RSA-OAEP" }, private_key, base64ToArrayBuffer(rsa_b64));
}

