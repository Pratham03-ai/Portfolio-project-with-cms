import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';

async function seed() {
  console.log('🌱 Starting database seed...');

  // 1. Seed Admin User
  const existingAdmin = await prisma.user.findFirst();
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
      data: {
        email: 'admin@portfolio.local',
        passwordHash,
        name: 'Portfolio Admin',
        role: 'admin',
      },
    });
    console.log(`✅ Admin user created: ${admin.email} (Password: admin123)`);
  } else {
    console.log(`ℹ️ Admin user already exists: ${existingAdmin.email}`);
  }

  // 2. Seed About Profile
  const existingAbout = await prisma.about.findFirst();
  if (!existingAbout) {
    await prisma.about.create({
      data: {
        title: 'Senior Full Stack Engineer & UI Architect',
        subtitle: 'Crafting high-performance digital products, distributed systems, and delightful developer experiences.',
        bio: 'I am a passionate software engineer with over 6 years of experience building modern web architectures, cloud-native APIs, and pixel-perfect user interfaces.',
        secondaryBio: 'Specializing in React, Next.js, Node.js, and TypeScript. Committed to clean code, accessible design, and continuous learning.',
        location: 'San Francisco, CA / Remote Worldwide',
        email: 'alex.dev@portfolio.local',
        phone: '+1 (555) 019-2834',
        githubUrl: 'https://github.com',
        linkedinUrl: 'https://linkedin.com',
        twitterUrl: 'https://twitter.com',
      },
    });
    console.log('✅ About profile seeded');
  }

  // 3. Seed Skills
  const skillsCount = await prisma.skill.count();
  if (skillsCount === 0) {
    const defaultSkills = [
      { name: 'React.js', category: 'Frontend', level: 95, icon: 'code', order: 1 },
      { name: 'Next.js', category: 'Frontend', level: 92, icon: 'globe', order: 2 },
      { name: 'TypeScript', category: 'Frontend', level: 90, icon: 'file-code', order: 3 },
      { name: 'Tailwind CSS', category: 'Frontend', level: 95, icon: 'palette', order: 4 },
      { name: 'Node.js', category: 'Backend', level: 92, icon: 'server', order: 5 },
      { name: 'Express.js', category: 'Backend', level: 90, icon: 'cpu', order: 6 },
      { name: 'PostgreSQL / SQLite', category: 'Database', level: 85, icon: 'database', order: 7 },
      { name: 'Prisma ORM', category: 'Database', level: 88, icon: 'layers', order: 8 },
      { name: 'Docker', category: 'DevOps', level: 80, icon: 'box', order: 9 },
      { name: 'REST & GraphQL APIs', category: 'Backend', level: 94, icon: 'zap', order: 10 },
    ];

    for (const skill of defaultSkills) {
      await prisma.skill.create({ data: skill });
    }
    console.log(`✅ ${defaultSkills.length} Skills seeded`);
  }

  // 4. Seed Projects
  const projectsCount = await prisma.project.count();
  if (projectsCount === 0) {
    const defaultProjects = [
      {
        title: 'CloudFlow - Visual Workflow Orchestrator',
        slug: 'cloudflow-orchestrator',
        summary: 'A drag-and-drop cloud automation builder with real-time state visualization and microservices integration.',
        description: 'CloudFlow enables engineering teams to visually automate ETL pipelines, event triggers, and cloud workloads with zero boilerplate code. Features real-time WebSocket debugging and multi-tenant security.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        liveUrl: 'https://cloudflow.example.com',
        githubUrl: 'https://github.com/example/cloudflow',
        tags: 'React, TypeScript, Node.js, WebSockets, Tailwind',
        featured: true,
        order: 1,
      },
      {
        title: 'HyperMetrics - SaaS Analytics Dashboard',
        slug: 'hypermetrics-analytics',
        summary: 'High-frequency telemetry visualization platform handling over 5M events daily with sub-second latency.',
        description: 'An enterprise analytics engine built with Next.js and high-performance charting libraries. Includes role-based access control, automated report generation, and anomaly detection.',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        liveUrl: 'https://hypermetrics.example.com',
        githubUrl: 'https://github.com/example/hypermetrics',
        tags: 'Next.js, Tailwind CSS, Prisma, Chart.js',
        featured: true,
        order: 2,
      },
      {
        title: 'OmniAI - Multi-modal Assistant Interface',
        slug: 'omni-ai-assistant',
        summary: 'Next-generation generative UI assistant combining streaming LLM responses with custom visual components.',
        description: 'OmniAI parses streaming markdown responses and dynamically executes React components client-side. Integrated with vector databases for knowledge retrieval.',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        liveUrl: 'https://omniai.example.com',
        githubUrl: 'https://github.com/example/omni-ai',
        tags: 'React, Tailwind CSS, OpenAI API, Express',
        featured: true,
        order: 3,
      },
    ];

    for (const project of defaultProjects) {
      await prisma.project.create({ data: project });
    }
    console.log(`✅ ${defaultProjects.length} Projects seeded`);
  }

  // 5. Seed Blogs
  const blogsCount = await prisma.blog.count();
  if (blogsCount === 0) {
    const defaultBlogs = [
      {
        title: 'Designing Scalable Headless Architectures in 2026',
        slug: 'designing-scalable-headless-architectures',
        summary: 'A deep dive into decoupled content systems, edge caching, and building bespoke CMS backends.',
        content: `### Why Build a Custom Headless CMS?
Modern web development often defaults to bloated third-party platforms. While SaaS options provide speed, they often bring vendor lock-in, recurring pricing tiers, and unnecessary payload weight.

Building a custom CMS with **Node.js, Express, and Prisma** provides:
1. **Total Data Sovereignty:** You control the schema, file uploads, and databases.
2. **Speed & Efficiency:** Zero redundant fields or unnecessary third-party tracking.
3. **Tailored Workflow:** The admin UI mirrors your exact content needs.`,
        coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        tags: 'Architecture, Node.js, WebDev',
        published: true,
        publishedAt: new Date(),
      },
      {
        title: 'Mastering Full-Stack Reactivity with Express and Tailwind',
        slug: 'full-stack-reactivity-express-tailwind',
        summary: 'Practical patterns for unifying clean REST endpoints with reactive UI components.',
        content: `### Seamless Integration
Connecting a clean Express backend with reactive frontend interfaces allows developers to create snappy, responsive user experiences without heavy infrastructure overhead.`,
        coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        tags: 'React, Express, Performance',
        published: true,
        publishedAt: new Date(),
      },
    ];

    for (const blog of defaultBlogs) {
      await prisma.blog.create({ data: blog });
    }
    console.log(`✅ ${defaultBlogs.length} Blogs seeded`);
  }

  // 6. Seed Experience
  const expCount = await prisma.experience.count();
  if (expCount === 0) {
    const defaultExp = [
      {
        role: 'Lead Full Stack Engineer',
        company: 'Vanguard Systems',
        location: 'San Francisco, CA',
        startDate: '2023',
        endDate: null,
        isCurrent: true,
        description: 'Architecting high-throughput distributed microservices and modernizing client web dashboards across cloud infrastructure.',
        order: 1,
      },
      {
        role: 'Senior Frontend Developer',
        company: 'Nexus Creative Studio',
        location: 'New York, NY',
        startDate: '2021',
        endDate: '2023',
        isCurrent: false,
        description: 'Built interactive visual web apps, design systems, and headless CMS integrations for Fortune 500 clients.',
        order: 2,
      },
      {
        role: 'Software Engineer',
        company: 'Apex Digital Labs',
        location: 'Remote',
        startDate: '2019',
        endDate: '2021',
        isCurrent: false,
        description: 'Developed RESTful backend APIs in Node.js and delivered reactive SPAs using React and state management libraries.',
        order: 3,
      },
    ];

    for (const exp of defaultExp) {
      await prisma.experience.create({ data: exp });
    }
    console.log(`✅ ${defaultExp.length} Experience entries seeded`);
  }

  // 7. Seed Testimonials
  const testCount = await prisma.testimonial.count();
  if (testCount === 0) {
    const defaultTestimonials = [
      {
        name: 'Sarah Jenkins',
        role: 'VP of Product',
        company: 'Apex Media',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        content: 'Alex transformed our digital presence. The custom CMS gave our marketing team complete autonomy while maintaining blazing performance.',
        rating: 5,
        order: 1,
      },
      {
        name: 'Marcus Chen',
        role: 'Founder & CTO',
        company: 'Novatech Labs',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        content: 'Exceptional attention to detail, impeccable code architecture, and an eye for polished UI. Alex is one of the strongest engineers I have worked with.',
        rating: 5,
        order: 2,
      },
    ];

    for (const item of defaultTestimonials) {
      await prisma.testimonial.create({ data: item });
    }
    console.log(`✅ ${defaultTestimonials.length} Testimonials seeded`);
  }

  // 8. Seed Services
  const servCount = await prisma.service.count();
  if (servCount === 0) {
    const defaultServices = [
      {
        title: 'Full Stack Web Development',
        description: 'End-to-end bespoke web applications engineered with modern technologies like React, Next.js, Node.js, and Prisma.',
        icon: 'layout',
        order: 1,
      },
      {
        title: 'Custom CMS & API Design',
        description: 'Bespoke content management platforms, robust REST/GraphQL APIs, and database modeling tailored to business workflows.',
        icon: 'database',
        order: 2,
      },
      {
        title: 'Performance & SEO Optimization',
        description: 'Auditing and optimizing Core Web Vitals, page load speeds, search engine discoverability, and accessibility.',
        icon: 'zap',
        order: 3,
      },
    ];

    for (const s of defaultServices) {
      await prisma.service.create({ data: s });
    }
    console.log(`✅ ${defaultServices.length} Services seeded`);
  }

  console.log('🎉 Seeding completed successfully!');
}

seed()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
