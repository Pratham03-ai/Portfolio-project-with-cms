import prisma from '../config/db.js';

export const getProjects = async (req, res) => {
  try {
    const { featured } = req.query;
    const where = {};
    if (featured === 'true') {
      where.featured = true;
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { order: 'asc' },
    });
    return res.json(projects);
  } catch (error) {
    console.error('getProjects error:', error);
    return res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const project = await prisma.project.findUnique({
      where: { slug },
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.json(project);
  } catch (error) {
    console.error('getProjectBySlug error:', error);
    return res.status(500).json({ error: 'Failed to fetch project' });
  }
};

export const createProject = async (req, res) => {
  try {
    const { title, slug, summary, description, imageUrl, liveUrl, githubUrl, tags, featured, order } = req.body;
    if (!title || !slug || !summary) {
      return res.status(400).json({ error: 'Title, slug, and summary are required' });
    }

    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

    const project = await prisma.project.create({
      data: {
        title,
        slug: cleanSlug,
        summary,
        description: description || '',
        imageUrl: imageUrl || null,
        liveUrl: liveUrl || null,
        githubUrl: githubUrl || null,
        tags: tags || '',
        featured: Boolean(featured),
        order: order ? parseInt(order, 10) : 0,
      },
    });

    return res.status(201).json(project);
  } catch (error) {
    console.error('createProject error:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'A project with this slug already exists' });
    }
    return res.status(500).json({ error: 'Failed to create project' });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, summary, description, imageUrl, liveUrl, githubUrl, tags, featured, order } = req.body;

    const data = {};
    if (title !== undefined) data.title = title;
    if (slug !== undefined) data.slug = slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    if (summary !== undefined) data.summary = summary;
    if (description !== undefined) data.description = description;
    if (imageUrl !== undefined) data.imageUrl = imageUrl;
    if (liveUrl !== undefined) data.liveUrl = liveUrl;
    if (githubUrl !== undefined) data.githubUrl = githubUrl;
    if (tags !== undefined) data.tags = tags;
    if (featured !== undefined) data.featured = Boolean(featured);
    if (order !== undefined) data.order = parseInt(order, 10);

    const project = await prisma.project.update({
      where: { id },
      data,
    });

    return res.json(project);
  } catch (error) {
    console.error('updateProject error:', error);
    return res.status(500).json({ error: 'Failed to update project' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    return res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('deleteProject error:', error);
    return res.status(500).json({ error: 'Failed to delete project' });
  }
};
