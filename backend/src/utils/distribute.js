export const distributeRecords = (records, agents) => {
  const distributed = [];

  records.forEach((record, index) => {
    const agentIndex = index % agents.length;

    distributed.push({
      agent: agents[agentIndex]._id,
      firstName: record.FirstName,
      phone: record.Phone,
      notes: record.Notes,
    });
  });

  return distributed;
};
