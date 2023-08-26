// https://stackoverflow.com/a/11562550
export const arrayBufferToString = (array_buffer: ArrayBuffer) => String.fromCharCode(...new Uint8Array(array_buffer));
export const arrayBufferToBase64 = (array_buffer: ArrayBuffer) => btoa(arrayBufferToString(array_buffer));

// https://stackoverflow.com/a/41106346
export const stringToArrayBuffer = (str: string) => Uint8Array.from(str, c => c.charCodeAt(0));
export const base64ToArrayBuffer = (b64_str: string) => Uint8Array.from(atob(b64_str), c => c.charCodeAt(0));
