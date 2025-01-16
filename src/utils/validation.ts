export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2;
}

export function validateDesignPrompt(prompt: string): boolean {
  return prompt.trim().length >= 3 && prompt.trim().length <= 200;
}