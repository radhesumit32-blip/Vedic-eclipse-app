// Vedic Time Calculations
// 1 Day = 60 Ghatis
// 1 Ghati = 60 Palas
// 1 Pala = 60 Vipalas

export interface VedicTime {
  ghati: number;
  pala: number;
  vipala: number;
}

export const calculateVedicTime = (date: Date): VedicTime => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Convert current time to total seconds from midnight
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  // Total seconds in a day = 86400
  // Total ghatis in a day = 60
  const secondsPerGhati = 86400 / 60; // 1440 seconds per ghati

  const totalGhatis = totalSeconds / secondsPerGhati;
  const ghati = Math.floor(totalGhatis);
  
  const remainingAfterGhati = (totalGhatis - ghati) * 60;
  const pala = Math.floor(remainingAfterGhati);
  
  const remainingAfterPala = (remainingAfterGhati - pala) * 60;
  const vipala = Math.floor(remainingAfterPala);

  return { ghati, pala, vipala };
};

export const formatVedicTime = (vedicTime: VedicTime): string => {
  return `${vedicTime.ghati}:${String(vedicTime.pala).padStart(2, '0')}:${String(vedicTime.vipala).padStart(2, '0')}`;
};

export interface TithiInfo {
  name: string;
  phase: string;
  percentage: number;
}

// Simplified Tithi calculation based on lunar phase
export const calculateTithi = (moonPhase: number): TithiInfo => {
  const tithiNames = [
    "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
    "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
    "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima/Amavasya"
  ];

  // Moon phase goes from 0 (new) to 1 (full) and back
  // We need to determine if we're waxing or waning
  const isWaxing = moonPhase >= 0 && moonPhase < 0.5;
  const adjustedPhase = isWaxing ? moonPhase * 2 : (1 - moonPhase) * 2;
  
  const tithiIndex = Math.floor(adjustedPhase * 15);
  const phase = isWaxing ? "Shukla Paksha" : "Krishna Paksha";

  return {
    name: tithiNames[tithiIndex],
    phase,
    percentage: adjustedPhase * 100
  };
};
