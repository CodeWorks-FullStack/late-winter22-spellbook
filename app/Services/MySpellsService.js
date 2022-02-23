import { ProxyState } from "../AppState.js";
import { Spell } from "../Models/Spell.js";
import { sandboxApi } from "./AxiosService.js";



class MySpellsService{
  async getMySpells() {
    const res = await sandboxApi.get()
    console.log('[getMySpells]',res.data);
    ProxyState.mySpells = res.data.map(s => new Spell(s))
  }
  // NOTE save to bcw sandbox
  async saveSpell() {
    let spell = ProxyState.activeSpell
    const res = await sandboxApi.post('', spell)
    console.log('[saveSpell]',res.data);
    ProxyState.mySpells = [...ProxyState.mySpells, new Spell(res.data)]
  }
  
  async removeSpell() {
    let id = ProxyState.activeSpell.id
    const res = await sandboxApi.delete(id)
    console.log('[removeSpell]', res.data);
    ProxyState.activeSpell = {}
    ProxyState.mySpells = ProxyState.mySpells.filter(s => s.id != id)
  }
  // NOTE not async as it pulls from the list of our spells which have all the data needed
  setActiveSpell(id) {
    let spell = ProxyState.mySpells.find(s => s.id == id)
    ProxyState.activeSpell = spell
  }
  // NOTE id here is used to find the in our current array, flip it's bool, then update the database
  async prepareSpell(id) {
    let spellToPrepare = ProxyState.mySpells.find(s => s.id == id)
    // NOTE we pass the whole spellToPrepare object cause the server needs to know what properties are updated, not just the updated value.
    console.log('preparing spell', spellToPrepare);
    // NOTE just flips bool from true to false, or false to true
    spellToPrepare.prepared = !spellToPrepare.prepared
    const res = await sandboxApi.put(id, spellToPrepare)
    console.log('[prepareSpell]', res.data);
    ProxyState.mySpells = ProxyState.mySpells
  }
}

export const mySpellsService = new MySpellsService()