export class ValidatonErrorOnService extends Error {
    public validationErrors: [];
    constructor(validationErrors: any[]) {
        super('Validation error thrown on service level');
        this.validationErrors = validationErrors
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class NotFoundOnService extends Error {
    constructor(resourceName: string, id: string) {
        super(`${resourceName} ${id} not found.`);
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class UnauthorizedOnService extends Error {
    constructor() {
        super(`Incorrect user and/or password.`);
        Object.setPrototypeOf(this, new.target.prototype)
    }
}