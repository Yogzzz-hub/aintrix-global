import sqlite3
import json

DB = r'C:\Users\sushm\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(DB)
cur = conn.cursor()

PROJECT_ID = '9ba76c38-8b9b-403f-b78b-309342f59c27'

# 1. Sessions for this project
print("=== SESSIONS FOR THIS PROJECT ===")
cur.execute("""
    SELECT id, title, time_created
    FROM session
    WHERE project_id = ?
    ORDER BY time_created DESC
""", (PROJECT_ID,))
sessions = cur.fetchall()
for sid, title, tc in sessions:
    print(f"  {sid} | {title} | {tc}")

# 2. User messages for the navbar session (to understand intent)
NAV_SESSION = 'ses_094a0736cffeLgSL79vrOaYihl'
print(f"\n=== USER MESSAGES IN NAV SESSION ===")
cur.execute("""
    SELECT m.id, json_extract(m.data, '$.role') as role, m.time_created
    FROM message m
    WHERE m.session_id = ?
      AND json_extract(m.data, '$.role') = 'user'
    ORDER BY m.time_created
""", (NAV_SESSION,))
for mid, role, tc in cur.fetchall():
    # Get text parts
    cur2 = conn.cursor()
    cur2.execute("""
        SELECT json_extract(p.data, '$.text')
        FROM part p
        WHERE p.message_id = ? AND json_extract(p.data, '$.type') = 'text'
    """, (mid,))
    texts = [r[0] for r in cur2.fetchall() if r[0]]
    combined = ' '.join(texts)[:800] if texts else '(no text parts)'
    print(f"  [{tc}] {combined}")

# 3. Assistant tool calls in the navbar session
print(f"\n=== ASSISTANT TOOL CALLS IN NAV SESSION ===")
cur.execute("""
    SELECT m.id, p.time_created,
           json_extract(p.data, '$.type') as part_type,
           json_extract(p.data, '$.tool') as tool,
           substr(p.data, 1, 1200) as preview
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE m.session_id = ?
      AND json_extract(m.data, '$.role') = 'assistant'
    ORDER BY m.time_created, p.time_created
""", (NAV_SESSION,))
for mid, tc, ptype, tool, preview in cur.fetchall():
    if ptype == 'tool':
        print(f"  [{tc}] tool={tool} | {preview[:300]}")
    elif ptype == 'text':
        print(f"  [{tc}] text | {preview[:200]}")

# 4. Tasks for this project
print(f"\n=== TASKS FOR THIS PROJECT ===")
cur.execute("""
    SELECT id, session_id, title, status, created_at
    FROM task
    WHERE session_id IN (SELECT id FROM session WHERE project_id = ?)
    ORDER BY created_at DESC
""", (PROJECT_ID,))
for row in cur.fetchall():
    print(f"  task={row[0]} | session={row[1]} | title={row[2]} | status={row[3]} | created={row[4]}")

conn.close()
