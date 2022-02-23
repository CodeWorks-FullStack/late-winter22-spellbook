import { ProxyState } from "../AppState.js";
import { mySpellsService } from "../Services/MySpellsService.js";
import { Pop } from "../Utils/Pop.js";

async function _getMySpells(){
  try {
    await mySpellsService.getMySpells()
  } catch (error) {
    Pop.toast(error.message, 'error')
    console.error(error);
  }
}

// NOTE draw template builds the html, spellCount counts how many spells you have prepared
function _drawMySpells(){
  let spellCount = 0
  let totalSpellCount = ProxyState.spellSlots
  let template = ''
  ProxyState.mySpells.forEach(s => {
    template += s.ListTemplate
    if(s.prepared){
      spellCount++
    }
  })
  // NOTE inject the template in one spot, the count of prepared spells in another spot
  document.getElementById('my-spells').innerHTML = template
  document.getElementById('slots').innerHTML = `<div class="${spellCount > totalSpellCount ? 'text-danger': ''}">${spellCount}/${totalSpellCount}</div>`
}

export class MySpellsController{
  constructor(){
    console.log('[my spell controller]');
    ProxyState.on('mySpells', _drawMySpells)
    _getMySpells()
  }

  async saveSpell(){
    try {
      await mySpellsService.saveSpell()
    } catch (error) {
      Pop.toast(error.message, 'error')
      console.error(error);
    }
  }

  async removeSpell(){
    try {
      await mySpellsService.removeSpell()
    } catch (error) {
      Pop.toast(error.message, 'error')
      console.error(error);
    }
  }

  // NOTE not async as it's pulling from the lits of my spells which are rich data objects
  setActiveSpell(id){
    mySpellsService.setActiveSpell(id)
  }

  async prepareSpell(id){
    try {
     await mySpellsService.prepareSpell(id)
    } catch (error) {
      Pop.toast(error.message, 'error')
      console.error(error);
    }
  }


}