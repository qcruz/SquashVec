"""
Name pools for crew generation.
Organized by species with culturally appropriate patterns.
"""

# ---------------------------------------------------------------------------
# HUMAN — drawn from multiple Earth cultures to reflect a united humanity
# ---------------------------------------------------------------------------

HUMAN_FIRST_NAMES = [
    # English / Western European
    "James", "William", "Thomas", "Robert", "Henry", "George", "Edward", "Charles",
    "Richard", "Arthur", "Walter", "Leonard", "Philip", "Francis", "Albert",
    "Margaret", "Eleanor", "Catherine", "Dorothy", "Frances", "Helen", "Alice",
    "Grace", "Harriet", "Edith", "Mildred", "Beatrice", "Constance", "Virginia",
    # East Asian
    "Wei", "Jing", "Hiro", "Kenji", "Yuki", "Sora", "Mei", "Lin", "Yuna",
    "Haruki", "Rin", "Tao", "Yue", "Kai", "Ren", "Hana", "Jin", "Suki",
    # South Asian
    "Priya", "Anika", "Rohan", "Arjun", "Sanjay", "Deepa", "Leela", "Vikram",
    "Nisha", "Rahul", "Meera", "Arun", "Kavya", "Dev", "Ananya",
    # African / African diaspora
    "Amara", "Zara", "Kofi", "Nia", "Jabari", "Adaeze", "Seun", "Imani",
    "Kwame", "Fatima", "Chidi", "Zuri", "Emeka", "Aisha", "Tendai",
    # Latin American
    "Elena", "Carlos", "Sofia", "Diego", "Valentina", "Mateo", "Isabella",
    "Sebastian", "Camila", "Andres", "Lucia", "Rafael", "Daniela", "Pablo",
    # Middle Eastern / North African
    "Layla", "Omar", "Yasmin", "Tariq", "Nadia", "Hassan", "Rania", "Khalid",
    "Samira", "Farid", "Leila", "Yusuf", "Dina", "Rami",
    # Eastern European / Slavic
    "Natasha", "Alexei", "Katya", "Dmitri", "Sonja", "Pavel", "Irina",
    "Nikolai", "Vera", "Sergei", "Mila", "Boris", "Anya", "Vasily",
    # Nordic / Scandinavian
    "Astrid", "Erik", "Sigrid", "Bjorn", "Freya", "Lars", "Ingrid", "Leif",
    # Irish / Celtic
    "Siobhan", "Declan", "Aoife", "Ciaran", "Niamh", "Brendan", "Roisin",
]

HUMAN_LAST_NAMES = [
    # English
    "Carter", "Bennett", "Walker", "Collins", "Baker", "Mitchell", "Parker",
    "Turner", "Adams", "Hayes", "Foster", "Gray", "Hunt", "Ward", "Dixon",
    "Morrison", "Fleming", "Sinclair", "Harrington", "Ashford", "Pemberton",
    # East Asian
    "Chen", "Wang", "Liu", "Zhang", "Li", "Tanaka", "Yamamoto", "Nakamura",
    "Suzuki", "Kim", "Park", "Choi", "Nguyen", "Tran", "Pham",
    # South Asian
    "Patel", "Shah", "Sharma", "Singh", "Kapoor", "Mehta", "Nair", "Rao",
    "Reddy", "Iyer", "Bose", "Chatterjee", "Pillai", "Menon",
    # African
    "Okafor", "Mensah", "Diallo", "Kamara", "Osei", "Adeyemi", "Nkosi",
    "Dlamini", "Banda", "Mwangi", "Owusu", "Asante", "Conteh",
    # Latin American
    "Rivera", "Morales", "Reyes", "Torres", "Flores", "Vargas", "Castro",
    "Guerrero", "Medina", "Ortega", "Delgado", "Vega", "Soto", "Ramos",
    # Middle Eastern
    "Hassan", "Al-Rashid", "Khalil", "Mansour", "Nasser", "Farouk", "Haddad",
    # Eastern European
    "Volkov", "Petrov", "Kozlov", "Sokolov", "Morozov", "Novak", "Kowalski",
    "Horváth", "Popescu", "Antonescu", "Bogdanov", "Orlov",
    # Nordic
    "Eriksson", "Lindqvist", "Johansson", "Strand", "Berg", "Holm",
]

# ---------------------------------------------------------------------------
# VULCAN — formal, often prefixed, classical feel
# ---------------------------------------------------------------------------

VULCAN_NAMES = [
    # Male-presenting (Vulcan names are often gender-neutral but patterns differ)
    "Sarek", "Spock", "Soval", "Tuvok", "Vorik", "Stron", "Selak", "Varen",
    "Sutok", "Skon", "Verak", "Tolaris", "Salak", "Muroc", "Vanik",
    "Kolos", "Sopek", "Stel", "Setek", "Votan",
    # Female-presenting
    "T'Pol", "T'Pring", "T'Pau", "T'Lar", "T'Les", "T'Vran", "T'Mir",
    "Selar", "Valeris", "T'Lara", "T'Ana", "Sakonna", "T'Shanik", "T'Veth",
    "Solaris", "T'Rena", "Seleya", "Valaris", "T'Kara", "T'Nara",
]

# Vulcan house/clan suffixes occasionally used as surnames
VULCAN_CLAN = [
    "of Vulcan", "of Shi'Kahr", "of Raal", "of Kir", "of Nal'Shin",
    "", "", "", "", "",  # most Vulcans use only one name
]

# ---------------------------------------------------------------------------
# ANDORIAN — harsh consonants, th/sh patterns, clan identifiers
# ---------------------------------------------------------------------------

ANDORIAN_FIRST_NAMES = [
    "Shran", "Thy'lek", "Thelin", "Talas", "Talla", "Shras", "Shrev",
    "Thalos", "Thelev", "Shlik", "Tharak", "Shravel", "Theron", "Shlanik",
    "Thrass", "Thalev", "Shrov", "Theras", "Shlan", "Thrak",
    "Vyssia", "Shalris", "Thyrev", "Thalissia", "Shrevak", "Thalys",
]

ANDORIAN_CLAN = [
    "zh'", "ch'", "th'", "sh'",  # gendered clan prefixes
]

ANDORIAN_CLAN_NAMES = [
    "Roon", "Idrani", "Thelev", "Shrallash", "Korrath", "Vessin", "Thalar",
    "Krothan", "Shressa", "Voran", "Thassal", "Krevin", "Shorath",
]

# ---------------------------------------------------------------------------
# BETAZOID — flowing, multi-syllabic, often ending in vowels
# ---------------------------------------------------------------------------

BETAZOID_FIRST_NAMES = [
    "Lwaxana", "Deanna", "Ryx", "Homn", "Kestra", "Anya", "Dalora",
    "Iovian", "Sarkona", "Tarses", "Oriana", "Velar", "Milena", "Kayal",
    "Sarina", "Alora", "Nalara", "Trevian", "Serianna", "Vorel",
    "Tevita", "Samara", "Seranna", "Iovar", "Kareen", "Narai",
]

BETAZOID_LAST_NAMES = [
    "Troi", "Elbrun", "Xerx", "Odan", "Kayl", "Danar", "Valerian",
    "Renn", "Vorin", "Saliim", "Torak", "Mayen", "Lariss",
]

# ---------------------------------------------------------------------------
# BOLIAN — Ba-/Bo- patterns, often double-barreled names
# ---------------------------------------------------------------------------

BOLIAN_NAMES = [
    "Mot", "Chell", "Boq'ta", "Bolarus", "Borath", "Balar", "Borvan",
    "Balen", "Bolak", "Balim", "Borrell", "Banik", "Borak", "Boran",
    "Belak", "Balek", "Borras", "Balek", "Boval", "Borath",
    "Vola", "Varan", "Voral", "Varet", "Volek",
]

# ---------------------------------------------------------------------------
# BAJORAN — surname first, then given name
# ---------------------------------------------------------------------------

BAJORAN_SURNAMES = [
    "Kira", "Ro", "Winn", "Bareil", "Opaka", "Shakaar", "Furel",
    "Lupaza", "Odo", "Lenaris", "Jaro", "Sirsy", "Tarsa", "Vedek",
    "Orta", "Kubus", "Vaatrik", "Tora", "Prylar", "Ranjen",
]

BAJORAN_GIVEN_NAMES = [
    "Nerys", "Laren", "Adami", "Antos", "Edon", "Razka", "Holana",
    "Krell", "Mika", "Latha", "Taban", "Pohl", "Yessit", "Gantt",
    "Keeve", "Darrah", "Mace", "Varis", "Dorin", "Wex",
]

# ---------------------------------------------------------------------------
# TELLARITE — guttural, short, sometimes aggressive-sounding
# ---------------------------------------------------------------------------

TELLARITE_NAMES = [
    "Gral", "Gav", "Naarg", "Boq", "Telk", "Grum", "Brag", "Vrax",
    "Gront", "Plak", "Torv", "Grak", "Brum", "Vrann", "Gorrn",
    "Krag", "Torr", "Grunk", "Bragg", "Vrex",
]

# ---------------------------------------------------------------------------
# Species weights for random selection (out of 100)
# ---------------------------------------------------------------------------

SPECIES_WEIGHTS = {
    "Human":     58,
    "Vulcan":    10,
    "Andorian":  8,
    "Betazoid":  7,
    "Bolian":    5,
    "Bajoran":   5,
    "Tellarite": 4,
    "Other":     3,
}

# Species stat modifiers (applied after base generation, capped at 10)
SPECIES_STAT_MODIFIERS = {
    "Human":     {},
    "Vulcan":    {"Science": 1, "Diplomacy": -1},
    "Andorian":  {"Tactical": 1},
    "Betazoid":  {"Diplomacy": 1, "Command": -1},
    "Bolian":    {"Medicine": 1},
    "Bajoran":   {"Engineering": 1},
    "Tellarite": {"Tactical": 1},
    "Other":     {},
}
