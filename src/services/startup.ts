const INITIAL_STARTUP_KEY = 'planner_initial_startup';

export function isInitialStartup(): boolean {
  return localStorage.getItem(INITIAL_STARTUP_KEY) === null;
}

export function completeInitialStartup(): void {
  localStorage.setItem(INITIAL_STARTUP_KEY, 'completed');
}
