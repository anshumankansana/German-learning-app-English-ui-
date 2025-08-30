import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, BookOpen, Users, Globe, PenTool } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { UserProgress } from '../App';

interface StudyScreenProps {
  level: string;
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
  onBack: () => void;
  onComplete: (level: string) => void;
}

export function StudyScreen({ level, progress, onUpdateProgress, onBack, onComplete }: StudyScreenProps) {
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState('vocabulary');

  const studyContent = {
    'C1.1': {
      title: 'Basic German - Greetings & Introductions',
      sections: {
        vocabulary: {
          title: 'Essential Vocabulary (50 words)',
          content: [
            {
              category: 'Greetings & Farewells',
              words: [
                { german: 'Hallo', english: 'Hello', example: 'Hallo! Wie geht es dir?', pronunciation: 'HAH-loh' },
                { german: 'Guten Morgen', english: 'Good morning', example: 'Guten Morgen, Frau Schmidt!', pronunciation: 'GOO-ten MOR-gen' },
                { german: 'Guten Tag', english: 'Good day', example: 'Guten Tag! Schön, Sie zu sehen.', pronunciation: 'GOO-ten TAHK' },
                { german: 'Guten Abend', english: 'Good evening', example: 'Guten Abend, meine Damen und Herren.', pronunciation: 'GOO-ten AH-bent' },
                { german: 'Gute Nacht', english: 'Good night', example: 'Gute Nacht! Schlaf gut!', pronunciation: 'GOO-te NAKHT' },
                { german: 'Auf Wiedersehen', english: 'Goodbye', example: 'Auf Wiedersehen! Bis morgen!', pronunciation: 'owf VEE-der-zayn' },
                { german: 'Tschüss', english: 'Bye', example: 'Tschüss! Bis später!', pronunciation: 'CHÜSS' },
                { german: 'Bis bald', english: 'See you soon', example: 'Bis bald! Wir sehen uns morgen.', pronunciation: 'bis BALT' },
              ]
            },
            {
              category: 'Personal Introductions',
              words: [
                { german: 'Ich heiße', english: 'My name is', example: 'Ich heiße Maria und komme aus Berlin.', pronunciation: 'ikh HIGH-se' },
                { german: 'Mein Name ist', english: 'My name is', example: 'Mein Name ist Thomas Weber.', pronunciation: 'mine NAH-me ist' },
                { german: 'Wie heißt du?', english: 'What is your name?', example: 'Wie heißt du? Ich bin neu hier.', pronunciation: 'vee HYSST doo' },
                { german: 'Wie heißen Sie?', english: 'What is your name? (formal)', example: 'Entschuldigung, wie heißen Sie?', pronunciation: 'vee HYSST-sen zee' },
                { german: 'Ich komme aus', english: 'I come from', example: 'Ich komme aus München.', pronunciation: 'ikh KOM-me ows' },
                { german: 'Wo kommst du her?', english: 'Where do you come from?', example: 'Wo kommst du her? Aus Deutschland?', pronunciation: 'voh KOMMST doo hair' },
                { german: 'Ich wohne in', english: 'I live in', example: 'Ich wohne in Hamburg.', pronunciation: 'ikh VOH-ne in' },
                { german: 'Freut mich', english: 'Nice to meet you', example: 'Freut mich, Sie kennenzulernen!', pronunciation: 'FROYT mikh' },
              ]
            },
            {
              category: 'Basic Questions & Responses',
              words: [
                { german: 'Wie geht es dir?', english: 'How are you? (informal)', example: 'Hallo Anna, wie geht es dir heute?', pronunciation: 'vee GAYT es deer' },
                { german: 'Wie geht es Ihnen?', english: 'How are you? (formal)', example: 'Guten Tag, wie geht es Ihnen?', pronunciation: 'vee GAYT es EE-nen' },
                { german: 'Mir geht es gut', english: 'I am fine', example: 'Danke der Nachfrage, mir geht es gut.', pronunciation: 'meer GAYT es goot' },
                { german: 'Danke', english: 'Thank you', example: 'Vielen Dank für Ihre Hilfe!', pronunciation: 'DAHN-ke' },
                { german: 'Bitte', english: 'Please/You\'re welcome', example: 'Bitte schön! Gern geschehen.', pronunciation: 'BIT-te' },
                { german: 'Entschuldigung', english: 'Excuse me/Sorry', example: 'Entschuldigung, können Sie mir helfen?', pronunciation: 'ent-SHUL-di-gung' },
                { german: 'Es tut mir leid', english: 'I am sorry', example: 'Es tut mir leid, dass ich zu spät bin.', pronunciation: 'es toot meer LYTE' },
                { german: 'Kein Problem', english: 'No problem', example: 'Kein Problem! Das passiert jedem mal.', pronunciation: 'kine pro-BLAYM' },
              ]
            },
            {
              category: 'Numbers 0-20',
              words: [
                { german: 'null', english: 'zero', example: 'Die Temperatur ist null Grad.', pronunciation: 'NULL' },
                { german: 'eins', english: 'one', example: 'Ich hätte gern eins, bitte.', pronunciation: 'INES' },
                { german: 'zwei', english: 'two', example: 'Zwei Kaffee, bitte.', pronunciation: 'TSVY' },
                { german: 'drei', english: 'three', example: 'Wir sind drei Personen.', pronunciation: 'DRY' },
                { german: 'vier', english: 'four', example: 'Der Tisch hat vier Beine.', pronunciation: 'FEER' },
                { german: 'fünf', english: 'five', example: 'Ich bin um fünf Uhr da.', pronunciation: 'FÜNF' },
                { german: 'sechs', english: 'six', example: 'Das Kind ist sechs Jahre alt.', pronunciation: 'ZEKS' },
                { german: 'sieben', english: 'seven', example: 'Wir arbeiten sieben Tage die Woche.', pronunciation: 'ZEE-ben' },
                { german: 'acht', english: 'eight', example: 'Das Meeting ist um acht Uhr.', pronunciation: 'AKHT' },
                { german: 'neun', english: 'nine', example: 'Neun von zehn Ärzten empfehlen...', pronunciation: 'NOYN' },
                { german: 'zehn', english: 'ten', example: 'Ich zähle bis zehn.', pronunciation: 'TSAYN' },
                { german: 'zwanzig', english: 'twenty', example: 'Er ist zwanzig Jahre alt.', pronunciation: 'TSVAHN-tsikh' },
              ]
            }
          ]
        },
        grammar: {
          title: 'Essential Grammar Rules',
          content: [
            {
              topic: 'German Articles (der, die, das)',
              explanation: 'German nouns have three genders: masculine (der), feminine (die), and neuter (das). The article must match the gender of the noun.',
              rules: [
                'Masculine nouns use "der": der Mann (the man), der Tisch (the table)',
                'Feminine nouns use "die": die Frau (the woman), die Katze (the cat)',
                'Neuter nouns use "das": das Kind (the child), das Haus (the house)',
                'Plural nouns always use "die": die Männer (the men), die Frauen (the women)'
              ],
              examples: [
                'Der Mann ist groß. (The man is tall.)',
                'Die Frau ist nett. (The woman is nice.)',
                'Das Kind spielt. (The child is playing.)',
                'Die Kinder spielen. (The children are playing.)'
              ]
            },
            {
              topic: 'Present Tense Verb Conjugation',
              explanation: 'German verbs change their endings based on who is performing the action.',
              rules: [
                'ich (I) → verb stem + e: ich spiele, ich arbeite',
                'du (you informal) → verb stem + st: du spielst, du arbeitest',
                'er/sie/es (he/she/it) → verb stem + t: er spielt, sie arbeitet',
                'wir (we) → verb stem + en: wir spielen, wir arbeiten',
                'ihr (you plural informal) → verb stem + t: ihr spielt, ihr arbeitet',
                'Sie/sie (you formal/they) → verb stem + en: Sie spielen, sie arbeiten'
              ],
              examples: [
                'spielen (to play): ich spiele, du spielst, er spielt, wir spielen, ihr spielt, sie spielen',
                'arbeiten (to work): ich arbeite, du arbeitest, sie arbeitet, wir arbeiten, ihr arbeitet, Sie arbeiten',
                'kommen (to come): ich komme, du kommst, er kommt, wir kommen, ihr kommt, sie kommen'
              ]
            },
            {
              topic: 'Word Order in German Sentences',
              explanation: 'German follows a specific word order pattern, especially in simple statements.',
              rules: [
                'Subject-Verb-Object (SVO) in main clauses: Ich trinke Kaffee.',
                'The verb is always in the second position in statements',
                'In questions, the verb comes first: Trinkst du Kaffee?',
                'Time expressions usually come before place: Ich gehe heute ins Kino.'
              ],
              examples: [
                'Ich lese ein Buch. (I read a book.)',
                'Maria spricht Deutsch. (Maria speaks German.)',
                'Wir fahren morgen nach Berlin. (We are driving to Berlin tomorrow.)',
                'Sprechen Sie Englisch? (Do you speak English?)'
              ]
            },
            {
              topic: 'Formal vs. Informal Address',
              explanation: 'German distinguishes between formal (Sie) and informal (du) ways of addressing people.',
              rules: [
                'Use "du" with friends, family, children, and peers',
                'Use "Sie" with strangers, older people, in business, and formal situations',
                'Sie is always capitalized and takes plural verb forms',
                'When in doubt, use Sie - it\'s better to be too formal than too casual'
              ],
              examples: [
                'Informal: Wie heißt du? Kommst du aus Deutschland?',
                'Formal: Wie heißen Sie? Kommen Sie aus Deutschland?',
                'Informal: Sprichst du Deutsch?',
                'Formal: Sprechen Sie Deutsch?'
              ]
            }
          ]
        },
        culture: {
          title: 'German Culture & Context',
          content: [
            {
              topic: 'Greeting Customs in Germany',
              description: 'Understanding how Germans greet each other in different situations.',
              points: [
                'Handshakes are common in formal and business situations',
                'Among friends, a brief hug or cheek kisses may be exchanged',
                'Germans value punctuality - arriving on time shows respect',
                'Eye contact during greetings is important and shows sincerity',
                'In southern Germany (Bavaria), "Grüß Gott" is a common greeting',
                'Germans often use titles and last names in formal situations'
              ]
            },
            {
              topic: 'German-Speaking Countries',
              description: 'German is spoken in several countries across Europe.',
              points: [
                'Germany (Deutschland) - 83 million speakers',
                'Austria (Österreich) - 8.9 million speakers',
                'Switzerland (Schweiz) - German is one of four official languages',
                'Liechtenstein - German is the official language',
                'Luxembourg - German is one of three official languages',
                'Eastern Belgium - German-speaking communities exist',
                'Each country has its own dialects and variations'
              ]
            },
            {
              topic: 'Business Etiquette Basics',
              description: 'Important cultural norms for professional interactions.',
              points: [
                'Germans prefer direct communication - being straightforward is valued',
                'Meetings typically start and end on time',
                'Business cards are exchanged formally with both hands',
                'Professional titles are important and should be used',
                'Small talk is limited - Germans prefer to get to business quickly',
                'Dress codes tend to be conservative and formal'
              ]
            }
          ]
        },
        reading: {
          title: 'Reading Comprehension',
          content: [
            {
              title: 'Meine Familie',
              text: `Hallo! Ich heiße Anna Weber und ich bin 25 Jahre alt. Ich komme aus München, aber jetzt wohne ich in Berlin. Ich arbeite als Lehrerin in einer Grundschule.

Meine Familie ist sehr wichtig für mich. Mein Vater heißt Klaus und er ist Arzt. Meine Mutter heißt Petra und sie ist Krankenschwester. Ich habe auch einen Bruder. Er heißt Thomas und ist 23 Jahre alt. Er studiert Informatik an der Universität München.

Am Wochenende besuche ich oft meine Eltern in München. Wir kochen zusammen und sprechen über die Woche. Meine Familie spricht nur Deutsch zu Hause, aber ich lerne auch Englisch und Französisch.

Was ist mit Ihrer Familie? Haben Sie Geschwister? Wo wohnen Ihre Eltern?`,
              questions: [
                { question: 'Wie alt ist Anna?', answer: '25 Jahre alt' },
                { question: 'Wo arbeitet Anna?', answer: 'In einer Grundschule als Lehrerin' },
                { question: 'Was studiert Thomas?', answer: 'Informatik' },
                { question: 'Was macht Anna am Wochenende?', answer: 'Sie besucht ihre Eltern in München' },
                { question: 'Welche Sprachen lernt Anna?', answer: 'Englisch und Französisch' }
              ]
            },
            {
              title: 'Ein Tag in Berlin',
              text: `Berlin ist eine wunderschöne Stadt mit vielen interessanten Orten. Heute gehe ich durch die Stadt und besuche verschiedene Plätze.

Am Morgen beginne ich am Brandenburger Tor. Es ist das berühmteste Symbol von Berlin. Viele Touristen machen hier Fotos. Das Wetter ist schön und die Sonne scheint.

Dann gehe ich zum Museum. Dort sehe ich viele alte Kunstwerke und lerne über die deutsche Geschichte. Das Museum ist sehr groß und hat viele Räume.

Am Mittag esse ich in einem kleinen Restaurant. Ich bestelle Schnitzel mit Kartoffeln. Es schmeckt sehr gut! Der Kellner ist freundlich und spricht langsam, so dass ich alles verstehe.

Am Abend treffe ich meine Freunde im Park. Wir sprechen über unsere Pläne für das Wochenende. Berlin hat so viel zu bieten!`,
              questions: [
                { question: 'Wo beginnt der Tag?', answer: 'Am Brandenburger Tor' },
                { question: 'Wie ist das Wetter?', answer: 'Schön, die Sonne scheint' },
                { question: 'Was isst die Person zum Mittag?', answer: 'Schnitzel mit Kartoffeln' },
                { question: 'Wen trifft die Person am Abend?', answer: 'Ihre Freunde' },
                { question: 'Wo treffen sie sich?', answer: 'Im Park' }
              ]
            }
          ]
        },
        exercises: {
          title: 'Practice Exercises',
          content: [
            {
              type: 'Translation Practice',
              instructions: 'Translate these essential phrases from English to German:',
              questions: [
                { english: 'Hello, my name is Sarah.', german: 'Hallo, ich heiße Sarah.' },
                { english: 'Nice to meet you!', german: 'Freut mich, Sie kennenzulernen!' },
                { english: 'Where do you come from?', german: 'Wo kommen Sie her?' },
                { english: 'I come from the United States.', german: 'Ich komme aus den Vereinigten Staaten.' },
                { english: 'How are you today?', german: 'Wie geht es Ihnen heute?' },
                { english: 'I am fine, thank you.', german: 'Mir geht es gut, danke.' },
                { english: 'Excuse me, do you speak English?', german: 'Entschuldigung, sprechen Sie Englisch?' },
                { english: 'I speak a little German.', german: 'Ich spreche ein wenig Deutsch.' },
                { english: 'Can you help me, please?', german: 'Können Sie mir bitte helfen?' },
                { english: 'Thank you very much!', german: 'Vielen Dank!' }
              ]
            }
          ]
        }
      }
    },
    'C1.2': {
      title: 'Basic German - Family & Home',
      sections: {
        vocabulary: {
          title: 'Family & Home Vocabulary (60 words)',
          content: [
            {
              category: 'Family Members',
              words: [
                { german: 'die Familie', english: 'family', example: 'Meine Familie ist sehr groß.', pronunciation: 'dee fa-MIL-ye' },
                { german: 'der Vater', english: 'father', example: 'Mein Vater arbeitet als Ingenieur.', pronunciation: 'der FAH-ter' },
                { german: 'die Mutter', english: 'mother', example: 'Meine Mutter kocht sehr gut.', pronunciation: 'dee MUT-ter' },
                { german: 'der Sohn', english: 'son', example: 'Ihr Sohn ist sehr intelligent.', pronunciation: 'der ZOHN' },
                { german: 'die Tochter', english: 'daughter', example: 'Die Tochter studiert Medizin.', pronunciation: 'dee TOKH-ter' },
                { german: 'der Bruder', english: 'brother', example: 'Mein Bruder ist älter als ich.', pronunciation: 'der BROO-der' },
                { german: 'die Schwester', english: 'sister', example: 'Meine Schwester wohnt in Hamburg.', pronunciation: 'dee SHVES-ter' },
                { german: 'die Großmutter', english: 'grandmother', example: 'Meine Großmutter erzählt tolle Geschichten.', pronunciation: 'dee GROHS-mut-ter' },
                { german: 'der Großvater', english: 'grandfather', example: 'Mein Großvater ist 80 Jahre alt.', pronunciation: 'der GROHS-fah-ter' },
                { german: 'die Eltern', english: 'parents', example: 'Meine Eltern leben in München.', pronunciation: 'dee EL-tern' },
              ]
            },
            {
              category: 'Home & Rooms',
              words: [
                { german: 'das Haus', english: 'house', example: 'Unser Haus hat einen schönen Garten.', pronunciation: 'das HOWS' },
                { german: 'die Wohnung', english: 'apartment', example: 'Ich wohne in einer kleinen Wohnung.', pronunciation: 'dee VOH-nung' },
                { german: 'das Zimmer', english: 'room', example: 'Mein Zimmer ist sehr gemütlich.', pronunciation: 'das TSIM-mer' },
                { german: 'die Küche', english: 'kitchen', example: 'In der Küche kochen wir das Abendessen.', pronunciation: 'dee KÜ-khe' },
                { german: 'das Wohnzimmer', english: 'living room', example: 'Wir sehen im Wohnzimmer fern.', pronunciation: 'das VOHN-tsim-mer' },
                { german: 'das Schlafzimmer', english: 'bedroom', example: 'Mein Schlafzimmer ist sehr ruhig.', pronunciation: 'das SHLAHF-tsim-mer' },
                { german: 'das Badezimmer', english: 'bathroom', example: 'Das Badezimmer ist am Ende des Flurs.', pronunciation: 'das BAH-de-tsim-mer' },
                { german: 'der Garten', english: 'garden', example: 'Im Garten wachsen viele Blumen.', pronunciation: 'der GAR-ten' },
                { german: 'die Tür', english: 'door', example: 'Bitte schließen Sie die Tür.', pronunciation: 'dee TÜÜR' },
                { german: 'das Fenster', english: 'window', example: 'Das Fenster ist geöffnet.', pronunciation: 'das FEN-ster' },
              ]
            }
          ]
        },
        grammar: {
          title: 'Possessive Pronouns & Adjectives',
          content: [
            {
              topic: 'Possessive Pronouns (mein, dein, sein, etc.)',
              explanation: 'Possessive pronouns show ownership and must agree with the gender and number of the noun they modify.',
              rules: [
                'mein/meine (my): masculine/neuter: mein, feminine/plural: meine',
                'dein/deine (your informal): masculine/neuter: dein, feminine/plural: deine',
                'sein/seine (his/its): masculine/neuter: sein, feminine/plural: seine',
                'ihr/ihre (her): masculine/neuter: ihr, feminine/plural: ihre',
                'unser/unsere (our): masculine/neuter: unser, feminine/plural: unsere',
                'euer/eure (your plural informal): masculine/neuter: euer, feminine/plural: eure',
                'Ihr/Ihre (your formal): masculine/neuter: Ihr, feminine/plural: Ihre'
              ],
              examples: [
                'Das ist mein Vater und meine Mutter.',
                'Wo ist dein Bruder und deine Schwester?',
                'Sein Haus ist groß, aber ihre Wohnung ist klein.',
                'Unser Garten ist schön und eure Küche ist modern.'
              ]
            },
            {
              topic: 'Plural Forms of Nouns',
              explanation: 'German nouns form their plurals in different ways, and these must be memorized.',
              rules: [
                'Add -e: der Tisch → die Tische, das Jahr → die Jahre',
                'Add -er: das Kind → die Kinder, der Mann → die Männer',
                'Add -en/-n: die Frau → die Frauen, der Student → die Studenten',
                'Add -s (mostly foreign words): das Auto → die Autos',
                'No change: der Lehrer → die Lehrer, das Zimmer → die Zimmer'
              ],
              examples: [
                'Ein Kind, zwei Kinder, viele Kinder',
                'Eine Frau, drei Frauen, alle Frauen',
                'Ein Auto, fünf Autos, neue Autos',
                'Ein Lehrer, zwei Lehrer, gute Lehrer'
              ]
            }
          ]
        }
      }
    },
    // Continue with other levels...
    'C2.1': {
      title: 'Elementary German - Daily Activities',
      sections: {
        vocabulary: {
          title: 'Daily Activities & Time Expressions (80 words)',
          content: [
            {
              category: 'Daily Routine Verbs',
              words: [
                { german: 'aufstehen', english: 'to get up', example: 'Ich stehe jeden Tag um 7 Uhr auf.', pronunciation: 'OWF-shta-yen' },
                { german: 'sich anziehen', english: 'to get dressed', example: 'Sie zieht sich schnell an.', pronunciation: 'zikh AHN-tsee-yen' },
                { german: 'frühstücken', english: 'to have breakfast', example: 'Wir frühstücken zusammen im Garten.', pronunciation: 'FRÜH-shtük-ken' },
                { german: 'arbeiten', english: 'to work', example: 'Er arbeitet in einem Büro in der Stadt.', pronunciation: 'AR-bye-ten' },
                { german: 'einkaufen', english: 'to go shopping', example: 'Am Samstag gehen wir einkaufen.', pronunciation: 'INE-kow-fen' },
                { german: 'kochen', english: 'to cook', example: 'Meine Mutter kocht jeden Abend.', pronunciation: 'KOKH-en' },
                { german: 'fernsehen', english: 'to watch TV', example: 'Abends sehen wir oft fern.', pronunciation: 'FERN-za-yen' },
                { german: 'schlafen gehen', english: 'to go to sleep', example: 'Die Kinder gehen um 9 Uhr schlafen.', pronunciation: 'SHLAH-fen gay-en' },
              ]
            },
            {
              category: 'Time Expressions',
              words: [
                { german: 'der Morgen', english: 'morning', example: 'Am Morgen trinke ich Kaffee.', pronunciation: 'der MOR-gen' },
                { german: 'der Vormittag', english: 'forenoon', example: 'Am Vormittag arbeite ich im Büro.', pronunciation: 'der FOR-mit-tahk' },
                { german: 'der Mittag', english: 'noon', example: 'Um Mittag essen wir zu Hause.', pronunciation: 'der MIT-tahk' },
                { german: 'der Nachmittag', english: 'afternoon', example: 'Am Nachmittag gehe ich spazieren.', pronunciation: 'der NAKH-mit-tahk' },
                { german: 'der Abend', english: 'evening', example: 'Am Abend treffe ich meine Freunde.', pronunciation: 'der AH-bent' },
                { german: 'die Nacht', english: 'night', example: 'In der Nacht ist es sehr ruhig.', pronunciation: 'dee NAKHT' },
                { german: 'heute', english: 'today', example: 'Heute ist das Wetter sehr schön.', pronunciation: 'HOY-te' },
                { german: 'morgen', english: 'tomorrow', example: 'Morgen besuchen wir das Museum.', pronunciation: 'MOR-gen' },
                { german: 'gestern', english: 'yesterday', example: 'Gestern war ich im Theater.', pronunciation: 'GES-tern' },
              ]
            }
          ]
        }
      }
    },
    // Add more levels with extensive content...
    'A2.2': {
      title: 'Expert German - Native-like Fluency',
      sections: {
        vocabulary: {
          title: 'Advanced Academic & Professional Vocabulary (150 words)',
          content: [
            {
              category: 'Academic Discourse',
              words: [
                { german: 'die Abhandlung', english: 'treatise', example: 'Seine Abhandlung über Quantenphysik ist bahnbrechend.', pronunciation: 'dee AHP-hant-lung' },
                { german: 'die Kontroverse', english: 'controversy', example: 'Die Kontroverse um die neue Theorie spaltet die Wissenschaft.', pronunciation: 'dee kon-tro-VER-ze' },
                { german: 'die Paradigmaverschiebung', english: 'paradigm shift', example: 'Diese Entdeckung führt zu einer Paradigmaverschiebung.', pronunciation: 'dee pa-ra-DIKH-ma-fer-shee-bung' },
                { german: 'die Hypothese', english: 'hypothesis', example: 'Die Hypothese muss empirisch überprüft werden.', pronunciation: 'dee hy-po-TAY-ze' },
                { german: 'die Methodologie', english: 'methodology', example: 'Die Methodologie dieser Studie ist innovativ.', pronunciation: 'dee me-to-do-lo-GEE' },
                { german: 'die Epistemologie', english: 'epistemology', example: 'Epistemologie beschäftigt sich mit der Erkenntnistheorie.', pronunciation: 'dee e-pis-te-mo-lo-GEE' },
                { german: 'die Dialektik', english: 'dialectics', example: 'Die Dialektik von Hegel prägte die Philosophie.', pronunciation: 'dee dia-LEK-tik' },
                { german: 'die Hermeneutik', english: 'hermeneutics', example: 'Hermeneutik ist die Kunst der Textinterpretation.', pronunciation: 'dee her-me-NOY-tik' },
              ]
            }
          ]
        },
        grammar: {
          title: 'Advanced Stylistic Devices & Complex Syntax',
          content: [
            {
              topic: 'Subjunctive II in Complex Conditional Structures',
              explanation: 'Advanced usage of subjunctive mood for hypothetical scenarios and polite expressions.',
              rules: [
                'Irrealis: Wenn ich Zeit gehabt hätte, wäre ich gekommen.',
                'Potentialis: Er könnte recht haben, wenn die Daten stimmen.',
                'Concessivus: Selbst wenn er recht hätte, änderte das nichts.',
                'Comparative hypotheticals: Als ob er nichts wüsste!'
              ]
            }
          ]
        }
      }
    }
  };

  const currentContent = studyContent[level as keyof typeof studyContent] || studyContent['C1.1'];

  useEffect(() => {
    // Load completed sections from localStorage
    const saved = localStorage.getItem(`study-${level}-completed`);
    if (saved) {
      setCompletedSections(JSON.parse(saved));
    }
  }, [level]);

  const markSectionCompleted = (sectionKey: string) => {
    if (!completedSections.includes(sectionKey)) {
      const updated = [...completedSections, sectionKey];
      setCompletedSections(updated);
      localStorage.setItem(`study-${level}-completed`, JSON.stringify(updated));
    }
  };

  const allSections = Object.keys(currentContent.sections);
  const completionProgress = (completedSections.length / allSections.length) * 100;

  const handleCompleteStudy = () => {
    if (completedSections.length === allSections.length) {
      // Mark study as completed in progress
      const updatedProgress = {
        ...progress,
        completedStudyNotes: [...progress.completedStudyNotes, level]
      };
      onUpdateProgress(updatedProgress);
      onComplete(level);
    }
  };

  const canComplete = completedSections.length === allSections.length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b sticky top-16 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h1>{currentContent.title}</h1>
                <Badge variant="secondary">{level}</Badge>
              </div>
              <div className="flex items-center gap-4">
                <Progress value={completionProgress} className="flex-1" />
                <span className="text-sm text-gray-600">
                  {completedSections.length}/{allSections.length} sections
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="vocabulary" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Vocabulary
              {completedSections.includes('vocabulary') && <CheckCircle className="w-3 h-3 text-green-500" />}
            </TabsTrigger>
            <TabsTrigger value="grammar" className="flex items-center gap-2">
              <PenTool className="w-4 h-4" />
              Grammar
              {completedSections.includes('grammar') && <CheckCircle className="w-3 h-3 text-green-500" />}
            </TabsTrigger>
            <TabsTrigger value="culture" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Culture
              {completedSections.includes('culture') && <CheckCircle className="w-3 h-3 text-green-500" />}
            </TabsTrigger>
            <TabsTrigger value="reading" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Reading
              {completedSections.includes('reading') && <CheckCircle className="w-3 h-3 text-green-500" />}
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Practice
              {completedSections.includes('exercises') && <CheckCircle className="w-3 h-3 text-green-500" />}
            </TabsTrigger>
          </TabsList>

          {Object.entries(currentContent.sections).map(([sectionKey, section]) => (
            <TabsContent key={sectionKey} value={sectionKey}>
              <Card className="p-8">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="mb-4">{section.title}</h2>
                    {!completedSections.includes(sectionKey) && (
                      <p className="text-gray-600 mb-6">
                        Study this section carefully. You'll need to complete all sections before proceeding to exercises.
                      </p>
                    )}
                  </div>

                  {/* Render section content based on type */}
                  {sectionKey === 'vocabulary' && (
                    <div className="space-y-8">
                      {section.content.map((category: any, categoryIndex: number) => (
                        <div key={categoryIndex}>
                          <h3 className="mb-4 text-center bg-gray-50 py-2 rounded">{category.category}</h3>
                          <div className="grid gap-4 md:grid-cols-2">
                            {category.words.map((word: any, wordIndex: number) => (
                              <div key={wordIndex} className="border rounded-lg p-4 bg-white">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <div className="text-lg font-medium text-blue-600">{word.german}</div>
                                    <div className="text-sm text-gray-500">{word.pronunciation}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm font-medium">{word.english}</div>
                                  </div>
                                </div>
                                <div className="text-sm text-gray-600 italic border-t pt-2">
                                  {word.example}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {sectionKey === 'grammar' && (
                    <div className="space-y-8">
                      {section.content.map((topic: any, topicIndex: number) => (
                        <div key={topicIndex} className="border rounded-lg p-6 bg-white">
                          <h3 className="mb-3">{topic.topic}</h3>
                          <p className="text-gray-700 mb-4">{topic.explanation}</p>
                          {topic.rules && (
                            <div className="mb-4">
                              <h4 className="mb-2">Rules:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                {topic.rules.map((rule: string, ruleIndex: number) => (
                                  <li key={ruleIndex} className="text-gray-700">{rule}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {topic.examples && (
                            <div>
                              <h4 className="mb-2">Examples:</h4>
                              <div className="space-y-2">
                                {topic.examples.map((example: string, exampleIndex: number) => (
                                  <div key={exampleIndex} className="bg-gray-50 p-3 rounded text-sm font-mono">
                                    {example}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {sectionKey === 'culture' && (
                    <div className="space-y-8">
                      {section.content.map((cultural: any, culturalIndex: number) => (
                        <div key={culturalIndex} className="border rounded-lg p-6 bg-white">
                          <h3 className="mb-3">{cultural.topic}</h3>
                          <p className="text-gray-700 mb-4">{cultural.description}</p>
                          <ul className="list-disc list-inside space-y-2 text-sm">
                            {cultural.points.map((point: string, pointIndex: number) => (
                              <li key={pointIndex} className="text-gray-700">{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {sectionKey === 'reading' && (
                    <div className="space-y-8">
                      {section.content.map((reading: any, readingIndex: number) => (
                        <div key={readingIndex} className="border rounded-lg p-6 bg-white">
                          <h3 className="mb-4">{reading.title}</h3>
                          <div className="bg-gray-50 p-6 rounded mb-6 text-sm leading-relaxed">
                            {reading.text.split('\n').map((paragraph: string, pIndex: number) => (
                              <p key={pIndex} className="mb-3 last:mb-0">{paragraph}</p>
                            ))}
                          </div>
                          <div>
                            <h4 className="mb-3">Comprehension Questions:</h4>
                            <div className="space-y-3">
                              {reading.questions.map((q: any, qIndex: number) => (
                                <div key={qIndex} className="bg-blue-50 p-3 rounded">
                                  <div className="font-medium text-blue-800 mb-1">{q.question}</div>
                                  <div className="text-sm text-blue-600 italic">Answer: {q.answer}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {sectionKey === 'exercises' && (
                    <div className="space-y-8">
                      {section.content.map((exercise: any, exerciseIndex: number) => (
                        <div key={exerciseIndex} className="border rounded-lg p-6 bg-white">
                          <h3 className="mb-3">{exercise.type}</h3>
                          <p className="text-gray-700 mb-4">{exercise.instructions}</p>
                          <div className="space-y-3">
                            {exercise.questions.map((q: any, qIndex: number) => (
                              <div key={qIndex} className="bg-gray-50 p-4 rounded">
                                <div className="font-medium text-gray-800 mb-2">{q.english}</div>
                                <div className="text-sm text-blue-600 font-mono">{q.german}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-center pt-8 border-t">
                    {!completedSections.includes(sectionKey) ? (
                      <Button 
                        onClick={() => markSectionCompleted(sectionKey)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Section as Completed
                      </Button>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        Section Completed!
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {canComplete && (
          <div className="mt-8 text-center">
            <Card className="p-6 bg-green-50 border-green-200">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-green-800">Study Complete!</h3>
              </div>
              <p className="text-green-700 mb-4">
                Congratulations! You've completed all study sections for {level}. 
                Now you can proceed to the exercises.
              </p>
              <Button 
                onClick={handleCompleteStudy}
                className="bg-green-600 hover:bg-green-700"
              >
                Proceed to Exercises →
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}