export default class BaseResponse {
    body: {};
    headers: {};
    status: number;

    constructor(body: {}, headers: {}, status: number){
        this.body = body;
        this.headers = headers;
        this.status = status;
    }
}