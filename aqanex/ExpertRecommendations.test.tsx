import { describe, it, expect } from 'vitest';
import { generateExpertRecommendations } from './ExpertRecommendations';

describe('generateExpertRecommendations (copied)', () => {
  it('flags low dissolved oxygen and recommends aeration', () => {
    const analysis = {
      water_parameters: [
        { ph: 7.0, tds: 200, dissolved_oxygen: 4.0, turbidity: 1, salinity: 0.5 },
      ],
      ai_predictions: [],
    } as any;

    const experts = generateExpertRecommendations(analysis as any);
    const fish = experts.find((e) => e.expert.includes('Fisheries'))!;

    expect(fish).toBeDefined();
    expect(fish.severity).toBe('medium');
    expect(fish.concerns).toContain('CRITICAL: Inadequate oxygen for fish survival');
    expect(
      fish.recommendations.some((r) => r.toLowerCase().includes('aeration') || r.toLowerCase().includes('aerate')),
    ).toBeTruthy();
  });

  it('recommends RO for high TDS', () => {
    const analysis = {
      water_parameters: [
        { ph: 7.0, tds: 620, dissolved_oxygen: 8.0, turbidity: 1, salinity: 0.5 },
      ],
      ai_predictions: [],
    } as any;

    const experts = generateExpertRecommendations(analysis as any);
    const wt = experts.find((e) => e.expert.includes('Water Treatment Specialist'))!;

    expect(wt).toBeDefined();
    expect(wt.severity).toBe('medium');
    expect(wt.recommendations).toContain('Apply reverse osmosis or ion exchange for TDS reduction.');
  });

  it('flags pH out of optimal range', () => {
    const analysis = {
      water_parameters: [
        { ph: 9.0, tds: 200, dissolved_oxygen: 8.0, turbidity: 1, salinity: 0.5 },
      ],
      ai_predictions: [],
    } as any;

    const experts = generateExpertRecommendations(analysis as any);
    const prof = experts.find((e) => e.expert.includes('Environmental Engineering'))!;

    expect(prof).toBeDefined();
    expect(prof.severity).toBe('medium');
    expect(prof.recommendations).toContain('pH levels outside optimal range - adjust treatment process accordingly.');
  });
});
