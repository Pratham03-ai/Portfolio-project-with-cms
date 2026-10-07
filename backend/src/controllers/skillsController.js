import prisma from '../config/db.js';

export const getSkills = async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [
        { category: 'asc' },
        { order: 'asc' },
      ],
    });
    return res.json(skills);
  } catch (error) {
    console.error('getSkills error:', error);
    return res.status(500).json({ error: 'Failed to fetch skills' });
  }
};

export const createSkill = async (req, res) => {
  try {
    const { name, category, level, icon, order } = req.body;
    if (!name || !category) {
      return res.status(400).json({ error: 'Name and category are required' });
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        category,
        level: level ? parseInt(level, 10) : 80,
        icon: icon || null,
        order: order ? parseInt(order, 10) : 0,
      },
    });

    return res.status(201).json(skill);
  } catch (error) {
    console.error('createSkill error:', error);
    return res.status(500).json({ error: 'Failed to create skill' });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, level, icon, order } = req.body;

    const skill = await prisma.skill.update({
      where: { id },
      data: {
        name,
        category,
        level: level !== undefined ? parseInt(level, 10) : undefined,
        icon,
        order: order !== undefined ? parseInt(order, 10) : undefined,
      },
    });

    return res.json(skill);
  } catch (error) {
    console.error('updateSkill error:', error);
    return res.status(500).json({ error: 'Failed to update skill' });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.skill.delete({ where: { id } });
    return res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('deleteSkill error:', error);
    return res.status(500).json({ error: 'Failed to delete skill' });
  }
};
