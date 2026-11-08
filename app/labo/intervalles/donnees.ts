// Données de la page Labo Intervalles : les 12 intervalles, de la seconde mineure
// à l'octave, avec leurs chansons repères. Contenu repris de la maquette validée,
// corrections du brief appliquées. Chansons issues du cheat sheet Interval
// d'Open Minded Singing (source citée en bas de page).

export type Chanson = {
  titre: string
  // Vide pour les airs traditionnels
  artiste: string
  indice: string
  genreEtAnnee: string
  emoji: string
}

export type Intervalle = {
  cle: string
  nom: string
  demiTons: string
  wikipedia: string
  ascendant: Chanson[]
  // Vide : la page affiche un placeholder explicite
  descendant: Chanson[]
}

export type Ressource = { libelle: string; emoji: string; url: string }

export const RESSOURCES: Ressource[] = [
  { libelle: 'Les intervalles (Wikipédia)', emoji: '📖', url: 'https://fr.wikipedia.org/wiki/Intervalle_(musique)' },
  { libelle: "Reconnaissance d'intervalles (Wikipédia)", emoji: '👂', url: 'https://fr.wikipedia.org/wiki/Reconnaissance_d%27intervalles' },
  { libelle: 'Cours (Wikiversité)', emoji: '🎓', url: 'https://fr.wikiversity.org/wiki/Intervalles' },
  { libelle: 'Composer sa musique', emoji: '🎼', url: 'https://composer-sa-musique.fr/theorie-musicale-les-intervalles/' },
  { libelle: 'Apprendre le solfège', emoji: '🎵', url: 'https://www.apprendrelesolfege.com/les-intervalles' },
  { libelle: 'Abbey Road Institute', emoji: '🎸', url: 'https://abbeyroadinstitute.fr/blog/les-intervalles-en-musique/' },
  { libelle: 'Guitare improvisation', emoji: '🎸', url: 'https://www.guitare-improvisation.com/comprendre-les-intervalles-en-musique.php' },
]

export const INTERVALLES: Intervalle[] = [
  {
    cle: 'm2',
    nom: 'Seconde mineure',
    demiTons: '1 demi-ton',
    wikipedia: 'https://fr.wikipedia.org/wiki/Seconde_mineure',
    ascendant: [
      { titre: 'Pink Panther Theme', artiste: 'Henry Mancini', indice: 'Les deux premières notes du thème.', genreEtAnnee: 'Soundtrack · Jazz · 1963', emoji: '🐆' },
      { titre: 'Jaws Main Theme', artiste: 'John Williams', indice: 'Le motif principal en deux notes.', genreEtAnnee: 'Soundtrack · 1975', emoji: '🦈' },
      { titre: 'Every Breath You Take', artiste: 'The Police', indice: 'Every Breath You Take', genreEtAnnee: 'Soft rock · 1983', emoji: '🎸' },
      { titre: "Isn't She Lovely", artiste: 'Stevie Wonder', indice: "Isn't she lovely, isn't she wonderful…", genreEtAnnee: 'Soul · 1976', emoji: '🎹' },
    ],
    descendant: [
      { titre: 'Carmina Burana: O Fortuna', artiste: 'Carl Orff', indice: 'Semper crescis, Aut decrescis', genreEtAnnee: 'Musique classique · 1937', emoji: '🎼' },
      { titre: 'Für Elise', artiste: 'Beethoven', indice: 'Les deux premières notes les plus célèbres.', genreEtAnnee: 'Musique classique · 1810', emoji: '🎹' },
      { titre: 'We Will Rock You', artiste: 'Queen', indice: 'We will, we will rock you', genreEtAnnee: 'Rock · 1977', emoji: '👑' },
    ],
  },
  {
    cle: 'M2',
    nom: 'Seconde majeure',
    demiTons: '2 demi-tons',
    wikipedia: 'https://fr.wikipedia.org/wiki/Seconde_majeure',
    ascendant: [
      { titre: 'Non, je ne regrette rien', artiste: 'Edith Piaf', indice: 'Non, je ne regrette rien', genreEtAnnee: 'Chanson · 1960', emoji: '🌹' },
      { titre: 'Frère Jacques', artiste: '', indice: 'Frère Jacques', genreEtAnnee: 'Traditionnel · 1780', emoji: '🔔' },
      { titre: 'Happy Birthday to You', artiste: '', indice: 'Happy birthday to you!', genreEtAnnee: 'Traditionnel · 1893', emoji: '🎂' },
      { titre: 'Mamma Mia!', artiste: 'ABBA', indice: 'Mamma mia', genreEtAnnee: 'Pop · 1975', emoji: '✨' },
    ],
    descendant: [
      { titre: 'Toccata et Fugue en ré mineur', artiste: 'Bach', indice: "Les deux premières notes à l'orgue.", genreEtAnnee: 'Musique classique · 1730', emoji: '🎹' },
      { titre: 'Dancing Queen', artiste: 'ABBA', indice: "Les deux premières notes de l'intro.", genreEtAnnee: 'Pop · Disco · 1976', emoji: '💃' },
      { titre: 'Eye of the Tiger', artiste: 'Survivor', indice: 'Le saut entre la 2e et la 3e note du riff.', genreEtAnnee: 'Rock · 1982', emoji: '🐯' },
      { titre: 'Enter Sandman', artiste: 'Metallica', indice: 'Exit light…', genreEtAnnee: 'Heavy metal · 1991', emoji: '🤘' },
    ],
  },
  {
    cle: 'm3',
    nom: 'Tierce mineure',
    demiTons: '3 demi-tons',
    wikipedia: 'https://fr.wikipedia.org/wiki/Tierce_mineure',
    ascendant: [
      { titre: 'Georgia On My Mind', artiste: 'Hoagy Carmichael', indice: 'Georgia, Georgia on my mind', genreEtAnnee: 'Pop traditionnel · 1930', emoji: '🎷' },
      { titre: 'Iron Man', artiste: 'Black Sabbath', indice: 'Les deux premières notes du riff de guitare.', genreEtAnnee: 'Heavy metal · 1971', emoji: '🤘' },
      { titre: 'Smoke on the Water', artiste: 'Deep Purple', indice: 'Les deux premières notes du riff de guitare.', genreEtAnnee: 'Rock · 1973', emoji: '🔥' },
      { titre: 'Seven Nation Army', artiste: 'The White Stripes', indice: 'Le saut entre la 2e et la 3e note du riff.', genreEtAnnee: 'Rock alternatif · 2003', emoji: '⚡' },
      { titre: 'Crazy', artiste: 'Gnarls Barkley', indice: 'Does that make me crazy…', genreEtAnnee: 'R&B · 2006', emoji: '🌀' },
    ],
    descendant: [
      { titre: 'Sunday Morning', artiste: 'Maroon 5', indice: 'Sunday morning…', genreEtAnnee: 'Pop rock · 2004', emoji: '☀️' },
      { titre: 'Rolling in the Deep', artiste: 'Adele', indice: 'Rolling in the deep', genreEtAnnee: 'Pop · Soul · 2010', emoji: '🎤' },
      { titre: 'Can You Feel the Love Tonight', artiste: 'Elton John', indice: 'Can you feel the love tonight', genreEtAnnee: 'Soundtrack · Pop · 1994', emoji: '🦁' },
    ],
  },
  {
    cle: 'M3',
    nom: 'Tierce majeure',
    demiTons: '4 demi-tons',
    wikipedia: 'https://fr.wikipedia.org/wiki/Tierce_(musique)',
    ascendant: [
      { titre: 'When the Saints Go Marching In', artiste: '', indice: 'Les deux premières notes.', genreEtAnnee: 'Traditionnel · 1938', emoji: '⛪' },
      { titre: "Let's Dance", artiste: 'David Bowie', indice: 'Ah, ah, ah, ah', genreEtAnnee: 'Glam rock · 1983', emoji: '⚡' },
      { titre: 'Sir Duke', artiste: 'Stevie Wonder', indice: "Les deux premières notes de l'intro.", genreEtAnnee: 'R&B · 1977', emoji: '🎷' },
      { titre: 'Spring', artiste: 'Antonio Vivaldi', indice: 'Les deux premières notes.', genreEtAnnee: 'Musique classique · 1717', emoji: '🌸' },
    ],
    descendant: [
      { titre: 'Summer Nights', artiste: 'Grease', indice: 'Summer loving had me a blast', genreEtAnnee: 'Soundtrack · 1978', emoji: '🌊' },
      { titre: 'Symphonie n°5', artiste: 'Ludwig van Beethoven', indice: 'Les premières notes de la mélodie.', genreEtAnnee: 'Musique classique · 1804', emoji: '🎼' },
      { titre: 'Bohemian Rhapsody', artiste: 'Queen', indice: 'Mama, just killed a man…', genreEtAnnee: 'Rock · 1975', emoji: '👑' },
    ],
  },
  {
    cle: 'P4',
    nom: 'Quarte juste',
    demiTons: '5 demi-tons',
    wikipedia: 'https://fr.wikipedia.org/wiki/Quarte_(musique)',
    ascendant: [
      { titre: 'I Will Always Love You', artiste: 'Whitney Houston', indice: 'And I will always love you (1ère fois)', genreEtAnnee: 'Pop · R&B · 1973', emoji: '💜' },
      { titre: 'Summer Nights', artiste: 'Grease', indice: "Les premières notes de l'intro.", genreEtAnnee: 'Soundtrack · 1978', emoji: '🌊' },
      { titre: "Hedwig's Theme", artiste: 'John Williams', indice: 'Les deux premières notes.', genreEtAnnee: 'Soundtrack · 2001', emoji: '🦉' },
      { titre: 'We Wish You a Merry Christmas', artiste: '', indice: 'We wish you a Merry Christmas', genreEtAnnee: 'Noël · 1935', emoji: '🎄' },
    ],
    descendant: [
      { titre: 'Love Again', artiste: 'Dua Lipa', indice: 'Sample de "Your Woman".', genreEtAnnee: 'Pop · 2021', emoji: '💗' },
      { titre: 'Hallelujah Chorus "Messiah"', artiste: 'G. F. Handel', indice: 'Hallelujah! Hallelujah!', genreEtAnnee: 'Musique classique · 1741', emoji: '🎼' },
      { titre: 'Eine Kleine Nachtmusik', artiste: 'Mozart', indice: 'Les deux premières notes.', genreEtAnnee: 'Musique classique · 1787', emoji: '🎻' },
      { titre: 'Under Pressure', artiste: 'Queen', indice: 'Riff de basse intro.', genreEtAnnee: 'Rock · 1981', emoji: '👑' },
      { titre: 'Crazy In Love', artiste: 'Beyoncé', indice: 'Uh oh, uh oh, uh oh, oh no no', genreEtAnnee: 'Pop · R&B · 2003', emoji: '🐝' },
    ],
  },
  {
    cle: 'TT',
    nom: 'Triton',
    demiTons: '6 demi-tons',
    wikipedia: 'https://fr.wikipedia.org/wiki/Triton_(intervalle)',
    ascendant: [
      { titre: 'Maria', artiste: 'West Side Story', indice: "Maria! I've just met a girl named Maria", genreEtAnnee: 'Comédie musicale · 1957', emoji: '🌟' },
      { titre: 'The Simpsons', artiste: 'Danny Elfman', indice: 'The Simpsons', genreEtAnnee: 'Soundtrack · 1989', emoji: '📺' },
    ],
    descendant: [
      { titre: 'Turn Back, O Man', artiste: 'Godspell', indice: 'Turn back, O man', genreEtAnnee: 'Comédie musicale · 1971', emoji: '🎭' },
      { titre: 'Black Sabbath', artiste: 'Black Sabbath', indice: 'Les 2e et 3e notes du riff de guitare.', genreEtAnnee: 'Heavy metal · 1970', emoji: '🤘' },
    ],
  },
  {
    cle: 'P5',
    nom: 'Quinte juste',
    demiTons: '7 demi-tons',
    wikipedia: 'https://en.wikipedia.org/wiki/Perfect_fifth',
    ascendant: [
      { titre: 'The X-Files Theme', artiste: 'Mark Snow', indice: 'Les deux premières notes du sifflement.', genreEtAnnee: 'Soundtrack · 1996', emoji: '🛸' },
      { titre: 'One', artiste: 'Metallica', indice: 'Les deux premières notes à la guitare.', genreEtAnnee: 'Heavy metal · 1989', emoji: '🤘' },
      { titre: 'Yeah!', artiste: 'Usher', indice: 'Les deux premières notes du lead synth.', genreEtAnnee: 'Hip hop · 2004', emoji: '🎵' },
      { titre: 'Come Together', artiste: 'The Beatles', indice: 'Come together', genreEtAnnee: 'Rock · 1969', emoji: '🍎' },
      { titre: 'Star Wars Theme', artiste: 'John Williams', indice: 'Les deux premières notes de la mélodie.', genreEtAnnee: 'Soundtrack · 1977', emoji: '⭐' },
    ],
    descendant: [
      { titre: 'Oops!…I Did It Again', artiste: 'Britney Spears', indice: 'Oops, I did it again', genreEtAnnee: 'Pop · 2000', emoji: '💫' },
      { titre: 'My Girl', artiste: 'The Temptations', indice: 'Ligne de basse.', genreEtAnnee: 'Soul · R&B · 1964', emoji: '🌻' },
      { titre: '(Meet) The Flintstones', artiste: 'Theme', indice: 'Flintstones, meet the Flintstones', genreEtAnnee: 'Soundtrack · 1961', emoji: '🦕' },
    ],
  },
  {
    cle: 'm6',
    nom: 'Sixte mineure',
    demiTons: '8 demi-tons',
    wikipedia: 'https://fr.wikipedia.org/wiki/Sixte_(musique)',
    ascendant: [
      { titre: 'The Entertainer', artiste: 'Scott Joplin', indice: 'Le saut caractéristique de la mélodie.', genreEtAnnee: 'Ragtime · 1902', emoji: '🎩' },
    ],
    descendant: [
      { titre: 'One of Us', artiste: 'Joan Osborne', indice: '(What if) God was one of us?', genreEtAnnee: 'Soft rock · 1995', emoji: '✨' },
      { titre: 'Call Me Maybe', artiste: 'Carly Rae Jepsen', indice: 'Hey, I just met you, and this is crazy', genreEtAnnee: 'Pop · 2011', emoji: '📱' },
    ],
  },
  {
    cle: 'M6',
    nom: 'Sixte majeure',
    demiTons: '9 demi-tons',
    wikipedia: 'https://fr.wikipedia.org/wiki/Sixte_(musique)',
    ascendant: [
      { titre: 'NBC Chimes', artiste: '', indice: 'Les deux premières notes sur trois.', genreEtAnnee: 'Jingle · 1927', emoji: '📻' },
      { titre: 'Jingle Bells', artiste: '', indice: 'Dashing through the snow', genreEtAnnee: 'Noël · 1857', emoji: '🎅' },
    ],
    descendant: [
      { titre: 'No Surprises', artiste: 'Radiohead', indice: "Les deux premières notes de l'intro.", genreEtAnnee: 'Rock alternatif · 1998', emoji: '🎸' },
    ],
  },
  {
    cle: 'm7',
    nom: 'Septième mineure',
    demiTons: '10 demi-tons',
    wikipedia: 'https://fr.wikipedia.org/wiki/Septi%C3%A8me_(musique)',
    ascendant: [
      { titre: 'Star Trek Theme', artiste: '', indice: 'Les deux premières notes chantées.', genreEtAnnee: 'Soundtrack · 1966', emoji: '🚀' },
      { titre: 'Back in Black', artiste: 'AC/DC', indice: 'Les deux premières notes du riff de guitare.', genreEtAnnee: 'Hard rock · 1980', emoji: '⚡' },
      { titre: "Can't Stop", artiste: 'Red Hot Chili Peppers', indice: 'Les deux premières notes du riff principal.', genreEtAnnee: 'Rock alternatif · 2002', emoji: '🌶' },
    ],
    descendant: [
      { titre: 'Watermelon Man', artiste: 'Herbie Hancock', indice: 'Les deux premières notes de la mélodie.', genreEtAnnee: 'Jazz · 1962', emoji: '🍉' },
    ],
  },
  {
    cle: 'M7',
    nom: 'Septième majeure',
    demiTons: '11 demi-tons',
    wikipedia: 'https://fr.wikipedia.org/wiki/Septi%C3%A8me_(musique)',
    ascendant: [
      { titre: 'Over the Rainbow', artiste: 'Wizard of Oz', indice: 'Some(where) over the Rainbow', genreEtAnnee: 'Comédie musicale · 1939', emoji: '🌈' },
      { titre: "Don't Know Why", artiste: 'Norah Jones', indice: "I waited 'til I saw the sun", genreEtAnnee: 'Jazz · 2002', emoji: '🌙' },
      { titre: 'Take On Me', artiste: 'A-ha', indice: 'Take on me', genreEtAnnee: 'Pop · 1985', emoji: '✏️' },
      { titre: 'Georgy Porgy', artiste: 'Toto', indice: 'Glissé de guitare sur le solo.', genreEtAnnee: 'Rock · 1978', emoji: '🎸' },
    ],
    descendant: [],
  },
  {
    cle: 'P8',
    nom: 'Octave',
    demiTons: '12 demi-tons',
    wikipedia: 'https://fr.wikipedia.org/wiki/Octave_(musique)',
    ascendant: [
      { titre: 'My Sharona', artiste: 'The Knack', indice: 'Riff de basse.', genreEtAnnee: 'New wave · 1979', emoji: '🎵' },
      { titre: 'Blue Bossa', artiste: 'Kenny Dorham', indice: 'Les deux premières notes de la mélodie.', genreEtAnnee: 'Jazz · 1963', emoji: '🎷' },
      { titre: "Singin' in the Rain", artiste: 'Gene Kelly', indice: "I'm singing in the rain", genreEtAnnee: 'Comédie musicale · 1929', emoji: '🌧️' },
    ],
    descendant: [
      { titre: 'Bulls on Parade', artiste: 'Rage Against the Machine', indice: 'Riff de guitare.', genreEtAnnee: 'Rock alternatif · 1996', emoji: '🔥' },
    ],
  },
]
