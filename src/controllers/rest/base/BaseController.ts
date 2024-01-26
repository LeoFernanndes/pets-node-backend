import BaseRequest from "./BaseRequest";
import BaseResponse from "./BaseResponse";

export default class BaseController {
    request: BaseRequest;
    response: BaseResponse;

    constructor(request: BaseRequest){
        this.request = request
        this.response = new BaseResponse({}, {}, 500);
    }
}