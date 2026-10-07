import prisma from '../config/db.js';

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const newMessage = await prisma.message.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        subject: subject || null,
        message,
      },
    });

    return res.status(201).json({
      message: 'Your message has been sent successfully! Thank you for reaching out.',
      data: newMessage,
    });
  } catch (error) {
    console.error('submitContact error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(messages);
  } catch (error) {
    console.error('getMessages error:', error);
    return res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

export const markMessageRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;

    const message = await prisma.message.update({
      where: { id },
      data: { isRead: isRead !== undefined ? Boolean(isRead) : true },
    });

    return res.json(message);
  } catch (error) {
    console.error('markMessageRead error:', error);
    return res.status(500).json({ error: 'Failed to update message' });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.message.delete({ where: { id } });
    return res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('deleteMessage error:', error);
    return res.status(500).json({ error: 'Failed to delete message' });
  }
};
