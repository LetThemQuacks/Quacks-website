// https://stackoverflow.com/a/11562550
export const arrayBufferToString = (array_buffer: ArrayBuffer) => String.fromCharCode(...new Uint8Array(array_buffer)) as string;
export const arrayBufferToBase64 = (array_buffer: ArrayBuffer) => btoa(arrayBufferToString(array_buffer)) as string;

// https://stackoverflow.com/a/41106346
export const stringToArrayBuffer = (str: string) => Uint8Array.from(str, c => c.charCodeAt(0));
export const base64ToArrayBuffer = (b64_str: string) => Uint8Array.from(atob(b64_str), c => c.charCodeAt(0));

// https://gist.github.com/72lions/4528834?permalink_comment_id=2395442#gistcomment-2395442
export const concatArrayBuffers = (first: ArrayBuffer, second: ArrayBuffer) => new Uint8Array([...new Uint8Array(first), ...new Uint8Array(second)]).buffer;

export const stringToBase64 = (str: string) => btoa(String.fromCharCode(...new TextEncoder().encode(str)));

