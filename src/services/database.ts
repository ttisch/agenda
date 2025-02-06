import Database from '@tauri-apps/plugin-sql';

let db: Database | null = null;

export async function initDatabase() {
  if (!db) {
    db = await Database.load('sqlite:agenda.db');
    await db.execute(`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        start TEXT NOT NULL,
        end TEXT,
        all_day BOOLEAN DEFAULT FALSE,
        done BOOLEAN DEFAULT FALSE
      )
    `);
    await db.execute(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )
    `);

    // Initialize default business hours if not exist
    const defaultBusinessHours = {
      startTime: '07:00',
      endTime: '16:00',
      workDays: [1, 2, 3, 4, 5],
    };
    await db.execute("INSERT OR IGNORE INTO settings (key, value) VALUES ('businessHours', $1)", [
      JSON.stringify(defaultBusinessHours),
    ]);
  }
  return db;
}

export async function getEvents() {
  const db = await initDatabase();
  const result = await db.select('SELECT * FROM events');
  return result;
}

// get undone events before the given date
export async function getUndoneEventsBefore(date: string) {
  const db = await initDatabase();
  const result = await db.select(
    'SELECT * FROM events WHERE (done = "false" OR done = NULL) AND start < $1',
    [date]
  );
  return result;
}

// get undone events after the given date
export async function getEventsAfter(date: string) {
  const db = await initDatabase();
  const result = await db.select('SELECT * FROM events WHERE start > $1', [date]);
  return result;
}

export async function addEvent(event: {
  // id?: number;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  done?: boolean;
}): Promise<any> {
  const db = await initDatabase();
  const result = await db.execute(
    'INSERT INTO events (title, start, end, all_day, done) VALUES ($1, $2, $3, $4, $5)',
    [
      // event.id,
      event.title,
      event.start,
      event.end || null,
      event.allDay || false,
      event.done || false,
    ]
  );
  console.log('addEvent result', result);
  return { ...event, id: result.lastInsertId };
}

export async function updateEvent(
  id: string,
  event: {
    title: string;
    start: string;
    end?: string;
    allDay?: boolean;
    done?: boolean;
  }
) {
  const db = await initDatabase();
  await db.execute(
    'UPDATE events SET title = $1, start = $2, end = $3, all_day = $4, done = $5 WHERE id = $6',
    [event.title, event.start, event.end || null, event.allDay || false, event.done || false, id]
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

export async function getBusinessHours() {
  const db = await initDatabase();
  const result = await db.select<[{ value: string }]>(
    "SELECT value FROM settings WHERE key = 'businessHours'"
  );
  return JSON.parse(result[0].value);
}

export async function updateBusinessHours(businessHours: {
  startTime: string;
  endTime: string;
  workDays: number[];
}) {
  const db = await initDatabase();
  await db.execute("UPDATE settings SET value = $1 WHERE key = 'businessHours'", [
    JSON.stringify(businessHours),
  ]);
}
