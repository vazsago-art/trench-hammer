/**
 * Faction Lore — Background stories for each faction in the Warhammer 40,000 universe.
 * Used by the "Read Lore" feature in the Army Builder to help new players
 * understand the setting and get invested in each faction's narrative.
 */

export interface FactionLoreEntry {
  factionId: string;
  name: string;
  motto?: string;
  overview: string;
  history: string;
  /** Bullet-point notable traits / themes */
  notableTraits: string[];
  /** Key characters or archetypes */
  keyFigures: string[];
  /** How they fight — battlefield style */
  combatDoctrine: string;
  /** Why play them — the hook for a new player */
  whyPlay: string;
}

export const FACTION_LORE: Record<string, FactionLoreEntry> = {

  // ═══════════════════════════════════════════════════════════════════════
  // IMPERIAL FACTIONS
  // ═══════════════════════════════════════════════════════════════════════

  adeptus_astartes: {
    factionId: 'adeptus_astartes',
    name: 'Adeptus Astartes (Space Marines)',
    motto: '"And they shall know no fear."',
    overview:
      'The Adeptus Astartes, commonly known as Space Marines, are the foremost defenders of humanity. ' +
      'Created by the Emperor of Mankind during the Great Crusade ten thousand years ago, they are ' +
      'genetically enhanced super-soldiers clad in power armour and armed with the finest weapons the ' +
      'Imperium can produce. Each Space Marine is forged from a normal human through years of surgery, ' +
      'genetic modification, hypno-indoctrination, and relentless training, transforming them into a ' +
      'living weapon far beyond mortal capability.',
    history:
      'The Space Marines trace their origins to the Emperor\'s grand plan to reunite all of humanity ' +
      'under one banner. He first created the twenty Primarchs — demi-god generals of unmatched power — ' +
      'and from their genetic material raised twenty Space Marine Legions, each numbering tens of thousands. ' +
      'The Great Crusade swept across the galaxy, reconquering lost human worlds and destroying alien threats. ' +
      'But the dream shattered when Warmaster Horus, the Emperor\'s most trusted son, turned half the Legions ' +
      'to Chaos in the catastrophic civil war known as the Horus Heresy. The Emperor was mortally wounded and ' +
      'entombed upon the Golden Throne, where He has sat for ten millennia, His psychic might the only thing ' +
      'keeping humanity\'s interstellar civilisation from collapse. In the aftermath, the loyalist Legions were ' +
      'broken into smaller Chapters of roughly a thousand warriors each, as decreed by the Codex Astartes, to ' +
      'ensure no single commander could ever wield such devastating power again.',
    notableTraits: [
      'Genetically engineered super-soldiers with two hearts, reinforced bones, and acid-spitting glands',
      'Organised into Chapters of ~1,000 warriors, each with its own culture, heraldry, and battle doctrine',
      'Iconic Chapters include the Ultramarines, Blood Angels, Space Wolves, Dark Angels, and Imperial Fists',
      'Wield bolters (mass-reactive rocket-propelled rounds) and power weapons',
      'Primaris Marines are a recent reinforcement — bigger, tougher, and equipped with advanced Mk X armour',
    ],
    keyFigures: [
      'The Emperor of Mankind — creator and spiritual father',
      'Roboute Guilliman — Primarch of the Ultramarines, returned to lead the Imperium',
      'Dante — Chapter Master of the Blood Angels, oldest living Space Marine',
      'Marneus Calgar — Chapter Master of the Ultramarines',
    ],
    combatDoctrine:
      'Space Marines are elite shock troops. They strike hard and fast via drop pods, Thunderhawk gunships, ' +
      'or teleportation, overwhelming the enemy before they can react. Each Chapter emphasises different ' +
      'specialities — the Ultramarines favour tactical flexibility, the Blood Angels prefer close-quarters ' +
      'fury, the Imperial Fists excel at siege warfare, and the Raven Guard master stealth operations.',
    whyPlay:
      'The quintessential Warhammer 40K faction. Space Marines offer elite, tough warriors with incredible ' +
      'versatility. Every model hits hard and can take a beating. Ideal if you want a smaller but powerful warband ' +
      'where every warrior feels like a hero.',
  },

  astra_militarum: {
    factionId: 'astra_militarum',
    name: 'Astra Militarum (Imperial Guard)',
    motto: '"In the grim darkness of the far future, the Imperial Guard holds the line."',
    overview:
      'The Astra Militarum — known colloquially as the Imperial Guard — is the largest military force in ' +
      'the galaxy. Where Space Marines are few but mighty, the Guard wins through sheer weight of numbers, ' +
      'combined arms doctrine, and the courage of ordinary men and women facing horrors beyond imagination. ' +
      'Billions of soldiers drawn from thousands of worlds form regiments of infantry, armoured columns, ' +
      'and artillery batteries that grind the enemies of mankind into dust.',
    history:
      'The Imperial Guard\'s origins lie in the Imperial Army of the Great Crusade, the vast mortal forces ' +
      'that fought alongside the Space Marine Legions. After the Horus Heresy, the Imperial Army was split ' +
      'into the Astra Militarum (ground forces) and the Imperial Navy (fleet) to prevent any single ' +
      'commander from controlling both armies and warships. Each world in the Imperium tithes soldiers to ' +
      'the Guard, creating an astonishing diversity of regiments — from the disciplined Cadians who held ' +
      'the gate against the Eye of Terror, to the jungle fighters of Catachan, to the cavalry of Attila. ' +
      'The Guard has fought in every major conflict of the 41st Millennium, from the Gothic War to the ' +
      '13th Black Crusade that saw Cadia itself destroyed.',
    notableTraits: [
      'Ordinary humans facing extraordinary horrors — the backbone of the Imperium',
      'Massive numbers: entire platoons, companies, and regiments deployed at once',
      'Combined arms: infantry, tanks (Leman Russ, Baneblade), artillery (Basilisk), and air support',
      'Commissars enforce discipline with bolt pistol and chainsword',
      'Officers issue Orders to coordinate and inspire their troops',
    ],
    keyFigures: [
      'Lord Solar Leontus — Supreme Commander of Imperial Guard forces in the current era',
      'Lord Castellan Ursarkar Creed — legendary defender of Cadia (missing since its fall)',
      'Colonel "Iron Hand" Straken — Catachan hero and living legend',
      'Commissar Yarrick — the man who stared down Ork Warboss Ghazghkull',
    ],
    combatDoctrine:
      'The Guard fights through volume of fire, armoured superiority, and disciplined formations. Lasguns ' +
      'alone might not fell a Space Marine, but a hundred lasguns will. Leman Russ battle tanks anchor the ' +
      'line while infantry advances in fire-and-manoeuvre. Officers issue tactical Orders that can dramatically ' +
      'boost a squad\'s effectiveness in the critical moment.',
    whyPlay:
      'Play the Guard if you love the idea of mortal heroes holding the line against impossible odds. ' +
      'Your warband will be larger, with cheap troops supported by powerful characters and heavy weapons. ' +
      'Every victory feels earned when your ordinary soldiers triumph over superhuman foes.',
  },

  adeptus_custodes: {
    factionId: 'adeptus_custodes',
    name: 'Adeptus Custodes',
    motto: '"We are the Emperor\'s chosen, the golden guardians, the Ten Thousand."',
    overview:
      'The Adeptus Custodes are the personal bodyguard of the Emperor of Mankind. Where Space Marines are ' +
      'mass-produced warriors, each Custodian is an individually hand-crafted masterpiece — a warrior whose ' +
      'creation involved genetic alchemy so deep that it rewrites the subject at a cellular level from infancy. ' +
      'Clad in auramite armour and wielding guardian spears, the Custodes are the greatest warriors humanity ' +
      'has ever produced. A single Custodian is worth a squad of Space Marines.',
    history:
      'The Custodes predate the Space Marines. They were the Emperor\'s first genetically enhanced warriors, ' +
      'created during the Unification Wars on Terra to conquer the feuding techno-barbarian nations. When the ' +
      'Emperor ascended to the Golden Throne after the Horus Heresy, the Custodes withdrew into the Imperial ' +
      'Palace, guarding the Throne Room in silent vigil for ten thousand years. Only recently, at the dawn of ' +
      'the Era Indomitus, have the Custodes marched forth in force once more, recognising that the best way to ' +
      'protect the Emperor is to destroy threats before they reach Terra.',
    notableTraits: [
      'Each Custodian is a one-of-a-kind creation — superior even to Space Marines in every measurable way',
      'Equipped with auramite armour (stronger than ceramite) and master-crafted guardian spears',
      'Operate in small, elite forces — the "Ten Thousand" is their total number',
      'Possess centuries of combat experience; many Custodians are thousands of years old',
      'Eyes of the Emperor — retired Custodes who serve as spies and intelligence operatives across the galaxy',
    ],
    keyFigures: [
      'The Emperor of Mankind — their creator and ward',
      'Captain-General Trajann Valoris — current leader of the Adeptus Custodes',
      'Constantin Valdor — first Captain-General, a figure of myth and legend',
    ],
    combatDoctrine:
      'The Custodes fight in small numbers but with devastating efficiency. Every Custodian is a one-man army ' +
      'capable of engaging entire squads alone. They favour guardian spears for ranged and melee versatility, ' +
      'supported by Allarus Terminators and Vertus Praetors on jetbikes. Their tactics combine surgical precision ' +
      'with overwhelming individual superiority.',
    whyPlay:
      'The ultimate elite faction. Every single model is a powerhouse. If you want the smallest, most ' +
      'powerful warband where each warrior is worth an army, the Custodes are for you.',
  },

  adepta_sororitas: {
    factionId: 'adepta_sororitas',
    name: 'Adepta Sororitas (Sisters of Battle)',
    motto: '"Our faith is our shield, our fury is His will."',
    overview:
      'The Adepta Sororitas, also called the Sisters of Battle, are the military arm of the Ecclesiarchy — ' +
      'the state church of the Imperium. Where Space Marines fight with superhuman biology, the Sisters wage ' +
      'war through unshakeable faith in the God-Emperor. Exclusively female warriors armoured in power armour ' +
      'and armed with bolters and flamers, the Sororitas are living proof that faith can move mountains and ' +
      'melt heretics.',
    history:
      'The Sororitas trace their origins to the Daughters of the Emperor, a warrior sisterhood on the shrine ' +
      'world of San Leor. When the mad Ecclesiarch Goge Vandire was overthrown during the Age of Apostasy, the ' +
      'Daughters became the foundation for the Orders Militant — the Ecclesiarchy\'s loophole around the decree ' +
      'that forbids it from maintaining "men under arms." The six major Orders — Our Martyred Lady, Sacred Rose, ' +
      'Argent Shroud, Ebon Chalice, Valorous Heart, and Bloody Rose — each emphasise different aspects of faith ' +
      'and war. Their Acts of Faith are not mere superstition; through the Emperor\'s true divine power, Sisters ' +
      'perform genuine miracles on the battlefield — shrugging off mortal wounds, igniting unholy foes with ' +
      'sacred flame, and rising from the dead to smite the faithless.',
    notableTraits: [
      'Power-armoured warrior-nuns fuelled by absolute faith in the God-Emperor',
      'Acts of Faith — genuine miracles that heal, protect, or destroy',
      'Signature weapons: bolters, flamers, meltaguns, and the iconic heavy flamer',
      'Penitent Engines and Mortifiers — sinners entombed in walking death machines seeking redemption through slaughter',
      'Living Saints like Celestine can return from death itself by the Emperor\'s will',
    ],
    keyFigures: [
      'Saint Celestine — the Living Saint, martyr reborn to lead the faithful',
      'Morvenn Vahl — Abbess Sanctorum, supreme commander of all Sororitas',
      'Junith Eruita — Canoness of the Our Martyred Lady, rides a pulpit of divine fire',
    ],
    combatDoctrine:
      'The Sororitas favour aggressive, close-ranged firefights supported by flamer and melta weapons. ' +
      'Acts of Faith grant them battlefield miracles at critical moments. They advance behind walls of sacred ' +
      'fire, their hymns and prayers bolstering their sisters while their righteous fury annihilates heretics, ' +
      'mutants, and xenos alike.',
    whyPlay:
      'Faith-powered warriors who hit as hard as Space Marines but with a unique aesthetic and mechanic. ' +
      'Perfect if you love righteous fury, flamers, miracles, and gothic cathedral aesthetics.',
  },

  adeptus_mechanicus: {
    factionId: 'adeptus_mechanicus',
    name: 'Adeptus Mechanicus',
    motto: '"The Omnissiah is the god in the machine, and we are His servants."',
    overview:
      'The Adeptus Mechanicus are the tech-priests of Mars — a vast transhuman organisation that worships ' +
      'the Machine God (whom they identify with the Emperor as the Omnissiah). They alone possess the knowledge ' +
      'to maintain and produce the Imperium\'s technology, from humble lasguns to god-like Titan war machines. ' +
      'Their bodies are more machine than flesh, progressively replacing their organic parts with sacred bionics ' +
      'in the quest for the purity of metal over the weakness of the flesh.',
    history:
      'Mars was the first world colonised by humanity and became the seat of mechanised civilisation during the ' +
      'Age of Technology. When Old Night fell and warp storms isolated it, Mars developed its own religion — the ' +
      'Cult Mechanicus. When the Emperor conquered Terra, He forged a pact with Mars: the Treaty of Olympus. The ' +
      'Mechanicus would supply technology and forge the Emperor\'s armies; in return, Mars retained autonomy and ' +
      'religious freedom. This uneasy alliance has endured for ten millennia, though the Mechanicus and the Imperium ' +
      'often pursue divergent goals. The quest for lost Standard Template Constructs (STCs) — blueprints of ' +
      'humanity\'s golden age technology — drives Explorator fleets to the farthest reaches of the galaxy.',
    notableTraits: [
      'Replace their flesh with sacred bionics — from mechanical limbs to entirely new bodies',
      'Worship the Machine God / Omnissiah through sacred rites of maintenance and data-prayer',
      'Control all Imperial manufacturing, technology, and Titan Legions',
      'Skitarii — cybernetic soldiers hard-wired for obedience and combat efficiency',
      'Possess arcane technologies most of the Imperium cannot comprehend',
    ],
    keyFigures: [
      'Belisarius Cawl — Archmagos Dominus, creator of the Primaris Marines and greatest living tech-priest',
      'Fabricator-General — supreme leader of Mars (identity changes)',
      'The Omnissiah (The Emperor) — their Machine God manifest',
    ],
    combatDoctrine:
      'The Mechanicus combines massed infantry with advanced weapon technology. Skitarii Rangers and Vanguard ' +
      'march in eerie unison, their radium weapons irradiating the battlefield. They are supported by ' +
      'Onager Dunecrawlers, Ironstrider Ballistarii, and devastating Kastelan Robots. Their Doctrina Imperatives ' +
      'allow them to shift between modes optimised for offence or defence.',
    whyPlay:
      'For those who love the fusion of flesh and machine. A unique aesthetic of robed cyborgs wielding ' +
      'arcane weaponry, with strong shooting and interesting tech-based abilities.',
  },

  adeptus_ministorum: {
    factionId: 'adeptus_ministorum',
    name: 'Adeptus Ministorum (Ecclesiarchy)',
    motto: '"Suffer not the heretic, the mutant, the witch."',
    overview:
      'The Adeptus Ministorum, commonly called the Ecclesiarchy, is the state church of the Imperium of Mankind. ' +
      'It preaches the worship of the Emperor as a God and enforces religious conformity across a million worlds. ' +
      'While the Adepta Sororitas form its military Orders, the broader Ministorum encompasses zealous preachers, ' +
      'Crusaders pledged to holy war, rabble-rousing Missionaries, and hordes of fanatical faithful who march ' +
      'to battle armed with devotion and crude weapons.',
    history:
      'The Imperial Cult arose organically after the Emperor was interred on the Golden Throne. Over millennia, ' +
      'belief in the Emperor\'s divinity solidified into the state religion. The Ecclesiarchy grew into one of the ' +
      'most powerful institutions in the Imperium, controlling trillions of souls through faith, fear, and fire. ' +
      'After the disastrous Age of Apostasy when Ecclesiarch Vandire nearly destroyed the Imperium from within, ' +
      'reforms limited the Church\'s direct military power, but its influence remains immeasurable.',
    notableTraits: [
      'Zealous preachers who inspire fanatical bravery in common citizens',
      'Crusaders — heavily armoured warrior-pilgrims with storm shields and power swords',
      'Flagellants and penitents who fight through pain and religious ecstasy',
      'Control the hearts and minds of the Imperium\'s trillions',
      'Faith is a tangible force that grants real battlefield effects',
    ],
    keyFigures: [
      'Arch-Confessor Kyrinov — legendary preacher of the Ministorum',
      'Uriah Jacobus — Protector of the Faith, inspires fanaticism wherever he walks',
    ],
    combatDoctrine:
      'Ministorum forces overwhelm through zealotry and numbers. Mobs of flagellants charge headlong into ' +
      'the enemy, heedless of casualties, while priests buff nearby units with righteous fury. Crusaders ' +
      'form an armoured core. The doctrine is simple: charge, pray, and let the Emperor sort out the rest.',
    whyPlay:
      'If you love the idea of fanatical mobs, fire-and-brimstone preachers, and holy warriors, the ' +
      'Ministorum offers a characterful horde-style faction wrapped in gothic religious imagery.',
  },

  officio_assassinorum: {
    factionId: 'officio_assassinorum',
    name: 'Officio Assassinorum',
    motto: '"Fear us, for we are your doom."',
    overview:
      'The Officio Assassinorum is the Imperium\'s most secretive institution — a shadowy directorate that ' +
      'trains and deploys the most lethal individual operatives in the galaxy. Each assassin is a one-person ' +
      'army, bio-enhanced and equipped with unique technology designed to eliminate specific types of targets. ' +
      'Where armies fail, a single assassin may succeed, decapitating enemy leadership and breaking the will ' +
      'of entire civilisations.',
    history:
      'The Officio was founded during the Great Crusade to remove threats the Emperor\'s armies could not ' +
      'efficiently deal with — rogue warlords, alien leaders, and emerging threats. During the Horus Heresy, ' +
      'a team of assassins was even dispatched to assassinate Horus himself (they failed). After the Heresy, ' +
      'the Officio was reorganised into distinct Temples, each specialising in a method of killing. It operates ' +
      'under the authority of the High Lords of Terra and answers to almost no one else.',
    notableTraits: [
      'Vindicare Temple — master snipers who can kill a target from miles away',
      'Callidus Temple — shapeshifters using the drug Polymorphine to become anyone',
      'Eversor Temple — drug-crazed berserkers rigged to explode upon death',
      'Culexus Temple — psychic nulls that are anathema to psykers',
      'Each assassin is a strategic asset deployed by the High Lords of Terra',
    ],
    keyFigures: [
      'The Grand Master of Assassins — controls all Temples (identity classified)',
      'Notable operatives are rarely named; their victories are credited to "the Emperor\'s will"',
    ],
    combatDoctrine:
      'Assassins do not fight in armies — they are surgical instruments. A Vindicare sniper eliminates key ' +
      'targets from extreme range. A Callidus infiltrates and strikes in the enemy\'s midst. An Eversor is ' +
      'unleashed as a living weapon of mass destruction. A Culexus walks nightmare into reality for psykers.',
    whyPlay:
      'If you love the fantasy of the ultimate lone-wolf operative — one model that can change the entire ' +
      'battlefield through precision and lethality. Each assassin type plays completely differently.',
  },

  rogue_trader: {
    factionId: 'rogue_trader',
    name: 'Rogue Traders',
    motto: '"Beyond the borders of the Imperium lie fortunes uncountable and terrors unimaginable."',
    overview:
      'Rogue Traders are explorers, merchants, diplomats, and pirates all rolled into one. Granted a Warrant ' +
      'of Trade by the Emperor or His representatives, they are licensed to venture beyond the Imperium\'s borders, ' +
      'trade with alien species, and explore the uncharted regions of the galaxy. Each Rogue Trader commands a ' +
      'private fleet and army, assembling an eclectic retinue of warriors, experts, and aliens.',
    history:
      'The institution of Rogue Traders dates back to the Great Crusade itself, when the Emperor granted Warrants ' +
      'of Trade to bold individuals willing to push beyond the frontier. Some Warrants are hereditary, passed down ' +
      'through dynasties for millennia, becoming powerful noble houses in their own right. Rogue Traders played ' +
      'crucial roles in expanding the Imperium\'s borders, discovering new worlds, and establishing trade routes. ' +
      'In the current era, they are more vital than ever, scouting the Great Rift and maintaining links between ' +
      'the sundered halves of the Imperium.',
    notableTraits: [
      'Hold a Warrant of Trade — legal authority to operate beyond Imperial law',
      'Eclectic retinues: human soldiers, xenos mercenaries, sanctioned psykers, and exotic specialists',
      'Command personal fleets ranging from a single ship to small armadas',
      'Some are noble explorers; others are ruthless profiteers or outright pirates',
      'A unique mix of Imperial technology, alien artefacts, and improvised gear',
    ],
    keyFigures: [
      'Janus Draik — famous Rogue Trader of the modern era',
      'Elucia Vhane — renowned explorer and warband leader',
    ],
    combatDoctrine:
      'Rogue Trader retinues are a patchwork of specialists and hired guns. They fight with whatever works, ' +
      'combining Imperial weapons with alien technology and unconventional tactics. Adaptability is their ' +
      'greatest strength — they can field snipers, heavy hitters, psykers, and xenos allies in the same warband.',
    whyPlay:
      'The most narratively flexible faction. Build an eclectic crew of misfits and adventurers. Perfect ' +
      'if you want a ragtag group where every model tells a different story.',
  },

  inquisition: {
    factionId: 'inquisition',
    name: 'The Inquisition',
    motto: '"There is no such thing as innocence, only degrees of guilt."',
    overview:
      'The Inquisition is the Imperium\'s most powerful institution — a secret police force answerable only to ' +
      'the Emperor Himself. Inquisitors possess almost unlimited authority to investigate threats to humanity, ' +
      'whether from alien infiltration, Chaos corruption, or internal heresy. A single Inquisitor can condemn ' +
      'entire worlds to destruction (Exterminatus) if they judge the threat severe enough.',
    history:
      'The Inquisition was founded in the closing days of the Horus Heresy by Malcador the Sigillite, the ' +
      'Emperor\'s closest confidant. Foreseeing the threats that would plague humanity — Chaos corruption, alien ' +
      'infiltration, and internal decay — Malcador gathered individuals of exceptional will and granted them ' +
      'the authority to safeguard the Imperium by any means necessary. The Inquisition is divided into three ' +
      'major Ordos: the Ordo Malleus (daemon-hunters), the Ordo Xenos (alien-hunters), and the Ordo Hereticus ' +
      '(witch-hunters). Each Ordos has its own Chamber Militant of specialised warriors.',
    notableTraits: [
      'Unlimited authority — an Inquisitor can requisition anything, including Space Marines and warships',
      'Ordo Malleus hunts daemons, Ordo Xenos hunts aliens, Ordo Hereticus hunts heretics and witches',
      'Eclectic retinues: acolytes, warriors, psykers, tech-priests, bounty hunters, and reformed criminals',
      'Radical Inquisitors may use Chaos artefacts or alien technology against the enemy',
      'Puritan Inquisitors adhere strictly to Imperial doctrine and burn heretics without mercy',
    ],
    keyFigures: [
      'Gregor Eisenhorn — legendary Inquisitor who walked the line between Radical and Puritan',
      'Gideon Ravenor — Eisenhorn\'s former pupil, now a powerful Inquisitor in his own right',
      'Torquemada Coteaz — Lord Inquisitor and the most famous living daemon-hunter',
    ],
    combatDoctrine:
      'Inquisitorial warbands are built around a powerful Inquisitor supported by a diverse retinue. ' +
      'The Inquisitor themselves may be a psyker, a gunslinger, or a melee duelist. Their retinue fills ' +
      'specific roles as needed. They can also requisition Stormtroopers, Space Marines, or other Imperial ' +
      'forces to supplement their warband.',
    whyPlay:
      'Play the detective-warrior-judge fantasy. Build a unique warband centred on a powerful leader, ' +
      'investigating conspiracies and burning heretics. Exceptional narrative potential.',
  },

  grey_knights: {
    factionId: 'grey_knights',
    name: 'Grey Knights',
    motto: '"We are the hammer. We are the daemon\'s bane."',
    overview:
      'The Grey Knights are the Imperium\'s most secret Chapter of Space Marines — the Chamber Militant of ' +
      'the Ordo Malleus. Every single Grey Knight is a powerful psyker, wielding Nemesis force weapons and ' +
      'sanctified ammunition to banish daemons back to the Warp. Their existence is known to almost no one; ' +
      'those who witness them fight are often mind-wiped or executed to preserve the secret.',
    history:
      'The Grey Knights were founded by Malcador the Sigillite at the Emperor\'s command, using gene-seed ' +
      'drawn from the Emperor Himself. Their founding members included heroes from both loyalist and traitor ' +
      'Legions — warriors of such incorruptible will that not a single Grey Knight has ever fallen to Chaos. ' +
      'Based on the moon of Titan (which was hidden in the Warp during the Heresy), they have fought daemons ' +
      'in the most horrific battles imaginable. Their sacred 666th founding number reflects their purpose: ' +
      'to fight the beasts of the Apocalypse.',
    notableTraits: [
      'Every battle-brother is a psyker — the most psychically gifted Chapter in existence',
      'Nemesis force weapons channel psychic energy to banish daemons permanently',
      'Incorruptible — no Grey Knight has ever fallen to Chaos in ten thousand years',
      'Their very existence is classified; civilians who see them rarely survive with their memories',
      'Silver armour inscribed with wards and prayers against daemonic influence',
    ],
    keyFigures: [
      'Supreme Grand Master Kaldor Draigo — trapped in the Warp, still fighting',
      'Brother-Captain Stern — legendary daemon-slayer',
      'Grand Master Voldus — Warden of the Librarius',
    ],
    combatDoctrine:
      'Grey Knights fight as elite strike forces, teleporting directly into the heart of daemonic incursions. ' +
      'Every warrior combines psychic powers with martial skill, wielding Nemesis force halberds, swords, and ' +
      'hammers. Their psychic onslaught weakens daemons while their blessed weapons deliver the killing blow.',
    whyPlay:
      'Psychic warrior-monks who are the ultimate daemon-hunters. A tiny, hyper-elite force where every model ' +
      'is both a powerful psyker and a deadly combatant. The fiction is unbeatable — the galaxy\'s last line ' +
      'of defence against the horrors of the Warp.',
  },

  adeptus_arbites: {
    factionId: 'adeptus_arbites',
    name: 'Adeptus Arbites',
    motto: '"The law is absolute. Justice is swift."',
    overview:
      'The Adeptus Arbites are the Imperium\'s federal law enforcement — judge, jury, and executioner rolled ' +
      'into one armoured enforcer. They uphold the Lex Imperialis, the Emperor\'s law, across every world in ' +
      'the Imperium. Unlike local planetary enforcers (PDF), the Arbites answer only to the High Lords of Terra ' +
      'and enforce Imperial law with shotguns, shock mauls, and Repressor riot tanks.',
    history:
      'The Arbites were established to ensure that no world in the Imperium could defy the Emperor\'s laws. ' +
      'Each world has at least one Precinct-Fortress — a heavily fortified courthouse that serves as a base of ' +
      'operations. During uprisings, the Arbites are often the first responders, putting down revolts with ' +
      'extreme prejudice before the Imperial Guard can arrive. They are feared and respected in equal measure.',
    notableTraits: [
      'Judge Dredd-inspired law enforcers of the far future',
      'Carapace armour, combat shotguns, shock mauls, and suppression shields',
      'Precinct-Fortresses are nigh impregnable bastions of Imperial law',
      'Enforce the Lex Imperialis — Imperial law that supersedes all local customs',
      'Cyber-mastiffs — robotic attack dogs that track and subdue criminals',
    ],
    keyFigures: [
      'No famous individual Arbites are widely known — they are the law itself, faceless and implacable',
    ],
    combatDoctrine:
      'The Arbites fight in riot-suppression formations, using shields and shock mauls to subdue at close range ' +
      'while shotgun-armed enforcers lay down withering fire. Their tactics are designed for urban combat and ' +
      'crowd control, adapted for full-scale warfare when necessary.',
    whyPlay:
      'Space Judge Dredd. If you love the idea of heavily armoured cops laying down the law in the grimdark ' +
      'future, the Arbites offer a unique, characterful warband with a strong urban-warfare identity.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // CHAOS FACTIONS
  // ═══════════════════════════════════════════════════════════════════════

  heretic_astartes: {
    factionId: 'heretic_astartes',
    name: 'Heretic Astartes (Chaos Space Marines)',
    motto: '"Death to the False Emperor!"',
    overview:
      'The Heretic Astartes — Chaos Space Marines — are the dark mirror of the Adeptus Astartes. Once loyal ' +
      'warriors of the Emperor, they turned to the Ruinous Powers during the Horus Heresy and now wage an eternal ' +
      'war of vengeance against the Imperium they once served. Empowered by Chaos, they possess all the strengths ' +
      'of Space Marines plus the unholy blessings of the Dark Gods — mutations, daemonic weapons, sorcerous powers, ' +
      'and ten thousand years of burning hatred.',
    history:
      'When Warmaster Horus fell to Chaos, he took half the Space Marine Legions with him. The Word Bearers ' +
      'had secretly worshipped Chaos for decades, the Emperor\'s Children surrendered to excess, the World Eaters ' +
      'drowned in rage, the Death Guard were consumed by pestilence, the Thousand Sons were betrayed by fate, ' +
      'the Iron Warriors and Night Lords rebelled from grudge and spite, and the Alpha Legion pursued their own ' +
      'inscrutable agenda. After the Heresy\'s failure, the traitor Legions retreated into the Eye of Terror — ' +
      'a massive Warp rift where time flows differently. For them, the Heresy may have ended yesterday or ten ' +
      'thousand years ago. They launch Black Crusades to tear down the Imperium, the most devastating being ' +
      'Abaddon\'s 13th Black Crusade that destroyed Cadia and opened the Great Rift across the galaxy.',
    notableTraits: [
      'Fallen Space Marines empowered by the Chaos Gods',
      'Four major Chaos Gods: Khorne (war), Tzeentch (sorcery), Nurgle (decay), Slaanesh (excess)',
      'Marks of Chaos grant supernatural boons — berserker rage, sorcerous power, resilience, or speed',
      'Ten-thousand-year veterans — some warriors remember fighting alongside the Emperor',
      'Dark Apostles, Sorcerers, and Daemon Princes lead through faith, magic, and sheer power',
    ],
    keyFigures: [
      'Abaddon the Despoiler — Warmaster of Chaos, heir to Horus, currently leading the largest Chaos invasion in history',
      'Haarken Worldclaimer — Herald of the Apocalypse',
      'Erebus — Dark Apostle of the Word Bearers, architect of the Horus Heresy',
      'Ahriman — exiled sorcerer of the Thousand Sons, seeking to undo his greatest mistake',
      'Kharn the Betrayer — greatest champion of Khorne',
      'Typhus — Herald of Nurgle, captain of the Death Guard',
      'Lucius the Eternal — champion of Slaanesh who cannot truly die',
    ],
    combatDoctrine:
      'Chaos Space Marines are as versatile as their loyalist counterparts but augmented by the powers of the Warp. ' +
      'Khorne Berzerkers charge into melee with unstoppable fury, Rubric Marines rain sorcerous fire, Plague Marines ' +
      'advance through any punishment, and Noise Marines shatter the enemy with sonic weaponry. Daemon Engines and ' +
      'possessed warriors add an unpredictable, terrifying element.',
    whyPlay:
      'The villains of 40K at their finest. Everything Space Marines can do, but with spikes, mutations, daemon ' +
      'weapons, and the corrupting power of the Warp. Perfect for those who want to embrace the dark side.',
  },

  chaos_cult: {
    factionId: 'chaos_cult',
    name: 'Chaos Cults',
    motto: '"The Gods hear our prayers. They answer with power."',
    overview:
      'Chaos Cults are the most insidious threat the Imperium faces — not alien invaders or renegade super-soldiers, ' +
      'but ordinary humans seduced by the whispered promises of the Dark Gods. From hive city underbellies to noble ' +
      'courts, Chaos worship spreads like a virus, corrupting citizens into fanatical cultists who perform dark ' +
      'rituals, summon daemons, and tear down Imperial authority from within.',
    history:
      'Chaos Cults have existed as long as humanity has been aware of the Warp. The Dark Gods constantly seek to ' +
      'corrupt mortals, offering power, knowledge, pleasure, or resilience in exchange for worship and souls. Cults ' +
      'form spontaneously wherever desperation, oppression, or ambition create fertile ground. They operate in ' +
      'secret until strong enough to rise up, often coinciding with a Chaos Space Marine invasion or daemonic ' +
      'incursion. Most cults are discovered and purged by the Inquisition, but for every cult destroyed, a dozen ' +
      'more spring up in the shadows.',
    notableTraits: [
      'Ordinary citizens turned to Chaos — mutants, fanatics, and the desperate',
      'Diverse composition: cultists, mutants, dark priests, possessed, and summoned daemons',
      'Chaos Spawn — cultists whose mutations have consumed their minds entirely',
      'Cheap and numerous — overwhelm through sheer fanaticism',
      'Can invoke dark rituals and summon lesser daemons to fight alongside them',
    ],
    keyFigures: [
      'Cult leaders vary — demagogues, sorcerers, mutant patriarchs, or possessed vessels',
      'Dark Commune — the leadership council of a typical Chaos cult',
    ],
    combatDoctrine:
      'Chaos Cults rely on zealotry, numbers, and the element of surprise. Waves of cultists absorb enemy fire ' +
      'while more dangerous elements — mutants, possessed, and summoned daemons — close in. They fight dirty, ' +
      'using ambushes, booby traps, and daemonic assistance to even the odds against better-equipped foes.',
    whyPlay:
      'The ultimate underdog villain faction. A motley horde of cultists, mutants, and daemons that overwhelms ' +
      'through sheer weight of madness. Great for narrative-driven campaigns and characterful models.',
  },

  chaos_daemons: {
    factionId: 'chaos_daemons',
    name: 'Chaos Daemons',
    motto: '"We are eternal. We are inevitable. We are the end."',
    overview:
      'Chaos Daemons are the living nightmares of the Warp made manifest in reality. They are fragments of the ' +
      'Chaos Gods\' power given form — entities of pure malice, hunger, and destruction that pour through rifts ' +
      'in reality to consume the material universe. From the lesser Bloodletters and Plaguebearers to the ' +
      'godlike Greater Daemons, they are the ultimate enemy of all living things.',
    history:
      'Daemons have existed as long as the Warp itself — which is to say, as long as sentient beings have felt ' +
      'emotion. The Chaos Gods grew from the psychic residue of mortal feelings: Khorne from rage and violence, ' +
      'Tzeentch from ambition and deception, Nurgle from despair and endurance, and Slaanesh from excess and ' +
      'sensation (born from the psychic death-scream of the Aeldari empire). Daemons cannot normally exist in ' +
      'real space — they need a rift, a ritual, or a weakening of reality\'s fabric to manifest. The Great Rift ' +
      'torn across the galaxy has made daemonic incursions horrifyingly common.',
    notableTraits: [
      'Four daemon types aligned to four Chaos Gods, each with unique aesthetics and abilities',
      'Khorne Daemons: Bloodletters, Flesh Hounds, Bloodthirsters — savage melee combatants',
      'Tzeentch Daemons: Horrors, Flamers, Lords of Change — sorcerous and unpredictable',
      'Nurgle Daemons: Plaguebearers, Nurglings, Great Unclean Ones — resilient and disgusting',
      'Slaanesh Daemons: Daemonettes, Fiends, Keepers of Secrets — swift and seductive',
      'Daemons are banished, not killed — destroying their physical form sends them back to the Warp',
    ],
    keyFigures: [
      'Be\'lakor — the first Daemon Prince, master of shadows',
      'Skarbrand — the exiled Bloodthirster, eternally enraged',
      'Kairos Fateweaver — two-headed oracle of Tzeentch who sees past and future',
      'Rotigus — the Generous One, a Great Unclean One who spreads "gifts"',
    ],
    combatDoctrine:
      'Daemon armies vary dramatically by alignment. Khorne daemons surge forward in a red tide of melee fury. ' +
      'Tzeentch daemons barrage the enemy with eldritch fire while changing shape unpredictably. Nurgle daemons ' +
      'shamble forward, shrugging off damage through supernatural resilience. Slaanesh daemons strike with ' +
      'blinding speed and grace. Mixed forces combine all four for overwhelming variety.',
    whyPlay:
      'Pure supernatural horror. Playing daemons means fielding living nightmares — bizarre, terrifying entities ' +
      'that defy the laws of physics. Each god\'s daemons play completely differently.',
  },

  vermintide: {
    factionId: 'vermintide',
    name: 'Vermintide',
    motto: '"From the shadows we gnaw at the pillars of civilisation."',
    overview:
      'The Vermintide are a horrifying xenos species that infests the underbellies of Imperial worlds — ' +
      'ratlike creatures that breed in astronomical numbers, lurking in sewers, hive city foundations, and ' +
      'abandoned mine shafts. They are cunning, cowardly, and incredibly numerous, swarming out of the dark ' +
      'in overwhelming tides of filthy claws and jury-rigged weapons.',
    history:
      'The origins of the Vermintide are debated. Some believe they are a natural xenos species that adapted to ' +
      'urban environments, others theorise they are Warp-tainted mutations of common vermin. What is known is ' +
      'that they infest countless Imperial worlds, often undetected until their numbers are catastrophic. They ' +
      'have crude technology — ramshackle firearms, poisoned blades, and unstable warpstone-powered devices — ' +
      'but their real weapon is their limitless reproduction and utter disregard for their own lives.',
    notableTraits: [
      'Rat-like xenos that swarm in vast numbers from underground lairs',
      'Cheap, expendable troops that overwhelm through attrition',
      'Warpstone-powered technology: unreliable but devastating when it works',
      'Cowardly but cunning — prefer ambushes, traps, and overwhelming numbers',
      'Mutant rat ogres and warpfire-throwers provide heavy support',
    ],
    keyFigures: [
      'Vermintide leaders are rarely known by name — they rise and fall in constant backstabbing politics',
    ],
    combatDoctrine:
      'Drown the enemy in bodies. Vermintide tactics revolve around massive numbers of cheap troops swarming ' +
      'forward while more dangerous specialists — warpfire throwers, rat ogres, and assassin teams — exploit ' +
      'the chaos. They fight best in confined spaces and ambush situations.',
    whyPlay:
      'A true horde faction. If you love the idea of fielding a swarm of ratlike monsters pouring out of the ' +
      'darkness, the Vermintide offers a uniquely fun, chaotic play experience with cheap models everywhere.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // XENOS FACTIONS
  // ═══════════════════════════════════════════════════════════════════════

  ork: {
    factionId: 'ork',
    name: 'Orks',
    motto: '"WAAAGH!"',
    overview:
      'Orks are the most numerous and widespread xenos species in the galaxy — a race of green-skinned ' +
      'fungoid organisms born for war. They are incredibly tough, fearless (too stupid to know fear, some say), ' +
      'and driven by an instinctive desire to fight. Ork technology shouldn\'t work by any rational measure — ' +
      'their vehicles are held together with scrap metal and optimism, their guns are crude tubes that somehow ' +
      'fire bullets. The secret? Ork psychic power — their collective belief that something works literally ' +
      'makes it work (mostly).',
    history:
      'Orks were seeded across the galaxy by the ancient Old Ones as a biological weapon against the Necrons ' +
      'during the War in Heaven, millions of years ago. They have since forgotten (or never knew) their purpose ' +
      'and simply fight because fighting is what Orks do. They reproduce via spores shed from their bodies, ' +
      'meaning it is nearly impossible to truly eradicate them from a world. Their entire society is built on ' +
      'a single principle: might makes right. The biggest, meanest Ork becomes the Warboss, and when a Warboss ' +
      'gets big enough, the WAAAGH! begins — a crusade of destruction that can engulf entire sectors.',
    notableTraits: [
      'Fungoid organisms that reproduce via spores — nearly impossible to eradicate',
      'Collective psychic field ("Gestalt") that makes their ramshackle tech actually work',
      'Incredibly tough and aggressive — Orks love fighting above all else',
      'Ork society: Boyz (grunts), Nobz (warriors), Warbosses (leaders), and specialist clans',
      'Vehicles are insane: trucks with giant guns, flying contraptions, walking scrap-metal walkers',
    ],
    keyFigures: [
      'Ghazghkull Mag Uruk Thraka — the Beast of Armageddon, largest and most powerful Ork in the galaxy',
      'Makari — Ghazghkull\'s lucky grot banner-bearer who refuses to stay dead',
    ],
    combatDoctrine:
      'CHARGE! Orks fight by rushing the enemy in a green tide, firing wildly and slamming into melee with ' +
      'choppas swinging. They are terrifyingly effective in close combat. Ork shooting is inaccurate but ' +
      'compensated by sheer volume. Specialised mobs (Lootas, Burna Boyz, Stormboyz) add variety.',
    whyPlay:
      'Pure, unbridled fun. Orks are the comic relief and the terrifying threat of 40K. If you want a faction ' +
      'that is loud, unpredictable, hilarious, and devastating in melee, choose the green horde.',
  },

  drukhari: {
    factionId: 'drukhari',
    name: 'Drukhari (Dark Eldar)',
    motto: '"Pain is a delicacy we have refined over millennia."',
    overview:
      'The Drukhari are the dark kin of the Aeldari — a decadent and sadistic civilisation that dwells in the ' +
      'nightmare city of Commorragh, hidden within the Webway. Where their Craftworld cousins chose discipline ' +
      'and restraint, the Drukhari embraced excess. They are raiders, slavers, and torturers who feed on the ' +
      'suffering of others to sustain their souls, which are slowly devoured by Slaanesh, the Chaos God their ' +
      'ancestors accidentally created.',
    history:
      'Before the Fall — the cataclysmic birth of Slaanesh that destroyed the Aeldari empire — the species ' +
      'that would become the Drukhari were the ruling elite of the most powerful civilisation in history. Their ' +
      'unchecked hedonism fed the growing consciousness of Slaanesh in the Warp, and when the new god was born, ' +
      'it consumed billions of Aeldari souls in an instant. Those who had retreated into the Webway survived, ' +
      'but found themselves eternally cursed — Slaanesh slowly drains their souls unless they replenish them ' +
      'by inflicting suffering on others. This dark bargain has made the Drukhari into the galaxy\'s most feared ' +
      'pirates and slavers.',
    notableTraits: [
      'Lightning-fast raiders who strike from the Webway — interdimensional portals that bypass normal space',
      'Feed on pain and suffering to sustain their immortal souls',
      'Commorragh — their city is a nightmarish pocket dimension of impossible scale',
      'Kabals (pirate fleets), Wych Cults (gladiatorial fighters), and Haemonculus Covens (flesh-sculptors)',
      'Technology that can manipulate flesh, time, and physics in horrifying ways',
    ],
    keyFigures: [
      'Asdrubael Vect — Supreme Overlord of Commorragh, the most cunning being alive',
      'Lelith Hesperax — Queen of Knives, greatest gladiatrix in the galaxy',
      'Urien Rakarth — ancient Haemonculus, master of flesh-crafting',
    ],
    combatDoctrine:
      'Speed and precision. Drukhari strike from portals, hitting hard and fast before the enemy can respond. ' +
      'Poison weapons bypass toughness, dark lances punch through armour, and Wych Cults tear opponents apart ' +
      'in close combat. They are fragile but devastatingly offensive — the best defence is killing the enemy first.',
    whyPlay:
      'The ultimate glass-cannon faction. Incredibly fast, lethally offensive, but fragile. If you love the ' +
      'idea of lightning raids and the dark aesthetic of space pirates who literally feed on pain, the Drukhari ' +
      'deliver a thrilling, high-risk playstyle.',
  },

  tyranids: {
    factionId: 'tyranids',
    name: 'Tyranids',
    motto: '"The Great Devourer hungers."',
    overview:
      'The Tyranids are an extragalactic hive-minded swarm of bio-engineered organisms — the ultimate apex ' +
      'predators. They travel between galaxies in vast hive fleets, consuming all biological matter on every ' +
      'world they encounter to fuel their endless evolution. Every Tyranid organism is grown for a specific ' +
      'purpose, from tiny swarm creatures to building-sized bio-titans, all controlled by the vast psychic ' +
      'intelligence known as the Hive Mind.',
    history:
      'The Tyranids were first encountered by the Imperium at Tyran, where an entire world was consumed in ' +
      'hours — giving the species its name. Since then, multiple hive fleets have entered the galaxy from ' +
      'different vectors: Hive Fleet Behemoth struck Ultramar, Kraken hit the eastern fringe, and Leviathan ' +
      'attacked from below the galactic plane. Each hive fleet was eventually blunted at immense cost, but the ' +
      'Tyranids adapt. Every defeat teaches them. And the fleets encountered so far may be merely the vanguard ' +
      'of a swarm so vast it defies comprehension.',
    notableTraits: [
      'Extragalactic hive-mind swarm — every organism is one cell in a galaxy-spanning intelligence',
      'Consume all biological matter on a planet, including the atmosphere and oceans',
      'Endless adaptation: if a weapon hurts them, the next generation is immune',
      'Synapse creatures maintain the Hive Mind\'s control; without them, lesser creatures revert to instinct',
      'Bio-weapons: living guns that fire beetle-bullets, acid, or bio-plasma',
    ],
    keyFigures: [
      'The Swarmlord — apex predator of the Hive Mind, reborn after every death with accumulated knowledge',
      'Old One Eye — legendary Carnifex that has been "killed" dozens of times',
      'The Hive Mind itself — not an individual, but the intelligence behind every Tyranid action',
    ],
    combatDoctrine:
      'Tyranids overwhelm through evolution and numbers. Swarms of small creatures screen the advance of ' +
      'larger monsters. Genestealers infiltrate ahead, Hormagaunts tie up the enemy in melee, while Carnifexes ' +
      'and Hive Tyrants smash through defences. They adapt mid-battle and grow stronger as casualties mount.',
    whyPlay:
      'The alien horror faction. Endless swarms of evolving monsters that adapt to any threat. If you want to ' +
      'play the unstoppable alien tide — from tiny bugs to massive bio-titans — the Tyranids are the apex choice.',
  },

  genestealer_cults: {
    factionId: 'genestealer_cults',
    name: 'Genestealer Cults',
    motto: '"The Star Children are coming. Rejoice."',
    overview:
      'Genestealer Cults are the insidious vanguard of the Tyranid menace. A single Genestealer infiltrates a ' +
      'human world and begins a generations-long corruption, creating a hybrid cult that worships the Tyranid ' +
      'Hive Mind as divine "Star Children." Over four generations, the cult grows in secret — infiltrating the ' +
      'military, government, and workforce — until the day of uprising, when they overthrow planetary defences ' +
      'just as the Hive Fleet arrives to devour everything.',
    history:
      'Genestealers were first encountered on the Space Hulk Sin of Damnation and the moons of Ymgarl. These ' +
      'advance organisms use an ovipositor to implant genetic material into a host, who then produces hybrid ' +
      'offspring. The first generation are monstrous, but each subsequent generation looks more human. By the ' +
      'fourth generation, the hybrids are nearly indistinguishable from normal humans and can infiltrate any ' +
      'level of society. The cult organises along family lines, with the Patriarch (the original Genestealer) ' +
      'as the psychic nexus. When a Hive Fleet\'s Shadow in the Warp approaches, the cult rises up.',
    notableTraits: [
      'Multi-generational infiltration cult hidden within Imperial society',
      'Hybrid warriors range from nearly-human to clearly monstrous',
      'Use stolen Imperial Guard equipment: mining tools, autoguns, and industrial vehicles',
      'Ambush specialists — emerge from sewers, mines, and hidden tunnels',
      'The Patriarch psychically controls the entire cult through a network of Magi and Primus leaders',
    ],
    keyFigures: [
      'The Patriarch — original Genestealer, psychic hub of the entire cult',
      'The Magus — psychic leader who manipulates through mind control',
      'The Primus — military commander of the cult\'s uprising',
    ],
    combatDoctrine:
      'Genestealer Cults fight through ambush and deception. Units emerge from underground, behind enemy lines, ' +
      'or disguised among civilians. They use stolen military hardware, mining equipment (rock saws, drills), ' +
      'and sheer fanaticism. The Patriarch and Genestealers themselves are terrifying close-combat killers.',
    whyPlay:
      'The ultimate insurgent faction. Part horror movie, part revolution narrative, GSC reward cunning players ' +
      'who love ambushes, misdirection, and revealing hidden forces at the perfect moment.',
  },

  harlequins: {
    factionId: 'harlequins',
    name: 'Harlequins',
    motto: '"We dance the dance of death, and the galaxy is our stage."',
    overview:
      'The Harlequins are the enigmatic warrior-performers of the Aeldari race — followers of the Laughing God ' +
      'Cegorach, the only Aeldari deity to survive the Fall intact. They travel the Webway in troupes, performing ' +
      'mythic dances that preserve Aeldari history and fighting with acrobatic grace that makes them among the ' +
      'deadliest warriors in the galaxy. Their holo-suits create dazzling, hallucinogenic light shows that make ' +
      'them nearly impossible to target.',
    history:
      'When Slaanesh was born from the Fall of the Aeldari, the Laughing God Cegorach alone among the Aeldari ' +
      'pantheon escaped through cunning and trickery. His followers, the Harlequins, took on the sacred duty of ' +
      'preserving the entirety of Aeldari myth and history through ritual performances. They are welcomed by both ' +
      'Craftworld Aeldari and Drukhari, serving as neutral diplomats, keepers of knowledge, and omens of change. ' +
      'Only the Harlequins know the full truth of the Black Library — the hidden Webway repository of all ' +
      'knowledge about Chaos — and they guard it zealously.',
    notableTraits: [
      'Warrior-performers who combine lethal martial arts with acrobatic dance',
      'Holo-suits project bewildering light patterns that make them nearly impossible to hit',
      'Flip belts allow gravity-defying leaps and charges through terrain',
      'The Solitaire — the most feared and tragic of Harlequins, who plays the role of Slaanesh',
      'Guard the Black Library — the ultimate repository of anti-Chaos knowledge',
    ],
    keyFigures: [
      'Cegorach, the Laughing God — the last free Aeldari deity',
      'The Solitaires — feared even by other Harlequins, for their souls belong to Slaanesh',
    ],
    combatDoctrine:
      'Harlequins are pure speed and close combat. They dance through enemy fire with their holo-suits, close ' +
      'the distance impossibly fast, and tear through opponents with shrieker cannons, fusion pistols, and ' +
      'the deadly Harlequin\'s Kiss — a monofilament weapon that liquefies organs on contact.',
    whyPlay:
      'The most stylish faction in 40K. Lightning-fast, deadly acrobats who are nearly impossible to hit. ' +
      'A tiny, hyper-elite force where every model is a blender in close combat. The ultimate glass-cannon.',
  },

  leagues_of_votann: {
    factionId: 'leagues_of_votann',
    name: 'Leagues of Votann',
    motto: '"The Ancestors remember. The Ancestors endure."',
    overview:
      'The Leagues of Votann are a civilisation of short, stocky, genetically engineered clones who dwell in ' +
      'the galactic core. Known to the Imperium as "Squats" in ages past, they are a proud, practical people ' +
      'guided by ancient super-AI ancestors called Votann — vast repositories of knowledge accumulated over ' +
      'millennia. They are expert miners, craftsmen, and warriors who value kinship, honour, and grudges above all.',
    history:
      'The Kin (as they call themselves) descend from humans who were engineered for hostile mining environments ' +
      'during the Age of Technology. Isolated during the Age of Strife, they developed independently, guided by ' +
      'their Votann — ancient AI cores that accumulated wisdom over millennia. The Imperium considered them ' +
      'destroyed by Tyranid Hive Fleet Behemoth, but the Leagues survived in the galactic core. Now they have ' +
      'emerged in force, establishing trade with some Imperial worlds while fiercely defending their territory ' +
      'and holding grudges against any who wrong them.',
    notableTraits: [
      'Clone-born warriors guided by ancient AI "Ancestor Cores" (Votann)',
      'Superior technology to the Imperium in many areas — ion weaponry, barrier tech, gravitic tools',
      'Grudge system: wrongs are recorded and never forgiven until avenged',
      'Pragmatic and efficient — waste nothing, honour everything',
      'Ironkin — sentient AI robots who fight alongside the Kin as equals',
    ],
    keyFigures: [
      'Ûthar the Destined — legendary Kâhl (warrior-leader)',
      'The Votann themselves — ancient AI minds whose decisions shape League policy',
    ],
    combatDoctrine:
      'The Leagues fight with superior firepower and solid, disciplined formations. Ion weapons and ' +
      'magna-rail rifles provide devastating ranged output, while Hearthkyn warriors hold the line ' +
      'in stolid, unbreakable formations. They judge enemies through their Votann, and those judged ' +
      'most worthy of grudge-settling are targeted with extreme prejudice.',
    whyPlay:
      'Space dwarves with superior technology and a grudge system. If you want a tough, shooty faction ' +
      'with a strong cultural identity and the best guns in the galaxy, the Leagues deliver.',
  },

  slanni: {
    factionId: 'slanni',
    name: 'Slanni (Old Ones)',
    motto: '"We were here before the stars burned, and we shall endure long after they fade."',
    overview:
      'The Slanni are the remnants of the Old Ones — the ancient, god-like species that shaped the galaxy ' +
      'millions of years before humanity crawled from the oceans of Terra. They seeded worlds with life, ' +
      'created the Webway, and engineered species (including the Aeldari and Orks) as weapons in their war ' +
      'against the Necrons and C\'tan. The few surviving Slanni are unfathomably ancient and powerful, wielding ' +
      'psychic and technological abilities beyond any other species.',
    history:
      'The Old Ones ruled the galaxy in the distant past, using their mastery of the Warp and genetic engineering ' +
      'to shape civilisations. When the Necrontyr allied with the C\'tan (the star-vampires) in the War in Heaven, ' +
      'the Old Ones created warrior races to fight back — the Aeldari for spiritual warfare, the Orks for brute ' +
      'force, and others now lost. The war was apocalyptic and ultimately shattered their civilisation. Most Old ' +
      'Ones were destroyed, but some fled through the Webway to hidden places. The Slann (as they were known in ' +
      'earlier lore) persist in the deepest shadows, occasionally intervening in galactic affairs through proxies ' +
      'and ancient technology.',
    notableTraits: [
      'Remnants of the galaxy\'s original architect-race, millions of years old',
      'Created the Webway, the Aeldari, and the Orks',
      'Supreme psychic power — rivalling or exceeding even the Aeldari',
      'Technology so advanced it appears indistinguishable from magic',
      'Extremely rare — encountering a Slanni is an event of galactic significance',
    ],
    keyFigures: [
      'Individual Slanni are barely known — they are entities of myth rather than recorded history',
    ],
    combatDoctrine:
      'Slanni wage war through proxies, ancient technology, and overwhelming psychic power. When they must fight ' +
      'directly, reality warps around them — gravity reverses, time stutters, and enemies are unmade at a ' +
      'molecular level. Their "weapons" are often incomprehensible applications of physics and Warp-science.',
    whyPlay:
      'The most exotic and mysterious faction. If you want to field an ancient, unknowable force that bends ' +
      'reality itself, with unique models and abilities unlike any other faction.',
  },

  necron: {
    factionId: 'necron',
    name: 'Necrons',
    motto: '"We are the rightful rulers of the galaxy. We have merely been sleeping."',
    overview:
      'The Necrons are an ancient race of skeletal machines — once the organic Necrontyr, they surrendered their ' +
      'mortal bodies to become immortal metal constructs in a pact with the C\'tan, god-like star-eating entities. ' +
      'Sixty million years ago they ruled the galaxy, then entered the Great Sleep in tomb worlds scattered ' +
      'across the stars. Now they are awakening, and they intend to reclaim what they believe is rightfully theirs.',
    history:
      'The Necrontyr were a short-lived species cursed by radiation from their dying sun. Bitter and desperate, ' +
      'they discovered the C\'tan — god-like beings of pure energy that fed on stars. The Necrontyr offered them ' +
      'physical bodies (the Necrodermis) in exchange for the power to defeat the Old Ones. The C\'tan agreed but ' +
      'the price was horrifying: biotransference, the process that stripped the Necrontyr of their souls and ' +
      'entombed them in metal bodies. Most became mindless warriors, while the nobles (Phaerons, Overlords, Lords) ' +
      'retained their consciousness. After the War in Heaven, the Necron Silent King Szarekh turned against the ' +
      'C\'tan, shattering them into manageable shards. He then ordered the Great Sleep — sixty million years of ' +
      'hibernation in hidden tomb worlds, waiting for the younger races to rise and the galaxy to be ripe for reconquest.',
    notableTraits: [
      'Virtually indestructible metal bodies that reassemble themselves after being destroyed',
      'Technology that manipulates time, space, matter, and energy at fundamental levels',
      'Gauss weapons strip matter atom-by-atom from their targets',
      'Dynasties — each tomb world is ruled by a Phaeron with their own agenda',
      'C\'tan Shards — enslaved fragments of star-gods used as weapons of mass destruction',
    ],
    keyFigures: [
      'Szarekh, the Silent King — returned from exile to save the Necron race from the Tyranids',
      'Imotekh the Stormlord — Phaeron of the Sautekh Dynasty, greatest Necron strategist',
      'Trazyn the Infinite — eccentric collector of "historical artefacts" (including living specimens)',
      'Orikan the Diviner — astromancer who can manipulate time itself',
    ],
    combatDoctrine:
      'Necrons fight with relentless, grinding attrition. Warriors advance in implacable phalanxes, their gauss ' +
      'weapons stripping enemy armour apart. When destroyed, their living metal bodies reanimate and stand back up. ' +
      'They are supported by Canoptek constructs, Doom Scythes, and the unfathomable power of C\'tan Shards. ' +
      'They simply will not stop coming.',
    whyPlay:
      'The Terminator faction. Implacable, unkillable machines that simply stand back up after being destroyed. ' +
      'Ancient technology that makes other races look primitive. If you want the unstoppable robot army with ' +
      'Egyptian sci-fi aesthetics and timeline-bending technology, choose the Necrons.',
  },

  aeldari: {
    factionId: 'aeldari',
    name: 'Aeldari (Craftworld Eldar)',
    motto: '"We are the last light of a dying empire, and we shall not fade gently."',
    overview:
      'The Aeldari are an ancient alien race whose civilisation once ruled the galaxy. Now reduced to a ' +
      'fractured diaspora, the Craftworld Aeldari survive on enormous world-ships called Craftworlds, each ' +
      'a self-contained civilisation drifting through space. They are a dying race — each Aeldari life is ' +
      'incredibly precious, for their souls are hunted by Slaanesh, the Chaos God their ancestors created.',
    history:
      'At the height of their power, the Aeldari empire spanned the galaxy. Their technology was so advanced ' +
      'that all basic needs were met, leading to a culture of decadence and sensation-seeking. Over millennia, ' +
      'their collective psychic excess gave birth to Slaanesh — the Prince of Pleasure — in a catastrophic ' +
      'event called the Fall. Slaanesh\'s birth-scream devoured billions of Aeldari souls and tore a permanent ' +
      'Warp rift (the Eye of Terror) where their empire\'s heart once was. The survivors split into factions: ' +
      'the Craftworld Aeldari who follow the strict Paths (warrior, seer, artisan) to control their emotions; ' +
      'the Drukhari who fled to the Webway; and the Exodites who returned to simple lives on maiden worlds. ' +
      'Every Aeldari wears a Spirit Stone that captures their soul at death, protecting it from Slaanesh.',
    notableTraits: [
      'Superior psychic abilities — Farseers can read the threads of fate itself',
      'Aspect Warriors: specialised warrior-paths (Dire Avengers, Howling Banshees, Fire Dragons, etc.)',
      'Wraith constructs — spirit stones housing the dead pilot graceful bone-construct bodies',
      'Speed and precision over brute force — every shot must count because every Aeldari life is irreplaceable',
      'Advanced technology: shuriken catapults, D-cannons, wraithbone psychic technology',
    ],
    keyFigures: [
      'Eldrad Ulthran — most powerful Farseer alive, from Craftworld Ulthwé',
      'Prince Yriel — pirate prince turned saviour of Craftworld Iyanden',
      'Jain Zar — the Storm of Silence, first of the Phoenix Lords and founder of the Howling Banshees',
      'The Avatar of Khaine — a molten shard of the Aeldari war god, awakened in times of dire need',
    ],
    combatDoctrine:
      'Aeldari fight with surgical precision. Farseers divine the future to position forces perfectly. Aspect ' +
      'Warriors are hyper-specialised — Dire Avengers for ranged defence, Banshees for melee assault, Fire ' +
      'Dragons for vehicle-killing. Grav-tanks and Wave Serpents provide speed. Every engagement is planned to ' +
      'inflict maximum damage with minimum losses, because they cannot afford to lose a single warrior.',
    whyPlay:
      'The elegant, tragic faction. Every warrior is a specialist, and your army fights with precision and grace. ' +
      'Ideal for players who love strategic depth, psychic powers, and the poignant tale of a dying civilisation.',
  },

  tau_empire: {
    factionId: 'tau_empire',
    name: 'T\'au Empire',
    motto: '"For the Greater Good."',
    overview:
      'The T\'au Empire is a young, rapidly expanding civilisation guided by the philosophy of the Greater Good — ' +
      'the belief that all species can work together for mutual benefit. They are the galaxy\'s most advanced ' +
      'practitioners of ranged warfare, fielding battlesuits, drones, and pulse weaponry that outperform even ' +
      'Astartes arms. Unlike most 40K factions, the T\'au genuinely believe in cooperation and progress, ' +
      'making them the closest thing to "good guys" in the grimdark universe — though their enforced conformity ' +
      'and mysterious Ethereal caste raise dark questions.',
    history:
      'The T\'au were discovered as primitives by the Imperium, who sent a fleet to eliminate them. A freak ' +
      'Warp storm isolated the T\'au world for centuries, during which time they evolved rapidly — or were ' +
      'guided by the Ethereals, their ruling caste, whose origins are suspiciously unclear. In just six thousand ' +
      'years (a blink in galactic time), the T\'au went from using spears to fielding fusion-powered battlesuits. ' +
      'Their empire now spans several hundred worlds, integrating multiple alien species (Kroot, Vespid, Human ' +
      'defectors) into a multi-species civilisation. They are expanding aggressively, driven by the Sphere ' +
      'Expansion campaigns.',
    notableTraits: [
      'Best ranged firepower in the game — pulse rifles, railguns, and fusion weapons',
      'Battlesuits: from the nimble Stealth Suits to the towering Riptide and Stormsurge',
      'Drone support: gun drones, shield drones, marker drones provide versatile battlefield support',
      'Multi-species empire: T\'au, Kroot (mercenary hunters), Vespid (insectoid allies), and human auxiliaries',
      'No psykers — the T\'au have virtually no Warp presence, which protects them from Chaos',
    ],
    keyFigures: [
      'Commander Shadowsun — greatest living T\'au military commander',
      'Commander Farsight — legendary warrior who broke from the Empire, leading his own Enclave',
      'Aun\'Va — Ethereal Supreme (officially still alive despite rumours of his death)',
    ],
    combatDoctrine:
      'The T\'au doctrine is simple: shoot the enemy until nothing is left standing. Massed pulse fire ' +
      'and marker light coordination shred infantry, while railgun-armed battlesuits and Hammerhead tanks ' +
      'destroy armour from extreme range. Drones absorb return fire. T\'au avoid melee at all costs — if ' +
      'the enemy reaches close combat, something has gone very wrong.',
    whyPlay:
      'The premier shooting faction. If you love giant mech suits, drone swarms, laser beams, and the ' +
      'satisfying "dakka" of deleting enemies from across the battlefield, the T\'au deliver the best ' +
      'ranged game in 40K. Also great for those who want to play the "good guys" (relatively speaking).',
  },

  necromunda_gang: {
    factionId: 'necromunda_gang',
    name: 'Necromunda Gangs',
    motto: '"In the Underhive, you fight or you die. There is no third option."',
    overview:
      'Necromunda Gangs represent the vicious underworld of hive cities — the planet-spanning urban sprawls ' +
      'where billions of humans live and die in the shadow of colossal manufactorums. In the Underhive — the ' +
      'lawless, gang-infested lower levels — life is brutal and short. Gangs fight for territory, resources, ' +
      'and survival, armed with scavenged weapons, improvised armour, and desperate courage.',
    history:
      'Necromunda is an archetypal hive world — layered cities reaching miles into the sky, with the upper ' +
      'spires enjoyed by nobility and the lower levels degenerating into lawless wastelands. The Great Houses ' +
      'control the official economy, but the Underhive operates on gang law. Famous gangs include those of ' +
      'House Goliath (gene-enhanced brutes), House Escher (all-female chem-dealers), House Orlock (blue-collar ' +
      'fighters), House Van Saar (tech-savvy), House Cawdor (fanatical scavengers), and House Delaque (spies ' +
      'and assassins). These gangs fight proxy wars for the Great Houses while pursuing their own survival.',
    notableTraits: [
      'Gritty, street-level warfare in the depths of a hive city',
      'Each gang has a unique culture and fighting style based on their Great House',
      'Improvised weapons, scavenged gear, and jury-rigged equipment',
      'Campaign-focused: gangs grow, gain experience, collect territory, and suffer lasting injuries',
      'Diverse roster: juves, gangers, champions, and leaders with unique skill trees',
    ],
    keyFigures: [
      'Named characters vary by House and gang — each warband tells its own story',
    ],
    combatDoctrine:
      'Underhive combat is close, dirty, and personal. Gangs use terrain aggressively, set up ambushes, ' +
      'and fight for chokepoints. Each House has a specialty: Goliath charge with raw power, Escher use ' +
      'toxins and speed, Van Saar rely on tech, and Delaque operate through stealth and misdirection.',
    whyPlay:
      'The gang warfare experience. If you love narrative campaigns, character progression, and the ' +
      'gritty street-level side of 40K, Necromunda Gangs offer the most personalised, story-rich faction.',
  },

  pirate_crew: {
    factionId: 'pirate_crew',
    name: 'Pirate Crews',
    motto: '"The void is lawless, and we are its kings."',
    overview:
      'Pirate Crews are the corsairs, freebooters, and renegades who prowl the void between the stars. ' +
      'They operate outside the law of any faction — Imperial deserters, xenos outcasts, mutants, and ' +
      'fortune-seekers who raid shipping lanes and plunder worlds. A pirate captain assembles their crew ' +
      'from whoever is willing to fight for a share of the spoils.',
    history:
      'Space piracy has existed as long as interstellar travel. The vastness of the galaxy means entire ' +
      'regions can go unpatrolled for decades, allowing pirate bands to flourish. Some crews are former ' +
      'Imperial Navy deserters, others are xenos marauders, and some are simply desperate souls who turned ' +
      'to raiding to survive. Famous pirate havens include Port Maw, Footfall, and various space hulks ' +
      'converted into hidden bases. The Imperium and other factions consider them vermin to be exterminated, ' +
      'but the pirates endure through cunning, speed, and knowing when to run.',
    notableTraits: [
      'Eclectic crews: any species, any background, united only by greed and survival',
      'Mix of Imperial, xenos, and improvised technology',
      'Hit-and-run tactics: strike fast, loot, and escape before reinforcements arrive',
      'No allegiance to any faction — pirates serve only themselves',
      'Ship-based operations: their vessel is their home, fortress, and identity',
    ],
    keyFigures: [
      'Pirate captains are self-made legends — each crew tells its own tale',
    ],
    combatDoctrine:
      'Pirates fight dirty. Ambushes, boarding actions, and overwhelming a single target before withdrawing. ' +
      'They avoid fair fights and use every advantage — environmental hazards, hostages, and misdirection. ' +
      'When cornered, they fight with the desperation of those with nothing to lose.',
    whyPlay:
      'Maximum creative freedom. Build a warband from any background with no restrictions on theme. ' +
      'If you want to tell your own story with a motley crew of criminals and scoundrels, pirates are for you.',
  },
};

/** Lookup helper: returns the lore entry for a faction, or null if not found. */
export function getFactionLore(factionId: string): FactionLoreEntry | null {
  return FACTION_LORE[factionId] ?? null;
}

/** Returns true if lore is available for the given faction. */
export function hasLore(factionId: string): boolean {
  return factionId in FACTION_LORE;
}
