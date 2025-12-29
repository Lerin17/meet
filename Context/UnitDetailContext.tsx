"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Unit } from "@/Context/UnitContext";

export type TimelineEvent = {
  id: string;
  unitId: string;
  phase: string; // e.g., "Foundation", "Framing", "Finishing"
  status: "not-started" | "in-progress" | "completed";
  startDate?: string; // ISO date
  endDate?: string; // ISO date
  notes?: string;
};

type UnitDetailContextType = {
  currentUnit: Unit | null;
  setCurrentUnit: (u: Unit | null) => void;
  timeLineData: TimelineEvent[];
  addEvent: (e: Omit<TimelineEvent, "id">) => void;
  updateEvent: (id: string, patch: Partial<TimelineEvent>) => void;
  removeEvent: (id: string) => void;
  clearTimeline: () => void;
  getEventsForUnit: (unitId: string) => TimelineEvent[];
};

const UnitDetailContext = createContext<UnitDetailContextType | undefined>(undefined);

const STORAGE_PREFIX = "unit_timeline_";

function keyFor(unitId: string) {
  return `${STORAGE_PREFIX}${unitId}`;
}

export const UnitDetailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUnit, setCurrentUnit] = useState<Unit | null>(null);
  const [timeLineData, setTimeline] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    // when currentUnit changes, load its timeLineData from localStorage
    if (!currentUnit) {
      setTimeline([]);
      return;
    }
    try {
      const raw = localStorage.getItem(keyFor(currentUnit.id));
      if (raw) setTimeline(JSON.parse(raw));
      else setTimeline([]);
    } catch {
      setTimeline([]);
    }
  }, [currentUnit]);

  useEffect(() => {
    // persist timeLineData when it changes (only if a unit is selected)
    if (!currentUnit) return;
    try {
      localStorage.setItem(keyFor(currentUnit.id), JSON.stringify(timeLineData));
    } catch {}
  }, [timeLineData, currentUnit]);

  const addEvent = (e: Omit<TimelineEvent, "id">) => {
    const id = `te_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const newEvent: TimelineEvent = { id, ...e } as TimelineEvent;
    setTimeline((s) => [newEvent, ...s]);
  };

  const updateEvent = (id: string, patch: Partial<TimelineEvent>) => {
    setTimeline((s) => s.map((ev) => (ev.id === id ? { ...ev, ...patch } : ev)));
  };

  const removeEvent = (id: string) => setTimeline((s) => s.filter((ev) => ev.id !== id));

  const clearTimeline = () => setTimeline([]);

  const getEventsForUnit = (unitId: string) => (unitId === currentUnit?.id ? timeLineData : []);

  const value: UnitDetailContextType = {
    currentUnit,
    setCurrentUnit,
    timeLineData,
    addEvent,
    updateEvent,
    removeEvent,
    clearTimeline,
    getEventsForUnit,
  };

  return <UnitDetailContext.Provider value={value}>{children}</UnitDetailContext.Provider>;
};

export const useUnitDetail = (): UnitDetailContextType => {
  const ctx = useContext(UnitDetailContext);
  if (!ctx) throw new Error("useUnitDetail must be used within a UnitDetailProvider");
  return ctx;
};

export default UnitDetailContext;
