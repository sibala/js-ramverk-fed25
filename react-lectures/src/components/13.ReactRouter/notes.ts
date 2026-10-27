// The same API as "16.WritingData": ../notes-api (start it with npm run api in react-lectures-fed25)
export const API_URL = 'http://localhost:3001/notes'

export type Note = {
  id: number
  text: string
  done: boolean
}
