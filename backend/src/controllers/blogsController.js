import prisma from '../config/db.js';

export const getBlogs = async (req, res) => {
  try {
    const { published } = req.query;
    const where = {};
    if (published === 'true') {
      where.published = true;
    }

    const blogs = await prisma.blog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return res.json(blogs);
  } catch (error) {
    console.error('getBlogs error:', error);
    return res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    return res.json(blog);
  } catch (error) {
    console.error('getBlogBySlug error:', error);
    return res.status(500).json({ error: 'Failed to fetch blog' });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, slug, summary, content, coverImage, tags, published } = req.body;
    if (!title || !slug || !content) {
      return res.status(400).json({ error: 'Title, slug, and content are required' });
    }

    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const isPublished = Boolean(published);

    const blog = await prisma.blog.create({
      data: {
        title,
        slug: cleanSlug,
        summary: summary || '',
        content,
        coverImage: coverImage || null,
        tags: tags || '',
        published: isPublished,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    return res.status(201).json(blog);
  } catch (error) {
    console.error('createBlog error:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'A blog with this slug already exists' });
    }
    return res.status(500).json({ error: 'Failed to create blog' });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, summary, content, coverImage, tags, published } = req.body;

    const data = {};
    if (title !== undefined) data.title = title;
    if (slug !== undefined) data.slug = slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    if (summary !== undefined) data.summary = summary;
    if (content !== undefined) data.content = content;
    if (coverImage !== undefined) data.coverImage = coverImage;
    if (tags !== undefined) data.tags = tags;
    if (published !== undefined) {
      data.published = Boolean(published);
      if (data.published) {
        data.publishedAt = new Date();
      }
    }

    const blog = await prisma.blog.update({
      where: { id },
      data,
    });

    return res.json(blog);
  } catch (error) {
    console.error('updateBlog error:', error);
    return res.status(500).json({ error: 'Failed to update blog' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.blog.delete({ where: { id } });
    return res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('deleteBlog error:', error);
    return res.status(500).json({ error: 'Failed to delete blog' });
  }
};
