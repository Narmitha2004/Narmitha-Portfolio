import { useState } from 'react';
import {
  FileCode2,
  Server,
  Webhook,
  Cpu,
  Archive,
  ShieldCheck,
  Network,
  Split,
  HardDrive,
  Layers,
  SearchCode,
  Code2,
} from 'lucide-react';

const DI = (p) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${p}`;

/** Brand SVGs from the open-source Devicon set */
const deviconMap = {
  Java: DI('java/java-original.svg'),
  'Java Servlet': DI('java/java-original.svg'),
  Python: DI('python/python-original.svg'),
  JavaScript: DI('javascript/javascript-original.svg'),
  Dart: DI('dart/dart-original.svg'),
  HTML5: DI('html5/html5-original.svg'),
  HTML: DI('html5/html5-original.svg'),
  CSS3: DI('css3/css3-original.svg'),
  CSS: DI('css3/css3-original.svg'),
  'React JS': DI('react/react-original.svg'),
  Flutter: DI('flutter/flutter-original.svg'),
  'Spring Boot': DI('spring/spring-original.svg'),
  MySQL: DI('mysql/mysql-original.svg'),
  AWS: DI('amazonwebservices/amazonwebservices-original-wordmark.svg'),
  Git: DI('git/git-original.svg'),
  GitHub: DI('github/github-original.svg'),
  Docker: DI('docker/docker-original.svg'),
  'VS Code': DI('vscode/vscode-original.svg'),
  Eclipse: DI('eclipse/eclipse-original.svg'),
  Figma: DI('figma/figma-original.svg'),
};

/** Concept icons for items without a brand mark */
const lucideMap = {
  JSP: FileCode2,
  Servlet: Server,
  'REST APIs': Webhook,
  'AWS EC2': Cpu,
  'AWS S3': Archive,
  'AWS IAM': ShieldCheck,
  'AWS VPC': Network,
  'AWS ELB': Split,
  'AWS EFS': HardDrive,
  'AWS ASG': Layers,
  'Amazon Athena': SearchCode,
};

export default function TechIcon({ name, size = 22 }) {
  const [failed, setFailed] = useState(false);
  const src = deviconMap[name];

  if (src && !failed) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        style={{ width: size, height: size, objectFit: 'contain' }}
      />
    );
  }

  const Icon = lucideMap[name] ?? Code2;
  return <Icon aria-hidden="true" size={size} strokeWidth={1.8} className="text-[#6d4aff]" />;
}
