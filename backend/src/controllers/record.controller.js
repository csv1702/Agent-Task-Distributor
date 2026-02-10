import Record from "../models/Record.js";

export const getRecordsByAgent = async (req, res, next) => {
  try {
    const { agentId } = req.params;

    const records = await Record.find({ agent: agentId });

    res.status(200).json({
      success: true,
      total: records.length,
      records,
    });
  } catch (error) {
    next(error);
  }
};
