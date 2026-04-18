import re

with open('src/data/factions_complete.ts', 'r', encoding='utf-8') as f:
    text = f.read()

replacements = [
    (r"    description: \"Emperor's Children only. \(65cr \+ 40cr Power Armour \+ Mark of Slaanesh; or swap to Terminator Armour \+25cr\)\",\n    defaultWargear: \[\n      \{ id: 'power_armour'", 
     "    description: \"Emperor's Children only. (65cr + 40cr Power Armour + Mark of Slaanesh; or swap to Terminator Armour +25cr)\",\n    defaultWargear: [\n      { id: 'ha_mark_slaanesh_kak', name: 'Mark of Slaanesh', type: 'equipment', slot: 'equipment', cost: 0,\n        keywords: ['SLAANESH'], description: '+2\" Movement. Included in base cost.', statModifiers: { movement: 2 } },\n      { id: 'power_armour'"),
    (r"    description: 'Thousand Sons only — mandatory Warband leader. \(85cr \+ 40cr Power Armour \+ Mark of Tzeentch; or swap to Terminator Armour \+25cr\)',\n    defaultWargear: \[\n      \{ id: 'power_armour'",
     "    description: 'Thousand Sons only — mandatory Warband leader. (85cr + 40cr Power Armour + Mark of Tzeentch; or swap to Terminator Armour +25cr)',\n    defaultWargear: [\n      { id: 'ha_mark_tzeentch_es', name: 'Mark of Tzeentch', type: 'equipment', slot: 'equipment', cost: 0,\n        keywords: ['TZEENTCH'], description: '+1 Armour Save. Included in base cost.', statModifiers: { armourSave: -1 } },\n      { id: 'power_armour'"),
    (r"    description: 'World Eaters only. \(75cr \+ 40cr Power Armour \+ Mark of Khorne; or swap to Terminator Armour \+25cr\)',\n    defaultWargear: \[\n      \{ id: 'power_armour'",
     "    description: 'World Eaters only. (75cr + 40cr Power Armour + Mark of Khorne; or swap to Terminator Armour +25cr)',\n    defaultWargear: [\n      { id: 'ha_mark_khorne_moe', name: 'Mark of Khorne', type: 'equipment', slot: 'equipment', cost: 0,\n        keywords: ['KHORNE'], description: 'Included in base cost.' },\n      { id: 'power_armour'"),
    (r"    description: 'World Eaters only. \(135cr \+ 40cr Power Armour \+ Mark of Khorne; or swap to Terminator Armour \+25cr\)',\n    defaultWargear: \[\n      \{ id: 'power_armour'",
     "    description: 'World Eaters only. (135cr + 40cr Power Armour + Mark of Khorne; or swap to Terminator Armour +25cr)',\n    defaultWargear: [\n      { id: 'ha_mark_khorne_sb', name: 'Mark of Khorne', type: 'equipment', slot: 'equipment', cost: 0,\n        keywords: ['KHORNE'], description: 'Included in base cost.' },\n      { id: 'power_armour'")
]

for old_str, new_str in replacements:
    text = re.sub(old_str, new_str.replace('\\', '\\\\'), text)

with open('src/data/factions_complete.ts', 'w', encoding='utf-8') as f:
    f.write(text)

