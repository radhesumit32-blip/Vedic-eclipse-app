export interface EclipseEvent {
  type: 'solar' | 'lunar';
  date: Date;
  description: string;
  visibility: string;
}

// NASA eclipse data for 2025-2026
export const getUpcomingEclipses = (): EclipseEvent[] => {
  const now = new Date();
  const eclipses: EclipseEvent[] = [
    {
      type: 'lunar',
      date: new Date('2025-03-14'),
      description: 'Total Lunar Eclipse',
      visibility: 'Americas, Europe, Africa, parts of Asia'
    },
    {
      type: 'solar',
      date: new Date('2025-03-29'),
      description: 'Partial Solar Eclipse',
      visibility: 'Northwest Africa, Europe, Northern Russia'
    },
    {
      type: 'lunar',
      date: new Date('2025-09-07'),
      description: 'Total Lunar Eclipse',
      visibility: 'Europe, Africa, Asia, Australia'
    },
    {
      type: 'solar',
      date: new Date('2025-09-21'),
      description: 'Partial Solar Eclipse',
      visibility: 'South Pacific, New Zealand, Antarctica'
    },
    {
      type: 'lunar',
      date: new Date('2026-03-03'),
      description: 'Total Lunar Eclipse',
      visibility: 'Americas, Western Europe, Western Africa'
    },
    {
      type: 'solar',
      date: new Date('2026-08-12'),
      description: 'Total Solar Eclipse',
      visibility: 'Arctic, Greenland, Iceland, Spain'
    }
  ];

  return eclipses.filter(eclipse => eclipse.date > now).slice(0, 4);
};

export const getDaysUntilEclipse = (eclipseDate: Date): number => {
  const now = new Date();
  const diff = eclipseDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
