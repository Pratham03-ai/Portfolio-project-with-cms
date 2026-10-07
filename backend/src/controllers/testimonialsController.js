import prisma from '../config/db.js';

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { order: 'asc' },
    });
    return res.json(testimonials);
  } catch (error) {
    console.error('getTestimonials error:', error);
    return res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { name, role, company, avatarUrl, content, rating, order } = req.body;
    if (!name || !role || !content) {
      return res.status(400).json({ error: 'Name, role, and content are required' });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        company: company || null,
        avatarUrl: avatarUrl || null,
        content,
        rating: rating !== undefined ? parseInt(rating, 10) : 5,
        order: order ? parseInt(order, 10) : 0,
      },
    });

    return res.status(201).json(testimonial);
  } catch (error) {
    console.error('createTestimonial error:', error);
    return res.status(500).json({ error: 'Failed to create testimonial' });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, company, avatarUrl, content, rating, order } = req.body;

    const data = {};
    if (name !== undefined) data.name = name;
    if (role !== undefined) data.role = role;
    if (company !== undefined) data.company = company;
    if (avatarUrl !== undefined) data.avatarUrl = avatarUrl;
    if (content !== undefined) data.content = content;
    if (rating !== undefined) data.rating = parseInt(rating, 10);
    if (order !== undefined) data.order = parseInt(order, 10);

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data,
    });

    return res.json(testimonial);
  } catch (error) {
    console.error('updateTestimonial error:', error);
    return res.status(500).json({ error: 'Failed to update testimonial' });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.testimonial.delete({ where: { id } });
    return res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('deleteTestimonial error:', error);
    return res.status(500).json({ error: 'Failed to delete testimonial' });
  }
};
