import { Card } from '@/components/ui/card';
import { getUpcomingEclipses, getDaysUntilEclipse } from '@/utils/eclipses';
import { Eclipse, Calendar } from 'lucide-react';

export const EclipsePredictions = () => {
  const eclipses = getUpcomingEclipses();

  return (
    <Card className="cosmic-card p-8">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Eclipse className="w-8 h-8 text-accent" />
        <h2 className="text-3xl font-bold cosmic-text">Upcoming Eclipses</h2>
      </div>

      <div className="space-y-4">
        {eclipses.map((eclipse, index) => {
          const daysUntil = getDaysUntilEclipse(eclipse.date);
          return (
            <div
              key={index}
              className="eclipse-card p-6 rounded-lg border border-accent/20 hover:border-accent/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {eclipse.type === 'solar' ? (
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      ☀️
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      🌙
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{eclipse.description}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{eclipse.type} Eclipse</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent">{daysUntil}</div>
                  <div className="text-xs text-muted-foreground">days</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="w-4 h-4" />
                <span>{eclipse.date.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>

              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">Visibility:</span> {eclipse.visibility}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
