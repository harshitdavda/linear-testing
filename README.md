# linear-testing

Sandbox repo for testing Linear Reviews (Diffs), PR automations and Loops.

## Setup

Needs Node 24 and pnpm 10 (`corepack enable` picks the pinned version).

```bash
pnpm install     # install dependencies
pnpm test        # run the Vitest suite once
pnpm lint        # check formatting and lint rules with Biome
pnpm format      # apply Biome fixes
pnpm typecheck   # run the TypeScript compiler without emitting
```

CI runs `pnpm typecheck` and `pnpm test` in the required `test` job, and
`pnpm lint` in the `lint` job.

## CI on demand

Add these PR labels to force a CI job to fail:

- `fail-test`: fails the required `test` check
- `fail-lint`: fails the non-required `lint` check
