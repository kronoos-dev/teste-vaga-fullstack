Next.js
AntD
ProComponents
MongoDB
Mongoose(ORM)
Redis
Docker

Front-end
- Display dossier
  - Table page
    - Upload action
      - Pre-validate CSV by field schema
- Add dossier
  - Tests
- Remove dossier
  - Tests
- Status of import in dossier
  - Realtime counter
    - Processing
    - Stored
    - Errors
  - Table
    - Paginated
    - Actions
      - Errors
        - Re-validated
          - Send
  - Tests
- Export dossier
 - Actions
  - CSV
   - Notification
    - Export is started
    - Export is finished(download by AWS)
    - Export is occured error
  - Tests
Back-end
- Upload route
  - WebSocket
  - Parsing data
    - Errors
      - Resend validated record
  - Convert data
  - Store data
  - Notification with WebSocket
  - Tests
- Routine/${slug} route
  - Paginate
  - Filter
  - Tests

Timeline
 - Forked repo.
 - Created basic app w/. react js and nextjs.
 - Added AntD Framework.
 - Created side navigation.
 - Created UI for "Dashboard".
 - Componentized side navigation and main layout.
 - Created UI for "All Dosiers".
 - Created UI for "Auditor of All Dosiers".
 - Released 0.1.0

Improvements
 - Lazy loading in historic of events(dashboard).
 - Thrash bin for dossiers and records.
 - INTL (English(US), Portuguese(BR)).