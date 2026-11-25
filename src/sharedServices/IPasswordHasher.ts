import bcrypt from "bcrypt";

export type hashFunction = (password: string) => Promise<string>;
export type compareFunction = (inputPassword: string, userPassword: string) => Promise<boolean>;


export const IPasswordHasher: hashFunction = async (password) => {
    const passwordHash = await bcrypt.hash(password, 12);
    return passwordHash;
}

export const IPasswordComparer: compareFunction = async (inputPassword, userPassword) => {
    const valid = await bcrypt.compare(inputPassword, userPassword);
    return valid;
}



// export default IPasswordHasher;