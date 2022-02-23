import { ProxyState } from '../AppState.js';
import { Spell } from '../Models/Spell.js';
import { dndApi } from './AxiosService.js';

class DndSpellsService{
  async getSpells() {
    const res = await dndApi.get()
    console.log('[getSpells]',res.data);
    ProxyState.dndApiSpells = res.data.results
  }
  async getActiveSpell(index) {
    const res = await dndApi.get(index)
    console.log('[getActiveSpell]',res.data);
    ProxyState.activeSpell = new Spell(res.data)
  }

}

export const dndSpellsService  = new DndSpellsService()