import prisma from '../config/db.js';

export const getExperiences = async (req, res) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: 'asc' },
    });
    return res.json(experiences);
  } catch (error) {
    console.error('getExperiences error:', error);
    return res.status(500).json({ error: 'Failed to fetch experience' });
  }
};

export const createExperience = async (req, res) => {
  try {
    const { role, company, location, startDate, endDate, isCurrent, description, order } = req.body;
    if (!role || !company || !startDate) {
      return res.status(400).json({ error: 'Role, company, and startDate are required' });
    }

    const experience = await prisma.experience.create({
      data: {
        role,
        company,
        location: location || null,
        startDate,
        endDate: isCurrent ? null : endDate,
        isCurrent: Boolean(isCurrent),
        description: description || '',
        order: order ? parseInt(order, 10) : 0,
      },
    });

    return res.status(201).json(experience);
  } catch (error) {
    console.error('createExperience error:', error);
    return res.status(500).json({ error: 'Failed to create experience' });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, company, location, startDate, endDate, isCurrent, description, order } = req.body;

    const data = {};
    if (role !== undefined) data.role = role;
    if (company !== undefined) data.company = company;
    if (location !== undefined) data.location = location;
    if (startDate !== undefined) data.startDate = startDate;
    if (isCurrent !== undefined) {
      data.isCurrent = Boolean(isCurrent);
      data.endDate = data.isCurrent ? null : endDate;
    } else if (endDate !== undefined) {
      data.endDate = endDate;
    }
    if (description !== undefined) data.description = description;
    if (order !== undefined) data.order = parseInt(order, 10);

    const experience = await prisma.experience.update({
      where: { id },
      data,
    });

    return res.json(experience);
  } catch (error) {
    console.error('updateExperience error:', error);
    return res.status(500).json({ error: 'Failed to update experience' });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.experience.delete({ where: { id } });
    return res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('deleteExperience error:', error);
    return res.status(500).json({ error: 'Failed to delete experience' });
  }
};
