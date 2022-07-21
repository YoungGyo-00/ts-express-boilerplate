import { BAD_REQUEST, CONFLICT, FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from "http-status-codes";

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

class NotFound extends RequestError {
    constructor(message = "리소스가 존재하지 않습니다.") {
        super(message);
        this.status = NOT_FOUND;
    }
}

class Forbidden extends RequestError {
    constructor(message = "컨텐츠에 접근할 권리가 없습니다.") {
        super(message);
        this.status = FORBIDDEN;
    }
}

class Conflict extends RequestError {
    constructor(message = "이미 사용 중인 데이터 입니다. (중복)") {
        super(message);
        this.status = CONFLICT;
    }
}

class Unauthorized extends RequestError {
    constructor(message = "인증이 필요합니다") {
        super(message);
        this.status = UNAUTHORIZED;
    }
}

export { BadRequest, NotFound, Forbidden, Conflict, Unauthorized };
