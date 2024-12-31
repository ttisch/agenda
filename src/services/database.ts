import Database from '@tauri-apps/plugin-sql';

let db: Database | null = null;

export async function initDatabase() {
  if (!db) {
    db = await Database.load('sqlite:planner.db');
    await db.execute(`
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        start TEXT NOT NULL,
        end TEXT,
        all_day BOOLEAN DEFAULT FALSE
      )
    `);
  }
  return db;
}

export async function getEvents() {
  const db = await initDatabase();
  const result = await db.select('SELECT * FROM events');
  console.log(result);
  console.log('test', { test: true });
  return result;
}

export async function addEvent(event: {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
}) {
  console.log(event);
  const db = await initDatabase();
  await db.execute(
    'INSERT INTO events (id, title, start, end, all_day) VALUES ($1, $2, $3, $4, $5)',
    [event.id, event.title, event.start, event.end || null, event.allDay || false]
  );
}

export async function deleteEvent(id: string) {
  const db = await initDatabase();
  await db.execute('DELETE FROM events WHERE id = $1', [id]);
}
