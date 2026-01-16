export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";


export const AUTH_PATHS = {
  REGISTER: `${BASE_URL}/auth/register`,
  LOGIN: `${BASE_URL}/auth/login`,
};

export const NOTE_PATHS ={
  NOTES: `${BASE_URL}/notes`
}


export const SHOW_QUIZ ={
  QUESTION: `${BASE_URL}/questions`,
  RESULT : `${BASE_URL}/results`

}

export const AI_ANALYZE ={
  WRONG_ANS :`${BASE_URL}/ai/analyze/wrongans`
}