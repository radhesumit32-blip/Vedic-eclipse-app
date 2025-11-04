import { VedicTimeDisplay } from '@/components/VedicTimeDisplay';
import { MoonPhaseDisplay } from '@/components/MoonPhaseDisplay';
import { SolarCycleInfo } from '@/components/SolarCycleInfo';
import { EclipsePredictions } from '@/components/EclipsePredictions';
import cosmicHero from '@/assets/cosmic-hero.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${cosmicHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 cosmic-gradient-text animate-fade-in">
            Vedic Cosmos
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl animate-fade-in-delay">
            Ancient wisdom meets modern astronomy. Track celestial cycles and cosmic events in real-time.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-12">
        {/* Time Display */}
        <section className="animate-fade-in-delay-2">
          <VedicTimeDisplay />
        </section>

        {/* Cycles Grid */}
        <section className="grid md:grid-cols-2 gap-8 animate-fade-in-delay-3">
          <MoonPhaseDisplay />
          <SolarCycleInfo />
        </section>

        {/* Eclipse Predictions */}
        <section className="animate-fade-in-delay-4">
          <EclipsePredictions />
        </section>

        {/* Footer */}
        <footer className="text-center pt-12 pb-8 text-sm text-muted-foreground border-t border-border">
          <p>Calculations based on traditional Vedic astronomy and modern astronomical data</p>
          <p className="mt-2">Real-time updates every second • Eclipse data from NASA</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
