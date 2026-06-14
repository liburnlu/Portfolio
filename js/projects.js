/**
 * Featured project metadata.
 *
 * TO CUSTOMIZE — update these per project:
 *   - video.id  → YouTube video ID (or set video.src for local MP4 in assets/videos/)
 *   - overview, outcome, learnings → replace placeholder copy
 *   - screenshots → add images under assets/images/<slug>/
 */
window.FEATURED_PROJECTS = [
  {
    slug: 'iot-doorbell',
    repo: 'iot-doorbell',
    title: 'IoT Doorbell',
    summary: 'Smart doorbell using a Raspberry Pi 4B at the edge to detect visitors and a web dashboard to view captures remotely.',
    role: 'Solo project',
    tech: ['Raspberry Pi 4B', 'Python', 'FastAPI', 'Supabase'],
    github: 'https://github.com/liburnlu/iot-doorbell',
    demo: null,
    video: { type: 'youtube', id: 'k3rmM5gNI44' },
    highlights: [
      'Raspberry Pi 4B edge device reads the doorbell sensor and captures visitor events',
      'FastAPI backend with Supabase for authentication and image storage',
      'Web dashboard to browse event captures and view live stream',
    ],
    overview: [
      'The IoT Doorbell project uses a Raspberry Pi 4B as an edge computing device to monitor a doorbell sensor and capture visitor events locally. When someone rings the bell, the Pi handles sensing and image capture at the edge before sending data to the cloud for storage and remote access.',
      'On the software side, I built a FastAPI backend integrated with Supabase for user authentication and secure image storage, plus a web frontend for login, a dashboard of past captures, and live streaming. The project ties together hardware sensor wiring, edge processing on the Pi, and a full cloud-connected web stack.',
    ],
    outcome: 'A working smart doorbell prototype with edge sensing on Raspberry Pi 4B and remote monitoring through a secure web interface.',
    learnings: [
      'Edge computing on the Pi keeps sensor response local while offloading storage and access to the cloud.',
      'Separating edge capture from the FastAPI/Supabase backend makes the system easier to scale and maintain.',
    ],
  },
  {
    slug: 'inventory-management-api',
    repo: 'inventoryManagementAPI',
    title: 'Inventory Management API',
    summary: 'Generic inventory system built with ASP.NET Core Web API.',
    role: 'Solo project',
    tech: ['C#', 'ASP.NET Core', 'Entity Framework', 'SQL Server'],
    github: 'https://github.com/liburnlu/inventoryManagementAPI',
    demo: null,
    highlights: [
      'Full CRUD operations for products, categories, and stock levels',
      'Clean layered architecture separating concerns',
      'Reusable domain model applicable to different inventory scenarios',
    ],
    overview: [
      'This project is a generic inventory management API built with ASP.NET Core. It provides endpoints to manage products, track stock levels, and organize items into categories — a foundation that can be adapted for warehouses, retail, or any system that needs stock tracking.',
      'I focused on clean structure: a service layer for business logic, repositories for data access, and well-defined models. The design prioritizes readability and extensibility so new features (orders, suppliers, reporting) can be added without rewriting core logic.',
    ],
    outcome: 'A well-structured REST API demonstrating solid backend fundamentals and domain modeling.',
    learnings: [
      'Designing a generic model upfront saves refactoring when requirements expand.',
      'Entity Framework migrations keep schema changes traceable and reversible.',
    ],
  },
  {
    slug: 'student-forum',
    repo: 'studentForum',
    title: 'Student Forum',
    summary: 'A Laravel-based student forum for course discussions and collaboration.',
    role: 'Solo project',
    tech: ['PHP', 'Laravel', 'Blade', 'MySQL'],
    github: 'https://github.com/liburnlu/studentForum',
    demo: null,
    highlights: [
      'Course-based discussion threads and topic organization',
      'User authentication and role-based access',
      'Full-stack Laravel MVC with Blade templates',
    ],
    overview: [
      'Student Forum is a web application built with Laravel that gives students a dedicated space for course discussions and collaboration. Instead of scattered group chats, it organizes conversations by course and topic so classmates can find answers, share resources, and stay engaged with their studies.',
      'I built the full application using Laravel\'s MVC architecture — Eloquent models for data, controllers for business logic, and Blade views for the UI. Features include user registration, threaded discussions, and a clean interface tailored for academic use.',
    ],
    outcome: 'A functional forum application demonstrating full-stack PHP development with Laravel and relational database design.',
    learnings: [
      'Laravel\'s conventions accelerate development once you understand the request lifecycle.',
      'Designing forum data models (users, courses, threads, replies) early prevents messy migrations later.',
    ],
  },
  {
    slug: 'tankr-backend',
    repo: 'tankr-backend',
    title: 'Tankr Backend',
    summary: 'ASP.NET Core Web API for the Tankr fuel-management platform.',
    role: 'With a colleague',
    tech: ['C#', 'ASP.NET Core', 'Azure Container Apps', 'REST'],
    github: 'https://github.com/liburnlu/tankr-backend',
    demo: null,
    highlights: [
      'REST API design for a fuel-management domain',
      'Team development workflow with Git branching and code review',
      'Built for deployment on Azure Container Apps',
    ],
    overview: [
      'Tankr is a fuel-management platform, and this backend provides the Web API that powers the application. I contributed as part of a two-person team, working with a colleague to design endpoints, implement business logic, and prepare the service for cloud deployment.',
      'The API follows standard ASP.NET Core patterns — controllers, dependency injection, and structured DTOs — making it straightforward to extend as the product grows.',
    ],
    outcome: 'A production-ready API built with ASP.NET Core and prepared for cloud deployment on Azure.',
    learnings: [
      'Clear API contracts early in a team project prevent integration friction later.',
      'Containerizing early simplifies deployment to Azure and keeps environments consistent.',
    ],
  },
];

window.getFeaturedBySlug = function (slug) {
  return window.FEATURED_PROJECTS.find(p => p.slug === slug);
};

window.getFeaturedByRepo = function (repo) {
  return window.FEATURED_PROJECTS.find(p => p.repo === repo);
};

window.getFeaturedSlugs = function () {
  return window.FEATURED_PROJECTS.map(p => p.slug);
};
