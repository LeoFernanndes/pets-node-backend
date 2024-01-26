export default class BaseRequest {
    body: {};
    headers: {};
    params: {};
    query: {};

    constructor(body: {}, headers: {}, params: {}, query: {}){
        this.body = body;
        this.headers = headers;
        this.params = params;
        this.query = query;
    }
}