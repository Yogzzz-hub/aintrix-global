import sqlite3

DB = r'C:\Users\sushm\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(DB)
cur = conn.cursor()

# Task table schema
print("=== TASK SCHEMA ===")
cur.execute("PRAGMA table_info(task)")
for row in cur.fetchall():
    print(f"  {row}")

# Tasks
print("\n=== TASKS ===")
cur.execute("SELECT * FROM task ORDER BY rowid DESC LIMIT 20")
for row in cur.fetchall():
    print(f"  {row}")

# Full user message text in nav session
NAV_SESSION = 'ses_094a0736cffeLgSL79vrOaYihl'
print(f"\n=== FULL USER MESSAGE IN NAV SESSION ===")
cur.execute("""
    SELECT m.id, json_extract(m.data, '$.role') as role, m.time_created
    FROM message m
    WHERE m.session_id = ?
      AND json_extract(m.data, '$.role') = 'user'
    ORDER BY m.time_created
""", (NAV_SESSION,))
for mid, role, tc in cur.fetchall():
    cur2 = conn.cursor()
    cur2.execute("""
        SELECT json_extract(p.data, '$.text')
        FROM part p
        WHERE p.message_id = ? AND json_extract(p.data, '$.type') = 'text'
    """, (mid,))
    texts = [r[0] for r in cur2.fetchall() if r[0]]
    combined = '\n'.join(texts)
    print(combined)

# Full assistant final text in nav session
print(f"\n=== ASSISTANT FINAL TEXT IN NAV SESSION ===")
cur.execute("""
    SELECT p.id, json_extract(p.data, '$.text') as text
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE m.session_id = ?
      AND json_extract(m.data, '$.role') = 'assistant'
      AND json_extract(p.data, '$.type') = 'text'
    ORDER BY m.time_created DESC
    LIMIT 1
""", (NAV_SESSION,))
for pid, text in cur.fetchall():
    print(text)

conn.close()
