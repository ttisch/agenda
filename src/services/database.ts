import Database from '@tauri-apps/plugin-sql';

let db: Database | null = null;

export async function initDatabase() {
  if (!db) {
    db = await Database.load('sqlite:planner1.db');
    await db.execute(`
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        start TEXT NOT NULL,
        end TEXT,
        all_day BOOLEAN DEFAULT FALSE,
        done BOOLEAN DEFAULT FALSE
      )
    `);
  }
  return db;
}

export async function getEvents() {
  const db = await initDatabase();
  const result = await db.select('SELECT * FROM events');
  return result;
}

export async function addEvent(event: {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  done?: boolean;
}) {
  const db = await initDatabase();
  await db.execute(
    'INSERT INTO events (id, title, start, end, all_day, done) VALUES ($1, $2, $3, $4, $5, $6)',
    [
      event.id,
      event.title,
      event.start,
      event.end || null,
      event.allDay || false,
      event.done || false,
    ]
  );
}

export async function deleteEvent(id: string) {
  const db = await initDatabase();
  await db.execute('DELETE FROM events WHERE id = $1', [id]);
}

export async function updateEventDoneStatus(id: string, done: boolean) {
  const db = await initDatabase();
  await db.execute('UPDATE events SET done = $1 WHERE id = $2', [done, id]);
}
