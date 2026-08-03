import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("VenBooking.db");

export function initDatabase() {
  db.execSync(
    "CREATE TABLE IF NOT EXISTS favorites (id TEXT PRIMARY KEY NOT NULL);",
  );
}

export function fetchFavorites(): string[] {
  const result = db.getAllSync<{ id: string }>("SELECT id FROM favorites;");
  return result.map((row) => row.id);
}

export function dbToggleFavorite(id: string): void {
  const existing = db.getFirstSync<{ id: string }>(
    "SELECT id FROM favorites WHERE id = ?;",
    [id],
  );

  if (existing) {
    db.runSync("DELETE FROM favorites WHERE id = ?;", [id]);
  } else {
    db.runSync("INSERT INTO favorites (id) VALUES (?);", [id]);
  }
}
