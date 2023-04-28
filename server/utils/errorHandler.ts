// The ErrorHandler class is a custom error class that extends the Error class. constructor takes message and status code
class ErrorHandler extends Error{
    statuscode: number;
    constructor(message: string, statuscode: number){
        super(message);
        this.statuscode = statuscode;
        Error.captureStackTrace(this,this.constructor);
        }
}

module.exports = ErrorHandler;