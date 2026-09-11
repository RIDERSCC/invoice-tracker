# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is an early-stage Express API skeleton. `server.js` currently only defines a single root
route (`GET /`) that returns a health-check string. The `config/`, `controllers/`, `models/`, and
`routes/` directories exist but are empty — they establish the intended MVC-style structure for
where new code should go:

- `routes/` — Express route definitions (`express.Router()`), mounted from `server.js`
- `controllers/` — request-handling logic invoked by routes
- `models/` — data models (no database/ORM is wired up yet)
- `config/` — configuration (e.g. DB connection, env setup)

There is no database connection, no environment variable loading (e.g. `dotenv`), and no
authentication configured yet. When adding these, follow the existing folder scaffolding rather
than introducing a different structure.

## Commands

```powershell
npm install       # install dependencies
node server.js    # run the server (listens on http://localhost:3000)
```

There is no dev/watch script (e.g. nodemon) and no lint script configured. `npm test` is a
placeholder that exits with an error — no test framework is set up yet.

## Architecture notes

- Module system: CommonJS (`"type": "commonjs"` in package.json) — use `require`/`module.exports`,
  not ESM `import`/`export`.
- Only production dependency: `express` (v5).
- The port is hardcoded to `3000` in `server.js`.
- Not currently a git repository.
