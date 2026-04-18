import os, re

base = r'd:\Development\TrenchHammer\WebApplication\.github\instructions'

search_units = {
    'Aeldari.md': ['Aspect Warrior', 'Dark Reaper', 'Dire Avenger', 'Dragon Knight', 'Dragonlord', 'Fire Dragon', 'Guardian', 'Howling Banshee', 'Seer', 'Shining Spear', 'Striking Scorpion', 'Swooping Hawk', 'Warlock', 'Warp Spider', 'Wraithseer'],
    'Astra Militarum.md': ['Castellan', 'Primaris Psyker'],
    'Adeptus Mechanicus.md': ['Kataphron', 'Sicarian', 'Skitarii', 'Tech-Thrall', 'Myrmidon', 'Huscarl'],
    'Adeptus Arbites.md': ['Gang Leader', 'Gang Champion', 'Ganger', 'Juve'],
    'Adepta Sororitas.md': ['Paragon Warsuit'],
    'Genestealer Cults.md': ['Acolyte', 'Genestealer', 'Magus', 'Neophyte', 'Patriarch'],
    'World Eaters.md': ['Goremonger', 'Cultist'],
    'Harlequins.md': ['Mime'],
    'The Inquisition.md': ['Inquisitor'],
    'Leagues of Votann.md': ['Grimnyr', 'Hearthkyn'],
    'Necrons.md': ['Immortal', 'Warrior'],
    'Necromunda Gang.md': ['Cyber Mastiff', 'Ganger', 'Sanctioner'],
    'Officio Assassinorum.md': ['Aspirant'],
    'Orks.md': ['Boy', 'Nob', 'Squighog'],
    'Pirate Crew.md': ['Pirate', 'First Mate', 'Champion', 'Veteran'],
    'Rogue Trader.md': ['Voidsman'],
    'Slanni.md': ['Battle Mage'],
    "T'au Empire.md": ['Drone', 'Fire Warrior', 'Kroot Shaper'],
    'The Vermintide.md': ['Clawlord', 'Deathmaster', 'Warlock', 'Skavenslave', 'Clanrat', 'Stormvermin', 'Weapons Team', 'Rat Ogryn', 'Doom Flayer'],
}

for fname, units in search_units.items():
    for root, dirs, files in os.walk(base):
        if fname in files:
            fp = os.path.join(root, fname)
            with open(fp, 'r', encoding='utf-8') as f:
                content = f.read()
            for unit in units:
                pattern = r'####[^#]*?' + re.escape(unit) + r'.*?(?=\n####|\Z)'
                match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
                if match:
                    section = match.group(0)
                    if '**Abilities**' in section or '**Abilities:**' in section:
                        abilities = re.findall(r'\*\s*\*\*([^*]+?)(?:\.|:)\*\*', section)
                        if abilities:
                            print(f'{fname} | {unit}: {abilities}')
                        else:
                            print(f'{fname} | {unit}: HAS ABILITIES SECTION (no parsed abilities)')
                    else:
                        print(f'{fname} | {unit}: NO ABILITIES')
                else:
                    print(f'{fname} | {unit}: UNIT NOT FOUND IN FILE')
            break
