import { BookOpen, Brain, Lightbulb, Trophy } from 'lucide-react';

export interface Quiz {
  id: string;
  title: string;
  tag: string;
  description: string;
  icon: typeof BookOpen;
  color: string;
}

export const quizzes: Quiz[] = [
  {
    id: 'general-knowledge',
    title: 'Allgemeinwissen',
    tag: 'Wissen',
    description: '5 Fragen zu verschiedenen Themen',
    icon: BookOpen,
    color: 'blue'
  },
  {
    id: 'logic',
    title: 'Logik & Denken',
    tag: 'Logik',
    description: 'Teste deine logischen Fähigkeiten',
    icon: Brain,
    color: 'green'
  },
  {
    id: 'creativity',
    title: 'Kreativität',
    tag: 'Kreativ',
    description: 'Fragen rund um Kreativität und Kunst',
    icon: Lightbulb,
    color: 'orange'
  },
  {
    id: 'sports',
    title: 'Sport & Trivia',
    tag: 'Sport',
    description: 'Wie gut kennst du dich mit Sport aus?',
    icon: Trophy,
    color: 'red'
  }
];

export function getQuizById(quizId: string): Quiz | undefined {
  return quizzes.find(q => q.id === quizId);
}
