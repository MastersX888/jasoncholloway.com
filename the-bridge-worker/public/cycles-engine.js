/* The Bridge — cycle, lunar & chronobiological baseline engine */
(function (global) {
  const MOOD_SCORE = {
    "😊 Great": 88, "🙂 Good": 74, "😐 Okay": 58, "😔 Low": 38, "😤 Frustrated": 34, "😰 Anxious": 30,
  };
  const ENERGY_SCORE = { "⚡ High": 85, "🔋 Medium": 62, "🪫 Low": 40, "💤 Exhausted": 28 };
  const SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

  function pad(n) { return String(n).padStart(2, "0"); }
  function dateKey(d) { return d.toISOString().slice(0, 10); }
  function parseDate(key) { return new Date(key + "T12:00:00"); }
  function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }

  function julianDay(date) {
    const y = date.getUTCFullYear();
    let m = date.getUTCMonth() + 1;
    const D = date.getUTCDate() + date.getUTCHours() / 24 + date.getUTCMinutes() / 1440;
    let Y = y;
    if (m <= 2) { Y--; m += 12; }
    const A = Math.floor(Y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (m + 1)) + D + B - 1524.5;
  }

  /** Synodic moon phase 0=new … 0.5=full */
  function moonPhase(date) {
    const jd = julianDay(date);
    const days = jd - 2451549.5;
    const phase = (days / 29.530588853) % 1;
    return phase < 0 ? phase + 1 : phase;
  }

  function moonIllumination(date) {
    const p = moonPhase(date);
    return Math.round(50 * (1 - Math.cos(2 * Math.PI * p)));
  }

  function moonPhaseLabel(date) {
    const p = moonPhase(date);
    if (p < 0.03 || p > 0.97) return { name: "New Moon", emoji: "🌑", note: "Lower ambient light; sleep architecture & melatonin timing often shift." };
    if (p < 0.22) return { name: "Waxing Crescent", emoji: "🌒", note: "Building lunar light; gradual rise in nocturnal alertness for light-sensitive sleepers." };
    if (p < 0.28) return { name: "First Quarter", emoji: "🌓", note: "Half-illuminated; circadian amplitude often peaks mid-cycle in lunar studies." };
    if (p < 0.47) return { name: "Waxing Gibbous", emoji: "🌔", note: "Pre-full build; social drive & REM density correlate with waxing light in some cohorts." };
    if (p < 0.53) return { name: "Full Moon", emoji: "🌕", note: "Peak illumination; documented sleep latency increases & mood lability in sensitive individuals." };
    if (p < 0.72) return { name: "Waning Gibbous", emoji: "🌖", note: "Integration phase; parasympathetic recovery often improves as light wanes." };
    if (p < 0.78) return { name: "Last Quarter", emoji: "🌗", note: "Release-oriented lunar quarter; cortisol awakening response may soften." };
    return { name: "Waning Crescent", emoji: "🌘", note: "Pre-new retreat; introspection & sleep need often rise before renewal." };
  }

  /** Ecliptic longitude degrees 0–360 (Meeus Ch.47 simplified) */
  function moonLongitude(date) {
    const jd = julianDay(date);
    const T = (jd - 2451545.0) / 36525;
    const Lp = (218.3164477 + 481267.88123421 * T) % 360;
    const M = (134.9633964 + 477198.8675055 * T) * Math.PI / 180;
    const F = (93.2720950 + 483202.0175233 * T) * Math.PI / 180;
    let lon = Lp
      + 6.289 * Math.sin(M)
      + 1.274 * Math.sin(2 * (Lp * Math.PI / 180) - M)
      + 0.658 * Math.sin(2 * (Lp * Math.PI / 180))
      + 0.214 * Math.sin(2 * M)
      - 0.186 * Math.sin((357.5291092 + 35999.0502909 * T) * Math.PI / 180)
      - 0.114 * Math.sin(2 * F);
    lon = ((lon % 360) + 360) % 360;
    return lon;
  }

  function signFromLongitude(lon) {
    return SIGNS[Math.floor(lon / 30) % 12];
  }

  function natalMoonLongitude(birthDate, birthTime) {
    const [hh, mm] = (birthTime || "12:00").split(":").map(Number);
    const d = parseDate(birthDate);
    d.setUTCHours(hh || 12, mm || 0, 0, 0);
    return moonLongitude(d);
  }

  function aspectAngle(a, b) {
    let d = Math.abs(a - b) % 360;
    return d > 180 ? 360 - d : d;
  }

  /** Physiological stress/sensitivity window from lunar-natal geometry (not pop horoscope) */
  function lunarNatalResonance(natalMoonLon, date) {
    const transit = moonLongitude(date);
    const sep = aspectAngle(natalMoonLon, transit);
    let score = 50;
    let label = "Neutral lunar-natal geometry";
    let detail = "No major lunar aspect to natal Moon today.";
    if (sep <= 8) {
      score = 78;
      label = "Conjunction — heightened emotional permeability";
      detail = "Transiting Moon conjunct natal Moon: limbic reactivity & interoceptive sensitivity often increase (medical astrology / chronobiology literature).";
    } else if (Math.abs(sep - 180) <= 8) {
      score = 72;
      label = "Opposition — polarity & autonomic activation";
      detail = "Lunar opposition to natal Moon: sympathetic tone & relational tension sensitivity may rise; prioritize regulation.";
    } else if (Math.abs(sep - 90) <= 6) {
      score = 65;
      label = "Square — friction window";
      detail = "Square aspect: stress reactivity & sleep fragmentation risk elevated in cortisol-sensitive profiles.";
    } else if (Math.abs(sep - 120) <= 6 || Math.abs(sep - 60) <= 6) {
      score = 58;
      label = "Trine/Sextile — integrative flow";
      detail = "Harmonic aspect: autonomic coherence & mood stability often supported.";
    }
    return { score, label, detail, transitSign: signFromLongitude(transit), natalSign: signFromLongitude(natalMoonLon), separation: Math.round(sep) };
  }

  function femaleCycleDay(lastPeriodStart, date, cycleLength) {
    if (!lastPeriodStart) return null;
    const len = cycleLength || 28;
    const start = parseDate(lastPeriodStart);
    const diff = Math.floor((parseDate(dateKey(date)) - start) / 86400000);
    return ((diff % len) + len) % len + 1;
  }

  function femalePhase(day, cycleLength) {
    const len = cycleLength || 28;
    const ov = Math.round(len * 0.5);
    if (day <= 5) return { id: "menstrual", label: "Menstrual", days: "1–5", color: "#d4727a" };
    if (day < ov - 1) return { id: "follicular", label: "Follicular", days: `6–${ov - 1}`, color: "#7bab8a" };
    if (day <= ov + 1) return { id: "ovulatory", label: "Ovulatory", days: `${ov - 1}–${ov + 1}`, color: "#e8a849" };
    return { id: "luteal", label: "Luteal", days: `${ov + 2}–${len}`, color: "#9b8ec4" };
  }

  /** Clinical hormone baseline curves (normalized 0–100) — Follicular/Ovulatory/Luteal model */
  function femaleHormoneBaseline(day, cycleLength) {
    const len = cycleLength || 28;
    const t = (day - 1) / len;
    const ov = 0.5;
    // Estrogen: rises follicular, peak ovulation, secondary luteal bump, drop
    let estrogen = 30 + 55 * Math.exp(-Math.pow((t - ov) / 0.12, 2));
    estrogen += 20 * Math.exp(-Math.pow((t - (ov + 0.18)) / 0.1, 2));
    if (t < 0.15) estrogen = 25 + t * 120;
    // Progesterone: luteal dominant
    let progesterone = 15;
    if (t > ov) progesterone = 20 + 70 * Math.sin(Math.PI * (t - ov) / (1 - ov));
    if (t > 0.85) progesterone *= 0.3;
    const composite = estrogen * 0.55 + progesterone * 0.45;
    const phase = femalePhase(day, len);
    const clinical = {
      menstrual: "Estrogen & progesterone nadir. Rest, iron-rich nutrition, reduced high-intensity demand.",
      follicular: "Estrogen rising. Energy, verbal fluency & pain tolerance typically improve.",
      ovulatory: "Estrogen peak + LH surge. Peak social confidence & libido for many.",
      luteal: "Progesterone dominant. Late luteal (PMS window) — GABAergic sensitivity, irritability risk.",
    }[phase.id];
    return {
      estrogen: Math.round(Math.min(100, Math.max(0, estrogen))),
      progesterone: Math.round(Math.min(100, Math.max(0, progesterone))),
      composite: Math.round(Math.min(100, Math.max(0, composite))),
      phase,
      clinical,
    };
  }

  /** Male circadian testosterone + ~30-day infradian modulation (clinical literature baseline) */
  function maleHormoneBaseline(date, birthDate) {
    const h = date.getHours() + date.getMinutes() / 60;
    // Circadian T: peak ~07:00, nadir ~20:00
    const circadian = 50 + 40 * Math.cos((h - 7) / 24 * 2 * Math.PI);
    // Infradian ~30-day (Travison-style seasonal/monthly variation simplified)
    const jd = julianDay(date);
    const infradian = 8 * Math.sin(2 * Math.PI * jd / 30.4);
    // Age-related baseline drift if birthDate provided
    let ageMod = 0;
    if (birthDate) {
      const age = (date - parseDate(birthDate)) / (365.25 * 86400000);
      if (age > 35) ageMod = -Math.min(12, (age - 35) * 0.3);
    }
    const testosterone = Math.round(Math.min(100, Math.max(0, circadian + infradian + ageMod)));
    const cortisolAwakening = Math.round(Math.min(100, Math.max(0, 55 + 35 * Math.exp(-Math.pow((h - 8) / 3, 2)))));
    const composite = Math.round(testosterone * 0.65 + cortisolAwakening * 0.35);
    const circadianLabel = h < 10 ? "Morning T peak window" : h < 16 ? "Daytime plateau" : "Evening recovery";
    return {
      testosterone,
      cortisolAwakening,
      composite,
      circadianLabel,
      clinical: h < 10
        ? "Testosterone & cortisol awakening response peak. Best window for demanding cognitive/physical tasks."
        : h >= 20
          ? "Androgen decline & melatonin rise. Parasympathetic recovery; avoid stacking stressors."
          : "Midday androgen plateau. Sustained effort OK; watch sleep debt impact on next-morning T.",
    };
  }

  function moodFromCheckin(ci) {
    if (!ci) return null;
    const m = MOOD_SCORE[ci.mood];
    const e = ENERGY_SCORE[ci.energy];
    if (m == null && e == null) return null;
    if (m == null) return e;
    if (e == null) return m;
    return Math.round(m * 0.6 + e * 0.4);
  }

  function buildSeries(checkIns, config, user, days) {
    const profile = config?.[user] || {};
    const isFemale = profile.sex === "female";
    const out = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = addDays(today, -i);
      const key = dateKey(d);
      const ci = checkIns[`${key}:${user}`];
      const actual = moodFromCheckin(ci);
      const moon = moonPhaseLabel(d);
      const illum = moonIllumination(d);
      let hormone = null;
      let phase = null;
      let resonance = null;
      if (isFemale && profile.lastPeriodStart) {
        const cd = femaleCycleDay(profile.lastPeriodStart, d, profile.cycleLength);
        hormone = femaleHormoneBaseline(cd, profile.cycleLength);
        phase = hormone.phase;
      } else if (profile.sex === "male") {
        hormone = maleHormoneBaseline(d, profile.birthDate);
      }
      if (profile.birthDate) {
        const natal = natalMoonLongitude(profile.birthDate, profile.birthTime);
        resonance = lunarNatalResonance(natal, d);
      }
      out.push({
        date: key,
        actual,
        baseline: hormone?.composite ?? null,
        estrogen: hormone?.estrogen ?? null,
        progesterone: hormone?.progesterone ?? null,
        testosterone: hormone?.testosterone ?? null,
        moonPct: illum,
        moonName: moon.name,
        moonEmoji: moon.emoji,
        phase,
        resonance,
        clinical: hormone?.clinical || moon.note,
      });
    }
    return out;
  }

  function defaultProfiles() {
    return {
      Jason: { sex: "male", birthDate: "", birthTime: "12:00", pushEnabled: false },
      Tiffany: { sex: "female", birthDate: "", birthTime: "12:00", cycleLength: 28, lastPeriodStart: "", pushEnabled: false },
    };
  }

  function notificationCandidates(config, checkIns, today) {
    const alerts = [];
    const d = parseDate(dateKey(today));
    const moon = moonPhaseLabel(d);
    for (const user of ["Jason", "Tiffany"]) {
      const p = config[user];
      if (!p?.pushEnabled) continue;
      if (p.sex === "female" && p.lastPeriodStart) {
        const cd = femaleCycleDay(p.lastPeriodStart, d, p.cycleLength);
        const ph = femalePhase(cd, p.cycleLength);
        if (cd === 1) alerts.push({ user, title: "Cycle reset", body: "Day 1 — menstrual phase. Rest & hydration support hormone recovery." });
        if (cd === Math.round((p.cycleLength || 28) * 0.5)) alerts.push({ user, title: "Ovulatory window", body: "Mid-cycle peak — energy & communication often highest." });
        if (cd === (p.cycleLength || 28) - 4) alerts.push({ user, title: "Late luteal", body: "PMS-sensitive window for many — extra patience with yourself & partner." });
      }
      if (p.birthDate) {
        const r = lunarNatalResonance(natalMoonLongitude(p.birthDate, p.birthTime), d);
        if (r.score >= 72) alerts.push({ user, title: "Lunar-natal window", body: r.label });
      }
    }
    if (moon.name === "Full Moon" || moon.name === "New Moon") {
      alerts.push({ user: "both", title: moon.emoji + " " + moon.name, body: moon.note });
    }
    const partner = "Tiffany";
    const jToday = checkIns[`${dateKey(today)}:Jason`];
    const tToday = checkIns[`${dateKey(today)}:Tiffany`];
    if (jToday && !tToday) alerts.push({ user: "Tiffany", title: "Jason checked in", body: `Mood: ${jToday.mood || "—"}. Open The Bridge to connect.` });
    if (tToday && !jToday) alerts.push({ user: "Jason", title: "Tiffany checked in", body: `Mood: ${tToday.mood || "—"}. Open The Bridge to connect.` });
    return alerts;
  }

  global.BridgeCycles = {
    MOOD_SCORE, buildSeries, moonPhaseLabel, moonIllumination, femaleCycleDay, femalePhase,
    femaleHormoneBaseline, maleHormoneBaseline, lunarNatalResonance, natalMoonLongitude,
    signFromLongitude, defaultProfiles, notificationCandidates, moodFromCheckin, dateKey, addDays,
  };
})(typeof window !== "undefined" ? window : globalThis);
