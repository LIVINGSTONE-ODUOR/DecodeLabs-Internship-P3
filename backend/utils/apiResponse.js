export default class ApiResponse {
  static success(res, message, data = {}, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  static error(res, message, statusCode = 500, errorDetails = undefined) {
    const response = {
      success: false,
      message,
      timestamp: new Date().toISOString()
    };

    if (errorDetails) {
      response.error = errorDetails;
    }

    return res.status(statusCode).json(response);
  }

  static paginated(res, data, pagination, message = 'Data retrieved successfully', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      pagination,
      timestamp: new Date().toISOString()
    });
  }
}
