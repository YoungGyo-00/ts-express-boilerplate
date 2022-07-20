import { BAD_REQUEST, FORBIDDEN, NOT_FOUND } from "http-status-codes";

abstract class RequestError extends Error {
    status!: number;

    constructor(message?: string) {
        super(message);
    }
}

class BadRequest extends RequestError {
    constructor(message = "유효하지 않은 요청입니다.") {
        super(message);
        this.status = BAD_REQUEST;
    }
}

class NOTFOUND extends RequestError {
    constructor(message = "리소스가 존재하지 않습니다.") {
        super(message);
        this.status = NOT_FOUND;
    }
}

class ISLOGGEDIN extends RequestError {
    constructor(message = "이미 로그인 상태입니다.") {
        super(message);
        this.status = FORBIDDEN;
    }
}

export { BadRequest, NOTFOUND, ISLOGGEDIN };
