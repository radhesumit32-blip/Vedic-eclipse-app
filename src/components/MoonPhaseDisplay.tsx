import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Moon } from 'lucide-react';
import * as SunCalc from 'suncalc';
import { calculateTithi } from '@/utils/vedicTime';

const getMoonPhaseName = (phase: number): string => {
  const phases = [
    'New Moon',
    'Waxing Crescent',
    'First Quarter',
    'Waxing Gibbous',
    'Full Moon',
    'Waning Gibbous',
    'Last Quarter',
    'Waning Crescent'
  ];
  
  const index = Math.floor(phase * 8);
  return phases[index % 8];
};

export const MoonPhaseDisplay = () => {
  const [moonData, setMoonData] = useState<{
    phase: number;
    illumination: number;
    phaseName: string;
  } | null>(null);

  useEffect(() => {
    const updateMoonData = () => {
      const now = new Date();
      const moonIllumination = SunCalc.getMoonIllumination(now);
      
      setMoonData({
        phase: moonIllumination.phase,
        illumination: moonIllumination.fraction,
        phaseName: getMoonPhaseName(moonIllumination.phase)
      });
    };

    updateMoonData();
    const timer = setInterval(updateMoonData, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  if (!moonData) return null;

  const tithi = calculateTithi(moonData.phase);
  const rotation = moonData.phase * 360;

  return (
    <Card className="cosmic-card p-8">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Moon className="w-8 h-8 text-accent" />
        <h2 className="text-3xl font-bold cosmic-text">Lunar Cycle</h2>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <div className="relative w-48 h-48">
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-br from-muted to-card border-4 border-accent/30 shadow-celestial"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 1s ease-out'
            }}
          >
            <div 
              className="absolute inset-0 rounded-full bg-accent/20"
              style={{
                clipPath: `inset(0 ${(1 - moonData.illumination) * 100}% 0 0)`
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold cosmic-gradient-text">
              {Math.round(moonData.illumination * 100)}%
            </span>
          </div>
        </div>

        <div className="text-center space-y-4 w-full">
          <div>
            <p className="text-2xl font-semibold mb-1">{moonData.phaseName}</p>
            <p className="text-sm text-muted-foreground">Current Moon Phase</p>
          </div>

          <div className="pt-4 border-t border-border space-y-2">
            <div>
              <p className="text-lg font-semibold text-accent">{tithi.name}</p>
              <p className="text-sm text-muted-foreground">{tithi.phase}</p>
            </div>
            <p className="text-xs text-muted-foreground">Vedic Lunar Day</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
