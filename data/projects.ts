//temporary data for projects until data is fetched

export type Project = {
  title: string;
  slug: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  sk: {
    description: string;
  };
  en: {
    description: string;
  };
  hu: {
    description: string;
  };
};

export const projects: Project[] = [
  {
    title: 'Workout Tracker',
    slug: 'workout-tracker',
    sk: {
      description:
        'Komplexná aplikácia na sledovanie tréningov s rozsiahlu databázou cvikov. Používatelia môžu zaznamenávať tréningové jednotky výberom cvikov a zadávaním parametrov sérií. Aplikácia podporuje dlhodobé sledovanie progresu a vyhodnocovanie výkonnosti. Plánované funkcie zahŕňajú sledovanie najlepších a posledných výkonov pre každý cvik.',
    },
    en: {
      description:
        'A workout tracking application built with Next.js, Prisma and PostgreSQL.  Features an extensive exercise database where users can view their best and last workout performance for each exercise. Users can easily track their workouts by selecting exercises and recording sets, reps, and weights, making it simple to monitor progress over time.',
    },
    hu: {
      description:
        'Egy teljes funkcionalitású edzéskövető alkalmazás, amely Next.js-sel, Tailwind CSS-sel és PostgreSQL-lel készült. Lehetővé teszi a felhasználók számára, hogy regisztráljanak, bejelentkezzenek, edzéseket hozzanak létre, nyomon kövessék fejlődésüket, és részletes statisztikákat tekintsenek meg az edzéseikről.',
    },
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    image: '/workoutracker1.webp',
    githubUrl: 'https://github.com/RuzsikMarton/workout-tracker',
    liveUrl: 'https://workoutracker.martonruzsik.sk',
  },
  {
    title: 'Evidio',
    slug: 'evidio',
    sk: {
      description:
        'Saas aplikácia na správu archívu dokumentov určená pre firmy na organizáciu a evidenciu fyzických dokumentov a spisov. Používatelia môžu v rámci organizácií spravovať zamestnancov a záznamy o dokumentoch, pričom QR kódy umožňujú rýchlu identifikáciu a evidenciu fyzických spisov.',
    },
    en: {
      description:
        'A SaaS document archive management application designed for companies to organize and manage physical documents and folders. Users can manage folders, employees, and document records within organizations, while QR codes enable quick identification and tracking of physical folders.',
    },
    hu: {
      description:
        'SaaS alkalmazás fizikai dokumentumarchívumok kezelésére és nyilvántartására. A vállalatok rendszerezhetik az iratokat, kezelhetik az alkalmazottakat, valamint nyomon követhetik az archivált dokumentumok mozgását. A QR-kódok gyors azonosítást tesznek lehetővé.',
    },
    tags: ['Saas', 'Next.js', 'TypeScript', 'Prisma'],
    image: '/evidio.png',
    githubUrl: 'https://github.com/RuzsikMarton/evidio',
    liveUrl: 'https://evidio.rk-r.sk',
  },
  {
    title: 'matrixvis - JS library',
    slug: 'matrixvis',
    sk: {
      description:
        'MatrixVis je knižnica v jazyku JavaScript určená na tvorbu interaktívnych vizualizácií algoritmov pomocou matíc. Zjednodušuje proces demonštrácie algoritmov založených na maticiach, vďaka čomu je ideálnym nástrojom pre učiteľov, študentov a vývojárov.',
    },
    en: {
      description:
        'MatrixVis is a JavaScript library designed for creating interactive algorithm visualizations using matrices. It simplifies the process of demonstrating matrix-based algorithms, making it a perfect tool for educators, students, and developers.',
    },
    hu: {
      description:
        'A MatrixVis egy JavaScript könyvtár, amely interaktív algoritmus-vizualizációk létrehozására készült mátrixok segítségével. Egyszerűsíti a mátrixalapú algoritmusok bemutatását, így ideális eszköz oktatók, diákok és fejlesztők számára.',
    },
    tags: ['JavaScript', 'Canvas', 'Thesis'],
    image: '/mgr.webp',
    githubUrl: 'https://github.com/RuzsikMarton/matrixvis',
  },
];
