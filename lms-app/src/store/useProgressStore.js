import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProgressStore = create(
  persist(
    (set) => ({
      completedModules: [], // Menyimpan array ID materi yang sudah selesai
      
      // Fungsi untuk menandai materi selesai
      markAsCompleted: (id) =>
        set((state) => ({
          // Cek agar ID tidak duplikat
          completedModules: state.completedModules.includes(id)
            ? state.completedModules
            : [...state.completedModules, id],
        })),
        
      // Fungsi opsional kalau mau reset ulang progress
      resetProgress: () => set({ completedModules: [] }),
    }),
    {
      name: 'lms-progress-storage', // Nama key yang akan tersimpan di browser
    }
  )
);

export default useProgressStore;