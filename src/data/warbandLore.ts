/**
 * Warband / Sub-faction Lore — Background stories for each warband variant.
 * Includes leader/primarch information for each warband.
 * Built in batches to keep generation manageable.
 */

export interface WarbandLoreEntry {
  /** Matches the subfaction id in subfactions.ts */
  warbandId: string;
  /** Parent faction id */
  factionId: string;
  name: string;
  motto?: string;
  overview: string;
  history: string;
  /** The primarch, chapter master, warboss, or notable leader */
  leader: {
    name: string;
    title: string;
    description: string;
  };
  notableTraits: string[];
  combatDoctrine: string;
  whyPlay: string;
}

export const WARBAND_LORE: Record<string, WarbandLoreEntry> = {

// ═══════════════════════════════════════════════════════════════════════
// HERETIC ASTARTES WARBANDS
// ═══════════════════════════════════════════════════════════════════════

alpha_legion: {
  warbandId: 'alpha_legion',
  factionId: 'heretic_astartes',
  name: 'Alpha Legion',
  motto: '"I am Alpharius."',
  overview:
    'The Alpha Legion is the most secretive and enigmatic of all the Traitor Legions. Masters of ' +
    'deception, misdirection, and covert warfare, they operate through elaborate schemes, sleeper agents, ' +
    'and layers of false identities. No one — not even their own allies — truly knows the Alpha Legion\'s ' +
    'ultimate goals. They may serve Chaos, they may secretly serve the Emperor, or they may serve only themselves.',
  history:
    'The XXth Legion was the last to be founded and the last to be united with its Primarch — or rather, ' +
    'Primarchs. Alpharius and Omegon were twin brothers, a secret known to almost no one outside the Legion. ' +
    'During the Great Crusade they proved brilliant tacticians who favoured unconventional warfare: infiltration, ' +
    'sabotage, and turning enemy assets against themselves. When the Horus Heresy erupted, the Alpha Legion ' +
    'declared for Horus, but their true allegiance has been debated for ten thousand years. Some records suggest ' +
    'they were influenced by the alien Cabal, who prophesied that a Chaos victory would ultimately destroy Chaos ' +
    'itself. Alpharius was reportedly slain by Rogal Dorn, but given the Legion\'s culture of body doubles and ' +
    'identity swapping, nothing is certain. Omegon\'s fate remains completely unknown.',
  leader: {
    name: 'Alpharius / Omegon',
    title: 'The Twin Primarchs, The Last Found',
    description:
      'Alpharius and Omegon were identical twin Primarchs — the only such pair among the twenty. Both were ' +
      'smaller than most Primarchs, closer to the size of a large Space Marine, which allowed them to seamlessly ' +
      'swap identities with their legionaries. Their philosophy emphasized that every operative was equally ' +
      'important; any Alpha Legionnaire might claim to be Alpharius. This made the Legion nearly impossible to ' +
      'decapitate. Their tactical genius lay not in brute force but in making the enemy defeat themselves.',
  },
  notableTraits: [
    'Extreme use of deception, false flags, and sleeper cells embedded in enemy organisations',
    'Operatives frequently pose as members of other Legions or factions',
    'Employ human agent networks (cultists, turncoats) extensively before committing Astartes',
    'Operate in independent cells — destroying one reveals nothing about the others',
    'The phrase "I am Alpharius" is used by all members, making identification impossible',
  ],
  combatDoctrine:
    'The Alpha Legion fights the battle before the battle. By the time bolters are fired, the enemy\'s supply ' +
    'lines are cut, their communications compromised, and their commanders fed false intelligence. When they ' +
    'do engage directly, they strike from unexpected vectors with overwhelming local superiority, then vanish ' +
    'before a coordinated response can form.',
  whyPlay:
    'Pick the Alpha Legion if you love the idea of out-thinking your opponent. A warband of spies, saboteurs, ' +
    'and tricksters where nothing is as it seems — the perfect choice for players who enjoy mind games.',
},

death_guard: {
  warbandId: 'death_guard',
  factionId: 'heretic_astartes',
  name: 'Death Guard',
  motto: '"We are the lords of decay."',
  overview:
    'The Death Guard are the Plague Marines of Nurgle — a Legion of rotting, pestilent warriors who have ' +
    'embraced disease as a divine gift. Bloated and corroded, they trudge inexorably across the battlefield, ' +
    'shrugging off wounds that would fell any other warrior, spreading virulent plagues that dissolve flesh ' +
    'and warp metal. Where they tread, the ground festers and the air fills with the drone of plague flies.',
  history:
    'Once the XIV Legion, the Death Guard were paragons of endurance and resilience. Recruited from the ' +
    'toxic deathworld of Barbarus, they were among the toughest Astartes ever created. Their Primarch Mortarion ' +
    'led them through the most gruelling campaigns of the Great Crusade, specialising in hazardous environments ' +
    'and wars of attrition. When Horus turned traitor, Mortarion followed, but it was during the voyage to ' +
    'Terra that the Legion truly fell. Trapped in the Warp by Nurgle\'s machinations, the entire Legion was ' +
    'struck by the Destroyer Plague — a disease so horrific that even Space Marines begged for death. Only by ' +
    'accepting Nurgle\'s "gift" did they survive, reborn as Plague Marines. Mortarion became a Daemon Prince, ' +
    'ruling the Plague Planet in Nurgle\'s Garden.',
  leader: {
    name: 'Mortarion',
    title: 'The Death Lord, Daemon Primarch of Nurgle',
    description:
      'Mortarion grew up on the poison-shrouded world of Barbarus, where he was raised by an alien necromancer ' +
      'warlord. He learned to endure every toxin and plague, eventually leading a rebellion against his adoptive ' +
      'father. The Emperor arrived and finished the fight Mortarion could not, a humiliation the Primarch never ' +
      'forgot. Now a massive, winged Daemon Prince wreathed in plague smoke, Mortarion wields the scythe Silence ' +
      'and the Lantern, a toxic censer that fills the air with supernatural disease. He despises psykers yet has ' +
      'become one of the most powerful sorcerers in the galaxy — an irony he refuses to acknowledge.',
  },
  notableTraits: [
    'Extreme durability — Plague Marines ignore wounds that would cripple other Astartes',
    'Spread supernatural diseases that corrode armour, rot flesh, and sap the will to fight',
    'Accompanied by clouds of Nurgle\'s daemon flies and shambling Poxwalkers',
    'Favour chemical and biological weapons alongside bolters and scythes',
    'Serve Nurgle, the Chaos God of pestilence, decay, and morbid resilience',
  ],
  combatDoctrine:
    'The Death Guard advance slowly but relentlessly. They absorb firepower that would annihilate other forces, ' +
    'closing to mid-range where their plague weapons, blight grenades, and toxic auras overwhelm the enemy. ' +
    'They don\'t need speed — the enemy cannot kill them fast enough, and the plagues do the rest.',
  whyPlay:
    'Choose the Death Guard if you want an almost unkillable warband that grinds the enemy down through sheer ' +
    'attrition. Few things are more satisfying than watching your opponent pour firepower into Plague Marines ' +
    'and watching them keep coming.',
},

emperors_children: {
  warbandId: 'emperors_children',
  factionId: 'heretic_astartes',
  name: 'Emperor\'s Children',
  motto: '"Children of the Emperor! Death to his foes!"',
  overview:
    'The Emperor\'s Children are the chosen of Slaanesh, the Prince of Excess. Once the most elegant and ' +
    'perfection-obsessed of all Space Marine Legions, they have descended into absolute hedonism, seeking ever ' +
    'more extreme sensations in battle. Their armour is garish purple and gold, their weapons modified to ' +
    'produce agonising harmonics, and every kill is savoured like fine wine.',
  history:
    'The III Legion once bore the supreme honour of carrying the Emperor\'s own name and heraldry — the ' +
    'palatine aquila. They were devastated early in their history by gene-seed corruption that reduced their ' +
    'numbers to barely two hundred, but under Fulgrim\'s leadership they rebuilt into a force obsessed with ' +
    'perfection in all things — war, art, diplomacy, and culture. The rot began when Fulgrim discovered the ' +
    'Laer Blade, a daemon sword on the xenos world of Laeran. The weapon slowly corrupted him and, through him, ' +
    'the entire Legion. By the time of the Drop Site Massacre on Isstvan V, the Emperor\'s Children had fully ' +
    'embraced Slaanesh. During the Siege of Terra, rather than assaulting the Palace, they descended on the ' +
    'civilian population of Terra in an orgy of unspeakable excess. Fulgrim ascended to Daemon Prince.',
  leader: {
    name: 'Fulgrim',
    title: 'The Phoenician, Daemon Primarch of Slaanesh',
    description:
      'Fulgrim was the most beautiful of the Primarchs, raised on the dying mining world of Chemos where he ' +
      'revived civilisation through sheer willpower and charisma. He demanded perfection from himself and his ' +
      'Legion in all things. His fall to Slaanesh was gradual — the Laer Blade slowly eroded his resistance, ' +
      'and when he slew his closest brother Ferrus Manus in combat, the grief and horror broke his soul. Now a ' +
      'serpentine Daemon Prince of terrifying beauty, Fulgrim embodies excess in all its forms — pleasure, pain, ' +
      'art, cruelty, and sensation beyond mortal comprehension.',
  },
  notableTraits: [
    'Enhanced senses push beyond limits — they hear, see, and feel on a superhuman level',
    'Sonic weapons (Blastmasters, Doom Sirens) that kill through pure sound',
    'Extreme speed and reflexes, often striking before the enemy can react',
    'Devoted to Slaanesh, the Chaos God of excess, sensation, and perfection',
    'Narcissistic warriors who see battle as performance art',
  ],
  combatDoctrine:
    'The Emperor\'s Children favour lightning-fast assaults, using their preternatural speed to close with the ' +
    'enemy before they can react. Sonic weapons shatter formations at range while Noise Marines advance in a ' +
    'wall of deafening sound. In melee they are blinding fast, relishing every cut given and received.',
  whyPlay:
    'Choose the Emperor\'s Children if you want a fast, aggressive warband with unique sonic weaponry. ' +
    'Style, speed, and a flair for the dramatic — the rockstars of Chaos.',
},

iron_warriors: {
  warbandId: 'iron_warriors',
  factionId: 'heretic_astartes',
  name: 'Iron Warriors',
  motto: '"Iron within, iron without."',
  overview:
    'The Iron Warriors are siege warfare incarnate. Cold, bitter, and brutally pragmatic, they tear down ' +
    'fortifications with the same mechanical efficiency they apply to every aspect of war. They despise ' +
    'weakness and view glory-seeking as foolish vanity. To the Iron Warriors, war is mathematics — an equation ' +
    'of firepower, logistics, and acceptable losses.',
  history:
    'The IV Legion was forged for one purpose: to break the unbreakable. During the Great Crusade, they were ' +
    'assigned the most thankless sieges — grinding, attritional campaigns that other Legions refused. Their ' +
    'Primarch Perturabo resented this role bitterly, watching brothers like Dorn and Guilliman receive glory ' +
    'while his warriors bled in the trenches. This simmering resentment was the kindling that Horus ignited. ' +
    'The Iron Warriors joined the Heresy almost eagerly, their first act the infamous decimation of their own ' +
    'loyalist elements at Isstvan V. Their rivalry with the Imperial Fists culminated in the Iron Cage, a ' +
    'trap Perturabo laid after the Heresy that nearly destroyed Dorn\'s Legion. Now scattered across the Eye ' +
    'of Terror, Iron Warrior warbands hire out as siege specialists, building daemon-engine forges and ' +
    'fortresses of iron and hate.',
  leader: {
    name: 'Perturabo',
    title: 'The Lord of Iron, Daemon Primarch of Chaos Undivided',
    description:
      'Perturabo was a genius of architecture and engineering, capable of designing wonders or weapons of ' +
      'unimaginable power. Raised on the world of Olympia, he was adopted by a tyrant whose paranoia infected ' +
      'his own worldview. He shared a close bond with Magnus the Red, joining forces on campaigns like the ' +
      'tragedy of Morningstar. Brilliant but embittered, Perturabo saw himself as perpetually unappreciated — ' +
      'the workhorse while lesser brothers received accolades. His fall was one of wounded pride rather than ' +
      'corruption. He ascended to Daemon Prince by consuming the heart of a Warp entity, becoming a being of ' +
      'cold iron and bitter intellect enthroned in the daemon world of Medrengard.',
  },
  notableTraits: [
    'Unmatched siege craft — fortifications and war engines of terrifying efficiency',
    'Heavy use of daemon engines, Obliterators, and artillery',
    'Cold pragmatism: sacrificing their own troops is simply a tactical calculation',
    'Deep-rooted bitterness and rivalry with the Imperial Fists',
    'Favour Chaos Undivided — they use the Dark Gods as tools, not objects of worship',
  ],
  combatDoctrine:
    'Iron Warriors establish firebase positions with overlapping fields of heavy weapons fire, then advance ' +
    'methodically behind daemon-engine support. They reduce enemy positions to rubble with precise, overwhelming ' +
    'firepower. If fortifications stand in the way, they simply bring bigger guns.',
  whyPlay:
    'Choose the Iron Warriors if you love heavy weapons, war machines, and grinding the enemy into dust ' +
    'through superior firepower. The siege masters of Chaos — cold, calculating, and devastating.',
},

night_lords: {
  warbandId: 'night_lords',
  factionId: 'heretic_astartes',
  name: 'Night Lords',
  motto: '"Ave Dominus Nox — Hail the Lord of the Night."',
  overview:
    'The Night Lords are terror incarnate. They wage psychological warfare of the most extreme kind — ' +
    'flaying victims alive, broadcasting screams across vox channels, and adorning their midnight-blue armour ' +
    'with the skinned faces and bones of their enemies. They fight not for Chaos, not for the Emperor, but for ' +
    'the sheer joy of fear and cruelty.',
  history:
    'The VIII Legion was created to be the Emperor\'s terror weapon — a force to bring compliance through fear ' +
    'rather than endless warfare. Their Primarch Konrad Curze, the Night Haunter, grew up on the lawless hive ' +
    'world of Nostramo, where he became a one-man campaign of vigilante terror, flaying criminals alive in the ' +
    'streets. Under his leadership, the Night Lords brought entire systems to compliance without firing a shot — ' +
    'the mere threat of their arrival was enough. But Curze was deeply unhinged, tormented by prophetic visions ' +
    'of his own death. The Legion turned traitor almost casually — they had always been monsters, and the Heresy ' +
    'simply removed the leash. Curze was eventually assassinated by the Callidus Assassin M\'Shen, an event he ' +
    'foresaw and allowed as proof that his father\'s justice was no different from his own.',
  leader: {
    name: 'Konrad Curze',
    title: 'The Night Haunter, Primarch of the Night Lords',
    description:
      'Konrad Curze was unique among the Primarchs — a creature of absolute darkness who genuinely believed ' +
      'that fear was the only effective deterrent against evil. Raised without guidance on the nightmare world ' +
      'of Nostramo, he became judge, jury, and executioner, his pale skin and black eyes marking him as ' +
      'something inhuman. He was cursed (or gifted) with prescient visions, most notably of his own murder. ' +
      'Unlike other traitor Primarchs, Curze never worshipped Chaos — he simply stopped pretending to be anything ' +
      'other than what the Emperor had made him: a monster. His death at the hands of an assassin was his final ' +
      'argument — that fear and violence are the only true law.',
  },
  notableTraits: [
    'Masters of psychological warfare — fear is their primary weapon',
    'Armour decorated with trophies: flayed skin, skulls, and screaming vox-casters',
    'Prefer to strike at night or in darkness, using stealth and terror',
    'Reject Chaos worship — they serve only themselves and the memory of their Primarch',
    'Renowned for the Raptor cult — jump-pack specialists who descend screaming from the sky',
  ],
  combatDoctrine:
    'The Night Lords isolate and terrify before they kill. They disable lights, broadcast the recorded screams ' +
    'of previous victims, and pick off sentries before launching a sudden, overwhelming assault from the ' +
    'shadows. Raptors and jump-pack units are the core of their strike forces, swooping down on broken enemies.',
  whyPlay:
    'Choose the Night Lords if you want a warband that wins by breaking the enemy\'s will before the fight even ' +
    'starts. Terror tactics, stealth, and rapid close-range assaults — the Batman villains of Warhammer 40K.',
},

thousand_sons: {
  warbandId: 'thousand_sons',
  factionId: 'heretic_astartes',
  name: 'Thousand Sons',
  motto: '"All is dust."',
  overview:
    'The Thousand Sons are the sorcerer-warriors of Tzeentch, the Lord of Change. Once the most scholarly ' +
    'and psychically gifted of all the Legions, they were betrayed by fate, by their own hubris, and by the ' +
    'Imperium\'s intolerance. Now their ranks are filled with Rubric Marines — suits of armour animated by ' +
    'sorcery, the souls of the warriors within reduced to dust by a catastrophic spell gone wrong.',
  history:
    'The XV Legion was born under strange omens and cursed from the start. Their gene-seed amplified psychic ' +
    'abilities but also caused the horrific "Flesh Change" — uncontrollable mutations that nearly destroyed the ' +
    'Legion. Only the arrival of their Primarch Magnus the Red halted the degeneration, pouring his own vast ' +
    'psychic power into stabilising his sons. Magnus organised the Legion into Prosperine Cults — the Corvidae ' +
    '(precognition), Pavoni (biomancy), Raptora (telekinesis), Athanaean (telepathy), and Pyrae (pyrokinesis). ' +
    'On the gleaming world of Prospero they built the greatest repository of knowledge in the galaxy. But the ' +
    'decree of Nikaea banned psychic powers, and when Magnus used sorcery to warn the Emperor of Horus\'s ' +
    'treachery, he inadvertently breached the Webway wards. The Emperor sent the Space Wolves to bring Magnus ' +
    'to account; what followed was the burning of Prospero. Driven to Tzeentch\'s embrace, the Legion was later ' +
    'shattered anew when Ahriman cast the Rubric — a spell meant to halt further mutation but which reduced most ' +
    'of the Legion to mindless dust automatons sealed inside their armour.',
  leader: {
    name: 'Magnus the Red',
    title: 'The Crimson King, Daemon Primarch of Tzeentch',
    description:
      'Magnus was the tallest and most psychically powerful of the Primarchs, with crimson skin and a single ' +
      'blazing eye. Raised on Prospero in the City of Light (Tizca), he mastered every psychic discipline and ' +
      'amassed a library to rival the Emperor\'s own. He was a scholar-warrior who genuinely believed knowledge ' +
      'should be freely pursued. On Morningstar he stopped a crashing starship with psychic power alone, earning ' +
      'the title "Crimson King." His bond with Perturabo was deep — two brothers united by intellectual curiosity. ' +
      'Yet his arrogance was his downfall: he broke the Webway wards trying to warn his father of betrayal, and ' +
      'every attempt to fix his mistakes only made them worse. Now a one-eyed Daemon Prince of Tzeentch, Magnus ' +
      'wages an eternal quest to recover the scattered shards of his soul from within the Imperial Palace.',
  },
  notableTraits: [
    'The most psychically powerful Traitor Legion — every sorcerer wields devastating Warp powers',
    'Rubric Marines are mindless automata: silent, relentless, and immune to fear or morale',
    'Organised into Prosperine Cults, each specialising in a school of psychic warfare',
    'Devoted to Tzeentch, the Chaos God of sorcery, mutation, and scheming',
    'Accompanied by Tzeentchian daemons: Horrors, Screamers, and Flamers',
  ],
  combatDoctrine:
    'The Thousand Sons fight through overwhelming psychic power. Sorcerers unleash bolts of warpfire, twist ' +
    'reality, and summon daemonic allies while ranks of silent Rubric Marines advance with inferno bolters. ' +
    'The enemy is assaulted on the physical and psychic planes simultaneously.',
  whyPlay:
    'Choose the Thousand Sons if you want the most magic-heavy warband in the game. Devastating psychic powers, ' +
    'eerie dust-automaton troops, and the tragic grandeur of a Legion undone by its own brilliance.',
},

word_bearers: {
  warbandId: 'word_bearers',
  factionId: 'heretic_astartes',
  name: 'Word Bearers',
  motto: '"From the fires of betrayal unto the blood of revenge we bring the word of Lorgar."',
  overview:
    'The Word Bearers are the original heretics — the first Legion to worship the Chaos Gods and the ' +
    'architects of the Horus Heresy itself. While other Legions fell through ambition, bitterness, or ' +
    'corruption, the Word Bearers chose damnation deliberately, driven by genuine religious fervour. They are ' +
    'zealous preachers of the Dark Gods, summoning daemons and spreading Chaos as a matter of holy duty.',
  history:
    'The XVII Legion were once the most devout worshippers of the Emperor, treating Him as a living god. ' +
    'Their Primarch Lorgar spent decades building cathedrals and converting populations, often falling behind ' +
    'the Crusade\'s timetable. The Emperor, who insisted He was not a god, publicly humiliated Lorgar by ' +
    'ordering the Ultramarines to destroy the Word Bearers\' greatest achievement — the perfect city of ' +
    'Monarchia — and forced the entire Legion to kneel in its ashes. Broken and bitter, Lorgar embarked on a ' +
    'Pilgrimage into the Eye of Terror, where he discovered the "truth" of the Chaos Gods. With his chaplain ' +
    'Erebus and first captain Kor Phaeron, Lorgar orchestrated the corruption of Horus over decades, sowing ' +
    'the seeds of the Heresy. The Word Bearers were the true authors of the Imperium\'s fall.',
  leader: {
    name: 'Lorgar Aurelian',
    title: 'The Urizen, Bearer of the Word, Daemon Primarch of Chaos Undivided',
    description:
      'Lorgar was the most charismatic and spiritually focused of the Primarchs — not the mightiest warrior ' +
      'but the most passionate orator and philosopher. Raised on the theocratic world of Colchis, he was a ' +
      'preacher from birth. When the Emperor rejected his worship, Lorgar redirected that boundless faith toward ' +
      'the Chaos Gods, finding in them the divine truth his father denied. He is arguably the most dangerous ' +
      'Primarch not for his martial skill, but because he can convert entire civilisations to Chaos with words ' +
      'alone. Now a mighty Daemon Prince, Lorgar meditates within the Warp, planning the final spiritual ' +
      'conquest of the galaxy.',
  },
  notableTraits: [
    'The original heretics and architects of the Horus Heresy',
    'Summon daemons into battle as a core tactical element, not a last resort',
    'Dark Apostles lead prayers that inspire fanatical devotion and daemonic manifestation',
    'Possess extensive knowledge of Chaos rituals, True Names, and Warp-craft',
    'Worship Chaos Undivided — all four gods receive equal devotion',
  ],
  combatDoctrine:
    'The Word Bearers fight as a dark congregation. Dark Apostles chant liturgies that summon daemonic allies ' +
    'directly into the midst of the enemy while Possessed Marines and zealous Astartes pour forward in a ' +
    'tide of religious fury. They combine mortal and daemon forces more effectively than any other warband.',
  whyPlay:
    'Choose the Word Bearers if you want to summon daemons alongside your Chaos Marines. A warband of fanatics ' +
    'and dark priests that blends mortal and daemonic power into one unholy congregation.',
},

world_eaters: {
  warbandId: 'world_eaters',
  factionId: 'heretic_astartes',
  name: 'World Eaters',
  motto: '"Blood for the Blood God! Skulls for the Skull Throne!"',
  overview:
    'The World Eaters are Khorne\'s chosen berserkers — warriors who exist solely to shed blood in the ' +
    'name of the Blood God. Driven into frothing madness by the Butcher\'s Nails — cortical implants that ' +
    'reward aggression with pleasure and punish inactivity with agony — they are among the most fearsome ' +
    'close-combat fighters in the galaxy. Subtlety, strategy, and discipline have been burned away; only ' +
    'slaughter remains.',
  history:
    'The XII Legion, originally called the War Hounds, were savage but disciplined warriors of Terra. When ' +
    'reunited with their Primarch Angron, everything changed. Angron had been a gladiator-slave on the world ' +
    'of Nuceria, implanted with the Butcher\'s Nails — archeotech devices that stimulated aggression at the ' +
    'cost of all other emotions. The Emperor "rescued" Angron by teleporting him away before his final battle ' +
    'alongside his fellow gladiators, leaving them to die — a betrayal Angron never forgave. He spread the ' +
    'Nails throughout his Legion, transforming disciplined soldiers into frenzied killers. During the Heresy, ' +
    'the World Eaters abandoned all pretence of strategy, throwing themselves at the walls of the Imperial ' +
    'Palace in a blood-mad charge. Angron was the first Primarch to become a Daemon Prince during the Heresy ' +
    'itself, ascending in a tide of blood during the Shadow Crusade against Ultramar.',
  leader: {
    name: 'Angron',
    title: 'The Red Angel, Daemon Primarch of Khorne',
    description:
      'Angron is perhaps the most tragic of the Primarchs. Born into slavery and implanted with devices that ' +
      'destroyed his capacity for anything but rage, he was then denied even the dignity of dying alongside ' +
      'his comrades. The Butcher\'s Nails were literally killing him when Lorgar\'s forced daemonic ascension ' +
      'saved his life — by turning him into a monstrous Daemon Prince of Khorne. As a daemon, Angron is a ' +
      'towering engine of destruction wielding massive chainaxes, wreathed in molten brass and psychic fury. ' +
      'He is pure rage given form, and wherever he manifests, the ground cracks and the blood flows.',
  },
  notableTraits: [
    'Butcher\'s Nails implants drive warriors into berserker fury',
    'Overwhelming close-combat specialists — chain axes and power fists are standard',
    'Favour Khorne above all: no psykers, no sorcery, only blood and skulls',
    'Eightbound are possessed berserkers fused with Khornate daemons',
    'Jakhals — mortal cultists who fight with berserker frenzy alongside the Astartes',
  ],
  combatDoctrine:
    'The World Eaters have exactly one tactic: close the distance and kill everything. They charge headlong ' +
    'into the enemy, chain axes screaming, caring nothing for casualties. Berzerkers and Eightbound hit like ' +
    'a freight train in melee, and Jakhals swarm around them in a frenzy of blades.',
  whyPlay:
    'Choose the World Eaters if you want pure, unrelenting melee carnage. No tricks, no magic — just chain axes ' +
    'and an unstoppable charge into the enemy line. The ultimate close-combat warband.',
},

renegade_space_marines: {
  warbandId: 'renegade_space_marines',
  factionId: 'heretic_astartes',
  name: 'Renegade Space Marines',
  motto: '"We fight for ourselves, not false gods or a corpse on a throne."',
  overview:
    'Renegade Space Marines are loyalist Astartes who have turned their backs on the Imperium without fully ' +
    'embracing Chaos. Some were driven to rebellion by unjust orders, others by the corruption of their own ' +
    'commanders, and some simply decided that the Imperium no longer deserved their allegiance. They are pirates, ' +
    'mercenaries, and warlords — Space Marines unshackled from dogma, but also from purpose.',
  history:
    'Every Chapter has its failures. Throughout ten thousand years of war, hundreds of Chapters have been ' +
    'declared Excommunicate Traitoris — cast out from the Imperium for crimes real or fabricated. Some, like the ' +
    'Astral Claws who became the Red Corsairs, turned to piracy after being pushed too far by Imperial bureaucracy. ' +
    'Others simply vanished into the galactic frontier, taking what they needed to survive. Unlike the ancient ' +
    'Traitor Legions, Renegades often retain much of their original equipment and training. Many still fight with ' +
    'tactical discipline and Chapter organisation, but without resupply their wargear slowly degrades, forcing ' +
    'them into ever more desperate raids.',
  leader: {
    name: 'Huron Blackheart',
    title: 'The Tyrant of Badab, Master of the Red Corsairs',
    description:
      'The most infamous Renegade Marine, Huron Blackheart was once Lufgt Huron, Chapter Master of the Astral ' +
      'Claws and defender of the Maelstrom Zone. His refusal to tithe geneseed and consolidation of neighbouring ' +
      'Chapters sparked the Badab War, at the end of which he was nearly killed by Imperial forces. Rebuilt with ' +
      'bionics and consumed by hatred, he fled into the Maelstrom and forged the Red Corsairs — the largest ' +
      'Renegade warband in the galaxy, a haven for all who flee the Imperium.',
  },
  notableTraits: [
    'Retain much of their loyalist training, discipline, and equipment',
    'No allegiance to any Chaos God — they fight for survival and freedom',
    'Often include a mix of different Chapter origins in one warband',
    'Rely on raiding and piracy to maintain their wargear and supplies',
    'May still have access to Codex Astartes tactics and formation doctrines',
  ],
  combatDoctrine:
    'Renegades fight like Space Marines because they are Space Marines — tactical, adaptive, and deadly. Without ' +
    'the Dark Pacts of the Traitor Legions, they rely on skill, firepower, and cunning. Hit-and-run raids and ' +
    'ambushes are preferred over set-piece battles.',
  whyPlay:
    'Choose Renegade Space Marines if you want Chaos-side Marines without the religious baggage. A versatile, ' +
    'tactically flexible warband that plays like loyalists gone bad — pirates and outlaws of the 41st Millennium.',
},

// ═══════════════════════════════════════════════════════════════════════
// CHAOS DAEMONS WARBANDS
// ═══════════════════════════════════════════════════════════════════════

followers_of_khorne: {
  warbandId: 'followers_of_khorne',
  factionId: 'chaos_daemons',
  name: 'Followers of Khorne — Legion of Blood',
  motto: '"Blood for the Blood God! Skulls for the Skull Throne!"',
  overview:
    'A pure Khorne daemon warband is a howling tide of brass and blood. Bloodletters march in disciplined ' +
    'ranks with hellblades that cut through reality itself, while Flesh Hounds bound ahead to drag down ' +
    'psykers and cowards. Every kill feeds Khorne\'s insatiable hunger, and the daemons fight with a savage ' +
    'joy that makes even other Chaos forces uneasy.',
  history:
    'Khorne is the Blood God, the oldest and arguably mightiest of the Chaos Gods, born from every act of ' +
    'violence and aggression since sentient life began. His realm in the Warp is a vast battlefield of brass ' +
    'and bone where daemon legions clash eternally. Khorne despises sorcery and trickery — only martial prowess ' +
    'earns his favour. His daemon legions pour into realspace whenever enough blood is spilled to tear the veil ' +
    'between worlds, and they harvest skulls with mechanical efficiency until banished back to the Warp.',
  leader: {
    name: 'Skarbrand the Exiled One',
    title: 'The Bloodthirster who struck Khorne',
    description:
      'Skarbrand was once Khorne\'s greatest Bloodthirster, but Tzeentch whispered doubts into his mind, ' +
      'goading him to strike at Khorne himself. His axe left a tiny scratch on Khorne\'s armour. The Blood God ' +
      'seized Skarbrand and hurled him across the Warp for eight days and eight nights, burning away everything ' +
      'but rage. Now Skarbrand is fury incarnate — incapable of speech, thought, or subtlety, eternally raging ' +
      'with twin axes that cleave reality. He is the most feared of all Bloodthirsters.',
  },
  notableTraits: [
    'Bloodletters wield hellblades that ignore armour, cutting through any defence',
    'Flesh Hounds track quarry across dimensions, immune to psychic powers',
    'Absolutely despise psykers and sorcery — Khorne daemons gain power fighting them',
    'Bloodthirsters are among the most devastating melee combatants in existence',
    'The Skull Throne grows with every worthy kill, empowering Khorne further',
  ],
  combatDoctrine:
    'Charge, kill, repeat. Khorne daemons close to melee as fast as possible and overwhelm the enemy with ' +
    'relentless aggression. Flesh Hounds sprint ahead to pin targets while Bloodletters advance in a wall ' +
    'of hellblades. There is no retreat, no ranged phase — only glorious combat.',
  whyPlay:
    'Choose Followers of Khorne if you want the most aggressive melee daemon force possible. Pure, ' +
    'undiluted violence — every model wants to be in combat, and they\'re terrifying once they get there.',
},

followers_of_nurgle: {
  warbandId: 'followers_of_nurgle',
  factionId: 'chaos_daemons',
  name: 'Followers of Nurgle — Plague Legion',
  motto: '"Grandfather Nurgle loves all his children."',
  overview:
    'Nurgle\'s daemon legions are a grotesque carnival of rot and joy. Plaguebearers shuffle forward with ' +
    'droning chants, Nurglings swarm in giggling heaps, and Plague Drones buzz overhead on bloated flies. ' +
    'Despite their hideous appearance, Nurgle\'s daemons are oddly cheerful — they see disease as a gift ' +
    'and death as simply the start of something new.',
  history:
    'Nurgle is the Chaos God of decay, disease, and the cycle of life and death. He is paradoxically the ' +
    'most jolly of the Dark Gods — a doting grandfather figure who loves all living things, even as he rots ' +
    'them from the inside out. His Garden in the Warp is a foetid paradise of impossible plagues and new ' +
    'life growing from corruption. Nurgle\'s daemon legions are summoned wherever plague runs rampant, ' +
    'emerging from pestilent mists to "bless" the living with Grandfather\'s gifts.',
  leader: {
    name: 'Ku\'gath Plaguefather',
    title: 'The Plaguefather, Greatest of Nurgle\'s Great Unclean Ones',
    description:
      'Ku\'gath was once a tiny Nurgling who tumbled from Nurgle\'s shoulders into the Cauldron where the ' +
      'Plague God brews his diseases. He drank deeply and swelled into a Great Unclean One — but the draught ' +
      'he consumed was Nurgle\'s finest creation, now lost forever. Wracked with guilt, Ku\'gath spends ' +
      'eternity trying to recreate the perfect plague, testing each new concoction on the battlefield. He is ' +
      'a bloated mountain of putrescent flesh, surprisingly agile and devastatingly powerful.',
  },
  notableTraits: [
    'Plaguebearers are supernaturally tough, shrugging off wounds with diseased resilience',
    'Nurglings are swarms of tiny daemons that overwhelm through sheer numbers',
    'Plague Drones ride Rot Flies — giant daemonic insects that spread disease',
    'Everything Nurgle touches becomes infected — the very ground rots beneath them',
    'Nurgle daemons are eerily happy, chanting joyful hymns even as they spread death',
  ],
  combatDoctrine:
    'Nurgle daemons advance slowly and inexorably, weathering enemy fire with supernatural resilience. ' +
    'Plague auras weaken enemies at close range while Plaguebearers grind them down in attritional combat. ' +
    'Speed is irrelevant when you cannot be killed.',
  whyPlay:
    'Choose Followers of Nurgle if you want a slow but nearly unkillable daemon force. Grind the enemy down ' +
    'through attrition and disease while your daemons cheerfully refuse to die.',
},

followers_of_slaanesh: {
  warbandId: 'followers_of_slaanesh',
  factionId: 'chaos_daemons',
  name: 'Followers of Slaanesh — Legion of Excess',
  motto: '"Embrace your desires."',
  overview:
    'Slaanesh\'s daemons are creatures of terrible beauty — lithe, fast, and intoxicating to behold. ' +
    'Daemonettes dance through combat with impossible grace, their claws parting flesh with surgical ' +
    'precision. Seekers ride daemonic steeds that outpace any cavalry. To face Slaanesh\'s host is to ' +
    'be seduced by your own death.',
  history:
    'Slaanesh is the youngest of the Chaos Gods, born from the psychic excess of the Aeldari empire\'s ' +
    'decadent fall. The moment of Slaanesh\'s birth tore open the Eye of Terror and consumed most of the ' +
    'Aeldari species in an instant. Known as She Who Thirsts, the Prince of Pleasure, or simply the Dark ' +
    'Prince, Slaanesh embodies obsession, excess, and the pursuit of sensation beyond all limits. Its daemons ' +
    'are reflections of desire — beautiful, deadly, and utterly without mercy.',
  leader: {
    name: 'Shalaxi Helbane',
    title: 'The Monarch of the Hunt',
    description:
      'Shalaxi Helbane is Slaanesh\'s paramount champion, a Keeper of Secrets specifically designed to slay ' +
      'the greatest champions of the other Chaos Gods. Where most Keepers of Secrets are generalists of excess, ' +
      'Shalaxi is focused like a razor — the ultimate duelist, crafted to humiliate and destroy any single ' +
      'opponent. It wields the living whip Soulpiercer and hunts the mightiest warriors across reality and the ' +
      'Warp, forever seeking a worthy challenge.',
  },
  notableTraits: [
    'The fastest daemons in the Warp — Daemonettes and Seekers blur with supernatural speed',
    'Incredibly deadly in melee with armour-piercing claws and alluring auras',
    'Slaanesh\'s aura saps enemy willpower, making them hesitate at critical moments',
    'Keepers of Secrets are towering greater daemons of seductive doom',
    'Slaanesh is the eternal nemesis of the Aeldari, who fear it above all else',
  ],
  combatDoctrine:
    'Speed and precision define Slaanesh daemon combat. They outflank, outmanoeuvre, and strike before the ' +
    'enemy can react. Daemonettes flood forward in a wave of claws while Seekers hit flanks at blistering ' +
    'pace. Every engagement is a dance — lethal, graceful, and over in seconds.',
  whyPlay:
    'Choose Followers of Slaanesh if you want the fastest, most agile daemon warband. Glass cannons that ' +
    'kill through speed and precision — strike first, strike hardest, and look fabulous doing it.',
},

followers_of_tzeentch: {
  warbandId: 'followers_of_tzeentch',
  factionId: 'chaos_daemons',
  name: 'Followers of Tzeentch — Scintillating Legion',
  motto: '"Just as planned."',
  overview:
    'Tzeentch\'s daemons are creatures of kaleidoscopic fire and shifting reality. Horrors cackle and hurl ' +
    'bolts of mutating Warpfire while Screamers glide through the air like predatory rays. Nothing is fixed ' +
    'around Tzeentch\'s daemons — colours shift, forms mutate, and reality itself becomes unreliable.',
  history:
    'Tzeentch is the Changer of Ways, the Architect of Fate, the Chaos God of sorcery, manipulation, and ' +
    'change. He is the most intellectually active of the Dark Gods, forever scheming plots within plots. His ' +
    'Crystal Labyrinth in the Warp is an ever-shifting maze that contains the sum total of all knowledge and ' +
    'deceit. Tzeentch\'s daemons are his agents of change, summoned to reshape reality according to their ' +
    'master\'s incomprehensible schemes.',
  leader: {
    name: 'Kairos Fateweaver',
    title: 'The Oracle of Tzeentch',
    description:
      'Kairos Fateweaver is a Lord of Change with two heads, each looking into a different timeline — one ' +
      'sees the past with perfect clarity, the other sees all possible futures. Tzeentch cast him into the ' +
      'Well of Eternity to learn the answers to every question ever asked, but the experience left Kairos ' +
      'unable to perceive the present. He is the greatest oracle in existence, able to predict the outcome ' +
      'of battles before they begin, but vulnerable in the chaotic now.',
  },
  notableTraits: [
    'Pink Horrors split into Blue Horrors when slain, making them frustrating to kill',
    'Devastating ranged psychic attacks — Warpfire that mutates whatever it touches',
    'Screamers slice through armour with razor-sharp undersides while flying past',
    'Reality warps and twists around Tzeentch daemons, granting mystical protections',
    'Lords of Change are among the most powerful psykers in the galaxy',
  ],
  combatDoctrine:
    'Tzeentch daemons fight primarily at range, blasting enemies with Warpfire and psychic bolts before ' +
    'closing to finish off weakened survivors. Horrors form the firing line while Screamers harass flanks. ' +
    'The Changehost warps reality to reposition forces unpredictably.',
  whyPlay:
    'Choose Followers of Tzeentch if you want a ranged, psychic-heavy daemon warband. Warpfire, mutations, ' +
    'and daemons that refuse to stay dead — the trickster daemons of Chaos.',
},

followers_of_vashtor: {
  warbandId: 'followers_of_vashtor',
  factionId: 'chaos_daemons',
  name: 'Followers of Vashtor — Dark Mechanicum Daemons',
  motto: '"The machine hungers."',
  overview:
    'Vashtor the Arkifane is the Chaos God of daemon-engines and forbidden technology. His followers are ' +
    'daemons fused with nightmarish machinery — entities where flesh and metal have become inseparable. ' +
    'These Daemon Engines grind across the battlefield as living weapons, their daemonic spirits howling ' +
    'through corrupted vox arrays.',
  history:
    'Vashtor is a newer presence in the pantheon of Chaos, or perhaps an older one newly revealed. He ' +
    'represents the corruption of technology and the marriage of daemon and machine. His worshippers among ' +
    'the Dark Mechanicum create soul-forges where daemons are bound into war engines and industry is powered ' +
    'by suffering. In the Trench Hammer setting, his daemon followers represent the purest expression of this ' +
    'unholy fusion — daemonic entities that have fully merged with mechanical forms.',
  leader: {
    name: 'Vashtor the Arkifane',
    title: 'The Heretek God, Lord of Daemon Engines',
    description:
      'Vashtor is a Chaos entity who presides over the corruption of technology and the binding of daemons ' +
      'into machines. Unlike the Big Four Chaos Gods, Vashtor occupies a niche domain — the intersection of ' +
      'sorcery and engineering. His followers believe he was once a mortal — perhaps a Tech-Priest who ascended ' +
      'to godhood through forbidden knowledge. His realm in the Warp is an infinite forge where the screams of ' +
      'bound daemons power impossible machinery.',
  },
  notableTraits: [
    'Daemons fused with machines — every creature is part flesh, part metal',
    'Daemon Engines serve as the core of any Vashtor warband',
    'Aligned with the Dark Mechanicum heretek priesthood',
    'Technology and sorcery become indistinguishable in Vashtor\'s domain',
    'An Undivided warband that serves a fifth power outside the traditional four',
  ],
  combatDoctrine:
    'Vashtor\'s forces fight as daemon-engine warbands supported by warp-forged constructs. Heavy firepower ' +
    'from daemon-possessed weapons platforms clears the path while mechanical daemon beasts close for ' +
    'devastating melee. The warband is an industrial nightmare grinding forward.',
  whyPlay:
    'Choose Followers of Vashtor if you love the idea of daemon-engine heavy forces and the dark side of ' +
    'technology. A unique warband where machines scream and daemons are bolted into nightmarish war engines.',
},

// ═══════════════════════════════════════════════════════════════════════
// ADEPTUS ASTARTES CHAPTERS
// ═══════════════════════════════════════════════════════════════════════

black_templars: {
  warbandId: 'black_templars',
  factionId: 'adeptus_astartes',
  name: 'Black Templars',
  motto: '"No pity! No remorse! No fear!"',
  overview:
    'The Black Templars are the most zealous Space Marine Chapter — eternal crusaders who have been on one ' +
    'continuous galaxy-spanning crusade since their founding. They refuse to use Librarians (psykers), ' +
    'preferring pure faith in the Emperor and the fury of the chainsword. Roaring litanies and vows of ' +
    'destruction, they charge into the enemy with fanatical abandon.',
  history:
    'Founded from the Imperial Fists during the Second Founding, the Black Templars were led by Sigismund, ' +
    'the greatest swordsman of the Heresy era — the Emperor\'s Champion. Sigismund declared an eternal ' +
    'crusade against the enemies of mankind that has never ended. The Templars technically maintain only 1,000 ' +
    'battle-brothers per the Codex, but their scattered crusade fleets likely number several thousand. They are ' +
    'organised into crusade forces rather than standard companies, each led by a Marshal.',
  leader: {
    name: 'Sigismund / High Marshal Helbrecht',
    title: 'Sigismund — The First Emperor\'s Champion; Helbrecht — Current High Marshal',
    description:
      'Sigismund was the greatest swordsman of the Space Marine Legions, First Captain of the Imperial Fists. ' +
      'When Dorn divided the Legion, Sigismund took the most zealous warriors and founded the Black Templars. ' +
      'He died fighting the Black Legion Champion Abaddon, scoring a wound even in death. High Marshal Helbrecht ' +
      'now leads the Chapter, a warrior of terrifying intensity who embodies Sigismund\'s legacy of relentless ' +
      'crusade.',
  },
  notableTraits: [
    'Eternal Crusade — the Chapter has been fighting non-stop since the Second Founding',
    'Refuse to field Librarians; rely on faith and Chaplains instead',
    'Emperor\'s Champion: a warrior granted holy visions who duels the enemy\'s strongest',
    'Crusade organisation with Marshals instead of Captains',
    'Neophytes fight alongside Initiates as sword brethren, learning through battle',
  ],
  combatDoctrine:
    'Charge. The Black Templars close to melee as quickly as possible behind a wall of Crusader squads. ' +
    'The Emperor\'s Champion seeks out the enemy leader for single combat while chainswords and power fists ' +
    'tear through the remaining foes.',
  whyPlay:
    'Choose Black Templars if you want zealous melee-focused Space Marines who hit like a battering ram. ' +
    'All the elite toughness of Marines with the aggression turned up to maximum.',
},

blood_angels: {
  warbandId: 'blood_angels',
  factionId: 'adeptus_astartes',
  name: 'Blood Angels',
  motto: '"By the blood of Sanguinius!"',
  overview:
    'The Blood Angels are noble warrior-artists cursed with a terrible flaw. Their gene-seed carries the ' +
    'Red Thirst — an unquenchable desire for blood — and the Black Rage — psychic echoes of their Primarch\'s ' +
    'death that can drive them into berserk fury. They balance this inner darkness with a culture of beauty, ' +
    'art, and honour, making them the most tragic of all Chapters.',
  history:
    'The IX Legion was founded from the irradiated wasteland of Baal, where only the strongest survived. Their ' +
    'Primarch Sanguinius was perhaps the noblest of all the Emperor\'s sons — a golden angel with magnificent ' +
    'wings. During the Siege of Terra, Sanguinius faced Horus aboard his flagship in a last stand, knowing he ' +
    'would die. His sacrifice bought the Emperor time to slay Horus, but the psychic trauma of his death ' +
    'imprinted on the Legion\'s gene-seed forever. Now every Blood Angel carries the risk of falling to the ' +
    'Black Rage, reliving Sanguinius\'s final moments in an unstoppable berserker fury.',
  leader: {
    name: 'Sanguinius',
    title: 'The Great Angel, Primarch of the Blood Angels',
    description:
      'Sanguinius was widely considered the finest of the Primarchs — noble, charismatic, and blessed with ' +
      'magnificent angelic wings. He was the only Primarch whom every other brother respected. His foresight ' +
      'showed him his own death at Horus\'s hands, yet he faced it willingly to protect his father and humanity. ' +
      'His sacrifice aboard the Vengeful Spirit is the defining moment of the Heresy. Commander Dante, at over ' +
      '1,800 years old, now leads the Blood Angels as the longest-serving Chapter Master in the Imperium.',
  },
  notableTraits: [
    'The Red Thirst: a craving for blood that must be constantly controlled',
    'The Black Rage: fallen brothers are inducted into the Death Company, fighting in berserker fury',
    'Sanguinary Guard — golden-armoured elite wearing death masks of Sanguinius',
    'A culture of art, sculpture, and beauty that counterbalances their inner darkness',
    'Jump pack specialists — they echo Sanguinius\'s angelic flight',
  ],
  combatDoctrine:
    'Blood Angels favour aerial assault via jump packs, descending from above like avenging angels. ' +
    'Death Company marines are unleashed as shock troops — berserkers who feel no pain and fight until ' +
    'destroyed. The balance between noble discipline and savage fury is their greatest strength.',
  whyPlay:
    'Choose Blood Angels if you love the tragic hero archetype — noble warriors fighting their own darkness. ' +
    'Fast, hard-hitting melee specialists with some of the most iconic lore in all of Warhammer.',
},

dark_angels: {
  warbandId: 'dark_angels',
  factionId: 'adeptus_astartes',
  name: 'Dark Angels',
  motto: '"Repent! For tomorrow you die!"',
  overview:
    'The Dark Angels are the First Legion — the oldest Space Marine Chapter, bearing a terrible secret. ' +
    'During the Heresy, half their Legion turned traitor under Luther, and the Dark Angels have spent ten ' +
    'thousand years hunting these "Fallen" in absolute secrecy. Their obsessive pursuit of this hidden shame ' +
    'makes them secretive, paranoid, and sometimes dangerously unreliable as allies.',
  history:
    'The I Legion was the first created and the prototype for all that followed. Their Primarch Lion El\'Jonson ' +
    'was raised on the death world of Caliban, a planet of dark forests and terrible beasts. During the Heresy, ' +
    'while the Lion fought loyally, his trusted lieutenant Luther fell to Chaos and turned half the Legion. ' +
    'When the Lion returned, the resulting battle shattered Caliban itself. Luther was captured, the Fallen ' +
    'were scattered through time and space by a Warp storm, and the Lion was mortally wounded — placed in ' +
    'stasis deep beneath The Rock (the remains of Caliban\'s fortress-monastery). The Lion has recently awakened.',
  leader: {
    name: 'Lion El\'Jonson',
    title: 'The Lion, Primarch of the Dark Angels',
    description:
      'The Lion was the greatest strategist among the Primarchs — cold, calculating, and utterly devoted to ' +
      'duty. Raised alone in the death-forests of Caliban, he was more beast than man when found, but quickly ' +
      'became the supreme tactician. Unlike other Primarchs, the Lion has recently returned to the 41st ' +
      'Millennium, awakening from his millennia-long stasis beneath The Rock. His return reshapes the balance ' +
      'of power in the Imperium, though his secrecy and paranoia remain.',
  },
  notableTraits: [
    'The Hunt for the Fallen: an obsessive secret mission spanning 10,000 years',
    'Deathwing — bone-white Terminator elite who serve as the Chapter\'s Inner Circle',
    'Ravenwing — jet-black fast attack specialists on bikes and speeders',
    'Intensely secretive, keeping their shame hidden from even close allies',
    'The Lion has returned — one of only two loyalist Primarchs now active',
  ],
  combatDoctrine:
    'The Dark Angels fight with coordinated combined arms — Ravenwing scouts and pins targets, then Deathwing ' +
    'teleports in to deliver the killing blow. Against the Fallen, all other objectives become secondary.',
  whyPlay:
    'Choose Dark Angels if you love gothic mystery, secret agendas, and the duality of the Deathwing/Ravenwing. ' +
    'A Chapter haunted by its past, with some of the richest lore in 40K.',
},

deathwatch: {
  warbandId: 'deathwatch',
  factionId: 'adeptus_astartes',
  name: 'Deathwatch',
  motto: '"Suffer not the alien to live."',
  overview:
    'The Deathwatch is the Chamber Militant of the Ordo Xenos — an elite kill-team of Space Marines drawn ' +
    'from every Chapter in the Imperium. Each member is a veteran chosen for his skill in fighting specific ' +
    'alien threats. They paint their armour black but retain one shoulder pad in their original Chapter colours, ' +
    'a symbol of their dual allegiance.',
  history:
    'Founded during the War of the Beast when Ork Warboss "The Beast" nearly conquered Terra, the Deathwatch ' +
    'was established to ensure the Imperium would never again be caught off-guard by xenos threats. Members serve ' +
    'a vigil (tour of duty) before returning to their Chapter. The Deathwatch has access to the finest ' +
    'anti-alien weaponry and intelligence, and its kill-teams are deployed against the most dangerous alien ' +
    'threats the galaxy can produce.',
  leader: {
    name: 'Watch Master',
    title: 'Commander of a Watch Fortress',
    description:
      'Each Watch Fortress is led by a Watch Master — a Space Marine who has served so long with the Deathwatch ' +
      'that he has essentially forsaken his original Chapter. Watch Masters are peerless alien-hunters with ' +
      'encyclopaedic knowledge of xenos biology, behaviour, and weaknesses. They wield the Guardian Spear, a ' +
      'weapon combining a power blade with a bolter, and personally lead the most dangerous missions.',
  },
  notableTraits: [
    'Kill-teams composed of Space Marines from many different Chapters',
    'Special Issue Ammunition — exotic bolter rounds tailored to specific alien threats',
    'Each member brings unique Chapter tactics, creating unpredictable combinations',
    'Access to rare anti-xenos weapons and classified intelligence',
    'Black armour with one shoulder pad in original Chapter colours',
  ],
  combatDoctrine:
    'Deathwatch kill-teams are surgical instruments. Each team is assembled for a specific mission, combining ' +
    'specialists whose skills complement each other. They favour precision strikes, using Special Issue ' +
    'Ammunition and tailored tactics to exploit each alien species\' known weaknesses.',
  whyPlay:
    'Choose Deathwatch if you want elite, multi-origin Marines with exotic ammunition and a focus on xenos ' +
    'hunting. Every model can be from a different Chapter — the ultimate "best of the best" warband.',
},

imperial_fists: {
  warbandId: 'imperial_fists',
  factionId: 'adeptus_astartes',
  name: 'Imperial Fists',
  motto: '"Primarch-Progenitor, to your glory and the glory of Him on Earth!"',
  overview:
    'The Imperial Fists are the Emperor\'s siege masters and the eternal defenders of Terra. Where others ' +
    'break walls, the Fists build them — and hold them against any force. They are disciplined, stoic, and ' +
    'unrelenting, the epitome of duty and sacrifice. Their rivalry with the Iron Warriors is legendary.',
  history:
    'The VII Legion served as the Emperor\'s personal praetorians during the Great Crusade. Their Primarch ' +
    'Rogal Dorn was the architect of the Imperial Palace\'s defences during the Siege of Terra, personally ' +
    'commanding the defence against Horus\'s forces. After the Heresy, Dorn was so grief-stricken by the ' +
    'Emperor\'s internment that he refused to break his Legion apart until the Iron Cage incident — a trap ' +
    'laid by Perturabo that nearly destroyed the Fists and forced Dorn to accept the Codex Astartes.',
  leader: {
    name: 'Rogal Dorn',
    title: 'The Praetorian of Terra, Primarch of the Imperial Fists',
    description:
      'Rogal Dorn was the most steadfast and dutiful of the Primarchs — blunt, honest, and absolutely ' +
      'reliable. He fortified the Imperial Palace into an impregnable fortress and held it against the ' +
      'full fury of the Traitor Legions. His rivalry with Perturabo was one of the defining conflicts of the ' +
      'Heresy: the immovable object versus an irresistible force. Dorn\'s current fate is unknown — only his ' +
      'skeletal hands (the Fists of Dorn) were recovered, enshrined as relics.',
  },
  notableTraits: [
    'Supreme fortification builders and defenders — they make any position impregnable',
    'Bolter drill: legendary marksmanship with the bolter above all other weapons',
    'Pain Glove — a ritual device that conditions them to endure any suffering',
    'Eternal rivalry with the Iron Warriors',
    'The Fists of Dorn — their Primarch\'s skeletal hands are the Chapter\'s holiest relics',
  ],
  combatDoctrine:
    'The Imperial Fists fight best from fortified positions, laying down devastating bolter fire from cover. ' +
    'They build killzones, layer defences, and force the enemy to advance into overlapping fields of fire. ' +
    'In offensive actions, they apply the same systematic approach to breaching enemy defences.',
  whyPlay:
    'Choose Imperial Fists if you love bolters, fortifications, and holding the line. The quintessential ' +
    'disciplined Space Marine Chapter — unbreakable defenders of the Imperium.',
},

iron_hands: {
  warbandId: 'iron_hands',
  factionId: 'adeptus_astartes',
  name: 'Iron Hands',
  motto: '"The flesh is weak."',
  overview:
    'The Iron Hands despise organic weakness and replace their bodies with cybernetics at every opportunity. ' +
    'Cold, logical, and emotionally suppressed, they view flesh as a flaw to be corrected through augmentation. ' +
    'They are the closest loyalist Chapter to the Adeptus Mechanicus in philosophy and fight alongside tanks ' +
    'and dreadnoughts with mechanical precision.',
  history:
    'The X Legion\'s Primarch Ferrus Manus had arms of living metal — silver hands that could shape any ' +
    'material. He was slain at the Drop Site Massacre on Isstvan V by his closest brother Fulgrim, the first ' +
    'Primarch to fall in battle. The grief and rage of this loss drove the Iron Hands to reject emotion and ' +
    'flesh alike. They believe that if Ferrus had been less emotional, less trusting, he would have survived.',
  leader: {
    name: 'Ferrus Manus',
    title: 'The Gorgon, Primarch of the Iron Hands',
    description:
      'Ferrus Manus was defined by his living metal hands — earned when he plunged his arms into molten metal ' +
      'to defeat a metallic wyrm on Medusa. He was a master craftsman and warrior who shared a deep bond with ' +
      'Fulgrim. When Fulgrim, corrupted by Slaanesh, beheaded Ferrus at Isstvan V, it was the most shocking ' +
      'death of the Heresy. His decapitated head was reportedly kept by Horus as a trophy. The Iron Council ' +
      'now governs the Chapter in his absence.',
  },
  notableTraits: [
    'Extreme cybernetic augmentation — veterans are more machine than man',
    'Emotional suppression: they consider feelings a weakness',
    'Close ties to the Adeptus Mechanicus and heavy use of vehicles',
    'Dreadnoughts hold special honour — continued service in a metal sarcophagus',
    'Clan-based organisation rather than standard companies',
  ],
  combatDoctrine:
    'The Iron Hands fight in concert with heavy armour — tanks and Dreadnoughts form the core while Marines ' +
    'advance in mechanised formations. Cybernetic enhancements make them tougher than standard Marines, and ' +
    'they approach war with cold, calculated logic.',
  whyPlay:
    'Choose Iron Hands if you want cybernetic Space Marines with heavy vehicle support. The machine-obsessed ' +
    'Chapter that replaces weakness with iron.',
},

// ═══════════════════════════════════════════════════════════════════════
// ADEPTUS ASTARTES CHAPTERS (continued) + OTHER IMPERIAL WARBANDS
// ═══════════════════════════════════════════════════════════════════════

legion_of_the_damned: {
  warbandId: 'legion_of_the_damned',
  factionId: 'adeptus_astartes',
  name: 'Legion of the Damned',
  motto: '"They come when all hope is lost."',
  overview:
    'The Legion of the Damned are spectral Space Marines wreathed in ghostly flames who materialise from ' +
    'nowhere to aid embattled Imperial forces, then vanish without a trace. Their black armour blazes with ' +
    'bone motifs and spectral fire. No one knows what they truly are — ghosts, daemons of the Emperor, or ' +
    'something else entirely.',
  history:
    'The most common theory links them to the Fire Hawks Chapter, which was lost in the Warp during a jump ' +
    'and declared destroyed. Before their disappearance, the Fire Hawks reported a progressive wasting disease ' +
    'that was consuming their bodies. If the Legion of the Damned are indeed the Fire Hawks, they have been ' +
    'transformed into something beyond mortal Space Marines — neither truly alive nor dead, existing in the ' +
    'space between reality and the Warp.',
  leader: {
    name: 'The Centurion',
    title: 'Unnamed leader of the Legion of the Damned',
    description:
      'The Legion is led by a nameless figure known only as the Centurion — a massive armoured spectre who ' +
      'directs the ghostly warriors with silent gestures. He carries an ancient standard that burns with ' +
      'cold fire and a power sword that cleaves through material and immaterial alike. No one has ever ' +
      'communicated with the Centurion; the Legion arrives, fights, and vanishes on its own inscrutable terms.',
  },
  notableTraits: [
    'Materialise from thin air when Imperial forces face annihilation',
    'Wreathed in spectral fire that harms daemons and warp entities',
    'Cannot be permanently destroyed — they simply fade and reappear elsewhere',
    'Silent, eerily coordinated, and utterly fearless',
    'Their true nature is one of 40K\'s greatest unsolved mysteries',
  ],
  combatDoctrine:
    'The Legion of the Damned appear where they are needed most, striking at critical enemy positions with ' +
    'bolter and blade wreathed in supernatural fire. They fight with eerie precision, absorbing punishment ' +
    'that would destroy living Marines, then vanish when the battle turns.',
  whyPlay:
    'Choose the Legion of the Damned if you want the most mysterious warband in 40K — ghost Marines wreathed ' +
    'in fire who appear from the Warp. Unique, atmospheric, and deeply cool.',
},

raven_guard: {
  warbandId: 'raven_guard',
  factionId: 'adeptus_astartes',
  name: 'Raven Guard',
  motto: '"Victorus aut Mortis — Victory or Death."',
  overview:
    'The Raven Guard are masters of stealth, guerrilla warfare, and lightning strikes. Where other Chapters ' +
    'fight in open battle, the Raven Guard operate from the shadows — sabotaging supply lines, assassinating ' +
    'leaders, and launching devastating ambushes before melting away. Their pale skin and dark eyes give them ' +
    'an unsettling, raven-like appearance.',
  history:
    'The XIX Legion\'s Primarch Corvus Corax grew up as a slave in the mines of Lycaeus, where he forged a ' +
    'rebellion through guerrilla tactics. The Raven Guard were nearly destroyed at the Drop Site Massacre on ' +
    'Isstvan V, where they were betrayed by the traitor Legions. Corax attempted to rebuild using forbidden ' +
    'Emperor-derived gene tech, but the results were mutated horrors. Wracked with guilt, he eventually ' +
    'departed for the Eye of Terror, whispering "nevermore."',
  leader: {
    name: 'Corvus Corax',
    title: 'The Raven Lord, Primarch of the Raven Guard',
    description:
      'Corax was the most empathetic of the Primarchs, driven by a hatred of tyranny born from his years as ' +
      'a slave. He could become practically invisible at will, a preternatural stealth ability that extended ' +
      'to his Legion. After the devastating losses at Isstvan V, his desperate attempt to use the Emperor\'s ' +
      'own genetic science to accelerate recruitment produced horrors that haunted him. He vanished into the ' +
      'Eye of Terror pursuing his own dark purpose — and recent lore suggests he has become something monstrous.',
  },
  notableTraits: [
    'Preternatural stealth — Raven Guard can seemingly appear and vanish at will',
    'Jump pack specialists who strike from above in lightning raids',
    'Favour guerrilla tactics: hit-and-run, sabotage, and assassination',
    'Pale skin and dark eyes — a gene-seed mutation giving them a corvid appearance',
    'Prefer to weaken the enemy through attrition before committing to battle',
  ],
  combatDoctrine:
    'Strike from the shadows, hit the enemy where they\'re weakest, then disappear. Raven Guard soften targets ' +
    'with infiltrators and snipers, then deliver a killing blow with jump-pack assault squads before the enemy ' +
    'can organise a response.',
  whyPlay:
    'Choose Raven Guard if you love stealth, ambush tactics, and surgical strikes. The shadow warriors of the ' +
    'Imperium — they win before the enemy even knows they\'re there.',
},

salamanders: {
  warbandId: 'salamanders',
  factionId: 'adeptus_astartes',
  name: 'Salamanders',
  motto: '"Into the fires of battle, unto the anvil of war!"',
  overview:
    'The Salamanders are the most humanitarian Space Marine Chapter — warriors who genuinely care about ' +
    'civilian lives and fight to protect the innocent, not just achieve military objectives. Their coal-black ' +
    'skin and glowing red eyes (mutations from Nocturne\'s radiation) make them look fearsome, but they are ' +
    'among the kindest Astartes.',
  history:
    'The XVIII Legion was raised from the volcanic death world of Nocturne, where communities survive through ' +
    'mutual cooperation and master craftsmanship. Their Primarch Vulkan was a supreme smith and gentle giant, ' +
    'one of the few Primarchs who was genuinely kind. The Salamanders were devastated at Isstvan V alongside ' +
    'the Raven Guard and Iron Hands. Vulkan was believed killed multiple times but always returned — he is one ' +
    'of the Perpetuals, beings who cannot truly die.',
  leader: {
    name: 'Vulkan',
    title: 'The Lord of Drakes, Primarch of the Salamanders',
    description:
      'Vulkan was the largest and physically strongest of the Primarchs — and uniquely, a Perpetual who ' +
      'cannot permanently die. He was a master blacksmith who forged the nine legendary Artefacts of Vulkan. ' +
      'Known for his warmth and compassion, he once saved a child during a competition with his brother ' +
      'Primarch while others focused on the contest. During the Heresy, he was captured and tortured endlessly ' +
      'by Konrad Curze, dying and resurrecting thousands of times. His current location is unknown, but the ' +
      'Salamanders believe he will return when all nine artefacts are found.',
  },
  notableTraits: [
    'Master craftsmen — their weapons and armour are works of art and superior quality',
    'Specialists in flame and melta weapons, reflecting Nocturne\'s volcanic nature',
    'Genuinely care about civilian casualties — unique among Space Marines',
    'Coal-black skin and glowing red eyes from Nocturne\'s radiation',
    'Maintain close ties with their homeworld and its people',
  ],
  combatDoctrine:
    'Salamanders close to short range where their melta and flamer weapons are devastating. They advance ' +
    'steadily behind flame and heat, their superior-crafted armour absorbing return fire. In melee, thunder ' +
    'hammers forged on Nocturne\'s anvils crush any foe.',
  whyPlay:
    'Choose Salamanders if you want flame-wielding Space Marines who are actually good people. Master-crafted ' +
    'gear, melta/flamer specialisation, and a deeply honourable culture.',
},

space_wolves: {
  warbandId: 'space_wolves',
  factionId: 'adeptus_astartes',
  name: 'Space Wolves',
  motto: '"For Russ and the Allfather!"',
  overview:
    'The Space Wolves are the savage warrior-kings of Fenris — a Chapter of ferocious, honour-bound Viking ' +
    'warriors who fight alongside actual wolves and disdain the rigid Codex Astartes. They drink, they feast, ' +
    'they boast, and they are among the deadliest close-combat fighters in the Imperium.',
  history:
    'The VI Legion was the Emperor\'s executioner — sent to bring rogue elements to heel. Their Primarch Leman ' +
    'Russ was raised among the wolves of Fenris and became the warrior-king of its tribal peoples. The Wolves ' +
    'carry out one of the darkest deeds of the Heresy: the burning of Prospero, sent (with manipulation from ' +
    'Horus) to destroy the Thousand Sons. After the Heresy, Russ departed on a mysterious quest into the Eye ' +
    'of Terror, prophesying he would return for the "Wolftime" — the final battle.',
  leader: {
    name: 'Leman Russ',
    title: 'The Wolf King, Primarch of the Space Wolves',
    description:
      'Leman Russ was a towering warrior raised by the great wolf Freki on Fenris. He was the Emperor\'s ' +
      'executioner — the one sent to punish wayward brothers. Boisterous, fierce, and deceptively cunning, ' +
      'Russ was both a savage warrior and a shrewd leader. His attack on Prospero remains controversial — was ' +
      'he a loyal instrument of the Emperor\'s will, or was he manipulated by Horus into destroying an innocent ' +
      'Legion? Russ eventually departed into the Eye of Terror on a quest whose nature remains unknown.',
  },
  notableTraits: [
    'Fenrisian Wolves fight alongside the Chapter as loyal war-beasts',
    'Reject the Codex Astartes: unique pack-based organisation',
    'Wulfen — Marines who succumb to the Curse of the Wulfen and become wolflike berserkers',
    'Rune Priests channel psychic power through Fenrisian shamanistic traditions',
    'A culture of sagas, feasting, and honour-bound challenges',
  ],
  combatDoctrine:
    'The Space Wolves fight in packs, with Grey Hunters and Blood Claws coordinating instinctively like a ' +
    'wolf pack. They favour aggressive close-combat tactics, supported by Fenrisian Wolves and thunderwolf ' +
    'cavalry. Long Fangs provide heavy fire support.',
  whyPlay:
    'Choose Space Wolves if you want Viking Space Marines with wolves. Aggressive, charismatic, and deeply ' +
    'characterful — the party animals of the Adeptus Astartes.',
},

white_scars: {
  warbandId: 'white_scars',
  factionId: 'adeptus_astartes',
  name: 'White Scars',
  motto: '"For the Khan and the Emperor!"',
  overview:
    'The White Scars are lightning-fast cavalry warriors who prize speed above all else. Inspired by the ' +
    'steppe nomads of their homeworld Chogoris, they fight from bikes, speeders, and fast attack vehicles, ' +
    'encircling the enemy and striking from every direction before they can react.',
  history:
    'The V Legion was reunited with its Primarch Jaghatai Khan on the plains of Chogoris, where he had ' +
    'united the warring tribes through sheer martial genius. The Khan is often overlooked among the Primarchs, ' +
    'but he was fiercely loyal, brilliantly intelligent, and possibly the finest cavalry commander who ever ' +
    'lived. During the Heresy, the White Scars fought their way through a Traitor blockade to reach Terra. ' +
    'Khan vanished into the Dark Eldar\'s Webway and has not been seen since.',
  leader: {
    name: 'Jaghatai Khan',
    title: 'The Warhawk, Primarch of the White Scars',
    description:
      'Jaghatai Khan was the master of mobile warfare — a brilliant cavalryman and a poet-warrior in the ' +
      'Chogorian tradition. Quiet and thoughtful among his brothers, he was underestimated by many — a mistake ' +
      'no enemy made twice. He vanished pursuing Dark Eldar raiders into the Webway, and the White Scars ' +
      'believe he still rides somewhere within that dimensional labyrinth, hunting the galaxy\'s greatest prey.',
  },
  notableTraits: [
    'Bike specialists — the fastest Space Marine Chapter on the battlefield',
    'Hit-and-run tactics: strike, withdraw, and strike again from a new angle',
    'Chogorian culture: poetry, calligraphy, and a deep love of freedom',
    'Lightning claws and power lances are favoured melee weapons',
    'Fierce independence — they resent being ordered to hold static positions',
  ],
  combatDoctrine:
    'Encircle and destroy. White Scars bike squads sweep around the enemy flanks, launching feints and ' +
    'probing attacks until they find a weakness, then concentrate overwhelming force at that point. They never ' +
    'stay still long enough to be pinned down.',
  whyPlay:
    'Choose White Scars if you want the fastest Marine warband — bikes, speed, and hit-and-run tactics. ' +
    'Mongolian steppe warrior aesthetics blended with Space Marine power.',
},

grey_knights_chapter: {
  warbandId: 'grey_knights_chapter',
  factionId: 'adeptus_astartes',
  name: 'Grey Knights',
  motto: '"We are the hammer."',
  overview:
    'The Grey Knights are the secret Chapter 666 — an entire Chapter of powerful psykers dedicated to ' +
    'fighting daemons. Every single Grey Knight is a trained psyker, and their very existence is so classified ' +
    'that witnesses are often mind-wiped or eliminated. They wield Nemesis force weapons and fight the most ' +
    'dangerous entities in the galaxy.',
  history:
    'Founded in absolute secrecy during the Heresy on the orders of Malcador the Sigillite, the Grey Knights ' +
    'were created from the purest gene-seed available — some believe from the Emperor Himself. Their first ' +
    'Grand Masters were eight Space Marines drawn from both loyalist and traitor Legions who remained true. ' +
    'In ten thousand years of fighting daemons, no Grey Knight has ever fallen to Chaos — an unprecedented ' +
    'record. Their fortress-monastery on Titan was hidden in the Warp during the Heresy and re-emerged after.',
  leader: {
    name: 'Supreme Grand Master Kaldor Draigo',
    title: 'Supreme Grand Master of the Grey Knights',
    description:
      'Kaldor Draigo is unique among Space Marines — he is trapped in the Warp, endlessly battling through ' +
      'the Realm of Chaos, carving his name into the heart of Nurgle\'s garden, toppling Tzeentch\'s towers, ' +
      'and slaying daemon princes. He periodically materialises in realspace during moments of great need, ' +
      'fights alongside his brothers, then is dragged back into the Warp. His survival is either miraculous ' +
      'or deeply suspicious.',
  },
  notableTraits: [
    'Every battle-brother is a powerful psyker — the most psychically gifted Chapter',
    'Nemesis Force Weapons channel psychic energy to banish daemons permanently',
    'Their existence is the Imperium\'s most closely guarded secret',
    'No Grey Knight has ever fallen to Chaos in 10,000 years',
    'Gene-seed rumoured to be derived from the Emperor\'s own genetic material',
  ],
  combatDoctrine:
    'Grey Knights fight with psychic powers and Nemesis weapons tailored to combating daemons. They teleport ' +
    'into the heart of daemonic incursions and banish entities that would overwhelm any other force. Each ' +
    'strike squad is a surgical weapon aimed at the Warp itself.',
  whyPlay:
    'Choose Grey Knights if you want an all-psyker Chapter that hunts daemons. Elite, mysterious, and ' +
    'incredibly powerful — the Imperium\'s secret weapon against the Warp.',
},

// ── Adepta Sororitas Warbands ───────────────────────────────────────

army_of_faith: {
  warbandId: 'army_of_faith',
  factionId: 'adepta_sororitas',
  name: 'Army of Faith (Adepta Sororitas)',
  motto: '"On wings of faith we descend!"',
  overview:
    'An Army of Faith warband is built around jump-pack Seraphim and Zephyrim squads that descend from ' +
    'the heavens in a blaze of divine fire. They embody the Sororitas at their most aggressive — angelic ' +
    'warriors dropping from the sky with bolt pistols blazing and power swords swinging.',
  history:
    'The Seraphim and Zephyrim represent the most devout and aggressive warriors of the Adepta Sororitas. ' +
    'Given the honour of flight packs, they train relentlessly to fight in mid-air, delivering the Emperor\'s ' +
    'judgement from above. An Army of Faith warband leans into this aerial doctrine, fielding as many jump-pack ' +
    'sisters as possible for devastating descending strikes.',
  leader: {
    name: 'Saint Celestine',
    title: 'The Living Saint, Martyr-Champion of the Adepta Sororitas',
    description:
      'Saint Celestine is a miracle made manifest — a Living Saint who has died and been resurrected countless ' +
      'times by the Emperor\'s divine will. She descends on wings of holy fire, the Ardent Blade in hand, and ' +
      'where she fights, Acts of Faith manifest with greater frequency. She is the spiritual heart of every ' +
      'Army of Faith, a living proof that the Emperor protects.',
  },
  notableTraits: [
    'Jump-pack heavy — Seraphim and Zephyrim form the core of the warband',
    'Fast, hard-hitting assault force that descends from the heavens',
    'Acts of Faith empower sisters with miraculous abilities',
    'Paired bolt pistols and power swords are signature weapons',
    'The ultimate expression of the Sororitas\' aggressive faith',
  ],
  combatDoctrine:
    'Deploy from high ground or deep strike, then descend in a devastating wave of bolt fire and blade work. ' +
    'Speed and faith combine into an overwhelming assault that breaks the enemy before they can react.',
  whyPlay:
    'Choose Army of Faith if you want an aggressive, fast Sororitas warband that fights from the sky.',
},

hallowed_martyrs: {
  warbandId: 'hallowed_martyrs',
  factionId: 'adepta_sororitas',
  name: 'Hallowed Martyrs (Adepta Sororitas)',
  motto: '"In death, we serve still."',
  overview:
    'A Hallowed Martyrs warband draws divine strength from sacrifice. As sisters fall in battle, the ' +
    'survivors are empowered by miraculous fury — each death fuelling the faith of those who remain. ' +
    'The more the warband bleeds, the more dangerous it becomes.',
  history:
    'The Order of the Sacred Rose and Order of the Bloody Rose both maintain traditions where the martyrdom ' +
    'of sisters in battle is seen as a sacred offering to the Emperor. Hallowed Martyrs warbands take this ' +
    'to the extreme — they deliberately field expendable elements knowing that each death triggers divine ' +
    'miracles among the survivors.',
  leader: {
    name: 'Morvenn Vahl',
    title: 'Abbess Sanctorum, Leader of the Adepta Sororitas',
    description:
      'Morvenn Vahl is the current Abbess Sanctorum — the supreme leader of all Adepta Sororitas orders. ' +
      'Unlike her predecessors who ruled from convents, Vahl fights on the front lines in the Paragon ' +
      'Warsuit, a massive exo-armour that combines her martial fury with devastating weapons. She is the ' +
      'physical embodiment of the Martyrs\' creed: lead from the front, and let your sacrifice inspire.',
  },
  notableTraits: [
    'Miracles intensify as sisters fall in battle — sacrifice empowers survivors',
    'Martyrdom is a tactical tool, not just a spiritual concept',
    'Battle Sisters hold the line while expendable elements trigger divine fury',
    'Faith-powered abilities grow stronger as casualties mount',
    'The warband is most dangerous when it is nearly destroyed',
  ],
  combatDoctrine:
    'Advance steadily, accepting casualties that fuel increasingly powerful Acts of Faith. As the warband ' +
    'takes losses, the survivors become empowered with divine fury, turning a weakened force into an ' +
    'unstoppable spiritual juggernaut.',
  whyPlay:
    'Choose Hallowed Martyrs if you want a warband that gets stronger as it takes losses — the comeback ' +
    'queens of the battlefield.',
},

penitent_host: {
  warbandId: 'penitent_host',
  factionId: 'adepta_sororitas',
  name: 'Penitent Host (Adepta Sororitas)',
  motto: '"Redemption through suffering."',
  overview:
    'A Penitent Host is a warband of sinners seeking redemption through glorious death. Squads of Repentia — ' +
    'sisters who have failed the Emperor and fight unarmoured with enormous eviscerators — form the core, ' +
    'supported by towering Penitent Engines piloted by the worst offenders, wired into their machines to ' +
    'feel every blow.',
  history:
    'The concept of penitence is central to Sororitas culture — failure is atoned for through suffering and ' +
    'death. Repentia strip their armour and take up massive two-handed eviscerators, charging into the ' +
    'thickest fighting. Penitent Engines are walking war machines whose pilots are hardwired to feel amplified ' +
    'pain, driving them into berserker fury. A Penitent Host warband fields these guilt-driven warriors en masse.',
  leader: {
    name: 'Repentia Superior',
    title: 'Mistress of Redemption',
    description:
      'The Repentia Superior is a Canoness or senior Sister who commands the penitent elements — driving them ' +
      'forward with lashes and prayers, ensuring they find the glorious death they seek. She is both ' +
      'compassionate and ruthless, understanding that the penitents desire nothing more than to die in the ' +
      'Emperor\'s service and atone for their sins.',
  },
  notableTraits: [
    'Repentia charge unarmoured into melee with massive eviscerator chainswords',
    'Penitent Engines are pain-fuelled berserker walkers',
    'The warband actively seeks death in battle as spiritual redemption',
    'Glass cannon: devastating in assault but extremely fragile',
    'Thematic and dramatic — a warband of the damned seeking salvation',
  ],
  combatDoctrine:
    'Charge everything. Repentia and Penitent Engines rush the enemy in a frenzy of eviscerators and ' +
    'mechanical fury. They hit incredibly hard but cannot sustain prolonged fire — victory comes through ' +
    'overwhelming aggression or not at all.',
  whyPlay:
    'Choose Penitent Host if you want a glass-cannon melee warband of fanatical warriors seeking death. ' +
    'Dramatic, high-risk, and incredibly satisfying when the charge connects.',
},

// ── Astra Militarum Warbands ────────────────────────────────────────

catachan_jungle_fighters: {
  warbandId: 'catachan_jungle_fighters',
  factionId: 'astra_militarum',
  name: 'Catachan Jungle Fighters',
  motto: '"The jungle always wins — unless you\'re Catachan."',
  overview:
    'The Catachan Jungle Fighters are the toughest human soldiers in the Imperium. Raised on a death world ' +
    'where every plant, animal, and insect is lethal, Catachans are hardened survivalists who thrive in ' +
    'environments that kill normal soldiers. They fight with oversized knives, brute strength, and an ' +
    'irreverent attitude that makes Commissars nervous.',
  history:
    'Catachan is classified as a Death World, and every Catachan soldier has survived a childhood that would ' +
    'kill a Space Marine Scout. The jungle itself is sentient and hostile — carnivorous plants, acid rain, and ' +
    'predators the size of tanks. Those who survive are naturally some of the deadliest human warriors in the ' +
    'galaxy. Catachan regiments have an informal culture that clashes with standard Imperial discipline.',
  leader: {
    name: 'Sly Marbo',
    title: 'The One-Man Army, Hero of Catachan',
    description:
      'Sly Marbo is the Catachan boogeyman — a legendary one-man army who operates behind enemy lines for ' +
      'months at a time, single-handedly destroying enemy forces with nothing but a knife and sheer killing ' +
      'instinct. He is the 40K equivalent of Rambo, and his exploits are so outlandish they sound like myth. ' +
      'But every story about Sly Marbo is true.',
  },
  notableTraits: [
    'Raised on a death world — the toughest baseline humans in the Imperium',
    'Famous oversized "Catachan Fang" fighting knives used as swords',
    'Exceptional jungle and guerrilla warfare specialists',
    'Informal discipline that drives Commissars to despair',
    'Brawn and survival instincts make them dangerous in any environment',
  ],
  combatDoctrine:
    'Catachans ambush in close terrain, using traps, demolitions, and brute-force melee to overwhelm enemies ' +
    'in confined environments. Their jungle fighter training makes them masters of any difficult terrain.',
  whyPlay:
    'Choose Catachans if you want muscular jungle warriors who fight with knives and explosives. The action ' +
    'movie heroes of 40K.',
},

death_korp_of_krieg: {
  warbandId: 'death_korp_of_krieg',
  factionId: 'astra_militarum',
  name: 'Death Korps of Krieg',
  motto: '"Death is our duty."',
  overview:
    'The Death Korps of Krieg are trench warfare specialists who view death as atonement. Wearing gas masks ' +
    'and greatcoats, they march into hopeless situations with grim determination, accepting horrific casualties ' +
    'as the price of loyalty. They are the quintessential World War I-inspired regiment.',
  history:
    'Krieg was a world that rebelled against the Imperium. The loyalist Colonel Jurten detonated the planet\'s ' +
    'atomic arsenal to deny it to the traitors, reducing Krieg to a nuclear wasteland. Five centuries of civil ' +
    'war followed before the loyalists prevailed. The survivors, consumed by collective guilt, founded the Death ' +
    'Korps — regiments that volunteer for the most hopeless sieges and attritional campaigns, seeking to atone ' +
    'for Krieg\'s sin of rebellion through the only currency they understand: death.',
  leader: {
    name: 'The Death Rider Marshal',
    title: 'Field Commander of the Death Korps',
    description:
      'Death Korps officers are near-anonymous, identified by rank number rather than name. The Death Rider ' +
      'Marshal leads from the front of cavalry charges, sabre drawn, riding cloned Krieg horses bred for the ' +
      'poison-atmosphere of no-man\'s-land. They expect to die — and consider it the highest honour. Their ' +
      'leadership is efficient, emotionless, and utterly willing to spend lives like ammunition.',
  },
  notableTraits: [
    'Gas-masked, greatcoat-wearing trench warfare specialists',
    'Accept astronomical casualties as standard operating procedure',
    'View death as atonement for Krieg\'s ancient sin of rebellion',
    'Clone-bred soldiers who may not even be traditionally born',
    'Excel at siege, attritional warfare, and chemical/gas environments',
  ],
  combatDoctrine:
    'Dig in, hold the line, and advance through no-man\'s-land under withering fire. The Death Korps wins ' +
    'through attrition — they can accept losses that would break any other regiment and simply keep advancing.',
  whyPlay:
    'Choose Death Korps if you want grim WW1-themed soldiers who never back down. The most atmospheric and ' +
    'tragic regiment in the Imperium — duty unto death, literally.',
},

traitor_guard: {
  warbandId: 'traitor_guard',
  factionId: 'astra_militarum',
  name: 'Traitor Guard',
  motto: '"The Imperium abandoned us first."',
  overview:
    'Traitor Guard are Astra Militarum regiments who have turned to Chaos, whether through corruption, ' +
    'desperation, or genuine belief that the Dark Gods offer a better deal than the rotting Imperium. They ' +
    'fight with familiar Imperial equipment but augmented by dark blessings and makeshift Chaos modifications.',
  history:
    'Across ten millennia, countless Guard regiments have fallen to Chaos. Some are corrupted by daemonic ' +
    'incursions, others are led astray by charismatic Chaos preachers, and many simply snap under the horror ' +
    'of the 41st Millennium and embrace the only power that seems to care. Traitor Guard are common in the ' +
    'forces of Chaos warlords, providing the expendable infantry that Chaos Space Marines need.',
  leader: {
    name: 'Renegade Commander',
    title: 'Fallen Officer of the Astra Militarum',
    description:
      'A Traitor Guard commander is typically a former Imperial officer — a Colonel or General who turned ' +
      'against the Imperium, bringing their troops with them. Some are willing converts, others are possessed ' +
      'or blackmailed. They retain their tactical training but supplement it with dark blessings, daemonic ' +
      'pacts, and the desperate ruthlessness of those who know there is no going back.',
  },
  notableTraits: [
    'Familiar Imperial equipment corrupted with Chaos iconography',
    'Access to Dark Pacts and blessings from the Chaos Gods',
    'Expendable cultist infantry mixed with trained Guard veterans',
    'Retain armoured vehicles, heavy weapons, and Imperial tactics',
    'Driven by desperation, fanaticism, or daemonic possession',
  ],
  combatDoctrine:
    'Traitor Guard fight like the Guard they once were — massed infantry, heavy weapons, and armoured support. ' +
    'But they supplement this with Chaos-granted powers, expendable cultist waves, and a willingness to employ ' +
    'tactics too dark for loyal regiments.',
  whyPlay:
    'Choose Traitor Guard if you want Imperial Guard that serve Chaos — the corrupted mirror of the Astra ' +
    'Militarum with dark blessings layered atop familiar tactics.',
},

imperial_navy: {
  warbandId: 'imperial_navy',
  factionId: 'astra_militarum',
  name: 'Imperial Navy',
  motto: '"The void is our domain."',
  overview:
    'Imperial Navy warbands are void-born crews — naval ratings and armsmen who fight aboard ships and ' +
    'stations. Armed with exotic Naval hardware like cutlasses, boarding shields, and ship-mounted weaponry ' +
    'adapted for ground use, they bring a different flavour to the Astra Militarum lineup.',
  history:
    'The Imperial Navy is the void arm of the Imperium\'s military, distinct from the Astra Militarum ground ' +
    'forces. Navy personnel are born, live, and die aboard their ships, often never setting foot on a planet. ' +
    'When boarded or deployed for ground operations, they fight with the weapons at hand — boarding shotguns, ' +
    'naval cutlasses, and improvised heavy weapons ripped from ship hardpoints.',
  leader: {
    name: 'Ship\'s Captain',
    title: 'Master of a Void Vessel',
    description:
      'A Navy Captain is the absolute authority aboard their vessel — a tyrant and father figure whose word ' +
      'is literally law. They lead boarding actions personally, armed with ornate power weapons and protected ' +
      'by their best armsmen. Their tactical mindset is shaped by void warfare: tight corridors, zero-gravity ' +
      'combat, and the unique dangers of fighting inside pressurised hulls.',
  },
  notableTraits: [
    'Void-born warriors adapted to fighting in ships and space stations',
    'Exotic Naval hardware: boarding shields, cutlasses, shotcannons',
    'Used to fighting in tight, confined spaces with limited lines of sight',
    'Fiercely loyal to their ship and captain above all other allegiances',
    'A different culture from ground-based Guard — traditions of the void',
  ],
  combatDoctrine:
    'Close-quarters boarding action tactics — advance behind shields, clear corridors with shotguns and ' +
    'blades, and overwhelm through close-range violence in confined spaces.',
  whyPlay:
    'Choose Imperial Navy if you want void-born warriors with unique pirate-flavour equipment. A refreshing ' +
    'alternative to standard Guard armies.',
},

ratling_regiment: {
  warbandId: 'ratling_regiment',
  factionId: 'astra_militarum',
  name: 'Ratling Regiment',
  motto: '"Have you checked the pantry lately?"',
  overview:
    'A Ratling Regiment is an entire warband of diminutive Abhumans who compensate for their tiny stature ' +
    'with exceptional marksmanship, cunning, and an unshakeable love of food and comfort. They are regarded ' +
    'with affection and exasperation by the wider Militarum.',
  history:
    'Ratlings are a stable Abhuman strain — small, rotund humanoids with exceptional hand-eye coordination ' +
    'and a well-documented talent for pilfering supplies. They serve the Imperium primarily as snipers and ' +
    'cooks, both roles leveraging their keen eyes and appreciation for the finer things.',
  leader: {
    name: 'Head Cook / Chief Sniper',
    title: 'The Big Small One',
    description:
      'A Ratling leader is typically the best shot and most accomplished thief in the regiment — not that ' +
      'they would admit to the latter. They lead by earning respect through marksmanship competitions and by ' +
      'ensuring their troops are well-fed, which for Ratlings is the ultimate mark of leadership.',
  },
  notableTraits: [
    'Tiny Abhumans with exceptional accuracy as snipers',
    'Light-fingered — notorious for stealing anything not nailed down',
    'Love of food and comfort drives their morale',
    'Surprisingly effective in sniper and scout roles',
    'Comic relief that is genuinely dangerous at range',
  ],
  combatDoctrine:
    'Stay far away from the enemy, shoot accurately, and make sure dinner is ready after the battle.',
  whyPlay:
    'Choose Ratling Regiment if you want a quirky, fun warband of tiny snipers with big appetites.',
},

// ═══════════════════════════════════════════════════════════════════════
// ADEPTUS MECHANICUS / INQUISITION / OTHER IMPERIAL WARBANDS
// ═══════════════════════════════════════════════════════════════════════

dark_mechanicum_variant: {
  warbandId: 'dark_mechanicum_variant',
  factionId: 'adeptus_mechanicus',
  name: 'Dark Mechanicum',
  motto: '"The Omnissiah is a lie. The true Machine God dwells in the Warp."',
  overview:
    'The Dark Mechanicum are heretek Tech-Priests who turned to Chaos during the Horus Heresy, twisting ' +
    'machines with daemonic power and creating nightmarish daemon engines. They blend forbidden technology ' +
    'with Warp sorcery, producing creations that horrify both loyalists and conventional Chaos worshippers.',
  history:
    'When Horus turned traitor, roughly half the Mechanicum sided with him, led by the Fabricator-General of ' +
    'Mars himself. These renegade Tech-Priests fled to the Eye of Terror where they continued their work ' +
    'unshackled from the restrictions of the Machine Cult. Ten millennia of experimentation in the Warp has ' +
    'produced horrors — living machines, daemon-possessed forge worlds, and weapons that should not exist.',
  leader: {
    name: 'Kelbor-Hal',
    title: 'First Fabricator-General of the Dark Mechanicum',
    description:
      'Kelbor-Hal was the Fabricator-General of Mars who betrayed the Imperium, opening the Vaults of Moravec ' +
      'and unleashing forbidden technologies. His current fate is unknown — ten thousand years in the Warp has ' +
      'likely transformed him into something barely recognisable as once-human. Dark Mechanicum leaders now are ' +
      'typically Heretek Magi who have fully merged with daemonic technology.',
  },
  notableTraits: [
    'Daemon Engines: machines possessed by bound Warp entities',
    'Forbidden technology from before the Age of Strife',
    'Blend Warp sorcery with mechanical engineering',
    'Create servitors, automata, and war engines of nightmarish design',
    'Worship Vashtor or Chaos Undivided through a corrupted Machine Cult',
  ],
  combatDoctrine:
    'Dark Mechanicum deploy daemon-engine heavy forces supported by corrupted servitors and heretek warriors. ' +
    'Their war machines are unpredictable but devastatingly powerful, blending technological superiority with ' +
    'the raw power of the Warp.',
  whyPlay:
    'Choose Dark Mechanicum if you want corrupted tech-priests with daemon engines. The dark mirror of the ' +
    'Adeptus Mechanicus where machines scream and technology is possessed.',
},

data_psalm_conclave: {
  warbandId: 'data_psalm_conclave',
  factionId: 'adeptus_mechanicus',
  name: 'Data-Psalm Conclave',
  motto: '"The flesh is insufficient. The code is eternal."',
  overview:
    'A Data-Psalm Conclave is a Cult Mechanicus warband of Tech-Priests and their servitor thralls. Led by ' +
    'senior Tech-Priests who chant binary data-psalms, this warband focuses on the priesthood of the Machine ' +
    'God rather than the military Skitarii forces.',
  history:
    'The Cult Mechanicus is the religious arm of the Adeptus Mechanicus — Tech-Priests who study, worship, and ' +
    'preserve technology as sacred artefacts of the Omnissiah. A Data-Psalm Conclave is a warband organised ' +
    'around these priest-engineers and their servitor bodyguards, representing the theocratic heart of Mars.',
  leader: {
    name: 'Archmagos Dominus',
    title: 'High Priest of the Machine God',
    description:
      'An Archmagos Dominus is a senior Tech-Priest who has replaced almost all organic matter with ' +
      'augmetics. More machine than man, they have forgotten what it means to be human — their emotions are ' +
      'data, their prayers are code, and their purpose is the holy quest for knowledge. They command networks ' +
      'of servitors through neural uplinks and fight with esoteric energy weapons.',
  },
  notableTraits: [
    'Led by senior Tech-Priests rather than Skitarii soldiers',
    'Heavy use of servitors, automatons, and cyber-constructs',
    'Data-psalms: binary prayers that enhance nearby machines',
    'Exotic energy weapons: arc rifles, plasma calivers, transuranic weapons',
    'Deeply religious — technology is sacred, not merely functional',
  ],
  combatDoctrine:
    'Tech-Priests direct servitor thralls from behind defensive positions while employing exotic energy weapons ' +
    'at range. The Conclave fights methodically, treating battle as a data-processing exercise.',
  whyPlay:
    'Choose Data-Psalm Conclave if you want a Tech-Priest-led force of cyborg war machines and holy engineers.',
},

skitarii_hunter_cohort: {
  warbandId: 'skitarii_hunter_cohort',
  factionId: 'adeptus_mechanicus',
  name: 'Skitarii Hunter Cohort',
  motto: '"Locate. Identify. Terminate."',
  overview:
    'A Skitarii Hunter Cohort is an elite strike force of Skitarii Rangers and Vanguard operating without ' +
    'direct Tech-Priest oversight. These cybernetic soldiers are the military arm of the Mechanicus, hunting ' +
    'targets with relentless mechanical precision.',
  history:
    'Skitarii are the augmented soldiers of the Adeptus Mechanicus — humans modified with extensive cybernetics ' +
    'and neural inhibitors that make them fearless, tireless, and utterly loyal to their Forge World. A Hunter ' +
    'Cohort operates independently, tracking targets through hostile environments with machine efficiency.',
  leader: {
    name: 'Skitarii Marshall',
    title: 'Alpha Primus of the Hunter Cohort',
    description:
      'A Skitarii Marshall is the most augmented non-priest in the Mechanicus hierarchy. Their brains run ' +
      'tactical algorithms in real-time, their senses are enhanced far beyond human limits, and their bodies ' +
      'are hardened weapon platforms. They lead through superiority of data processing rather than charisma.',
  },
  notableTraits: [
    'Elite cybernetic soldiers with extensive augmentation',
    'Galvanic rifles and radium weapons are signature armaments',
    'Operate independently without Tech-Priest supervision',
    'Tireless, fearless, and relentless in pursuit of objectives',
    'Neural inhibitors suppress fear and pain',
  ],
  combatDoctrine:
    'Advance in overlapping formations, laying down precise fire with galvanic and radium weapons. Rangers ' +
    'engage at long range while Vanguard close to irradiate targets at mid-range. The Cohort is a precise, ' +
    'mechanical killing machine.',
  whyPlay:
    'Choose Skitarii Hunter Cohort if you want a pure Skitarii force — cybernetic soldiers with exotic weapons.',
},

ordo_hereticus: {
  warbandId: 'ordo_hereticus',
  factionId: 'the_inquisition',
  name: 'Ordo Hereticus',
  motto: '"There is no innocence, only degrees of guilt."',
  overview:
    'The Ordo Hereticus — the witch-finders — hunts heretics, mutants, and rogue psykers within the ' +
    'Imperium itself. Supported by Sisters of Battle, they root out corruption from within, burning the ' +
    'unfaithful with holy promethium and righteous fury.',
  history:
    'Founded after the Age of Apostasy, the Ordo Hereticus was established to prevent internal corruption from ' +
    'ever again threatening the Imperium. Their Inquisitors are paranoid, fanatical, and utterly ruthless — ' +
    'willing to burn entire populations on suspicion of heresy.',
  leader: {
    name: 'Inquisitor of the Ordo Hereticus',
    title: 'Witch-Finder, Purger of Heresy',
    description:
      'A Hereticus Inquisitor is part detective, part judge, and part executioner. Armed with psychic nulls, ' +
      'consecrated weapons, and the authority to command any Imperial citizen, they investigate signs of heresy ' +
      'with forensic precision — then burn everything they find.',
  },
  notableTraits: [
    'Supported by Adepta Sororitas warriors as Chamber Militant',
    'Specialists in detecting and destroying heresy within the Imperium',
    'Pyromantic weaponry — flamers and melta guns purify the unclean',
    'Authority to condemn anyone, from peasant to planetary governor',
    'Paranoid, thorough, and utterly merciless',
  ],
  combatDoctrine:
    'Investigate, identify, and purge. Hereticus warbands advance behind Sororitas shield, burning out ' +
    'heretical strongholds with flamers and faith.',
  whyPlay:
    'Choose Ordo Hereticus if you want Inquisitor-led witch-hunters backed by Sisters of Battle.',
},

ordo_malleus: {
  warbandId: 'ordo_malleus',
  factionId: 'the_inquisition',
  name: 'Ordo Malleus',
  motto: '"By the Emperor\'s will, the daemon shall be destroyed."',
  overview:
    'The Ordo Malleus is the daemon-hunting branch of the Inquisition. Their Inquisitors are among the ' +
    'most dangerous individuals in the Imperium — psykers who fight fire with fire, wielding daemon-killing ' +
    'weapons and forbidden knowledge of the Warp to banish entities that would consume worlds.',
  history:
    'The Ordo Malleus is the oldest of the Inquisitorial Ordos, established in the aftermath of the Horus ' +
    'Heresy to combat daemonic incursions. Their Chamber Militant is the Grey Knights. Malleus Inquisitors ' +
    'walk a razor\'s edge — they must understand the daemon to fight it, and many fall to corruption.',
  leader: {
    name: 'Inquisitor of the Ordo Malleus',
    title: 'Daemon-Hunter, Master of the Warp',
    description:
      'A Malleus Inquisitor is armed with daemonhosts, psycannons, and forbidden lore. They wield the True ' +
      'Names of daemons as weapons, binding and banishing entities with ritual and willpower. Many are powerful ' +
      'psykers themselves — the only way to fight Warp-born horrors on their own terms.',
  },
  notableTraits: [
    'Grey Knights serve as their Chamber Militant',
    'Wield daemon-killing weapons: force swords, psycannons, daemonhammers',
    'Knowledge of True Names allows them to bind or banish daemons',
    'Walk a fine line between using and being consumed by forbidden knowledge',
    'The most dangerous Inquisitors — dealing with threats beyond mortal comprehension',
  ],
  combatDoctrine:
    'Deploy Grey Knight strike squads and daemon-killing specialists against Warp incursions. The Inquisitor ' +
    'provides ritual support and forbidden knowledge while heavily armed warriors close to banish.',
  whyPlay:
    'Choose Ordo Malleus if you want daemon-hunters backed by Grey Knights — the most elite anti-daemon force.',
},

ordo_xenos: {
  warbandId: 'ordo_xenos',
  factionId: 'the_inquisition',
  name: 'Ordo Xenos',
  motto: '"Suffer not the alien to live."',
  overview:
    'The Ordo Xenos hunts alien threats and sometimes weaponises xenos technology. Their Inquisitors are ' +
    'pragmatic — some despise all aliens equally, while others recognise the value of understanding the ' +
    'enemy\'s tools. They are supported by the Deathwatch.',
  history:
    'The Ordo Xenos was fully codified after the War of the Beast, when the Orks nearly conquered Terra. ' +
    'Their mandate is simple: identify, study, and eliminate xenos threats. Some Xenos Inquisitors are rigid ' +
    'puritans; others are radical enough to use alien weapons and even negotiate with alien species.',
  leader: {
    name: 'Inquisitor of the Ordo Xenos',
    title: 'Alien-Hunter, Xenobiologist',
    description:
      'A Xenos Inquisitor combines soldier, scientist, and diplomat. They study alien biology and technology ' +
      'to exploit weaknesses, and some carry xenos weapons confiscated from fallen enemies. Their knowledge ' +
      'of alien civilisations is encyclopaedic and dangerous.',
  },
  notableTraits: [
    'Deathwatch Space Marines serve as their Chamber Militant',
    'May wield confiscated alien weapons and technology',
    'Deep knowledge of alien biology, culture, and tactics',
    'Range from puritan xenophobes to radical xenos-weaponisers',
    'Operate across the galaxy\'s most dangerous alien war zones',
  ],
  combatDoctrine:
    'Deploy Deathwatch kill-teams tailored to specific alien threats. The Inquisitor provides intelligence ' +
    'and specialised xenos-killing equipment while surgical strike teams eliminate high-value targets.',
  whyPlay:
    'Choose Ordo Xenos if you want alien-hunting Inquisitors with Deathwatch backup and exotic xenos weapons.',
},

ordo_minoris: {
  warbandId: 'ordo_minoris',
  factionId: 'the_inquisition',
  name: 'Ordo Minoris',
  motto: '"The Emperor\'s law is absolute."',
  overview:
    'The Ordos Minoris represent the lesser-known branches of the Inquisition — hundreds of smaller ordos ' +
    'investigating everything from time anomalies to lost technology. In Trench Hammer, they are supported ' +
    'by Adeptus Arbites and Necromunda-style enforcers.',
  history:
    'Beyond the Big Three ordos, the Inquisition contains countless specialist branches. The Ordo Chronos ' +
    'investigates temporal anomalies, the Ordo Machinum monitors the Mechanicus, and dozens more handle niche ' +
    'threats. Minoris Inquisitors are often eccentrics — investigators pursuing obscure theories.',
  leader: {
    name: 'Inquisitor of an Ordo Minoris',
    title: 'Specialist Investigator',
    description:
      'A Minoris Inquisitor often operates with fewer resources than their mainstream counterparts but ' +
      'compensates with creativity, eclectic support staff, and Adeptus Arbites enforcement squads. They ' +
      'investigate the weird edges of the galaxy that don\'t fit neat categories.',
  },
  notableTraits: [
    'Supported by Adeptus Arbites law enforcement troops',
    'Investigate niche and unusual threats',
    'Eclectic, resourceful, and often eccentric',
    'Broad mandate covering anything the Big Three don\'t handle',
    'May include Necromunda-sourced enforcers and specialists',
  ],
  combatDoctrine:
    'Adaptable and pragmatic. Minoris warbands use whatever tools are at hand — Arbites enforcers, ' +
    'hired guns, and specialist equipment tailored to the current investigation.',
  whyPlay:
    'Choose Ordo Minoris for a diverse, eccentric Inquisition warband with law-enforcement flavour.',
},

ecclesiastic_militant_force: {
  warbandId: 'ecclesiastic_militant_force',
  factionId: 'adeptus_ministorum',
  name: 'Ecclesiastic Militant Force',
  motto: '"The Emperor\'s light burns brightest in the faithful."',
  overview:
    'An Ecclesiastic Militant Force is a Ministorum warband augmented with Adepta Sororitas warriors. ' +
    'Preachers and confessors lead mixed forces of zealous faithful and battle-hardened Sisters into war ' +
    'under the banner of the Ecclesiarchy.',
  history:
    'The Adeptus Ministorum is the Imperium\'s state religion, and while forbidden from maintaining "men ' +
    'under arms" since the Age of Apostasy, they circumvent this through the Adepta Sororitas (an all-female ' +
    'military order) and through militant church forces. An Ecclesiastic Militant Force blends both.',
  leader: {
    name: 'Arch-Confessor',
    title: 'Voice of the Emperor, Leader of the Faithful',
    description:
      'An Arch-Confessor is a senior Ministorum priest whose fanatical oratory can drive both Sisters and ' +
      'civilian faithful to incredible feats of courage. Armed with an eviscerator chainsword and rosarius ' +
      'shield, they lead from the front, their bellowing sermons drowning out enemy gunfire.',
  },
  notableTraits: [
    'Mixed force of Ministorum priests and Adepta Sororitas warriors',
    'Fanatical morale driven by religious fervour',
    'Flamers and melta weapons purify the unclean',
    'War Hymns and litanies that inspire nearby troops',
    'The spiritual warriors of the Imperium\'s state church',
  ],
  combatDoctrine:
    'Advance behind the Confessor\'s inspiring oratory, with Sisters providing the firepower and discipline ' +
    'while zealous faithful absorb casualties and hold objectives.',
  whyPlay:
    'Choose Ecclesiastic Militant Force for a faith-heavy warband blending priests and Sisters of Battle.',
},

// ═══════════════════════════════════════════════════════════════════════
// XENOS WARBANDS
// ═══════════════════════════════════════════════════════════════════════

corsairs: {
  warbandId: 'corsairs',
  factionId: 'aeldari',
  name: 'Aeldari Corsairs',
  motto: '"The stars are ours to sail."',
  overview:
    'Aeldari Corsairs are pirates who have abandoned both the rigid Craftworld paths and Commoragh\'s ' +
    'depravity to sail the stars as free agents. They raid for plunder, adventure, and the sheer thrill ' +
    'of freedom, dancing between the Aeldari factions like vagabonds.',
  history:
    'Corsairs occupy a middle ground in Aeldari society. Many are Craftworld Aeldari who found the Path too ' +
    'restrictive and left to experience the galaxy on their own terms. Others are Drukhari who tired of ' +
    'Commoragh\'s politics. They form fleets of sleek ships, raiding Imperial and alien worlds alike.',
  leader: {
    name: 'Corsair Prince',
    title: 'Prince of the Void, Captain of the Fleet',
    description:
      'A Corsair Prince is a charismatic pirate lord — equal parts warrior, explorer, and rogue. They ' +
      'maintain their fleet through cunning, personal combat skill, and the loyalty of their crew. Many ' +
      'are former Autarchs or Archons who chose freedom over hierarchy.',
  },
  notableTraits: [
    'Outlaw Aeldari warband — pirates and freebooters of the galaxy',
    'Mix of Craftworld and Drukhari technology and warriors',
    'Fast, agile, and equipped with advanced xenos technology',
    'Count as an Outlaw Warband in Trench Hammer rules',
    'Adventure-seeking romantics who refuse to be bound by any faction',
  ],
  combatDoctrine:
    'Hit-and-run raiding with advanced Aeldari technology. Strike fast, take what you want, and vanish ' +
    'into the Webway before the enemy can respond.',
  whyPlay:
    'Choose Corsairs if you want Aeldari space pirates — fast, stylish, and free as the void.',
},

exodites: {
  warbandId: 'exodites',
  factionId: 'aeldari',
  name: 'Aeldari Exodites',
  motto: '"The maiden worlds are sacred."',
  overview:
    'Exodites are Aeldari who rejected the decadence of the ancient empire and colonised frontier worlds ' +
    'before the Fall. They live in harmony with nature, ride mighty dinosaur-like creatures, and defend ' +
    'their maiden worlds with primal fury.',
  history:
    'Before the Fall of the Aeldari, a faction of their species foresaw the coming catastrophe and fled to ' +
    'virgin worlds on the galaxy\'s edge. There they established agrarian, nature-bonded societies. When the ' +
    'rest of the Aeldari empire was consumed by the birth of Slaanesh, the Exodites survived. They now ' +
    'protect their World Spirits — planetary psychic networks embedded in the world itself.',
  leader: {
    name: 'Dragon Lord',
    title: 'Knight of the Maiden World',
    description:
      'A Dragon Lord rides the mightiest war-beast on their world — a creature similar in function to an ' +
      'Imperial Knight. They are warrior-kings who bond with their mounts through the World Spirit, ' +
      'protecting their maiden worlds with ferocious determination.',
  },
  notableTraits: [
    'Ride dinosaur-like mega-fauna into battle',
    'Bonded to their World Spirit — a planetary psychic network',
    'Agrarian, nature-based Aeldari culture',
    'Primal but technologically capable — they choose simplicity, not ignorance',
    'Defend maiden worlds with territorial ferocity',
  ],
  combatDoctrine:
    'Beast-mounted cavalry charges supported by ranger infantry. Exodites use the terrain of their maiden ' +
    'worlds as a weapon, drawing enemies into ambushes and unleashing war-beasts.',
  whyPlay:
    'Choose Exodites if you want Aeldari riding dinosaurs. Nature warriors with a unique aesthetic.',
},

spirit_conclave: {
  warbandId: 'spirit_conclave',
  factionId: 'aeldari',
  name: 'Spirit Conclave (Aeldari)',
  motto: '"Even in death, we serve."',
  overview:
    'A Spirit Conclave is built around Wraith constructs — the animated dead of the Aeldari. Wraithguard, ' +
    'Wraithblades, and mighty Wraithlords are spirit-stones given form, guided by a powerful Wraithseer. The ' +
    'Aeldari dead walk to war.',
  history:
    'The Aeldari preserve their dead in spirit stones to prevent their souls being consumed by Slaanesh. In ' +
    'times of desperation, these souls are placed into Wraith constructs — mighty war machines animated by the ' +
    'dead. A Spirit Conclave represents a warband that has suffered so many losses that the dead outnumber ' +
    'the living on the battlefield.',
  leader: {
    name: 'Wraithseer',
    title: 'Seer of the Dead, Spirit Guide',
    description:
      'A Wraithseer is the spirit of a dead Farseer placed into a Wraithlord chassis, retaining their psychic ' +
      'abilities. They guide other Wraith constructs with psychic signals, making the dead army coordinated and ' +
      'purposeful rather than stumbling blindly.',
  },
  notableTraits: [
    'Wraith constructs form the core: Wraithguard, Wraithblades, Wraithlords',
    'Animated by the souls of dead Aeldari preserved in spirit stones',
    'Led by a Wraithseer — a dead psyker in a war-construct body',
    'Extremely tough and powerful but slow and few in number',
    'A last resort: using the dead is spiritually painful for the Aeldari',
  ],
  combatDoctrine:
    'Advance the Wraith constructs in a slow, unstoppable wall of spirit-stone might. Wraithguard eliminate ' +
    'heavy targets while Wraithblades engage in melee. The Wraithseer coordinates psychically.',
  whyPlay:
    'Choose Spirit Conclave if you want a warband of mighty Aeldari ghost-warriors — the honoured dead.',
},

ynnari: {
  warbandId: 'ynnari',
  factionId: 'aeldari',
  name: 'Ynnari — Reborn of Ynnead',
  motto: '"Death is not the end. It is the beginning."',
  overview:
    'The Ynnari are followers of Ynnead, the Aeldari god of the dead who is still being born. They draw ' +
    'power from death itself — both the deaths of enemies and allies. They unite Craftworld, Drukhari, and ' +
    'Harlequin Aeldari in an unprecedented coalition.',
  history:
    'Yvraine, the Herald of Ynnead, was reborn in the depths of Commoragh when the partially-awakened god ' +
    'of the dead chose her as its prophet. She fled Commoragh and began uniting Aeldari from all factions ' +
    'under the banner of Ynnead, seeking to fully awaken the death god and defeat Slaanesh once and for all.',
  leader: {
    name: 'Yvraine',
    title: 'The Herald of Ynnead, Emissary of the Aeldari God of Death',
    description:
      'Yvraine has lived many lives — Craftworld citizen, Corsair, Commoragh gladiator, and now Prophet of ' +
      'Ynnead. She died in the arenas of Commoragh and was reborn by Ynnead\'s emerging power. She wields ' +
      'the Cronesword Kha-vir and can draw upon the souls of the dead to fuel devastating abilities.',
  },
  notableTraits: [
    'Unite Craftworld, Drukhari, and Harlequin Aeldari in one warband',
    'Strength From Death — gain power when any model (friend or foe) dies nearby',
    'Seeking to awaken Ynnead to defeat Slaanesh',
    'Access to units from multiple Aeldari factions',
    'A radical new hope for the dying Aeldari species',
  ],
  combatDoctrine:
    'The Ynnari thrive on death. Each casualty empowers nearby survivors, creating a snowball effect. ' +
    'They mix the speed of Drukhari, the psychic power of Craftworlds, and the flexibility of Harlequins.',
  whyPlay:
    'Choose Ynnari if you want to combine all Aeldari subfactions into one diverse warband powered by death.',
},

// ═══════════════════════════════════════════════════════════════════════
// DRUKHARI, NECRON, ORK, T'AU, TYRANID, GSC WARBANDS
// ═══════════════════════════════════════════════════════════════════════

court_of_the_archon: {
  warbandId: 'court_of_the_archon',
  factionId: 'drukhari',
  name: 'Court of the Archon',
  motto: '"All serve the Archon. Few survive the privilege."',
  overview:
    'A Court of the Archon is an Archon\'s personal retinue of unique and deadly champions — Sslyth ' +
    'bodyguards, Ur-Ghul hunters, Lhamaean poisoners, and Medusae psychic parasites. Each is a specialist ' +
    'in some form of exotic murder.',
  history:
    'In the cutthroat politics of Commoragh, an Archon survives through the quality of their entourage. ' +
    'The Court represents the most dangerous individuals an Archon can acquire — aliens, mutants, and ' +
    'specialists whose loyalty is bought with pain-tokens and dark promises.',
  leader: {
    name: 'Archon',
    title: 'Supreme Overlord of a Kabal',
    description:
      'An Archon is the pinnacle of Drukhari society — a being who has survived millennia of political ' +
      'assassination, arena combat, and Warp-touched horror through sheer cunning and ruthlessness. They are ' +
      'surrounded by bodyguards and courtiers, each chosen for a specific talent in the art of killing.',
  },
  notableTraits: [
    'Unique court members: Sslyth, Ur-Ghul, Lhamaean, Medusae',
    'Each courtier specialises in a different form of exotic combat',
    'The Archon\'s personal bodyguard — fiercely loyal through dark pacts',
    'Individual champions rather than squad-based warfare',
    'Emphasises elite, diverse models over uniform troops',
  ],
  combatDoctrine:
    'Deploy the Archon\'s Court as an elite retinue of specialists, each targeting the enemy they counter ' +
    'best. The Archon directs from the centre, protected by layers of bodyguards.',
  whyPlay:
    'Choose Court of the Archon for an elite warband of exotic alien bodyguards and assassins.',
},

haemonculus_coven: {
  warbandId: 'haemonculus_coven',
  factionId: 'drukhari',
  name: 'Haemonculus Coven',
  motto: '"Pain is the purest art."',
  overview:
    'A Haemonculus Coven is led by flesh-sculptors and pain-artists who create grotesque living weapons. ' +
    'Wracks, Grotesques, and Talos pain engines surround the Haemonculus in a nightmarish carnival of ' +
    'modified flesh.',
  history:
    'The Haemonculi are the mad scientists of Commoragh — ancient beings who have mastered the art of ' +
    'reshaping flesh. They can resurrect the dead, sculpt muscles into weapons, and inflict pain so ' +
    'exquisite it becomes an art form. Their Covens operate from the bowels of Commoragh, and their ' +
    'creations are among the most horrifying things in the galaxy.',
  leader: {
    name: 'Haemonculus',
    title: 'Master of Pain, Flesh-Sculptor of Commoragh',
    description:
      'A Haemonculus is an ancient Drukhari who has spent millennia perfecting the art of flesh manipulation. ' +
      'They can reshape bodies like clay, creating monstrous warriors or restoring the dead to life. Their ' +
      'own bodies are often modified into alien configurations — extra limbs, poison glands, and sensory ' +
      'organs that detect pain at a molecular level.',
  },
  notableTraits: [
    'Grotesques: muscle-hulked former warriors modified beyond recognition',
    'Wracks: surgical assistants who fight with poison blades',
    'Talos and Cronos: pain engines that harvest suffering',
    'Can resurrect dead warriors — death is temporary in a Coven',
    'Nightmarish body horror and surgical modification as doctrines of war',
  ],
  combatDoctrine:
    'Send Grotesques and pain engines forward as terrifying shock troops while Wracks support with poisoned ' +
    'weapons. The Haemonculus stays behind, directing the horror show and ensuring no creation goes to waste.',
  whyPlay:
    'Choose Haemonculus Coven for body-horror Drukhari — grotesque flesh-creations and surgical nightmares.',
},

wych_cult: {
  warbandId: 'wych_cult',
  factionId: 'drukhari',
  name: 'Wych Cult',
  motto: '"The arena is but practice for the real thing."',
  overview:
    'A Wych Cult is an arena gladiator warband — lithe, deadly combatants who fight for the thrill of ' +
    'combat and the roar of the crowd. Wyches dance through melee with razorflails, hydra gauntlets, and ' +
    'shardnets, their speed making them nearly impossible to hit.',
  history:
    'The Wych Cults of Commoragh are the entertainment industry of an entire city of sadists. They perform ' +
    'in vast combat arenas, fighting each other and exotic beasts. When they go to war in realspace, they ' +
    'treat the battlefield as another arena — every kill is a performance, every dodge an audience-pleasing feat.',
  leader: {
    name: 'Succubus',
    title: 'Mistress of the Arena, Queen of Blades',
    description:
      'A Succubus leads through martial supremacy — the deadliest melee combatant in the Wych Cult. They ' +
      'have won thousands of arena bouts and move with a speed that makes them blur even to Aeldari senses. ' +
      'In battle, they seek out the enemy\'s best fighter for a lethal duel.',
  },
  notableTraits: [
    'Wyches are the fastest melee fighters in Drukhari armies',
    'Exotic combat drugs enhance speed, strength, and aggression',
    'Arena weapons: razorflails, hydra gauntlets, shardnets',
    'Reavers on jetbikes race through the enemy slashing with blades',
    'Combat as performance art — every fight is a show',
  ],
  combatDoctrine:
    'Close to melee as fast as possible on Raiders and Reavers, then overwhelm with speed and combat drugs. ' +
    'Wyches tie up multiple enemies while the Succubus hunts the biggest threat.',
  whyPlay:
    'Choose Wych Cult for fast, melee-focused Drukhari gladiators — speed, style, and lethal grace.',
},

canoptek_court: {
  warbandId: 'canoptek_court',
  factionId: 'necrons',
  name: 'Canoptek Court',
  motto: '"The tomb stirs. The constructs obey."',
  overview:
    'A Canoptek Court is a Cryptek-led expedition supported by Canoptek constructs — Scarabs, Spyders, and ' +
    'Wraiths. These autonomous machines guard Necron tomb complexes and carry out their Cryptek master\'s ' +
    'arcane research.',
  history:
    'Canoptek constructs are the worker drones and guardians of Necron tomb worlds. While the Necron lords ' +
    'slept for sixty million years, Canopteks maintained their tombs, repaired damage, and eliminated ' +
    'intruders. A Canoptek Court represents a Cryptek who has awakened and directs these constructs personally.',
  leader: {
    name: 'Cryptek',
    title: 'Technomancer, Master of Arcane Science',
    description:
      'A Cryptek is a Necron scientist-sorcerer who wields technology so advanced it is indistinguishable from ' +
      'magic. Chronmancers manipulate time, Technomancers repair living metal, and Psychomancers harvest fear. ' +
      'They command Canoptek constructs through neural imperatives.',
  },
  notableTraits: [
    'Canoptek Scarabs swarm and devour enemy equipment',
    'Canoptek Wraiths phase through solid matter to strike',
    'Spyders manufacture more Scarabs mid-battle',
    'Autonomous constructs that obey their Cryptek\'s command',
    'Technology that appears as sorcery — time manipulation, phasing, molecular disassembly',
  ],
  combatDoctrine:
    'Deploy Canoptek constructs in waves — Scarabs screen while Wraiths phase through defences. The Cryptek ' +
    'provides arcane support from behind, repairing and buffing constructs.',
  whyPlay:
    'Choose Canoptek Court for a swarm of Necron constructs led by a mad robot scientist.',
},

destroyer_cult: {
  warbandId: 'destroyer_cult',
  factionId: 'necrons',
  name: 'Destroyer Cult',
  motto: '"All life is an affront. Exterminate."',
  overview:
    'A Destroyer Cult is composed of Necrons driven insane by millions of years in stasis, consumed by ' +
    'an all-encompassing nihilistic hatred of all life. Destroyers hover on anti-gravity platforms, firing ' +
    'gauss weaponry with reckless abandon, caring nothing for their own survival.',
  history:
    'The Destroyer virus is a form of madness that afflicts Necrons, stripping away all personality and ' +
    'replacing it with a single imperative: destroy all living things. Most Necron Overlords view Destroyers ' +
    'with disgust but use them as shock troops. A Destroyer Cult is a warband entirely consumed by this madness.',
  leader: {
    name: 'Skorpekh Lord',
    title: 'Lord of the Destroyers, Nihilist Supreme',
    description:
      'A Skorpekh Lord is a Necron noble who has succumbed to the Destroyer virus, replacing their lower body ' +
      'with a tripod of bladed legs and their arms with hyperphase reap-blades. They retain enough tactical ' +
      'sense to direct other Destroyers but are utterly consumed by the desire to exterminate.',
  },
  notableTraits: [
    'Driven by nihilistic hatred — they want all life eliminated, including their own eventually',
    'Skorpekh Destroyers are terrifying close-combat killers on bladed legs',
    'Lokhust Destroyers float on anti-grav platforms with heavy gauss weapons',
    'Even other Necrons distrust and fear them',
    'Will not stop until everything is dead',
  ],
  combatDoctrine:
    'Advance relentlessly — Skorpekh melee destroyers charge while Lokhust ranged destroyers provide fire. ' +
    'No retreat, no preservation, no mercy. Pure extermination.',
  whyPlay:
    'Choose Destroyer Cult for nihilistic robot killers — the most aggressive Necron warband possible.',
},

court_of_the_flayer_king: {
  warbandId: 'court_of_the_flayer_king',
  factionId: 'necrons',
  name: 'Court of the Flayer King',
  motto: '"Wear their skin. Remember what it was to live."',
  overview:
    'The Court of the Flayer King is a warband of Flayed Ones — Necrons infected with the Flayer Virus ' +
    'who obsessively drape themselves in the skin of their victims, driven by a hollow need to feel alive ' +
    'again. They are terrifying close-combat horrors.',
  history:
    'The Flayer Virus is a curse placed on the Necrons by the C\'tan Llandu\'gor, the Flayer, as revenge ' +
    'for its destruction. Infected Necrons become obsessed with flesh they can never feel, compulsively ' +
    'skinning victims and wearing the results. Most Necron dynasties quarantine Flayed Ones, but a Flayer ' +
    'King embraces the virus and commands entire hordes.',
  leader: {
    name: 'The Flayer King',
    title: 'Lord of Living Metal Clothed in Dead Flesh',
    description:
      'A Flayer King is a Necron Overlord fully consumed by the Flayer Virus — intelligent enough to command ' +
      'but utterly mad. They drape themselves in layers of skin and gore, a walking horror that terrifies ' +
      'even other Necrons. Their court of Flayed Ones answers their calls from across dimensions.',
  },
  notableTraits: [
    'Flayed Ones teleport from pocket dimensions to attack',
    'Drape themselves in victim\'s skin — terrifying body horror',
    'Driven by the Flayer Virus curse of the C\'tan',
    'Close-combat specialists with flensing claws',
    'Deep Strike capability — appear from nowhere mid-battle',
  ],
  combatDoctrine:
    'Flayed Ones phase in from dimensional pockets right among the enemy, slashing with flensing claws. ' +
    'The psychological horror is as devastating as the physical attack.',
  whyPlay:
    'Choose Court of the Flayer King for horror-themed Necrons — skin-wearing robots from your nightmares.',
},

da_big_hunt: {
  warbandId: 'da_big_hunt',
  factionId: 'orks',
  name: 'Da Big Hunt',
  motto: '"BIGGEST BEAST WINS!"',
  overview:
    'Da Big Hunt is a Squighog-riding hunting mob that chases the biggest prey across the wastes. Led by ' +
    'Beast Snagga Boyz who ride massive squig creatures, this warband is all about the thrill of the hunt ' +
    'and the bigger the prey, the better.',
  history:
    'Beast Snagga Orks are a cultural movement among the greenskins — Orks who believe technology is for ' +
    'gits and the true Orky way is to hunt the biggest monsters bare-handed (or at least with a pointy ' +
    'stick). They ride Squighogs into battle and seek out the largest enemy models to challenge.',
  leader: {
    name: 'Beastboss',
    title: 'Da Biggest, Da Baddest, Da Beastiest',
    description:
      'A Beastboss is the biggest, meanest Ork in the hunting mob — one who has personally beaten the biggest ' +
      'beasts on dozens of worlds. They ride the most massive Squighog available and carry crude but devastatingly ' +
      'effective hunting weapons. Their leadership is simple: whoever can kill the biggest thing is in charge.',
  },
  notableTraits: [
    'Squighog cavalry: Orks riding massive squig beasts',
    'Beast Snagga Boyz: anti-monster specialists',
    'Prefer hunting over technology — primal Ork warfare',
    'Seek out the biggest enemy models for the best fight',
    'Feral, loud, and immensely enjoyable to play',
  ],
  combatDoctrine:
    'Charge the biggest thing on the battlefield and kill it. If there\'s nothing big, charge the next ' +
    'biggest thing. Squighogs carry Boyz into combat while Snaggas hurl crude weapons. Subtlety is not ' +
    'an option.',
  whyPlay:
    'Choose Da Big Hunt for Ork cavalry riding squig-beasts — Monster Hunter meets Warhammer.',
},

farsight_enclave: {
  warbandId: 'farsight_enclave',
  factionId: 't_au_empire',
  name: 'Farsight Enclave',
  motto: '"The Ethereals lie. We stand alone."',
  overview:
    'The Farsight Enclaves are renegade T\'au who follow Commander Farsight\'s independent military ' +
    'philosophy — rejecting the Ethereals\' control and fighting with aggressive close-range tactics ' +
    'that shock other T\'au cadres.',
  history:
    'Commander Farsight was the T\'au Empire\'s greatest military hero until he discovered a mysterious ' +
    'ancient weapon — the Dawn Blade. He broke with the Ethereal caste and established independent ' +
    'colonies beyond the Empire\'s borders. His Enclaves fight without Ethereal guidance, which should be ' +
    'impossible for T\'au, who are culturally dependent on Ethereal leadership.',
  leader: {
    name: 'Commander Farsight (Shas\'O Vior\'la Shovah)',
    title: 'The Renegade Commander, Bearer of the Dawn Blade',
    description:
      'Commander Farsight is a legend — a T\'au crisis suit pilot whose tactical genius rivals any human ' +
      'general. He wields the Dawn Blade, a relic of unknown alien origin that extends his life far beyond ' +
      'normal T\'au longevity. His rejection of Ethereal control and willingness to engage in close combat ' +
      'makes him heretical to the Empire but beloved by his followers.',
  },
  notableTraits: [
    'Rejected Ethereal control — renegade T\'au fighting independently',
    'More aggressive than standard T\'au — willing to close to melee',
    'Crisis suit heavy: battlesuit-focused doctrine',
    'The Dawn Blade: a mysterious relic weapon that extends Farsight\'s life',
    'Self-reliant and fiercely independent T\'au colonies',
  ],
  combatDoctrine:
    'Aggressive battlesuit deployment — Farsight Enclaves get closer than standard T\'au, using crisis suits ' +
    'at mid-range and even charging into melee when needed. A harder-hitting, riskier style of T\'au warfare.',
  whyPlay:
    'Choose Farsight Enclave if you want aggressive, close-range T\'au that break the mould.',
},

auxiliary_cadre: {
  warbandId: 'auxiliary_cadre',
  factionId: 't_au_empire',
  name: 'T\'au Auxiliary Cadre',
  motto: '"For the Greater Good — in all its diversity."',
  overview:
    'An Auxiliary Cadre is a warband of T\'au-allied aliens — Kroot, Vespid, and other auxiliary species ' +
    'fighting under the Greater Good banner with minimal Fire Warrior support.',
  history:
    'The T\'au Empire integrates willing alien species into their military as auxiliary forces. Kroot carnivores, ' +
    'Vespid stingwings, and Nicassar psychics all serve the Greater Good alongside T\'au Fire Warriors.',
  leader: {
    name: 'Kroot Shaper',
    title: 'Warchief of the Auxiliary Forces',
    description:
      'A Kroot Shaper leads auxiliary forces with keen predatory instinct. They direct the evolutionary ' +
      'feeding of Kroot warriors, selecting which enemies to consume to gain advantageous genetic traits.',
  },
  notableTraits: [
    'Diverse alien species fighting under T\'au banner',
    'Kroot: melee-oriented carnivores who evolve by eating enemies',
    'Vespid: flying insectoid warriors with neutron blasters',
    'Minimal Fire Warrior presence — an alien-led force',
    'Represents the multicultural ideal of the Greater Good',
  ],
  combatDoctrine:
    'Kroot close to melee while Vespid provide aerial fire support. The cadre uses the diverse abilities ' +
    'of multiple species to adapt to any battlefield situation.',
  whyPlay:
    'Choose Auxiliary Cadre for a diverse alien warband — the United Nations of the T\'au Empire.',
},

retaliation_cadre: {
  warbandId: 'retaliation_cadre',
  factionId: 't_au_empire',
  name: 'Retaliation Cadre',
  motto: '"Crisis suits are the answer. What was the question?"',
  overview:
    'A Retaliation Cadre is an all-battlesuit strike force — Crisis Suits, Stealth Suits, and Commanders in ' +
    'massive XV-series battlesuit armour. No infantry, just high-tech armoured warriors.',
  history:
    'When the T\'au need maximum firepower deployed rapidly, they assemble a Retaliation Cadre — all-battlesuit ' +
    'formations that deep strike behind enemy lines and pour devastating firepower into priority targets.',
  leader: {
    name: 'Commander Shadowsun',
    title: 'Supreme Commander of the T\'au Military',
    description:
      'Commander Shadowsun is the T\'au Empire\'s greatest living military leader — a stealth and battlesuit ' +
      'specialist who has led multiple major campaigns. She represents the pinnacle of T\'au battlesuit doctrine.',
  },
  notableTraits: [
    'All-battlesuit warband: Crisis, Stealth, and Commander suits',
    'Deep strike capable — deploy directly into battle',
    'Devastating ranged firepower from multiple weapon systems per model',
    'Mobile and heavily armed but expensive — every model counts',
    'The elite of the T\'au military',
  ],
  combatDoctrine:
    'Deep strike battlesuits into optimal firing positions and unleash devastating volleys of plasma, missiles, ' +
    'and fusion blasters. Reposition via jet thrusters and repeat.',
  whyPlay:
    'Choose Retaliation Cadre for an all-battlesuit T\'au force — nothing but high-tech walking tanks.',
},

kroot_kinband: {
  warbandId: 'kroot_kinband',
  factionId: 't_au_empire',
  name: 'Kroot Kinband',
  motto: '"We eat. We evolve. We prevail."',
  overview:
    'A Kroot Kinband is a full Kroot-only warband — mercenary carnivores who evolve by consuming the genetic ' +
    'material of fallen enemies. Led by a Master Shaper, they hunt, fight, and feast.',
  history:
    'The Kroot are a mercenary species evolved from avians who gained their sapience by eating something smart ' +
    'millions of years ago. Their unique biology allows them to absorb useful genetic traits from anything they ' +
    'consume. They are primarily allies of the T\'au but also serve as mercenaries for anyone willing to pay.',
  leader: {
    name: 'Master Shaper',
    title: 'War-Shaper, Director of Evolutionary Destiny',
    description:
      'A Master Shaper guides the Kinband\'s evolutionary direction — deciding which fallen enemies to consume ' +
      'to gain specific traits. They are part warchief, part geneticist, wielding a Kroot rifle and millennia ' +
      'of predatory instinct.',
  },
  notableTraits: [
    'Kroot-only warband — a full mercenary carnivore force',
    'Absorb genetic traits by eating: evolve based on what they kill',
    'Kroot Hounds, Krootox, and Great Knarlocs provide beast support',
    'Excellent scouts and ambush predators',
    'Mercenary culture — they fight for the highest bidder',
  ],
  combatDoctrine:
    'Stalk, ambush, and overwhelm in close quarters. Kroot warriors use terrain and stealth to close the gap, ' +
    'then engage in brutal melee. Krootox provide heavy fire support.',
  whyPlay:
    'Choose Kroot Kinband for a full mercenary alien force — predatory carnivores who evolve on the battlefield.',
},

brood_brothers: {
  warbandId: 'brood_brothers',
  factionId: 'genestealer_cults',
  name: 'Brood Brothers (GSC)',
  motto: '"The Day of Ascension approaches."',
  overview:
    'A Brood Brothers warband is a Genestealer Cult that has deeply infiltrated the local Astra Militarum. ' +
    'Corrupted soldiers fight alongside cult hybrids, combining Guard training and equipment with alien ' +
    'purpose.',
  history:
    'Genestealer Cults infiltrate human society over multiple generations. The most successful cults embed ' +
    'themselves within military organisations, corrupting soldiers who fight for the cult without even knowing ' +
    'they serve the Hive Mind.',
  leader: {
    name: 'Primus',
    title: 'Military Commander of the Cult',
    description:
      'A Primus is a fourth-generation hybrid who appears almost entirely human — the cult\'s military genius. ' +
      'They coordinate Brood Brothers squads with strategic precision, using their Genestealer-enhanced ' +
      'tactical instincts to strike at the most devastating moment.',
  },
  notableTraits: [
    'Corrupted Astra Militarum troops fighting for the cult',
    'Guard equipment and vehicles with cult modifications',
    'Mix of trained soldiers and hybrid cult members',
    'Ambush and infiltration tactics using military discipline',
    'The cult\'s military arm, preparing for the Day of Ascension',
  ],
  combatDoctrine:
    'Combined arms using corrupted Guard equipment — Chimeras, heavy weapons, and infantry supported by ' +
    'Genestealer cult ambush tactics.',
  whyPlay:
    'Choose Brood Brothers for a militarised cult with Guard equipment and alien purpose.',
},

broodcoven: {
  warbandId: 'broodcoven',
  factionId: 'genestealer_cults',
  name: 'Broodcoven (GSC)',
  motto: '"The Patriarch calls. We obey."',
  overview:
    'A Broodcoven is a cult ruled directly by a mighty Patriarch — the pureblooded Genestealer from which ' +
    'the entire cult descends. The psychic dominance of the Patriarch coordinates all cult activity.',
  history:
    'Every Genestealer Cult begins with a single Genestealer — the Patriarch. Over generations, the Patriarch ' +
    'builds a brood of hybrids, each generation more human-looking. The Broodcoven variant focuses on this ' +
    'core dynamic: the Patriarch and its closest, most powerful hybrid leaders.',
  leader: {
    name: 'Patriarch',
    title: 'The Progenitor, Alpha Genestealer',
    description:
      'The Patriarch is a massive pureblooded Genestealer whose psychic presence dominates the entire cult. ' +
      'It is ancient, cunning, and physically devastating — able to tear through power armour with its rending ' +
      'claws. Its psychic aura makes cult members worship it as a god.',
  },
  notableTraits: [
    'Led by a Patriarch: powerful psyker and combat monster',
    'Closest, most powerful cult leaders form the inner circle',
    'Strong psychic presence that buffs nearby cult hybrids',
    'Purestrain Genestealers as elite shock troops',
    'The spiritual and genetic heart of the cult',
  ],
  combatDoctrine:
    'The Patriarch leads from the front, its psychic dominance empowering nearby hybrids. Purestrain ' +
    'Genestealers swarm from ambush while the Broodcoven\'s leaders direct cult operations.',
  whyPlay:
    'Choose Broodcoven for a Patriarch-led cult with the deadliest purestrain Genestealers.',
},

the_final_day: {
  warbandId: 'the_final_day',
  factionId: 'genestealer_cults',
  name: 'The Final Day (GSC)',
  motto: '"The Star Children descend at last!"',
  overview:
    'The Final Day represents a cult consumed by the arrival of the Hive Fleet. Tyranid organisms have ' +
    'begun emerging among the cult ranks, mixing alien bioforms with cult hybrids in the terrifying final ' +
    'phase of the Genestealer infection cycle.',
  history:
    'When the Hive Fleet arrives, the cult\'s "Day of Ascension" becomes a nightmare. The Tyranids consume ' +
    'everything — including their own cultists. A Final Day warband catches this moment: Tyranid organisms ' +
    'fighting alongside a cult that doesn\'t yet realise it\'s already dinner.',
  leader: {
    name: 'Magus',
    title: 'Psychic Voice of the Hive Mind',
    description:
      'The Magus is a powerful hybrid psyker who channels the Hive Mind\'s will. As the Hive Fleet draws ' +
      'near, the Magus\'s psychic powers intensify, and they begin directing both cult and Tyranid forces ' +
      'as the two merge into one bioweapon.',
  },
  notableTraits: [
    'Mix of Genestealer Cult hybrids and Tyranid organisms',
    'The terrifying final phase of the Genestealer cycle',
    'Tyranid warriors and gaunts fight alongside cult members',
    'Enhanced psychic connection to the approaching Hive Mind',
    'The cult doesn\'t yet realise it will be consumed too',
  ],
  combatDoctrine:
    'Cult ambush tactics combined with Tyranid swarm pressure. Hybrids pin the enemy while Tyranid bioforms ' +
    'close in, creating a two-pronged biological nightmare.',
  whyPlay:
    'Choose The Final Day for a terrifying mix of cult hybrids and Tyranid aliens.',
},

assimilation_swarm: {
  warbandId: 'assimilation_swarm',
  factionId: 'tyranids',
  name: 'Assimilation Swarm',
  motto: '"Consume. Assimilate. Evolve."',
  overview:
    'An Assimilation Swarm is a Malanthrope-led force focused on absorbing biomass from the battlefield. ' +
    'Every kill feeds the Hive Fleet, and the swarm operates with horrifying efficiency.',
  history:
    'After a Tyranid invasion, Assimilation Swarms clean up — consuming everything biological to fuel the ' +
    'Hive Fleet\'s growth. Led by Malanthropes who catalogue genetic material, they are the recycling arm ' +
    'of the Great Devourer.',
  leader: {
    name: 'Malanthrope',
    title: 'Living Catalogue of Consumed Species',
    description:
      'A Malanthrope drifts above the battlefield on tentacles, cataloguing and consuming genetic material ' +
      'from the fallen. It feeds information back to the Hive Mind, directing which species to target and ' +
      'which traits to incorporate into future bioforms.',
  },
  notableTraits: [
    'Malanthrope leader specialises in genetic cataloguing',
    'Focused on consuming biomass — every kill feeds the swarm',
    'Ripper swarms strip flesh from fallen models',
    'Pyroacid sprayers dissolve targets for easy consumption',
    'The clean-up crew of Tyranid invasions',
  ],
  combatDoctrine:
    'Swarm, overwhelm, consume. Gaunt broods pin targets while specialised organisms dissolve and absorb ' +
    'everything biological. The Malanthrope ensures nothing goes to waste.',
  whyPlay:
    'Choose Assimilation Swarm for a biomass-hungry Tyranid force focused on consumption and recycling.',
},

subterranean_assault: {
  warbandId: 'subterranean_assault',
  factionId: 'tyranids',
  name: 'Subterranean Assault',
  motto: '"The ground itself betrays you."',
  overview:
    'A Subterranean Assault is a Ravener-heavy force that erupts from beneath the ground, bypassing enemy ' +
    'defences entirely. The enemy thought they were safe behind walls — until the floor opened up.',
  history:
    'Raveners are Tyranid organisms adapted for burrowing — serpentine predators that tunnel beneath defences ' +
    'and burst from the earth in the midst of the enemy. A full Subterranean Assault warband is a nightmare ' +
    'for any defender: every piece of ground is a potential breach point.',
  leader: {
    name: 'Ravener Alpha',
    title: 'Synaptic Node of the Burrowing Swarm',
    description:
      'A Ravener Alpha is a larger, smarter version of the standard Ravener — a synaptic creature that ' +
      'coordinates the burrowing swarm. It senses prey through tremorsense and directs eruption points with ' +
      'surgical precision.',
  },
  notableTraits: [
    'Ravener-heavy: massive burrowing serpent organisms',
    'Deep Strike from beneath the ground',
    'Bypass all defences — erupting behind walls and fortifications',
    'Trygon tunnels allow larger forces to emerge',
    'Surprise is their ultimate weapon',
  ],
  combatDoctrine:
    'Burrow into position, then erupt en masse in the enemy\'s rear or flanks. The entire warband deep ' +
    'strikes from underground, overwhelming defences from within.',
  whyPlay:
    'Choose Subterranean Assault for tunnelling Tyranids that erupt from underground — nowhere is safe.',
},

synaptic_nexus: {
  warbandId: 'synaptic_nexus',
  factionId: 'tyranids',
  name: 'Synaptic Nexus',
  motto: '"The Hive Mind sees all. The Hive Mind controls all."',
  overview:
    'A Synaptic Nexus is a psyker-heavy Tyranid force led by the most powerful psychic predators in the ' +
    'Hive Fleet. Zoanthropes and Neurothropes form a devastating psychic network that blasts enemies with ' +
    'Warp energy channelled through the Hive Mind.',
  history:
    'The Hive Mind is the most powerful psychic presence in the galaxy — the gestalt consciousness of trillions ' +
    'of organisms. A Synaptic Nexus concentrates this power into a focused warband of psychic bioforms that ' +
    'channel the Shadow in the Warp.',
  leader: {
    name: 'Neurothrope',
    title: 'Psychic Node of the Hive Mind',
    description:
      'A Neurothrope is the most powerful Zoanthrope variant — a floating psychic brain that channels the ' +
      'Hive Mind\'s devastating power. It creates a psychic dead zone that disrupts enemy psykers while ' +
      'unleashing Warp blasts of terrifying power.',
  },
  notableTraits: [
    'Psychic-heavy: Zoanthropes and Neurothropes as core units',
    'Channel the Shadow in the Warp to disrupt enemy psykers',
    'Devastating ranged psychic attacks',
    'Focused psychic synapse network enhances nearby organisms',
    'The Hive Mind\'s wrath made manifest',
  ],
  combatDoctrine:
    'Advance the psychic node, blast enemies with Warp energy, and disrupt enemy psykers. Gaunt screens ' +
    'protect the precious Zoanthropes while they devastate targets at range.',
  whyPlay:
    'Choose Synaptic Nexus for a psychic-heavy Tyranid swarm — mind-blasting alien horror.',
},

vanguard_onslaught: {
  warbandId: 'vanguard_onslaught',
  factionId: 'tyranids',
  name: 'Vanguard Onslaught',
  motto: '"The hunters are already here."',
  overview:
    'A Vanguard Onslaught is a Lictor-led stealth force that precedes the main Hive Fleet. These alpha ' +
    'predators infiltrate enemy territory, assassinating leaders and spreading terror before the swarm arrives.',
  history:
    'Lictors are the Tyranids\' ultimate stealth organisms — chameleon-skinned hunters that stalk prey in ' +
    'silence, feeding information back to the Hive Mind. A Vanguard Onslaught represents the terrifying ' +
    'advance force that prepares the ground for full-scale invasion.',
  leader: {
    name: 'Deathleaper',
    title: 'Supreme Lictor, The Terror of Worlds',
    description:
      'Deathleaper is a unique Lictor of legendary cunning — the ultimate assassin organism. It has been ' +
      'deployed on dozens of worlds, each time driving defenders mad with fear before the Hive Fleet arrives. ' +
      'It is practically invisible, impossibly fast, and utterly lethal.',
  },
  notableTraits: [
    'Lictor-led stealth and infiltration force',
    'Chameleon-skinned: practically invisible until they strike',
    'Assassination specialists that target enemy leaders',
    'Precede the main swarm — the first sign of invasion',
    'Terror weapons: drive defenders mad before the battle even starts',
  ],
  combatDoctrine:
    'Infiltrate, assassinate leaders, spread terror, then call in the swarm. Lictors pick off high-value ' +
    'targets while lesser organisms swarm from the shadows.',
  whyPlay:
    'Choose Vanguard Onslaught for stealth-Tyranids — invisible alien predators hunting from the shadows.',
},

hive_guardians: {
  warbandId: 'hive_guardians',
  factionId: 'tyranids',
  name: 'Hive Guardians',
  motto: '"The synapse holds. The swarm obeys."',
  overview:
    'Hive Guardians is a defensive Tyranid warband centred on a Hive Tyrant surrounded by loyal Tyrant Guard ' +
    'and Hive Guard organisms — the bio-node\'s personal bodyguard.',
  history:
    'The Hive Tyrant is the primary synapse creature of any invasion — the general who channels the Hive Mind\'s ' +
    'will locally. Hive Guardians surround this vital node with the toughest bioforms available.',
  leader: {
    name: 'Hive Tyrant',
    title: 'The Will of the Hive Mind Made Flesh',
    description:
      'A Hive Tyrant is the apex predator of a Tyranid invasion — a towering creature of claws, wings, and ' +
      'psychic power that serves as the Hive Mind\'s local representative. It is intelligent, adaptive, and ' +
      'utterly focused on the swarm\'s objectives.',
  },
  notableTraits: [
    'Centred on a Hive Tyrant with massive combat and psychic power',
    'Tyrant Guard: living shields that throw themselves in front of attacks',
    'Hive Guard: ranged bio-organisms that fire through walls',
    'Defensive doctrine: protect the synapse node at all costs',
    'The command structure of a Tyranid invasion',
  ],
  combatDoctrine:
    'The Hive Tyrant directs from the centre while Tyrant Guard absorb punishment and Hive Guard provide ' +
    'covering fire. A castle-style defensive warband.',
  whyPlay:
    'Choose Hive Guardians for a defensive Tyranid warband centred on a mighty Hive Tyrant.',
},

// ═══════════════════════════════════════════════════════════════════════
// NECROMUNDA GANGS
// ═══════════════════════════════════════════════════════════════════════

ash_waste_nomads: {
  warbandId: 'ash_waste_nomads',
  factionId: 'necromunda_gang',
  name: 'Ash Waste Nomads',
  motto: '"The wastes provide for the faithful."',
  overview:
    'Ash Waste Nomads are desert wanderers who roam the toxic wastes outside Necromunda\'s hive cities. ' +
    'They command sand-skimmers and savage dust beasts, raiding caravans and surviving where hive-dwellers ' +
    'would perish in minutes.',
  history:
    'The Ash Wastes are the toxic, storm-blasted expanses between hive cities on Necromunda. Nomad tribes ' +
    'have adapted to this hellscape over millennia, developing a fierce warrior culture built around ' +
    'mobility, raiding, and hard-won survival.',
  leader: {
    name: 'Nomad Chief',
    title: 'Warlord of the Wastes',
    description:
      'A Nomad Chief rules through prowess in the saddle and knowledge of the wastes. They lead raiding ' +
      'parties on sand-skimmers, navigating toxic storms and dust-beast hunting grounds.',
  },
  notableTraits: [
    'Desert warriors adapted to toxic environments',
    'Sand-skimmers and dust-beast mounts for mobility',
    'Raiding culture: strike caravans and vanish into storms',
    'Survival skills beyond any hive-born fighter',
    'Exotic beastmaster traditions',
  ],
  combatDoctrine:
    'Fast raiding on mounted platforms, hit supply lines, and retreat into the wastes where pursuers ' +
    'cannot follow.',
  whyPlay: 'Choose Ash Waste Nomads for mounted desert raiders with exotic war-beasts.',
},

corpsegrinder_cult: {
  warbandId: 'corpsegrinder_cult',
  factionId: 'necromunda_gang',
  name: 'Corpsegrinder Cult',
  motto: '"Skulls! Blood! Flesh!"',
  overview:
    'Corpsegrinder Cults are Khorne-worshipping cannibals from Necromunda\'s corpse-processing underhive. ' +
    'They invoke the Blood God with every kill and fight in a frenzy of axes and cleavers.',
  history:
    'Necromunda\'s corpse-starch industry processes the dead into food for billions. Workers in these ' +
    'charnel factories sometimes snap, forming Khornate murder-cults that worship slaughter.',
  leader: {
    name: 'Butcher Lord',
    title: 'Chosen of the Blood God',
    description:
      'The Butcher Lord is a massive, frenzy-driven cult leader who has earned Khorne\'s favour through ' +
      'sheer volume of slaughter. Armed with industrial cleavers and covered in blood, they lead their ' +
      'cannibal horde into battle.',
  },
  notableTraits: [
    'Khorne-worshipping cannibals from the corpse-processing industry',
    'Berserker frenzy in melee — fight with industrial cleavers and axes',
    'Invoke Blood God blessings for battle fury',
    'Utterly fearless and recklessly aggressive',
    'Underhive horror — born from Necromunda\'s darkest industry',
  ],
  combatDoctrine: 'Charge everything. Chop everything. Offer the skulls to Khorne. Repeat.',
  whyPlay: 'Choose Corpsegrinder Cult for Khorne-worshipping cannibal gangers — maximum carnage.',
},

house_cawdor: {
  warbandId: 'house_cawdor',
  factionId: 'necromunda_gang',
  name: 'House Cawdor',
  motto: '"The Emperor judges! We are His instrument!"',
  overview:
    'House Cawdor are fanatical scavengers — the poorest of Necromunda\'s great houses, but the most ' +
    'religiously devoted. They fight with makeshift weapons and burning faith.',
  history:
    'House Cawdor controls Necromunda\'s refuse and recycling industry. Their gangers wear hoods and masks, ' +
    'worship the Emperor with dangerous fanaticism, and arm themselves with improvised weapons and fire.',
  leader: {
    name: 'Cawdor Firebrand',
    title: 'Prophet of the Redemption',
    description:
      'A Cawdor Firebrand is a street preacher turned warlord — a hooded fanatic whose sermons drive ' +
      'their followers to suicidal acts of faith. They wield holy flamers and recite the Emperor\'s word ' +
      'while burning everything they deem impure.',
  },
  notableTraits: [
    'Religious fanatics with makeshift weapons and flamers',
    'Cheapest gangers — compensate with overwhelming numbers and zealotry',
    'Fire is their sacred weapon — flamers and incendiaries everywhere',
    'Miracles: faith-based special abilities',
    'Hooded, masked aesthetic — no one has seen a Cawdor face',
  ],
  combatDoctrine: 'Swarm forward with cheap fanatics, set everything on fire, and trust in the Emperor.',
  whyPlay: 'Choose House Cawdor for fanatical, fire-obsessed underhive zealots on a budget.',
},

house_delaque: {
  warbandId: 'house_delaque',
  factionId: 'necromunda_gang',
  name: 'House Delaque',
  motto: '"We are the shadows. We are the whisper."',
  overview:
    'House Delaque are silent shadow-dwellers — pale, bald information brokers whose entire gang is ' +
    'saturated with psychic potential. They fight through stealth, manipulation, and unsettling psychic abilities.',
  history:
    'House Delaque controls Necromunda\'s information networks. Their members are eerily similar in ' +
    'appearance — pale, bald, and soft-spoken. They trade in secrets, and their gangers can manifest ' +
    'psychic phenomena that unnerve even other Necromundans.',
  leader: {
    name: 'Delaque Master of Shadows',
    title: 'The Unseen Hand',
    description:
      'A Delaque leader operates from the shadows — directing operations through whispered orders and ' +
      'psychic suggestion. They know everyone\'s secrets and use information as a weapon more lethal than ' +
      'any blade. When they do fight, they strike from darkness with silent, psychic-enhanced precision.',
  },
  notableTraits: [
    'Psychic gang: subtle psychic abilities unsettling to opponents',
    'Information brokers — knowledge is their primary weapon',
    'Stealthy and infiltration-focused',
    'Eerily uniform appearance: pale, bald, whispering',
    'Web-gauntlet and photon flash weaponry',
  ],
  combatDoctrine: 'Stealth, psychic disruption, and precision strikes from concealment. Never fight fair.',
  whyPlay: 'Choose House Delaque for psychic shadow-spy gangers — the creepiest gang on Necromunda.',
},

house_escher: {
  warbandId: 'house_escher',
  factionId: 'necromunda_gang',
  name: 'House Escher',
  motto: '"We are the future. You are already dead."',
  overview:
    'House Escher are fierce all-female warriors who master alchemical Chems and deadly close combat. ' +
    'Fast, stylish, and armed with chemical weapons and toxin blades, they are Necromunda\'s most iconic gang.',
  history:
    'House Escher dominates Necromunda\'s chem and pharmaceutical industry. Their society is matriarchal — ' +
    'males are rare and physically weak due to genetic degradation. The women are vibrant, fierce fighters ' +
    'who use combat stimulants and toxins as standard equipment.',
  leader: {
    name: 'Escher Queen',
    title: 'Matriarch of the Gang, Chem-Mistress',
    description:
      'An Escher Queen is a warrior-chemist who has mastered both blade and biochemistry. They lead through ' +
      'combat prowess and the ability to brew the most potent combat chems and toxins. Fast, aggressive, ' +
      'and utterly fearless.',
  },
  notableTraits: [
    'All-female gang with alchemical expertise',
    'Combat Chems: stimulants that enhance speed, strength, and aggression',
    'Toxin weapons: poisoned blades and chem-throwers',
    'Fast and agile fighters specialising in close combat',
    'Vibrant, punk aesthetic — the most visually striking gang',
  ],
  combatDoctrine: 'Rush in on combat chems, poison everything, and overwhelm with speed and aggression.',
  whyPlay: 'Choose House Escher for fast, deadly, chemically-enhanced all-female gangers.',
},

house_goliath: {
  warbandId: 'house_goliath',
  factionId: 'necromunda_gang',
  name: 'House Goliath',
  motto: '"Strength is everything."',
  overview:
    'House Goliath are hulking muscle-bound brawlers — the strongest gang on Necromunda who dismiss ranged ' +
    'warfare as cowardly. They fight with fists, hammers, and brute chemical enhancement.',
  history:
    'House Goliath controls Necromunda\'s heavy manufacturing. Their workers use growth stimulants and gene ' +
    'modification to become massive muscular warriors. They value physical strength above all else.',
  leader: {
    name: 'Goliath Overlord',
    title: 'The Biggest, The Strongest',
    description:
      'A Goliath Overlord is the biggest ganger in the gang — which on Necromunda means someone who makes ' +
      'Space Marines look small. Pumped full of growth stimulants and gene-enhanced to monstrous proportions, ' +
      'they settle disputes by punching through walls.',
  },
  notableTraits: [
    'Biggest, toughest gangers on Necromunda — gene-enhanced muscles',
    'Melee specialists: power hammers, fists, and brute force',
    'Stimulant-enhanced: growth chems and strength boosters',
    'Dismiss ranged combat as weakness',
    'Industrial aesthetic: slabs of muscle wrapped in factory armour',
  ],
  combatDoctrine: 'Walk toward the enemy. Hit the enemy. If the enemy is still standing, hit harder.',
  whyPlay: 'Choose House Goliath for the biggest, punchiest gang on Necromunda.',
},

house_orlock: {
  warbandId: 'house_orlock',
  factionId: 'necromunda_gang',
  name: 'House Orlock',
  motto: '"Built tough. Rides hard."',
  overview:
    'House Orlock are "The Road Crew" — tough road warriors who build their legend through Glorious Deeds ' +
    'and ride into battle on rugged vehicles. They are the everyman gang: balanced, reliable, and iconic.',
  history:
    'House Orlock controls the ore mines and overland trade routes. Their gangers are miners, truckers, ' +
    'and road warriors — practical, tough, and resistant to the underhive\'s worst.',
  leader: {
    name: 'Road Boss',
    title: 'The Boss of the Road Crew',
    description:
      'An Orlock Road Boss leads through deeds, not words. They earn their position by completing the most ' +
      'Glorious Deeds — feats of bravery, endurance, and skill that build their legend. Armed with trusty ' +
      'combat shotguns and backed by loyal road crew.',
  },
  notableTraits: [
    'Balanced gang: good at shooting and melee',
    'Road warrior culture: vehicles and overland trade',
    'Glorious Deeds: earn reputation through brave acts',
    'Reliable, tough, and versatile',
    'The classic biker-gang aesthetic of Necromunda',
  ],
  combatDoctrine: 'Balanced combined arms: shotguns at mid-range, fists at close range, guts at all ranges.',
  whyPlay: 'Choose House Orlock for versatile, tough road warrior gangers — the all-rounders.',
},

ironhead_squat_prospectors: {
  warbandId: 'ironhead_squat_prospectors',
  factionId: 'necromunda_gang',
  name: 'Ironhead Squat Prospectors',
  motto: '"The claim is staked. Now try and take it."',
  overview:
    'Ironhead Squat Prospectors are stout Squat miners who delve deep into Necromunda\'s depths for ' +
    'precious minerals. They fight with mining equipment repurposed as devastating weapons.',
  history:
    'The Ironhead Squats are a Kin group that has lived on Necromunda for generations, mining deep into ' +
    'the planet\'s crust. They are tough, stubborn, and armed with equipment designed to cut through solid rock.',
  leader: {
    name: 'Ironhead Foreman',
    title: 'Claim-Master of the Ironheads',
    description:
      'The Foreman is the toughest, most experienced miner — one who knows every tunnel and has survived ' +
      'cave-ins, toxic gas, and rival gangs. Their mining equipment doubles as terrifyingly effective weapons.',
  },
  notableTraits: [
    'Squat miners: short, tough, and incredibly stubborn',
    'Mining equipment as weapons: power drills, rock cutters, demolition charges',
    'Excellent armour: mining suits that stop bolter rounds',
    'Claim-based objectives: defend territory fiercely',
    'Ancient Kin traditions from the Leagues of Votann',
  ],
  combatDoctrine: 'Dig in, fortify the claim, and annihilate anyone who tries to take it.',
  whyPlay: 'Choose Ironhead Squats for tough, stubborn dwarf-miners with heavy gear.',
},

venators: {
  warbandId: 'venators',
  factionId: 'necromunda_gang',
  name: 'Venators',
  motto: '"The hunt is everything."',
  overview:
    'Venators are hired bounty hunters and elite prey-stalkers armed with exotic Hunting Rigs. Each is ' +
    'an individual specialist, and no two Venator gangs look or fight alike.',
  history:
    'Venators are the bounty hunters of Necromunda — a loose association of professional killers hired to ' +
    'track down specific targets. They come from every background and equip themselves with exotic, custom gear.',
  leader: {
    name: 'Hunt Leader',
    title: 'Master Tracker, Premier Bounty Hunter',
    description:
      'A Hunt Leader is the most experienced and successful bounty hunter in the group — the one who gets ' +
      'the biggest contracts and never fails to deliver. They attract other hunters through reputation alone.',
  },
  notableTraits: [
    'Bounty hunters: each member is an individual specialist',
    'Exotic Hunting Rigs: custom equipment for tracking and killing',
    'No uniform: every venator is unique in appearance and loadout',
    'Professional killers for hire — no allegiance except to the contract',
    'The most customisable gang on Necromunda',
  ],
  combatDoctrine: 'Track, trap, and eliminate the target using specialised gear and individual expertise.',
  whyPlay: 'Choose Venators for maximum customisation — a gang of unique bounty hunters.',
},

palanite_enforcers: {
  warbandId: 'palanite_enforcers',
  factionId: 'necromunda_gang',
  name: 'Palanite Enforcers',
  motto: '"The law is absolute."',
  overview:
    'Palanite Enforcers are the heavily-armed law enforcement of Necromunda — riot police with power ' +
    'mauls and concussion weapons who operate as an Imperial-aligned warband.',
  history:
    'The Palanite Enforcers are Lord Helmawr\'s private police force, maintaining order in Necromunda\'s ' +
    'hive cities through overwhelming force. Better equipped than most Guard regiments, they enforce the ' +
    'law with brutal efficiency.',
  leader: {
    name: 'Enforcer Captain',
    title: 'Officer of the Law, Helmawr\'s Justice',
    description:
      'An Enforcer Captain is a career law enforcer who has survived decades of the most dangerous policing ' +
      'in the galaxy. They lead Patrol Teams with military discipline and heavy concussion weaponry.',
  },
  notableTraits: [
    'Heavily armed and armoured law enforcement',
    'Concussion weapons: non-lethal and lethal crowd control',
    'Operates as an Imperial-aligned Warband',
    'Carapace armour and military-grade weapons',
    'The law of Necromunda, enforced by force',
  ],
  combatDoctrine: 'Advance in formation behind shields, stun and suppress with concussion weapons, then arrest.',
  whyPlay: 'Choose Palanite Enforcers for judge-dredd-style space police with heavy gear.',
},

adeptus_arbites: {
  warbandId: 'adeptus_arbites',
  factionId: 'necromunda_gang',
  name: 'Adeptus Arbites',
  motto: '"We are the Law."',
  overview:
    'The Adeptus Arbites are Imperial-level law enforcement — Judge Dredd-style enforcers who uphold ' +
    'the Lex Imperialis with shotguns, power mauls, and absolute authority. They use Palanite rules but ' +
    'represent a higher tier of Imperial justice.',
  history:
    'The Adeptus Arbites are distinct from local enforcers — they enforce Imperial law, not local regulations. ' +
    'An Arbites Precinct is the Judge, Jury, and Executioner for crimes against the Imperium itself.',
  leader: {
    name: 'Arbites Judge',
    title: 'Judge of the Lex Imperialis, Voice of Imperial Law',
    description:
      'An Arbites Judge embodies the Lex Imperialis — the law of the entire Imperium. Armed with a power ' +
      'maul and combat shotgun, they dispense summary justice on the spot. Their word IS the law, and ' +
      'their authority supersedes any local government.',
  },
  notableTraits: [
    'Imperial-level law enforcement — above local police',
    'Enforce the Lex Imperialis: crimes against the Imperium itself',
    'Combat shotguns, power mauls, and suppression shields',
    'Authority to judge, sentence, and execute on the spot',
    'Uses Palanite Enforcer rules in Trench Hammer',
  ],
  combatDoctrine: 'Breach, judge, execute. Move in tactical stacks, breach barriers, and enforce the law.',
  whyPlay: 'Choose Adeptus Arbites for the ultimate space cops — Judge Dredd in Warhammer 40K.',
},

};

// ── Helper functions ────────────────────────────────────────────────────

export function getWarbandLore(warbandId: string): WarbandLoreEntry | null {
  return WARBAND_LORE[warbandId] ?? null;
}

export function hasWarbandLore(warbandId: string): boolean {
  return warbandId in WARBAND_LORE;
}

/**
 * Get all warband lore entries for a given parent faction.
 */
export function getWarbandLoreByFaction(factionId: string): WarbandLoreEntry[] {
  return Object.values(WARBAND_LORE).filter(w => w.factionId === factionId);
}
