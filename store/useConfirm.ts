import { create } from "zustand";

type ConfirmOptions = {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
};

type ConfirmState = {
  open: boolean;
  title: string;
  description?: string;
  confirmText: string;
  cancelText: string;

  resolve?: (value: boolean) => void;

  confirm: (options: ConfirmOptions) => Promise<boolean>;
  onConfirm: () => void;
  onCancel: () => void;
};

export const useConfirmStore = create<ConfirmState>((set, get) => ({
  open: false,
  title: "",
  description: "",
  confirmText: "Lanjutkan",
  cancelText: "Batal",

  confirm: (options) =>
    new Promise<boolean>((resolve) => {
      set({
        open: true,
        title: options.title,
        description: options.description,
        confirmText: options.confirmText ?? "Lanjutkan",
        cancelText: options.cancelText ?? "Batal",
        resolve,
      });
    }),

  onConfirm: () => {
    get().resolve?.(true);

    set({
      open: false,
      resolve: undefined,
    });
  },

  onCancel: () => {
    get().resolve?.(false);

    set({
      open: false,
      resolve: undefined,
    });
  },
}));

export const useConfirm = () => useConfirmStore((state) => state.confirm);