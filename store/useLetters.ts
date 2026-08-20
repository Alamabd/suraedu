import { auth } from "@/lib/firebase";
import { create } from "zustand";

export type Letter = {
  id: number;
  title: string;
  category: string;
  description: string;
  keys: string;
  creator: string;
  file?: string;
  pdf?: string;
  img?: string;
  created_at: string;
  deleted_at: string | null;
  updated_at: string;
};

type LetterState = {
  letters: Letter[];
  loading: boolean;
  error: string | null;

  fetchLetters: () => Promise<void>;
  setLetters: (letters: Letter[]) => void;
  upsertLetter: (
    formData: FormData,
    token: string,
    id?: number
  ) => Promise<{message: string, data: Letter}>;
  removeLetter: (id: number) => void;
};

export const useLetters = create<LetterState>((set) => ({
  letters: [],
  loading: false,
  error: null,

  fetchLetters: async () => {
    try {
      set({
        letters: [],
        loading: true,
        error: null,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/letter/byuser/?uid=${await auth.currentUser?.uid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
          },
        }
      )
      const { status } = response

      if (status !== 200) {
        throw new Error("Gagal mengambil template surat");
      }
      const result = await response.json()

      set({
        letters: result.data ?? [],
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        letters: [],
        error:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan",
      });
    }
  },

  setLetters: (letters) => {
    set({
      letters,
      error: null,
    });
  },

  upsertLetter: async (formData, token, id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const isUpdate = id !== undefined;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/letter/`,
        {
          method: isUpdate ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(
          json.message || "Gagal menyimpan template"
        );
      }

      const letter: Letter = json.data;

      console.log(letter)

      set((state) => {
  const index = state.letters.findIndex(
    (item) => Number(item.id) === Number(letter.id)
  );

  if (index === -1) {
    return {
      loading: false,
      error: null,
      letters: [letter, ...state.letters],
    };
  }

  const letters = [...state.letters];
  letters[index] = letter;

  return {
    loading: false,
    error: null,
    letters,
  };
});

      return json;
    } catch (error) {
      console.log(error)
      const message =
        error instanceof Error
          ? error.message
          : "Gagal menyimpan template";

      set({
        loading: false,
        error: message,
      });

      throw new Error(message);
    }
  },

  removeLetter: async (id) => {
    try {
      set({ error: null });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/letter/?id=${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(
          json.message || "Gagal menghapus template surat"
        );
      }

      // Update state setelah server berhasil
      set((state) => ({
        letters: state.letters.filter(
          (item) => item.id !== id
        ),
        error: null,
      }));
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal menghapus template surat";

      set({
        error: message,
      });

      throw new Error(message);
    }
  }
}));