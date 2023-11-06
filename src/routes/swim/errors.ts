interface ErrorDict {
    [error_name: string]: string;
}

const errors: ErrorDict = {
    'NOT_FOUND': 'Oh no! Seems like you are trying to swim into an inexistent lake.',
    'ROOM_CREATION_NOT_ALLOWED': 'The ducks\' guardian prevents you from creating new lakes.',
}
const warnings: ErrorDict = {
    'UNEXPECTED': 'Unexpected error occured',
    'PASSWORD_NEEDED': 'The path to the lake is blocked by a guardian! Insert the correct password to swim there.'
}
export const getError = (error: string) => {
    if (errors[error] !== undefined) return errors[error];
    return null;
}
export const getWarn = (warning: string) => {
    if (warnings[warning] !== undefined) return warnings[warning];
    return null;
}

