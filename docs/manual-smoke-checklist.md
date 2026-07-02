# Manual Smoke Checklist

Run this checklist after each non-trivial refactor or data/rules update.

## Core Builder Flows

1. Faction + subfaction switching
- Change faction and subfaction.
- Confirm available units/wargear/rules update correctly.

2. Unit lifecycle and limits
- Add multiple units.
- Change model counts.
- Confirm min/max and roster constraints are enforced.

3. Wargear selection and slot validation
- Add valid wargear.
- Attempt conflicting/invalid loadouts.
- Confirm warnings/errors and cost updates are correct.

4. Upgrade selection and keyword recomputation
- Add/remove upgrades and stacked upgrades.
- Confirm keyword chips and ability text update correctly.

5. Promotion and campaign-related toggles
- Promote/demote eligible units.
- Confirm keyword/cost/stat side effects remain correct.

6. Psychic powers and gifts
- Add/remove powers and gifts.
- Confirm credit/glory totals update correctly.

## Data and IO Flows

7. Save/load/export/import/share
- Save a roster.
- Export and re-import.
- Generate and open share URL.
- Confirm roster round-trip integrity.

8. Battle Mode
- Enter Battle Mode.
- Confirm both player and opponent unit cards render with expected stats and keywords.
- Exit back to builder without state loss.

## Platform Views

9. Desktop/mobile parity
- Repeat key checks on both desktop and mobile layouts.
- Confirm totals and keyword behavior match.

## Completion Criteria

- No blocker regressions found in checklist flows.
- Build and typecheck gates pass.
- Any known data mismatches from `qa:scan` are documented before release.
