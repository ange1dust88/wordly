import { create } from 'zustand';

interface Word {
  term: string;
  definition: string;
}

export interface Module {

  title: string;
  description: string;
  author: string | undefined;
  code: string ;
  words: Word[];
}

interface ModulesState {
  modules: Module[];
  setModules: (modules: Module[]) => void;
  addModule: (module: Module) => void;
  removeModule: (code: string) => void;
  clearModules: () => void;
}

const useModulesStore = create<ModulesState>((set) => ({
  modules: [],

  setModules: (modules) => set({ modules }),

  addModule: (module) =>
    set((state) => ({
      modules: [...state.modules, module],
    })),

  removeModule: (code) =>
    set((state) => ({
      modules: state.modules.filter((mod) => mod.code !== code),
    })),

  clearModules: () => set({ modules: [] }),
}));

export default useModulesStore;
