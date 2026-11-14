export default class ExpressError extends Error {
    constructor(public statusCode: number, public message: string) {
        super(message);
        this.name = 'ExpressError';
        // this.statusCode = statusCode;
        //Restore prototype chain
        Object.setPrototypeOf(this, ExpressError.prototype);
    }
}
