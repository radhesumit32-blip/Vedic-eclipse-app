import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Sun, Sunrise, Sunset } from 'lucide-react';
import * as SunCalc from 'suncalc';

export const SolarCycleInfo = () => {
  const [sunData, setSunData] = useState<{
    sunrise: Date;
    sunset: Date;
    solarNoon: Date;
    dayLength: string;
  } | null>(null);

  useEffect(() => {
    const updateSunData = () => {
      const now = new Date();
      // Using coordinates for Delhi, India (can be made dynamic later)
      const times = SunCalc.getTimes(now, 28.6139, 77.2090);
      
      const dayLengthMs = times.sunset.getTime() - times.sunrise.getTime();
      const hours = Math.floor(dayLengthMs / (1000 * 60 * 60));
      const minutes = Math.floor((dayLengthMs % (1000 * 60 * 60)) / (1000 * 60));

      setSunData({
        sunrise: times.sunrise,
        sunset: times.sunset,
        solarNoon: times.solarNoon,
        dayLength: `${hours}h ${minutes}m`
      });
    };

    updateSunData();
    const timer = setInterval(updateSunData, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  if (!sunData) return null;

  return (
    <Card className="cosmic-card p-8">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Sun className="w-8 h-8 text-accent animate-pulse" />
        <h2 className="text-3xl font-bold cosmic-text">Solar Cycle</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 rounded-lg bg-accent/5 border border-accent/20">
          <div className="flex items-center gap-3">
            <Sunrise className="w-8 h-8 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Sunrise</p>
              <p className="text-2xl font-semibold">
                {sunData.sunrise.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-accent/5 border border-accent/20">
          <div className="flex items-center gap-3">
            <Sun className="w-8 h-8 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Solar Noon</p>
              <p className="text-2xl font-semibold">
                {sunData.solarNoon.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-accent/5 border border-accent/20">
          <div className="flex items-center gap-3">
            <Sunset className="w-8 h-8 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Sunset</p>
              <p className="text-2xl font-semibold">
                {sunData.sunset.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-2">Day Length</p>
          <p className="text-3xl font-bold cosmic-gradient-text">{sunData.dayLength}</p>
        </div>
      </div>
    </Card>
  );
};
