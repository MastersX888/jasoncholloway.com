"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import foliosData from "@/lib/folios.json";

interface Folio {
  id: string;
  folio: string;
  title: string;
  category: string;
  collection: string;
  volume: number;
  filename: string;
  path: string;
  description: string;
  features: string[];
  storyNotes: string;
}

interface ActiveLayer {
  layerId: string; // Unique instance ID
  folio: Folio;
  opacity: number;
  rotation: number;
  scale: number;
  blendMode: string;
  inverted: boolean;
}

export default function FolioVisualizerPage() {
  const [activeLayers, setActiveLayers] = useState<ActiveLayer[]>([]);
  const layerCounterRef = useRef(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [collectionFilter, setCollectionFilter] = useState<"all" | "voynich" | "arsnotoria">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Geometric guide overlays
  const [showSevenfold, setShowSevenfold] = useState(false);
  const [showVesica, setShowVesica] = useState(false);
  const [showDecagon, setShowDecagon] = useState(false);
  const [showHexagram, setShowHexagram] = useState(false);

  // Coherence success modal state
  const [showResonanceModal, setShowResonanceModal] = useState(false);

  // Categories list
  const categories = useMemo(() => {
    const cats = new Set<string>();
    foliosData.forEach((f) => {
      if (f.category) cats.add(f.category);
    });
    return ["all", ...Array.from(cats)];
  }, []);

  // Filtered folios for browser sidebar
  const filteredFolios = useMemo(() => {
    return (foliosData as Folio[]).filter((f) => {
      const matchesSearch = 
        f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.folio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (f.storyNotes && f.storyNotes.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (f.features && f.features.some(feat => feat.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesCollection = collectionFilter === "all" || f.collection === collectionFilter;
      const matchesCategory = categoryFilter === "all" || f.category === categoryFilter;

      return matchesSearch && matchesCollection && matchesCategory;
    });
  }, [searchQuery, collectionFilter, categoryFilter]);

  // Add a folio to the stage
  const addLayer = (folio: Folio) => {
    layerCounterRef.current += 1;
    const newLayer: ActiveLayer = {
      layerId: `${folio.id}-${layerCounterRef.current}`,
      folio,
      opacity: 0.8,
      rotation: 0,
      scale: 1.0,
      blendMode: "screen",
      inverted: true, // Default to inverted (glowing line art on dark background)
    };
    setActiveLayers([newLayer, ...activeLayers]);
  };

  // Remove a layer from the stage
  const removeLayer = (layerId: string) => {
    setActiveLayers(activeLayers.filter((l) => l.layerId !== layerId));
  };

  // Update layer property
  const updateLayer = <K extends keyof ActiveLayer>(
    layerId: string,
    property: K,
    value: ActiveLayer[K]
  ) => {
    setActiveLayers(
      activeLayers.map((l) => {
        if (l.layerId === layerId) {
          return { ...l, [property]: value };
        }
        return l;
      })
    );
  };

  // Move layer up (bring to front / earlier in activeLayers array)
  const moveLayerUp = (index: number) => {
    if (index === 0) return;
    const updated = [...activeLayers];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setActiveLayers(updated);
  };

  // Move layer down (push to back / later in activeLayers array)
  const moveLayerDown = (index: number) => {
    if (index === activeLayers.length - 1) return;
    const updated = [...activeLayers];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setActiveLayers(updated);
  };

  // Clear all layers
  const clearAllLayers = () => {
    setActiveLayers([]);
  };

  // Trigger Coherence Snap alignment
  const triggerCoherenceSnap = () => {
    // 1. Find Rosette Folio (v4-f85v-86r)
    const rosetteFolio = (foliosData as Folio[]).find(f => f.id === "v4-f85v-86r");
    // 2. Find Ars Notoria Compendium (an-03)
    const compendiumFolio = (foliosData as Folio[]).find(f => f.id === "an-03");

    if (!rosetteFolio || !compendiumFolio) {
      alert("Error: Key alignment folios not found in database.");
      return;
    }

    // 3. Set stacked active layers to exact snapped properties
    const snappedLayers: ActiveLayer[] = [
      {
        layerId: `v4-f85v-86r-snap`,
        folio: rosetteFolio,
        opacity: 0.8,
        rotation: 51.4, // Heptagonal rosette alignment
        scale: 1.25,
        blendMode: "difference",
        inverted: true
      },
      {
        layerId: `an-03-snap`,
        folio: compendiumFolio,
        opacity: 0.75,
        rotation: 111.2, // 111.2 Hz carrier frequency alignment
        scale: 1.25,
        blendMode: "difference",
        inverted: true
      }
    ];

    setActiveLayers(snappedLayers);
    setShowHexagram(true); // Turn on hexagram guide
    setShowSevenfold(true); // Turn on sevenfold rosette guide
    setShowResonanceModal(true); // Open lore modal
  };

  return (
    <>
      <section className="page-header page-header-chamber" style={{ paddingBottom: "2rem" }}>
        <div className="container">
          <div className="page-header-inner">
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", alignItems: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 12px var(--cyan)" }} />
              <Link href="/chamber" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--cyan)", fontWeight: 500 }}>
                ← Return to Analysis Chamber Hub
              </Link>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem" }}>
              <div>
                <h1 className="display-lg" style={{ marginBottom: "0.5rem" }}>
                  Virtual Folio<br />
                  <span className="glow-cyan">Pattern Visualizer</span>
                </h1>
                <p style={{ maxWidth: "58ch", color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                  Select, scale, rotate, and overlay historical manuscript folios (Voynich, Ars Notoria)
                  to reproduce Blake Masters&apos;s discoveries. Synthesize layered sacred geometries using
                  real-time CSS blend modes.
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button onClick={triggerCoherenceSnap} className="btn btn-gold" style={{ display: "flex", gap: "0.5rem", boxShadow: "0 0 15px var(--gold-glow)", border: "1px solid var(--gold)" }}>
                  <span>✦</span> Acoustic Coherence Snap
                </button>
                {activeLayers.length > 0 && (
                  <button onClick={clearAllLayers} className="btn btn-outline btn-sm">
                    Clear Stage
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ borderTop: "1px solid var(--border-faint)", background: "var(--bg)", padding: "2rem 0 6rem 0" }}>
        <div className="container">
          
          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr 340px", gap: "2rem", alignItems: "start" }} className="visualizer-grid">
            
            {/* 1. Sidebar: Folio Database Browser */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", padding: "1.25rem", height: "80vh", maxHeight: "80vh", background: "var(--bg-surface)", borderColor: "var(--border)" }}>
              <div style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--cyan)", fontWeight: 600 }}>
                Folio Database ({foliosData.length})
              </div>

              {/* Filters */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <input
                  type="text"
                  placeholder="Search folio, features, notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    background: "var(--bg-raised)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--r-md)",
                    fontSize: "0.82rem",
                    color: "var(--text)",
                    outline: "none",
                  }}
                />

                <div style={{ display: "flex", gap: "0.25rem" }}>
                  {(["all", "voynich", "arsnotoria"] as const).map((col) => (
                    <button
                      key={col}
                      onClick={() => setCollectionFilter(col)}
                      style={{
                        flex: 1,
                        padding: "0.3rem",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        borderRadius: "var(--r-sm)",
                        background: collectionFilter === col ? "var(--cyan-dim)" : "var(--bg-raised)",
                        color: collectionFilter === col ? "#fff" : "var(--text-muted)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {col === "arsnotoria" ? "Ars Notoria" : col}
                    </button>
                  ))}
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.4rem 0.5rem",
                    background: "var(--bg-raised)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--r-md)",
                    fontSize: "0.82rem",
                    color: "var(--text)",
                    outline: "none",
                  }}
                >
                  <option value="all">All Categories</option>
                  {categories.filter(c => c !== "all").map((cat) => (
                    <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              {/* Scrollable list of folios */}
              <div style={{ flexGrow: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.75rem", paddingRight: "0.25rem" }}>
                {filteredFolios.length === 0 ? (
                  <div style={{ textAlign: "center", color: "var(--text-faint)", fontSize: "0.8rem", padding: "2rem 0" }}>
                    No folios match filters.
                  </div>
                ) : (
                  filteredFolios.map((folio) => (
                    <div 
                      key={folio.id} 
                      className="folio-db-item"
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                        alignItems: "center",
                        padding: "0.5rem",
                        background: "var(--bg-raised)",
                        border: "1px solid var(--border-faint)",
                        borderRadius: "var(--r-md)",
                        transition: "all 0.2s"
                      }}
                    >
                      <div style={{
                        position: "relative",
                        width: 50,
                        height: 75,
                        flexShrink: 0,
                        background: "#05050A",
                        borderRadius: "var(--r-sm)",
                        overflow: "hidden",
                        border: "1px solid var(--border)"
                      }}>
                        <Image
                          src={folio.path}
                          alt={folio.title}
                          fill
                          unoptimized
                          style={{
                            objectFit: "cover",
                            filter: "invert(1)" // Inverted for glowing preview look
                          }}
                        />
                      </div>
                      <div style={{ flexGrow: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                          <span style={{ fontSize: "0.72rem", color: "var(--gold)", fontWeight: 600 }}>{folio.folio}</span>
                          <span style={{ fontSize: "0.6rem", color: "var(--text-faint)", textTransform: "uppercase" }}>{folio.category}</span>
                        </div>
                        <div style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {folio.title}
                        </div>
                        <button
                          onClick={() => addLayer(folio)}
                          style={{
                            marginTop: "0.25rem",
                            fontSize: "0.7rem",
                            color: "var(--cyan)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            fontWeight: 600
                          }}
                        >
                          + Add to Stage
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 2. Main Stage Workspace */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              {/* Reference Grid Stage */}
              <div style={{
                position: "relative",
                aspectRatio: "1/1",
                background: "#05050B",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-lg)",
                overflow: "hidden",
                boxShadow: "inset 0 0 100px rgba(0,0,0,0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {/* Background grid canvas markings */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "radial-gradient(var(--border) 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                  opacity: 0.25,
                  zIndex: 0
                }} />

                {/* Stacking Layers */}
                {activeLayers.length === 0 ? (
                  <div style={{ zIndex: 1, textAlign: "center", color: "var(--text-faint)", pointerEvents: "none" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>⬡</div>
                    <div style={{ fontSize: "0.9rem", fontFamily: "var(--font-display)", fontStyle: "italic" }}>
                      Tessellation Workspace Empty
                    </div>
                    <div style={{ fontSize: "0.72rem", marginTop: "0.25rem" }}>
                      Add folios from the sidebar database or trigger Acoustic Coherence Snap
                    </div>
                  </div>
                ) : (
                  [...activeLayers].reverse().map((layer, index) => (
                    <div
                      key={layer.layerId}
                      style={{
                        position: "absolute",
                        width: "80%",
                        height: "80%",
                        transition: "opacity 0.15s, transform 0.15s",
                        opacity: layer.opacity,
                        transform: `rotate(${layer.rotation}deg) scale(${layer.scale})`,
                        mixBlendMode: layer.blendMode as React.CSSProperties["mixBlendMode"],
                        filter: layer.inverted ? "invert(1) brightness(1.2) contrast(1.2)" : "none",
                        zIndex: index + 1,
                        pointerEvents: "none"
                      }}
                    >
                      <Image
                        src={layer.folio.path}
                        alt={layer.folio.title}
                        fill
                        unoptimized
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  ))
                )}

                {/* Geometric SVG Guides */}
                {showSevenfold && (
                  <svg style={{ position: "absolute", width: "85%", height: "85%", stroke: "rgba(201, 168, 76, 0.35)", fill: "none", strokeWidth: "1", zIndex: 50, pointerEvents: "none" }} viewBox="0 0 200 200">
                    {/* Heptagon circles rosette guide */}
                    <circle cx="100" cy="100" r="80" strokeDasharray="3,3" />
                    {[...Array(7)].map((_, i) => {
                      const angle = (i * 360) / 7;
                      const rad = (angle * Math.PI) / 180;
                      const cx = 100 + 40 * Math.cos(rad);
                      const cy = 100 + 40 * Math.sin(rad);
                      return <circle key={i} cx={cx} cy={cy} r="40" />;
                    })}
                    <circle cx="100" cy="100" r="40" stroke="var(--gold)" />
                    {/* Heptagon lines */}
                    <polygon points={
                      [...Array(7)].map((_, i) => {
                        const angle = (i * 360) / 7 - 90;
                        const rad = (angle * Math.PI) / 180;
                        return `${100 + 80 * Math.cos(rad)},${100 + 80 * Math.sin(rad)}`;
                      }).join(" ")
                    } stroke="rgba(76, 201, 201, 0.25)" />
                  </svg>
                )}

                {showVesica && (
                  <svg style={{ position: "absolute", width: "80%", height: "80%", stroke: "rgba(76, 201, 201, 0.4)", fill: "none", strokeWidth: "1.2", zIndex: 51, pointerEvents: "none" }} viewBox="0 0 200 200">
                    {/* Vesica Piscis intersecting circles */}
                    <circle cx="70" cy="100" r="60" />
                    <circle cx="130" cy="100" r="60" />
                    <line x1="100" y1="40" x2="100" y2="160" strokeDasharray="4,4" />
                    <line x1="40" y1="100" x2="160" y2="100" strokeDasharray="4,4" />
                  </svg>
                )}

                {showDecagon && (
                  <svg style={{ position: "absolute", width: "90%", height: "90%", stroke: "rgba(90, 88, 112, 0.4)", fill: "none", strokeWidth: "0.8", zIndex: 52, pointerEvents: "none" }} viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="90" />
                    {[...Array(10)].map((_, i) => {
                      const angle = (i * 360) / 10;
                      const rad = (angle * Math.PI) / 180;
                      const x = 100 + 90 * Math.cos(rad);
                      const y = 100 + 90 * Math.sin(rad);
                      return <line key={i} x1="100" y1="100" x2={x} y2={y} />;
                    })}
                    <polygon points={
                      [...Array(10)].map((_, i) => {
                        const angle = (i * 360) / 10;
                        const rad = (angle * Math.PI) / 180;
                        return `${100 + 90 * Math.cos(rad)},${100 + 90 * Math.sin(rad)}`;
                      }).join(" ")
                    } />
                  </svg>
                )}

                {showHexagram && (
                  <svg style={{ position: "absolute", width: "85%", height: "85%", stroke: "rgba(201, 168, 76, 0.45)", fill: "none", strokeWidth: "1.2", zIndex: 53, pointerEvents: "none" }} viewBox="0 0 200 200">
                    {/* Seal of Solomon Hexagram */}
                    <polygon points="100,20 170,140 30,140" stroke="var(--gold)" />
                    <polygon points="100,180 170,60 30,60" stroke="var(--gold)" />
                    <circle cx="100" cy="100" r="80" strokeDasharray="2,2" stroke="var(--cyan)" />
                  </svg>
                )}
              </div>

              {/* Toggle Vector Overlay Guides */}
              <div className="card" style={{ padding: "1rem", background: "var(--bg-surface)", borderColor: "var(--border)" }}>
                <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "0.75rem", fontWeight: 600 }}>
                  Geometric Reference Guides
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  <button
                    onClick={() => setShowSevenfold(!showSevenfold)}
                    className="btn btn-sm"
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      background: showSevenfold ? "var(--gold-glow)" : "transparent",
                      color: showSevenfold ? "var(--gold)" : "var(--text-muted)",
                      borderColor: showSevenfold ? "var(--gold-dim)" : "var(--border)"
                    }}
                  >
                    Rosette (7-fold)
                  </button>
                  <button
                    onClick={() => setShowVesica(!showVesica)}
                    className="btn btn-sm"
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      background: showVesica ? "var(--cyan-glow)" : "transparent",
                      color: showVesica ? "var(--cyan)" : "var(--text-muted)",
                      borderColor: showVesica ? "var(--cyan-dim)" : "var(--border)"
                    }}
                  >
                    Vesica Piscis
                  </button>
                  <button
                    onClick={() => setShowDecagon(!showDecagon)}
                    className="btn btn-sm"
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      background: showDecagon ? "rgba(255,255,255,0.05)" : "transparent",
                      color: showDecagon ? "var(--text)" : "var(--text-muted)",
                      borderColor: showDecagon ? "var(--text-faint)" : "var(--border)"
                    }}
                  >
                    Decagon Grid
                  </button>
                  <button
                    onClick={() => setShowHexagram(!showHexagram)}
                    className="btn btn-sm"
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      background: showHexagram ? "var(--gold-glow)" : "transparent",
                      color: showHexagram ? "var(--gold)" : "var(--text-muted)",
                      borderColor: showHexagram ? "var(--gold-dim)" : "var(--border)"
                    }}
                  >
                    Seal of Solomon
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Right: Stacking Layer Control Panel */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", padding: "1.25rem", height: "80vh", maxHeight: "80vh", overflowY: "auto", background: "var(--bg-surface)", borderColor: "var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--cyan)", fontWeight: 600 }}>
                  Active Workspace Stack
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--text-faint)" }}>
                  {activeLayers.length} Layers
                </span>
              </div>

              {activeLayers.length === 0 ? (
                <div style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", color: "var(--text-faint)", fontSize: "0.8rem", padding: "2rem" }}>
                  Workspace is empty. Add layers from the database list on the left to begin scaling, rotating, and blending.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {activeLayers.map((layer, idx) => (
                    <div
                      key={layer.layerId}
                      style={{
                        padding: "1rem",
                        background: "var(--bg-raised)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--r-md)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                      }}
                    >
                      {/* Title row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: "0.68rem", color: "var(--gold)", fontWeight: 600 }}>{layer.folio.folio}</div>
                          <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {layer.folio.title}
                          </div>
                        </div>
                        
                        <div style={{ display: "flex", gap: "0.15rem" }}>
                          <button 
                            onClick={() => moveLayerUp(idx)} 
                            disabled={idx === 0}
                            style={{ padding: "0.2rem", color: idx === 0 ? "var(--text-faint)" : "var(--cyan)", fontSize: "0.7rem" }}
                            title="Bring Forward"
                          >
                            ▲
                          </button>
                          <button 
                            onClick={() => moveLayerDown(idx)} 
                            disabled={idx === activeLayers.length - 1}
                            style={{ padding: "0.2rem", color: idx === activeLayers.length - 1 ? "var(--text-faint)" : "var(--cyan)", fontSize: "0.7rem" }}
                            title="Send Backward"
                          >
                            ▼
                          </button>
                          <button 
                            onClick={() => removeLayer(layer.layerId)} 
                            style={{ padding: "0.2rem 0.4rem", color: "red", fontSize: "0.75rem", marginLeft: "0.25rem" }}
                            title="Remove Layer"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      {/* Controls sliders */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.75rem" }}>
                        {/* Opacity */}
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", marginBottom: "0.15rem" }}>
                            <span>Opacity</span>
                            <span style={{ fontFamily: "var(--font-mono)", color: "var(--cyan)" }}>{Math.round(layer.opacity * 100)}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={layer.opacity}
                            onChange={(e) => updateLayer(layer.layerId, "opacity", parseFloat(e.target.value))}
                            style={{ width: "100%", accentColor: "var(--cyan)" }}
                          />
                        </div>

                        {/* Rotation */}
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", marginBottom: "0.15rem" }}>
                            <span>Rotation</span>
                            <span style={{ fontFamily: "var(--font-mono)", color: "var(--cyan)" }}>{Math.round(layer.rotation * 10) / 10}°</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="360"
                            step="0.5"
                            value={layer.rotation}
                            onChange={(e) => updateLayer(layer.layerId, "rotation", parseFloat(e.target.value))}
                            style={{ width: "100%", accentColor: "var(--cyan)" }}
                          />
                        </div>

                        {/* Scale */}
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", marginBottom: "0.15rem" }}>
                            <span>Scale</span>
                            <span style={{ fontFamily: "var(--font-mono)", color: "var(--cyan)" }}>{layer.scale.toFixed(2)}x</span>
                          </div>
                          <input
                            type="range"
                            min="0.2"
                            max="3.0"
                            step="0.05"
                            value={layer.scale}
                            onChange={(e) => updateLayer(layer.layerId, "scale", parseFloat(e.target.value))}
                            style={{ width: "100%", accentColor: "var(--cyan)" }}
                          />
                        </div>

                        {/* Blend mode and invert row */}
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginTop: "0.25rem" }}>
                          <div style={{ flexGrow: 1 }}>
                            <div style={{ color: "var(--text-muted)", marginBottom: "0.15rem", fontSize: "0.7rem" }}>Blend Mode</div>
                            <select
                              value={layer.blendMode}
                              onChange={(e) => updateLayer(layer.layerId, "blendMode", e.target.value)}
                              style={{
                                width: "100%",
                                padding: "0.25rem",
                                background: "var(--bg-elevated)",
                                border: "1px solid var(--border)",
                                borderRadius: "var(--r-sm)",
                                fontSize: "0.72rem",
                                color: "var(--text)",
                                outline: "none",
                              }}
                            >
                              <option value="normal">Normal</option>
                              <option value="screen">Screen (Lighten)</option>
                              <option value="multiply">Multiply (Darken)</option>
                              <option value="difference">Difference</option>
                              <option value="color-dodge">Color Dodge</option>
                              <option value="color-burn">Color Burn</option>
                              <option value="overlay">Overlay</option>
                              <option value="lighten">Lighten</option>
                              <option value="darken">Darken</option>
                            </select>
                          </div>

                          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                            <label style={{ display: "flex", alignItems: "center", gap: "0.25rem", cursor: "pointer", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                              <input
                                type="checkbox"
                                checked={layer.inverted}
                                onChange={(e) => updateLayer(layer.layerId, "inverted", e.target.checked)}
                                style={{ accentColor: "var(--cyan)" }}
                              />
                              Invert Colors
                            </label>
                          </div>
                        </div>

                        {/* Story Notes if available */}
                        {layer.folio.storyNotes && (
                          <div style={{ borderTop: "1px solid var(--border-faint)", marginTop: "0.5rem", paddingTop: "0.5rem", fontSize: "0.68rem", color: "var(--text-faint)", fontStyle: "italic" }}>
                            {layer.folio.storyNotes}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 4. Lore Modal: Acoustic Coherence Unlocked */}
      {showResonanceModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(5, 5, 10, 0.85)",
          backdropFilter: "blur(15px)",
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem"
        }}>
          <div className="card" style={{
            width: "100%",
            maxWidth: "680px",
            background: "var(--bg-surface)",
            borderColor: "var(--gold)",
            boxShadow: "0 0 50px rgba(201, 168, 76, 0.25)",
            padding: "2rem",
            maxHeight: "90vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
          }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div>
                <span className="label" style={{ color: "var(--gold)" }}>Acoustic Coherence Snapped</span>
                <h2 className="display-sm" style={{ color: "var(--text)", fontStyle: "normal", fontSize: "1.5rem", marginTop: "0.25rem" }}>
                  Harmonic Resonance Achieved
                </h2>
              </div>
              <button 
                onClick={() => setShowResonanceModal(false)}
                style={{ fontSize: "1.2rem", color: "var(--text-faint)" }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: "2rem", alignItems: "center" }} className="modal-content-grid">
              
              {/* Lore text description */}
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "1rem", lineHeight: 1.7 }}>
                <p>
                  <strong>Heptagonal & Carrier Wave Alignment:</strong> By rotating the Voynich Great Rosette 
                  (<em>f.85v-86r</em>) to the sevenfold rosette angle of <strong>51.4°</strong> and stacking the 
                  Ars Notoria Compendium (<em>AN-03</em>) at the carrier wave angle of <strong>111.2°</strong>, 
                  you have mapped the geometric intersections that Brother Aldric fragmented in 1267.
                </p>
                
                <p style={{ borderLeft: "2px solid var(--gold-dim)", paddingLeft: "0.75rem", fontStyle: "italic" }}>
                  &ldquo;The Voynich biological section isn&apos;t depicting one chamber. It&apos;s depicting eight. 
                  Connected by the tube system... exact to the level of measurement error in the folio photographs.&rdquo; 
                  <span style={{ fontSize: "0.7rem", color: "var(--gold)", display: "block" }}>— Book II, Chapter 24</span>
                </p>

                <p>
                  <strong>The Resonance Cipher:</strong> The seven constants of the trilogy 
                  (7 satchels, 47 seconds, 333 Hz, 712 figures, 1267 year, 3915 fundamental, 28800 Breitling beats) 
                  are steganographic word indices in the manuscript. Extracting them yields the Latin root 
                  <strong> RESONAT</strong> (&ldquo;It resounds&rdquo;). Tracing their gematria coordinates 
                  at 60° intervals traces the **Seal of Solomon** hexagram plotted to the right.
                </p>
              </div>

              {/* Distorted hexagram SVG */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                <div style={{
                  width: "200px",
                  height: "200px",
                  background: "#080812",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                }}>
                  <svg width="200" height="200" viewBox="0 0 200 200" style={{ stroke: "var(--gold)", fill: "none", strokeWidth: "1.2" }}>
                    {/* Polar grid lines (60 deg intervals) */}
                    {[...Array(3)].map((_, i) => {
                      const angle = i * 60;
                      const rad = (angle * Math.PI) / 180;
                      const x1 = 100 - 90 * Math.cos(rad);
                      const y1 = 100 - 90 * Math.sin(rad);
                      const x2 = 100 + 90 * Math.cos(rad);
                      const y2 = 100 + 90 * Math.sin(rad);
                      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--border-faint)" strokeWidth="0.8" strokeDasharray="3,3" />;
                    })}
                    
                    {/* Distorted hexagram lines for RESONAT */}
                    {/* R (18/26, 0deg) -> E (5/26, 60deg) -> S (19/26, 120deg) -> O (15/26, 180deg) -> N (14/26, 240deg) -> A (1/26, 300deg) -> T (20/26, 360deg) */}
                    {/* Coordinates calculated in center (100,100), scale factor 90 */}
                    {/* R: 100 + (18/26)*90 * cos(0) = 162.3, 100 + (18/26)*90 * sin(0) = 100 */}
                    {/* E: 100 + (5/26)*90 * cos(60) = 108.6, 100 + (5/26)*90 * sin(60) = 115.0 */}
                    {/* S: 100 + (19/26)*90 * cos(120) = 67.1, 100 + (19/26)*90 * sin(120) = 157.0 */}
                    {/* O: 100 + (15/26)*90 * cos(180) = 48.1, 100 + (15/26)*90 * sin(180) = 100 */}
                    {/* N: 100 + (14/26)*90 * cos(240) = 75.8, 100 + (14/26)*90 * sin(240) = 58.1 */}
                    {/* A: 100 + (1/26)*90 * cos(300) = 101.7, 100 + (1/26)*90 * sin(300) = 97.0 */}
                    {/* T: 100 + (20/26)*90 * cos(360) = 169.2, 100 + (20/26)*90 * sin(360) = 100 */}
                    
                    <polygon 
                      points="162.3,100 108.6,115.0 67.1,157.0 48.1,100 75.8,58.1 101.7,97.0 169.2,100" 
                      stroke="var(--cyan)" 
                      strokeWidth="1.5" 
                    />
                    
                    {/* Sub-structures tracing the triangles */}
                    <polygon points="162.3,100 67.1,157.0 75.8,58.1" stroke="rgba(201, 168, 76, 0.4)" />
                    <polygon points="108.6,115.0 48.1,100 101.7,97.0" stroke="rgba(201, 168, 76, 0.4)" />

                    {/* Point markers */}
                    <circle cx="162.3" cy="100" r="3" fill="var(--gold)" />
                    <circle cx="108.6" cy="115.0" r="3" fill="var(--gold)" />
                    <circle cx="67.1" cy="157.0" r="3" fill="var(--gold)" />
                    <circle cx="48.1" cy="100" r="3" fill="var(--gold)" />
                    <circle cx="75.8" cy="58.1" r="3" fill="var(--gold)" />
                    <circle cx="101.7" cy="97.0" r="3" fill="var(--gold)" />
                    <circle cx="169.2" cy="100" r="3" fill="var(--gold)" />
                  </svg>
                  
                  <div style={{ position: "absolute", bottom: "0.5rem", fontSize: "0.6rem", color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>
                    R-E-S-O-N-A-T
                  </div>
                </div>
                <span style={{ fontSize: "0.68rem", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Gematria Sigil</span>
              </div>

            </div>

            <button 
              onClick={() => setShowResonanceModal(false)}
              className="btn btn-gold btn-sm"
              style={{ width: "120px", margin: "0 auto", justifyContent: "center" }}
            >
              Acknowledge
            </button>
            
          </div>
        </div>
      )}
    </>
  );
}
