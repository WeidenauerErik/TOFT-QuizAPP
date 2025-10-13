export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizData {
  id: string;
  title: string;
  tag: string;
  questions: Question[];
}

export const quizData: Record<string, QuizData> = {
  'general-knowledge': {
    id: 'general-knowledge',
    title: 'Allgemeinwissen',
    tag: 'Wissen',
    questions: [
      {
        question: 'Welches ist die Hauptstadt von Deutschland?',
        options: ['München', 'Berlin', 'Hamburg', 'Frankfurt'],
        correctAnswer: 1
      },
      {
        question: 'Wie viele Kontinente gibt es?',
        options: ['5', '6', '7', '8'],
        correctAnswer: 2
      },
      {
        question: 'Wer malte die Mona Lisa?',
        options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
        correctAnswer: 2
      },
      {
        question: 'Welches ist der größte Planet in unserem Sonnensystem?',
        options: ['Saturn', 'Jupiter', 'Neptun', 'Uranus'],
        correctAnswer: 1
      },
      {
        question: 'In welchem Jahr fiel die Berliner Mauer?',
        options: ['1987', '1988', '1989', '1990'],
        correctAnswer: 2
      }
    ]
  },
  'logic': {
    id: 'logic',
    title: 'Logik & Denken',
    tag: 'Logik',
    questions: [
      {
        question: 'Welche Zahl kommt als nächstes? 2, 4, 8, 16, ...',
        options: ['20', '24', '32', '64'],
        correctAnswer: 2
      },
      {
        question: 'Wenn alle Blumen Pflanzen sind und einige Pflanzen grün sind, was ist dann sicher wahr?',
        options: ['Alle Blumen sind grün', 'Einige Blumen sind grün', 'Keine Blumen sind grün', 'Keine der Aussagen ist sicher wahr'],
        correctAnswer: 3
      },
      {
        question: 'Ein Buch kostet 10€ plus die Hälfte seines Preises. Wie viel kostet das Buch?',
        options: ['15€', '20€', '25€', '30€'],
        correctAnswer: 1
      },
      {
        question: 'Welches Wort passt nicht in die Reihe? Apfel, Birne, Karotte, Banane',
        options: ['Apfel', 'Birne', 'Karotte', 'Banane'],
        correctAnswer: 2
      },
      {
        question: 'Wenn es 12 Uhr mittags ist und die Uhr in 12 Stunden zweimal 90° dreht, welche Uhrzeit zeigt sie dann?',
        options: ['12 Uhr', '18 Uhr', '6 Uhr', '3 Uhr'],
        correctAnswer: 2
      }
    ]
  },
  'creativity': {
    id: 'creativity',
    title: 'Kreativität',
    tag: 'Kreativ',
    questions: [
      {
        question: 'Welche Farben sind die Primärfarben in der Malerei?',
        options: ['Rot, Gelb, Grün', 'Rot, Blau, Gelb', 'Rot, Grün, Blau', 'Orange, Lila, Grün'],
        correctAnswer: 1
      },
      {
        question: 'Wer komponierte die "Mondscheinsonate"?',
        options: ['Mozart', 'Beethoven', 'Bach', 'Chopin'],
        correctAnswer: 1
      },
      {
        question: 'Was ist ein Haiku?',
        options: ['Ein japanisches Gericht', 'Eine japanische Gedichtform', 'Ein japanischer Kampfsport', 'Ein japanisches Musikinstrument'],
        correctAnswer: 1
      },
      {
        question: 'Welcher Künstler ist für seine "Sternennacht" bekannt?',
        options: ['Claude Monet', 'Vincent van Gogh', 'Pablo Picasso', 'Salvador Dalí'],
        correctAnswer: 1
      },
      {
        question: 'Was bedeutet "a cappella" in der Musik?',
        options: ['Sehr laut', 'Sehr leise', 'Ohne Begleitung von Instrumenten', 'Mit Orchester'],
        correctAnswer: 2
      }
    ]
  },
  'sports': {
    id: 'sports',
    title: 'Sport & Trivia',
    tag: 'Sport',
    questions: [
      {
        question: 'Wie viele Spieler hat eine Fußballmannschaft auf dem Feld?',
        options: ['9', '10', '11', '12'],
        correctAnswer: 2
      },
      {
        question: 'Welches Land gewann die FIFA Weltmeisterschaft 2014?',
        options: ['Brasilien', 'Argentinien', 'Deutschland', 'Spanien'],
        correctAnswer: 2
      },
      {
        question: 'Wie viele Ringe hat das olympische Symbol?',
        options: ['4', '5', '6', '7'],
        correctAnswer: 1
      },
      {
        question: 'In welcher Sportart ist der "Slam Dunk" eine bekannte Technik?',
        options: ['Tennis', 'Volleyball', 'Basketball', 'Handball'],
        correctAnswer: 2
      },
      {
        question: 'Wie heißt der wichtigste Tennisplatz in Wimbledon?',
        options: ['Court One', 'Main Court', 'Centre Court', 'Royal Court'],
        correctAnswer: 2
      }
    ]
  }
};
