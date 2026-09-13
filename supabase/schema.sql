-- ── Categories ─────────────────────────────────────────────────────────────
create table categories (
  id          uuid primary key default gen_random_uuid(),
  key         text unique not null,
  label       text not null,
  color       text not null,
  description text default ''
);

-- ── Entries ─────────────────────────────────────────────────────────────────
create table entries (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,
  title      text not null,
  cat_id     uuid references categories(id),
  date       text not null,
  excerpt    text not null,
  read_time  int not null default 5,
  featured   boolean not null default false,
  published  boolean not null default true,
  created_at timestamptz default now()
);

-- ── Trajectory events ───────────────────────────────────────────────────────
create table trajectory_events (
  id         uuid primary key default gen_random_uuid(),
  event_key  text unique not null,
  date       text not null,
  end_date   text,
  year       float not null,
  level      float not null,
  cat_id     uuid references categories(id),
  title      text not null,
  org        text not null,
  detail     text not null,
  entry_id   uuid references entries(id)
);

-- ── Seed: categories ────────────────────────────────────────────────────────
insert into categories (key, label, color, description) values
  ('all',       'All Entries',      '#1B2640', ''),
  ('space',     'Space & Missions', '#C07B45', 'Analog missions, EVAs, flight ops'),
  ('research',  'Research',         '#4A7FA5', 'SLAM, navigation, sensor fusion'),
  ('hackathons','Hackathons',       '#9B7EC8', 'Competitions & sprints'),
  ('projects',  'Projects',         '#6BBFA3', 'Things I built'),
  ('general',   'Life',             '#9B8B7A', 'Everything else'),
  ('roles',     'Roles',            '#6BBFA3', 'Work & employment'),
  ('academic',  'Academic',         '#9B8B7A', 'Education & study'),
  ('hackathon', 'Hackathons',       '#9B7EC8', 'Competitions & sprints'),
  ('project',   'Projects',         '#C8A45E', 'Things I built');

-- ── Seed: entries ───────────────────────────────────────────────────────────
insert into entries (slug, title, cat_id, date, excerpt, read_time, featured, published)
values
  (
    'hyperloop',
    'HyperLoop: hyperspectral loop closure for planetary SLAM',
    (select id from categories where key = 'research'),
    'Oct 2026',
    'Building the first SLAM system that fuses hyperspectral and RGB-D sensing for loop closure on planetary terrain. The null result was the finding: Red-NIR can''t see what matters. SWIR is next.',
    12, true, true
  ),
  (
    'loop-closure',
    'What is a Loop Closure?',
    (select id from categories where key = 'research'),
    'Oct 2026',
    'A robot''s worst enemy is drift. Loop closure detection is how SLAM systems recognise a previously seen place and correct accumulated error — in this case, on a simulated planetary surface.',
    5, false, true
  ),
  (
    'hyperspectral-imaging',
    'Why Rocks Need More Than RGB: Hyperspectral Imaging',
    (select id from categories where key = 'research'),
    'Oct 2026',
    'Your phone camera sees 3 wavelengths. A hyperspectral camera sees hundreds. On planetary surfaces, that difference is what separates useless from indispensable.',
    6, false, true
  ),
  (
    'leap-of-faith',
    'Leap of Faith 💫',
    (select id from categories where key = 'general'),
    'Jun 2026',
    'Exactly three years ago, I packed my entire life into two suitcases and bought a one-way ticket. A quiet reflection on faith, drift, and the beauty of a horizon that keeps moving.',
    3, false, true
  );

-- ── Seed: trajectory events ─────────────────────────────────────────────────
insert into trajectory_events (event_key, date, end_date, year, level, cat_id, title, org, detail, entry_id)
values
  (
    'suraasa', '07/2022', '08/2023', 2022.5, 3.5,
    (select id from categories where key = 'roles'),
    'SDE Frontend → SDE2', 'Suraasa, India',
    'UI components for the Suraasa teacher training platform. Built a proctoring system using Web APIs for online assessments. Designed an event-driven calendar with react-fullcalendar.',
    null
  ),
  (
    'mercedes', '11/2023', '09/2024', 2023.83, 5,
    (select id from categories where key = 'roles'),
    'Full Stack Developer', 'Mercedes-Benz AG, Sindelfingen',
    'Working student at the Virtual Reality Center (CoC VR/AR/XR). Built a complex web app end-to-end: Django + PostgreSQL backend, React/TypeScript/Tailwind frontend, RESTful APIs, booking system with role-based access, and Linux server setup with Nginx and Gunicorn.',
    null
  ),
  (
    'msc-start', '04/2023', '12/2025', 2023.7, 3,
    (select id from categories where key = 'academic'),
    'MSc CS — Autonomous Systems', 'University of Stuttgart',
    'Started Masters programme. Focus on robotics, state estimation, and sensor fusion.',
    null
  ),
  (
    'sir-lab', '10/2024', '12/2024', 2024.75, 6,
    (select id from categories where key = 'research'),
    'Research Assistant — Semantic SLAM', 'SIR Lab, University of Stuttgart',
    'Set up and analysed Semantic SLAM pipelines — Kimera, Hydra, and Chronos — on EuRoC datasets and in-lab collected data on Linux with ROS at the Socially Intelligent Robotics Lab.',
    null
  ),
  (
    'dlr', '04/2025', '09/2025', 2025.25, 7.5,
    (select id from categories where key = 'research'),
    'Master Thesis — HyperLoop', 'DLR-RMC, Munich',
    'HyperLoop: developed a SLAM framework extending 3DGS SLAM (LoopSplat) with hyperspectral imaging to improve loop closure detection in planetary-like terrains. Evaluated on DLR Moon-Mars Outdoor Test Site datasets.',
    (select id from entries where slug = 'hyperloop')
  ),
  (
    'msc-grad', '09/2025', null, 2025.45, 5,
    (select id from categories where key = 'academic'),
    'MSc Graduated — Grade 1.8', 'University of Stuttgart',
    'Graduated with distinction. Thesis on visual planetary navigation accepted.',
    null
  ),
  (
    'wba', '10/2025', null, 2025.78, 7,
    (select id from categories where key = 'space'),
    'Mission Control Officer', 'World''s Biggest Analog (OeWF)',
    'Remote Science Support Task Manager for the world''s biggest analog space mission — 17 habitat sites running simultaneously across the globe. Managed the Daily Activity Matrix: live operational tracking across timezones, science teams, and mission timelines over eight days.',
    null
  ),
  (
    'sereact', '11/2025', 'Present', 2025.83, 6.5,
    (select id from categories where key = 'roles'),
    'Software Engineer', 'Sereact, Stuttgart',
    'Real-time monitoring, diagnostics, and analytics platform for robotic manipulation systems across sites in Europe and the US. Python FastAPI services on message queues, Next.js/TypeScript frontend, containerised on GCP Cloud Run and Vercel.',
    null
  ),
  (
    'aaka', '01/2026', '02/2026', 2026.05, 7.5,
    (select id from categories where key = 'space'),
    'Analog Astronaut — EVA Lead', 'Aaka Space Studio (India''s First Civilian Crew)',
    'Selected for India''s first civilian analog astronaut crew — a six-day simulated lunar surface mission in the extreme desert of Dholavira, Gujarat, one of Earth''s closest analogs to lunar conditions. Served as EVA Lead: planned, coordinated, and executed surface operations under resource-constrained, isolated habitat conditions.',
    null
  ),
  (
    'oewf', '08/2026', 'Present', 2026.58, 9.2,
    (select id from categories where key = 'space'),
    'Flight Control Team Member', 'Austrian Space Forum (OeWF)',
    'In-training volunteer for AMADEE-2027, a Martian analog mission. Authoring Data Management Workflow Definitions and Guidelines; formalising operational data and communication interfaces across Flight Crew, Ground Operations, and Mission Support Center following ICD conventions consistent with ECSS space engineering practice.',
    null
  ),
  (
    'iac', '10/2026', null, 2026.78, 8.5,
    (select id from categories where key = 'research'),
    'IAC 2026 — Paper Presentation', 'International Astronautical Congress',
    'Presenting visual navigation research for planetary surfaces using 3DGS SLAM and hyperspectral fusion.',
    (select id from entries where slug = 'hyperloop')
  );

-- ── Storage buckets ─────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public) values
  ('images', 'images', true),
  ('videos', 'videos', true)
on conflict (id) do nothing;

-- ── RLS: public read on all tables ──────────────────────────────────────────
alter table categories enable row level security;
alter table entries enable row level security;
alter table trajectory_events enable row level security;

create policy "public read categories"       on categories        for select using (true);
create policy "public read entries"          on entries           for select using (true);
create policy "public read trajectory"       on trajectory_events for select using (true);
