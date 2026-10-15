/**
 * ─────────────────────────────────────────────────────────────
 *  ALL PORTFOLIO CONTENT LIVES HERE.
 *  Edit this file to update the site — no component changes needed.
 *  Rule of thumb: leave a field as `null` until you have the real value.
 *  Buttons/links for null fields are hidden automatically.
 * ─────────────────────────────────────────────────────────────
 */
import {
  Code2,
  LayoutTemplate,
  Smartphone,
  Server,
  Database,
  Cloud,
  Wrench,
  ClipboardList,
  Sprout,
  Warehouse,
} from 'lucide-react';

export const profile = {
  name: 'Narmitha V',
  initials: 'NV',
  role: 'Associate Software Developer',
  company: 'Nexzware Technologies',
  since: 'August 2026',
  location: 'Dharmapuri, Tamil Nadu, India',
  email: 'narmitha2004@gmail.com',
  phone: '+91 6374076373',
  phoneHref: 'tel:+916374076373',
  showPhone: false, // set to true to show the phone number in the Contact section
  linkedin: 'https://www.linkedin.com/in/narmitha-v-8380b5262',
  github: 'https://github.com/Narmitha2004',
  tagline: 'Building Modern Mobile Apps, Scalable Web Applications & Digital Experiences.',
  // Put your photo at public/profile.jpg (portrait, ~900×1100 works best)
  photo: '/profile.jpg',
  // Put your resume at public/Narmitha_V_Resume.pdf
  resume: '/Narmitha_V_Resume.pdf',
};

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'publication', label: 'Research' },
  { id: 'contact', label: 'Contact' },
];

export const about =
  "I'm Narmitha V, an Associate Software Developer at Nexzware Technologies since August 2026. I work on developing mobile applications and websites, combining frontend development, backend integration, and practical problem-solving to create user-friendly digital solutions.";

export const focusAreas = [
  { icon: Smartphone, title: 'Mobile Apps', stack: 'Flutter · Dart' },
  { icon: LayoutTemplate, title: 'Web Apps', stack: 'React JS · Spring Boot' },
  { icon: Cloud, title: 'Cloud', stack: 'AWS · Docker' },
];

export const experience = [
  {
    role: 'Associate Software Developer',
    company: 'Nexzware Technologies',
    period: 'August 2026 – Present',
    current: true,
    responsibilities: [
      'Developing mobile applications and websites.',
      'Building responsive and user-friendly interfaces.',
      'Working with frontend and backend technologies.',
      'Integrating APIs and connecting application components.',
      'Collaborating on application development and improvements.',
      'Working with modern software development tools.',
    ],
  },
];

/** Technologies shown with extra prominence at the top of the Skills section */
export const featuredSkills = ['Flutter', 'Dart', 'Java', 'Spring Boot', 'React JS', 'Docker', 'AWS'];

export const skillCategories = [
  { id: 'languages', title: 'Programming Languages', icon: Code2, items: ['Java', 'Python', 'JavaScript', 'Dart'] },
  { id: 'frontend', title: 'Frontend Development', icon: LayoutTemplate, items: ['HTML5', 'CSS3', 'JavaScript', 'React JS'] },
  { id: 'mobile', title: 'Mobile App Development', icon: Smartphone, items: ['Flutter', 'Dart'] },
  { id: 'backend', title: 'Backend Development', icon: Server, items: ['Java', 'Spring Boot', 'JSP', 'Servlet', 'REST APIs'] },
  { id: 'databases', title: 'Databases', icon: Database, items: ['MySQL'] },
  {
    id: 'cloud',
    title: 'Cloud Technologies',
    icon: Cloud,
    wide: true,
    items: ['AWS EC2', 'AWS S3', 'AWS IAM', 'AWS VPC', 'AWS ELB', 'AWS EFS', 'AWS ASG', 'Amazon Athena'],
  },
  { id: 'tools', title: 'Development Tools', icon: Wrench, items: ['Git', 'GitHub', 'Docker', 'VS Code', 'Eclipse', 'Figma'] },
];

/**
 * PROJECTS
 * To add a new project (e.g. a Flutter app or a company project), copy an
 * object below. `category` creates a filter tab automatically (e.g. 'Mobile').
 * image:  path in /public (e.g. '/projects/app.png') — a real screenshot only.
 * github / demo: real URLs only — buttons are hidden while null.
 */
export const projects = [
  {
    id: 'complaint-register',
    number: '01',
    title: 'Digital Complaint Register Web Application',
    category: 'Web',
    icon: ClipboardList,
    gradient: 'from-[#7c5cff] via-[#6a6bff] to-[#4f7cff]',
    tech: ['HTML', 'CSS', 'JavaScript', 'Java Servlet', 'JSP', 'MySQL'],
    description:
      'Developed a web-based complaint management application allowing users to submit and track complaints online.',
    features: ['User authentication', 'Online complaint submission', 'Complaint tracking', 'Admin management', 'Complaint status updates'],
    image: null,
    github: null,
    demo: null,
  },
  {
    id: 'farmer-info',
    number: '02',
    title: 'Farmer Information Management System',
    category: 'Web',
    icon: Sprout,
    gradient: 'from-[#8b5cf6] via-[#7c6cff] to-[#38bdf8]',
    tech: ['React JS', 'HTML', 'CSS', 'JavaScript', 'Spring Boot', 'MySQL', 'REST APIs'],
    description:
      'Developed a full-stack web application to manage farmer information using CRUD functionality and backend REST APIs.',
    features: ['Farmer registration', 'Record management', 'CRUD operations', 'REST API integration', 'Persistent database storage'],
    image: null,
    github: null,
    demo: null,
  },
  {
    id: 'data-lakehouse',
    number: '03',
    title: 'Data Lake House Project',
    category: 'Cloud',
    icon: Warehouse,
    gradient: 'from-[#5b5bff] via-[#7c5cff] to-[#c084fc]',
    tech: ['AWS S3', 'Amazon Athena'],
    description:
      'Designed and implemented a cloud-based data lakehouse architecture using Amazon S3 for dataset storage and Amazon Athena for serverless SQL querying and analysis.',
    features: ['Cloud data storage', 'Dataset organization', 'Serverless SQL queries', 'Data analysis'],
    image: null,
    github: null,
    demo: null,
  },
];

/**
 * CERTIFICATIONS
 * image:     a real certificate image/PDF in /public → enables the preview modal
 * verifyUrl: a real verification link → shows the "Verify Credential" button
 */
export const certifications = [
  // TODO: replace the title with the exact Oracle credential name.
  { title: 'Oracle Certification', issuer: 'Oracle', mark: 'O', hue: 'from-[#f97066] to-[#c2410c]', detail: null, image: null, verifyUrl: null },
  { title: 'Programming in C', issuer: 'NPTEL', mark: 'N', hue: 'from-[#7c5cff] to-[#4f7cff]', detail: null, image: null, verifyUrl: null },
  { title: 'Leadership and Team Effectiveness', issuer: 'NPTEL', mark: 'N', hue: 'from-[#7c5cff] to-[#4f7cff]', detail: 'Score: 64%', image: null, verifyUrl: null },
  { title: 'Agent Blazer Champion', issuer: 'Salesforce', mark: 'SF', hue: 'from-[#38bdf8] to-[#0ea5e9]', detail: null, image: null, verifyUrl: null },
  { title: 'SQL Basics', issuer: 'SkillRack', mark: 'SR', hue: 'from-[#a78bfa] to-[#7c3aed]', detail: null, image: null, verifyUrl: null },
  { title: 'Java', issuer: 'IIT Bombay Spoken Tutorial', mark: 'IIT', hue: 'from-[#818cf8] to-[#4338ca]', detail: null, image: null, verifyUrl: null },
];

export const education = {
  degree: 'Bachelor of Technology — Information Technology',
  institution: 'Karpagam College of Engineering, Coimbatore',
  period: 'November 2022 – April 2026',
  cgpa: '7.97',
};

export const publication = {
  title: 'Deep Learning Based Image Analysis for Smart Pavement System Using Pothole Localization',
  venue: '7th International Conference (ICIRCA)',
  host: 'RVS College of Engineering',
  url: null, // add the real publication URL to show a "Read Publication" button
};
