# Validation Workflow

This project uses a lightweight validation stack instead of active unit test runner maintenance.

## Required Gates

1. Build gate
- Run: `npm run build`
- Expected: TypeScript compile and Vite bundle succeed with no errors.

2. Static diagnostics gate
- Run: `npm run typecheck`
- Expected: no TypeScript errors.

3. Data sanity gate
- Run: `npm run qa:scan`
- Expected: command executes and prints comparison report.
- Note: existing data/rule drift may still be reported; treat as tracked debt unless a change specifically targets those mismatches.

4. Manual smoke gate
- Run the checklist in `docs/manual-smoke-checklist.md` for all user-facing changes.

## Legacy Tests

- Legacy tests are archived at `archive/legacy-tests`.
- They are retained for historical reference only and are not part of required day-to-day validation.
