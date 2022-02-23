import { ProxyState } from "../AppState.js";
import { dndSpellsService } from "../Services/DndSpellsService.js";
import { Pop } from "../Utils/Pop.js";

// NOTE get spells happens outside the constructor cause the constructor cannot be async
async function _getSpells(){
  try {
    await dndSpellsService.getSpells()
  } catch (error) {
    Pop.toast(error.message, 'error')
    console.error(error);
  }
}

function _drawSpellsList(){
  let template =''
  ProxyState.dndApiSpells.forEach(s => template += `<li class="selectable" onclick="app.dndSpellsController.getActiveSpell('${s.index}')">${s.name}</li>`)
  document.getElementById('api-spell-list').innerHTML = template
}

function _drawActiveSpell(){
  let spell = ProxyState.activeSpell
  if(spell.name){
    document.getElementById('active-spell').innerHTML = ProxyState.activeSpell.Template
  } else {
    document.getElementById('active-spell').innerText = 'select a spell'
  }
}

export class DndSpellsController{
  constructor(){
    console.log('[dnd spells controller]');
    ProxyState.on('dndApiSpells', _drawSpellsList)
    ProxyState.on('activeSpell', _drawActiveSpell)
    _getSpells()
  }

  async getActiveSpell(index){
    try {
      console.log('getting the active spell', index);
      await dndSpellsService.getActiveSpell(index)
    } catch (error) {
      Pop.toast(error.message, 'error')
      console.error(error);
    }
  }
  

}