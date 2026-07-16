import sqlite3
import json

DB = r'C:\Users\sushm\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(DB)
cur = conn.cursor()

# 1. List tables
cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = [r[0] for r in cur.fetchall()]
print("=== TABLES ===")
print(tables)

# 2. List sessions for this project
print("\n=== RECENT SESSIONS (last 7 days) ===")
cur.execute("""
    SELECT id, project_id, directory, title, time_created
    FROM session
    ORDER BY time_created DESC
    LIMIT 30
""")
for row in cur.fetchall():
    sid, pid, directory, title, time_created = row
    print(f"  {sid} | project={pid} | dir={directory} | title={title[:80] if title else ''} | created={time_created}")

# 3. Find all unique project_ids
print("\n=== ALL PROJECTS ===")
cur.execute("SELECT DISTINCT project_id, directory FROM session")
for row in cur.fetchall():
    print(f"  project_id={row[0]} | dir={row[1]}")

conn.close()
