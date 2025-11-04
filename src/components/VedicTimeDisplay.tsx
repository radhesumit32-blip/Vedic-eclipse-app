import { useEffect, useState } from 'react';
import { calculateVedicTime, formatVedicTime } from '@/utils/vedicTime';
import { Card } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export const VedicTimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [vedicTime, setVedicTime] = useState(calculateVedicTime(new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setVedicTime(calculateVedicTime(now));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="cosmic-card p-8 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Clock className="w-8 h-8 text-accent animate-pulse" />
        <h2 className="text-3xl font-bold cosmic-text">Vedic Time</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="text-6xl font-bold cosmic-gradient-text mb-2 tracking-wider">
            {formatVedicTime(vedicTime)}
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Ghati : Pala : Vipala</p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">Modern Time</p>
          <p className="text-2xl font-semibold">
            {currentTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit' 
            })}
          </p>
        </div>
      </div>
    </Card>
  );
};
