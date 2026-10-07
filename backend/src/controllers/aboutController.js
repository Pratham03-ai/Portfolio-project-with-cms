import prisma from '../config/db.js';

export const getAbout = async (req, res) => {
  try {
    let about = await prisma.about.findFirst();
    if (!about) {
      about = await prisma.about.create({
        data: {
          title: 'Full Stack Engineer & Creative Developer',
          subtitle: 'Building modern, performant web applications with elegant architectures.',
          bio: 'I am a passionate software developer specializing in scalable web systems, intuitive user interfaces, and robust backend services.',
          secondaryBio: 'With expertise spanning across modern JavaScript frameworks, relational databases, and cloud platforms, I create seamless digital experiences.',
          location: 'San Francisco, CA / Remote',
          email: 'contact@example.com',
          githubUrl: 'https://github.com',
          linkedinUrl: 'https://linkedin.com',
          twitterUrl: 'https://twitter.com',
        },
      });
    }
    return res.json(about);
  } catch (error) {
    console.error('getAbout error:', error);
    return res.status(500).json({ error: 'Failed to fetch about information' });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const existing = await prisma.about.findFirst();
    const data = req.body;

    let updated;
    if (existing) {
      updated = await prisma.about.update({
        where: { id: existing.id },
        data,
      });
    } else {
      updated = await prisma.about.create({
        data,
      });
    }

    return res.json({ message: 'About profile updated successfully', data: updated });
  } catch (error) {
    console.error('updateAbout error:', error);
    return res.status(500).json({ error: 'Failed to update about information' });
  }
};
