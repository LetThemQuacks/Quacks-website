interface ErrorDict {
    [error_name: string]: string;
}

const errList: ErrorDict = {
    'NOT_FOUND': 'Oh no! Seems like you are trying to swim into an inexistent lake.',
}
const warnList: ErrorDict = {
    'UNEXPECTED': 'Unexpected Error Occured',
}
export const getError = (error: string) => {
    if (errList[error] !== undefined) return errList[error];
    return null;
}
export const getWarn = (warn: string) => {
    if (warnList[warn] !== undefined) return warnList[warn];
    return null;
}

