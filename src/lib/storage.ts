export function getUserId(): string {
  let userId = localStorage.getItem('quiz_user_id');

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('quiz_user_id', userId);
  }

  return userId;
}

export function getUserName(): string | null {
  return localStorage.getItem('quiz_user_name');
}

export function setUserName(name: string): void {
  localStorage.setItem('quiz_user_name', name);
}

export function isQuizCompleted(quizId: string): boolean {
  const completed = localStorage.getItem(`quiz_completed_${quizId}`);
  return completed === 'true';
}

export function markQuizCompleted(quizId: string): void {
  localStorage.setItem(`quiz_completed_${quizId}`, 'true');
}
