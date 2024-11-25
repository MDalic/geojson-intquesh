class CustomError extends Error{
    constructor(msg,status,err){
        super(msg)
        this.msg = msg
        this.status = status
        this.err = err
        Error.captureStackTrace(this,CustomError)
    }
}
module.exports = CustomError