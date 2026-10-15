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
  role: 'Software Developer',
  company: 'Nexzware Technologies',
  since: 'August 2026',
  location: 'Dharmapuri, Tamil Nadu, India',
  email: 'narmitha2004@gmail.com',
  phone: '+91 6374076373',
  phoneHref: 'tel:+916374076373',
  showPhone: false, // set to true to show the phone number in the Contact section
  linkedin: 'https://www.linkedin.com/in/narmitha-v-8380b5262',
  github: 'https://github.com/Narmitha2004',
  tagline: 'Building Modern Mobile Applications, Scalable Websites & Seamless Digital Experiences.',
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
  { id: 'contact', label: 'Contact' },
];

export const about =
  "I'm Narmitha V, a Software Developer at Nexzware Technologies since August 2026. I develop mobile applications and websites, working with modern technologies to build responsive interfaces, integrate backend services, and deliver practical software solutions.";

/** Rotating highlight words in the hero */
export const highlights = ['Mobile App Development', 'Full Stack Development', 'Cloud Technologies', 'Software Engineering'];

export const focusAreas = [
  { icon: Smartphone, title: 'Mobile App Development', stack: 'Flutter · Dart' },
  { icon: LayoutTemplate, title: 'Full Stack Development', stack: 'React JS · Spring Boot' },
  { icon: Cloud, title: 'Cloud Technologies', stack: 'AWS · Docker' },
  { icon: Code2, title: 'Software Engineering', stack: 'Java · Git · REST APIs' },
];

export const experience = [
  {
    role: 'Software Developer',
    company: 'Nexzware Technologies',
    period: 'August 2026 – Present',
    current: true,
    responsibilities: [
      'Developing mobile applications and websites.',
      'Creating responsive frontend interfaces.',
      'Integrating frontend and backend services.',
      'Working with REST APIs.',
      'Implementing functional application features.',
      'Collaborating on development and improvements.',
      'Working with modern software development tools.',
    ],
  },
];

/** Technologies shown with extra prominence at the top of the Skills section */
export const featuredSkills = ['Flutter', 'Dart', 'Java', 'Spring Boot', 'React JS', 'Docker', 'AWS'];

export const skillCategories = [
  { id: 'languages', title: 'Programming Languages', icon: Code2, items: ['Java', 'Python', 'JavaScript', 'Dart'] },
  { id: 'frontend', title: 'Frontend Technologies', icon: LayoutTemplate, items: ['HTML5', 'CSS3', 'JavaScript', 'React JS'] },
  { id: 'mobile', title: 'Mobile App Development', icon: Smartphone, items: ['Flutter', 'Dart'] },
  { id: 'backend', title: 'Backend Technologies', icon: Server, items: ['Java', 'Spring Boot', 'JSP', 'Servlet', 'REST APIs'] },
  { id: 'databases', title: 'Database', icon: Database, items: ['MySQL'] },
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
    label: 'Web Application',
    icon: ClipboardList,
    gradient: 'from-[#8c7bff] via-[#7666f5] to-[#7ab8ff]',
    tech: ['HTML', 'CSS', 'JavaScript', 'Java Servlet', 'JSP', 'MySQL'],
    description:
      'Developed a complaint management application that allows users to register complaints and track their progress.',
    features: ['User authentication', 'Complaint registration', 'Complaint tracking', 'Admin management', 'Complaint status updates'],
    image: null,
    github: null,
    demo: null,
  },
  {
    id: 'farmer-info',
    number: '02',
    title: 'Farmer Information Management System',
    category: 'Web',
    label: 'Full Stack Web App',
    icon: Sprout,
    gradient: 'from-[#9b8cff] via-[#7666f5] to-[#79b8ff]',
    tech: ['React JS', 'HTML', 'CSS', 'JavaScript', 'Spring Boot', 'MySQL', 'REST APIs'],
    description:
      'Developed a full-stack farmer information management application using React JS and Spring Boot.',
    features: ['Farmer registration', 'Farmer record management', 'CRUD functionality', 'Backend REST API integration', 'Database management'],
    image: null,
    github: null,
    demo: null,
  },
  {
    id: 'data-lakehouse',
    number: '03',
    title: 'Data Lake House Project',
    category: 'Cloud',
    label: 'Cloud Data',
    icon: Warehouse,
    gradient: 'from-[#7666f5] via-[#9b8cff] to-[#b9a8ff]',
    tech: ['AWS S3', 'Amazon Athena'],
    description:
      'Developed a cloud-based data lakehouse solution using AWS S3 for data storage and Amazon Athena for serverless SQL analysis.',
    features: ['Cloud dataset storage', 'Data organization', 'Serverless SQL querying', 'Data analysis'],
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
  { title: 'Oracle Certification', issuer: 'Oracle', mark: 'ORCL', hue: 'from-[#f87171] to-[#c2410c]', org: 'Oracle Corporation', area: 'Oracle technologies', detail: null, image: null, verifyUrl: null },
  { title: 'Programming in C', issuer: 'NPTEL', mark: 'NPTEL', hue: 'from-[#9b8cff] to-[#5646de]', org: 'National Programme on Technology Enhanced Learning (IITs & IISc)', area: 'Programming', detail: null, image: null, verifyUrl: null },
  { title: 'Leadership and Team Effectiveness', issuer: 'NPTEL', mark: 'NPTEL', hue: 'from-[#9b8cff] to-[#5646de]', org: 'National Programme on Technology Enhanced Learning (IITs & IISc)', area: 'Leadership', detail: 'Score: 64%', image: null, verifyUrl: null },
  { title: 'Agent Blazer Champion', issuer: 'Salesforce', mark: 'SF', hue: 'from-[#7ab8ff] to-[#0b76d0]', org: 'Salesforce', area: 'AI agents on Salesforce', detail: null, image: null, verifyUrl: null },
  { title: 'SQL Basics', issuer: 'SkillRack', mark: 'SR', hue: 'from-[#b9a8ff] to-[#7c3aed]', org: 'SkillRack', area: 'Databases / SQL', detail: null, image: null, verifyUrl: null },
  { title: 'Java', issuer: 'IIT Bombay Spoken Tutorial', mark: 'IITB', hue: 'from-[#8fa4ff] to-[#3f4bc9]', org: 'Spoken Tutorial Project, IIT Bombay', area: 'Programming', detail: null, image: null, verifyUrl: null },
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
