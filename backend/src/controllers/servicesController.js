import prisma from '../config/db.js';

export const getServices = async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    });
    return res.json(services);
  } catch (error) {
    console.error('getServices error:', error);
    return res.status(500).json({ error: 'Failed to fetch services' });
  }
};

export const createService = async (req, res) => {
  try {
    const { title, description, icon, order } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const service = await prisma.service.create({
      data: {
        title,
        description,
        icon: icon || null,
        order: order ? parseInt(order, 10) : 0,
      },
    });

    return res.status(201).json(service);
  } catch (error) {
    console.error('createService error:', error);
    return res.status(500).json({ error: 'Failed to create service' });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon, order } = req.body;

    const data = {};
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (icon !== undefined) data.icon = icon;
    if (order !== undefined) data.order = parseInt(order, 10);

    const service = await prisma.service.update({
      where: { id },
      data,
    });

    return res.json(service);
  } catch (error) {
    console.error('updateService error:', error);
    return res.status(500).json({ error: 'Failed to update service' });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.service.delete({ where: { id } });
    return res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('deleteService error:', error);
    return res.status(500).json({ error: 'Failed to delete service' });
  }
};
