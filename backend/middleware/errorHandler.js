const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${new Date().toISOString()}`);
    console.error(`[ERROR-ROUTE] ${req.method} ${req.url}`);
    
    // Detect custom manually-thrown errors containing status checks
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    if (statusCode === 500) {
        console.error(`[ERROR-TRACE]`, err.stack);
    }

    res.status(statusCode).json({
        success: false,
        message: statusCode === 500 && process.env.NODE_ENV === 'production' 
            ? "An unexpected error occurred in production. Please try again." 
            : message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
};

module.exports = errorHandler;
