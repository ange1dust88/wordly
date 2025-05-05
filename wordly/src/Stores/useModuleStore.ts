import { create } from 'zustand';

interface Card {
  term: string;
  definition: string;
}

interface Module {
  title: string;
  description: string;
  creator_name: string;
  cards: Card[];
  code: string;
}

interface ModuleState {
  modules: Module[]; 
  setModules: (modules: Module[]) => void; 
}

const useModuleStore = create<ModuleState>((set) => ({
  modules: [],
  setModules: (modules) => set({ modules }),
}));

export default useModuleStore;
