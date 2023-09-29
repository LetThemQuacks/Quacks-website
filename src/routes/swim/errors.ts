interface ErrorDict {
    [error_name: string]: string;
}

const errors: ErrorDict = {
    'NOT_FOUND': 'Oh no! Seems like you are trying to swim into an inexistent lake.',
}
const warnings: ErrorDict = {
    'UNEXPECTED': 'Unexpected Error Occured',
}
export const getError = (error: string) => {
    if (errors[error] !== undefined) return errors[error];
    return null;
}
export const getWarn = (warning: string) => {
    if (warnings[warning] !== undefined) return warnings[warning];
    return null;
}

