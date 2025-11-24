**Repository Purpose**
- **Overview:** This is an Express + TypeScript backend using Mongoose (MongoDB) that provides modular routes under `/api` (see `src/app/routes/index.ts`). The server entry points are `src/app.ts` (Express app setup) and `src/server.ts` (DB connect + listen).

**How to run (developer flow)**
- **Dev server:** `npm run dev` — runs `ts-node-dev` against `src/server.ts` for fast iteration.
- **Build:** `npm run build` — compiles TypeScript to `dist/` (used by `npm run start`).
- **Start (production):** `npm run start` — runs `node ./dist/server.js`.
- **Lint:** `npm run lint` — runs ESLint over `./src` using the repo `eslint.config.mjs`.

**Required environment variables**
- See `src/app/config/env.ts` — these are strictly checked at startup: `PORT`, `MONGO_URL`, `BCRYPT_SALT_ROUNDS`, `NODE_ENV`, `FRONTEND_URL`, `JWT_ACCESS_SECRET`, `JWT_ACCESS_EXPIRES`, `JWT_REFRESH_SECRET`, `JWT_REFRESH_EXPIRES`. Do not rename them.

**Project layout and conventions (what matters for code generation)**
- **Modular features:** Each feature lives under `src/app/modules/<feature>/` with a `*.route.ts`, `*.controller.ts`, `*.service.ts`, `*.model.ts`, and `*.validation.ts` when applicable. Example: `src/app/modules/auth/*`.
- **Route mounting:** Modules register under `src/app/routes/index.ts` via an array of `{ path, route }` objects; add new modules there to expose `/api/<path>`.
- **Controller pattern:** Controllers are thin; they call service functions and use `catchAsync` (see `src/app/utils/catchAsync.ts`) to return errors to the centralized handler.
- **Service pattern:** Business logic lives in `*.service.ts`. Service functions throw `AppError` for domain/HTTP errors (see `src/app/errorHelpers/AppError.ts`).
- **Responses:** Use the `sendResponse(res, { statusCode, success, message, data, meta? })` helper (`src/app/utils/sendResponse.ts`) so responses have consistent JSON shape.
- **Validation:** Zod is used for request validation. Middleware `validateSchema` (see `src/app/middleware/validateSchema.ts`) wraps Zod schemas from `*.validation.ts` files.
- **Errors:** Centralized error handling is in `src/app/middleware/globalErrorHandler.ts`. It normalizes Mongoose, Zod, duplicate-key, and custom `AppError` instances. Use `AppError` for predictable HTTP error behavior.
- **Authentication tokens / cookies:** Token creation uses `src/app/utils/userTokens.ts` and tokens are attached using `src/app/utils/setCookies.ts`. Cookies are set `httpOnly`, `secure`, `sameSite: 'none'` — be careful when changing cookie settings.

**Coding & PR guidance for an AI agent**
- **Small, focused changes:** Modify only the files relevant to the task. Keep public APIs and route mounts stable.
- **Follow existing patterns:** Implement new features by adding a module under `src/app/modules/<name>` with the same filenames and behaviors (route → controller → service → model → validation).
- **Use helpers:** When constructing responses, use `sendResponse`. For async route handlers wrap with `catchAsync` to integrate with the global error handler.
- **Throw `AppError`** for domain validation or permission problems rather than returning raw objects or `res.status(...)` in services.
- **Environment-aware logging:** Avoid polluting production output; the codebase uses `envVars.NODE_ENV === 'development'` checks in places like `catchAsync` and the global error handler.

**Files worth reading first**
- `src/app.ts` and `src/server.ts` — app lifecycle and DB connection.
- `src/app/routes/index.ts` — where modules are mounted.
- `src/app/middleware/globalErrorHandler.ts` and `src/app/errorHelpers/AppError.ts` — error model and handling.
- `src/app/utils/sendResponse.ts`, `src/app/utils/catchAsync.ts`, `src/app/utils/setCookies.ts` — shared helpers used everywhere.

**Build/test notes**
- There are currently no automated tests (package.json `test` is a placeholder). Add tests under a `test/` folder and a test runner script before assuming CI.
- Build writes to `dist/`; `npm run start` expects `dist/server.js` to exist. Use `npm run build` before `start` in production flows.

**Security & secrets**
- Do not hardcode secret values; use the required env variables. JWT secrets and cookie settings are used for auth; changing them affects all clients.

**Model preference / external model enablement**
- If you want an AI assistant to prefer a particular model (for example, Claude Haiku 4.5), document that preference here. Note: enabling or provisioning an external LLM (Claude Haiku 4.5) for "all clients" is an administrative/platform action (cloud account or org-level configuration) — it cannot be achieved by editing repository files alone. Please confirm whether you want a repository-level guidance note, or whether you want me to provide the exact admin steps or scripts to request that change from your platform/provider.

**Quick examples (copyable)**
- Dev run:

```bash
npm run dev
```

- Example response pattern (use `sendResponse`):

```ts
sendResponse(res, { statusCode: 200, success: true, message: 'OK', data: result });
```

**If something is missing or unclear**
- Tell me which areas you want expanded (deployment, CI, tests, or preferred LLM guidance) and I will iterate.
