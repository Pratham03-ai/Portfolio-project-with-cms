import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';
import { generateToken } from '../utils/token.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMe = async (req, res) => {
  return res.json({ user: req.user });
};

export const refreshToken = async (req, res) => {
  try {
    const token = generateToken({ id: req.user.id, email: req.user.email, role: req.user.role });
    return res.json({ token, user: req.user });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to refresh token' });
  }
};

export const setupAdmin = async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    if (userCount > 0) {
      return res.status(400).json({ error: 'Admin already initialized' });
    }

    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        passwordHash,
        name,
        role: 'admin',
      },
      select: { id: true, email: true, name: true, role: true },
    });

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    return res.status(201).json({ message: 'Admin created successfully', user, token });
  } catch (error) {
    console.error('Setup admin error:', error);
    return res.status(500).json({ error: 'Failed to setup admin' });
  }
};
