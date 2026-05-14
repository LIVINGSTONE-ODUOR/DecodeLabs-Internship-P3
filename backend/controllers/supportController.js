import ApiResponse from '../utils/apiResponse.js';
import { insertOne, paginate } from '../services/database.js';

export const createSupportTicket = async (req, res, next) => {
  try {
    const { topic, priority, email, description } = req.body;
    const ticket = await insertOne(
      'support_tickets',
      {
        user_id: req.user?.id || null,
        topic,
        priority,
        email: email.toLowerCase(),
        description
      },
      'id, created_at, priority'
    );

    return ApiResponse.success(res, 'Support ticket created successfully', { ticketId: ticket.id, priority: ticket.priority }, 201);
  } catch (error) {
    return next(error);
  }
};

export const getSupportTickets = async (req, res, next) => {
  try {
    const { data, pagination } = await paginate({
      table: 'support_tickets',
      page: req.query.page,
      limit: req.query.limit,
      filters: { status: req.query.status, priority: req.query.priority },
      orderBy: 'created_at'
    });
    return ApiResponse.paginated(res, data, pagination, 'Support tickets retrieved successfully');
  } catch (error) {
    return next(error);
  }
};
