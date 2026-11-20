import type { TimelineItem } from '../types'

export const generalTimeline: TimelineItem[] = [
  {
    isCurrent: true,
    when: '2016',
    till: 'Now',
    title: 'Principal Engineer / Tech Lead',
    description:
      'The role I like best right now is somewhere between Principal Engineer and Tech Lead, where I can still focus on bigger tasks without much management work getting in the way.',
  },
  {
    isHighlighted: true,
    when: '2025',
    where: 'UA',
    kind: 'education',
    title: "Education: Master's Degree in Professional Education",
    subtitle: 'KNUCA, FAIT',
    description: [
      'Graduate of Kyiv National University of Construction and Architecture, Faculty of Automation and Information Technologies.',
      'Specialty: Professional Education — Computer Technologies. Combining tech expertise with pedagogy to build better career guidance tools for students.',
    ],
  },
  {
    when: '2014',
    title: 'Lead Developer',
    description:
      'Promoted while working at Luxoft. Mainly worked with JS/CSS, React, Node.js, Electron.',
  },
  {
    when: '2008',
    title: 'Senior Developer',
    description: 'Promoted while working at Tikle. Worked with C#.NET, MSSQL, JS/CSS.',
  },
  {
    isHighlighted: true,
    when: '2009',
    where: 'UA',
    kind: 'education',
    title: "Education: Master's Degree",
    subtitle: 'NTUU "KPI", FAM, SCS',
    description: [
      'Graduate of the National Technical University of Ukraine "Kyiv Polytechnic Institute", Faculty of Applied Mathematics, Department of Specialized Computer Systems.',
      "A good choice for my career, I'd say: programming (Pascal, C#, .NET, C++, Assembler), algorithms and data structures, graphs, probability theory, databases (MSSQL) and much more.",
      'In 2006, while still a student, I registered as a sole proprietor and got my first official job as a software engineer. At the time I worked with ASP/.NET.',
    ],
  },
  {
    isHighlighted: true,
    when: '2003',
    where: 'UA',
    kind: 'education',
    title: 'Education: Secondary School',
    description: [
      'Graduated from secondary school with honors. Also graduated from music school with honors (button accordion and folk instruments) and trained at a swimming sports school the whole time (Candidate for Master of Sport).',
      'Won prizes at mathematics and physics olympiads, published papers with the Junior Academy of Sciences, took part in drawing exhibitions.',
      'Built my first commercial project at 17 — a Win32 application for CD/DVD authoring.',
    ],
  },
]
