import type { TimelineItem } from 'src/types'

export const generalTimeline: TimelineItem[] = [
  {
    isHighlighted: true,
    when: '2016',
    till: 'Now',
    title: 'Principal Engineer / Tech Lead',
    description:
      'My preferred role for now is something around Principal Engineer / Tech Lead, where I still can concentrate on bigger tasks without much of a management work distraction.',
  },
  {
    when: '2014',
    title: 'Lead Developer',
    description:
      'During work for Luxoft managed to get a promotion. Mainly been working with JS/CSS, React, Node.js, Electron.',
  },
  {
    when: '2008',
    title: 'Senior Developer',
    description:
      'During work for Tikle managed to get a promotion. Been working with C#.NET, MSSQL, JS/CSS.',
  },
  {
    isHighlighted: true,
    when: '2009',
    where: 'UA',
    title: "Education: Master's Degree Graduate",
    subtitle: 'NTUU "KPI", FAM, SCS',
    description: [
      'Graduate of National Technical University of Ukraine "Kyiv Polytechnical Institute", Faculty of Applied Math, Department of Specialized Computer Systems.',
      'I would say quite a good choice in the context of my career: programming (Pascal, C#, .NET, C++, Assembler), algorithms and data structures, graphs, probability theory, databases (MSSQL) and much more.',
      'In 2006, while being a student, registered as PE and got my first official job as a Software Engineer. At the time I was working as a ASP/.NET developer.',
    ],
  },
  {
    when: '2003',
    where: 'UA',
    title: 'Education: Graduate of Secondary School',
    description:
      'During secondary school time I also graduated from Music school (accordion and folk instruments) and attended Sports swimming school all the time (candidate for master of sports).',
  },
]
