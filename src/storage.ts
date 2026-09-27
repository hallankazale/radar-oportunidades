import type { AlertRule } from "./types";

const FAVORITES_KEY = "radar:favorites";
const ALERTS_KEY = "radar:alerts";

export function loadFavorites(): string[] {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveFavorites(ids: string[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

export function loadAlerts(): AlertRule[] {
  try {
    return JSON.parse(localStorage.getItem(ALERTS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveAlerts(alerts: AlertRule[]) {
  localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
}
