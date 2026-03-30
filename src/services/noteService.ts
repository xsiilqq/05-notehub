import axios from "axios";
import type { Note } from "../types/note";
const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const client = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  perPage: number,
  search?: string,
): Promise<FetchNotesResponse> => {
  const response = await client.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search },
  });
  return response.data;
};
export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">,
): Promise<Note> => {
  const response = await client.post<Note>("/notes", note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await client.delete<Note>(`/notes/${id}`);
  return response.data;
};
//