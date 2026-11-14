# linear-testing

Sandbox repo for testing Linear Reviews (Diffs), PR automations and Loops.

```bash
pnpm install --frozen-lockfile
pnpm typecheck && pnpm test
pnpm lint
```

## CI on demand

Add these PR labels to force a CI job to fail:

- `fail-test`: fails the required `test` check
- `fail-lint`: fails the non-required `lint` check
