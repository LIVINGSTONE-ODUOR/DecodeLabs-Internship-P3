import ApiResponse from '../utils/apiResponse.js';
import { insertOne, paginate } from '../services/database.js';

export const createQuoteRequest = async (req, res, next) => {
  try {
    const { projectType, complexity, timeline, features, estimate, email, fullName, companyName, notes } = req.body;
    const request = await insertOne(
      'quote_requests',
      {
        user_id: req.user?.id || null,
        full_name: fullName || req.user?.fullName || null,
        email: (email || req.user?.email || '').toLowerCase() || null,
        company_name: companyName || null,
        project_type: projectType,
        complexity,
        timeline,
        features,
        estimated_budget: estimate,
        notes: notes || null
      },
      'id, created_at, estimated_budget'
    );

    return ApiResponse.success(res, 'Quote request saved successfully', { quoteId: request.id, estimate: request.estimated_budget }, 201);
  } catch (error) {
    return next(error);
  }
};

export const getQuoteRequests = async (req, res, next) => {
  try {
    const { data, pagination } = await paginate({
      table: 'quote_requests',
      page: req.query.page,
      limit: req.query.limit,
      filters: { status: req.query.status },
      orderBy: 'created_at'
    });
    return ApiResponse.paginated(res, data, pagination, 'Quote requests retrieved successfully');
  } catch (error) {
    return next(error);
  }
};
