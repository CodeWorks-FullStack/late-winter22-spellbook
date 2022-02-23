

// NOTE this class will be used for BOTH spells from the dndApi and the sandboxApi
// the || (ors) are there to make sure data not consistent across both apis still have values and don't come up undefined
export class Spell{
  constructor(data){
    this.index = data.index
    this.id = data.id || ''
    this.name = data.name
    this.description = data.description || data.desc.join(' ')
    this.level = data.level
    this.range = data.range
    this.duration = data.duration
    this.components = data.components
    this.prepared = data.prepared || false
  }

  get Template(){
    return `
    <div class="bg-light shadow p-4">
      <div class="text-center">
        <h2>${this.name}</h2>
        <h4> ${this.duration} | Level ${this.level} |  ${this.range}</h4>
        <p class="text-start">${this.description}</p>
        <div class="d-flex justify-content-between align-items-baseline">

       ${this.Button}

        </div>
      </div>
    </div>`
  }

  get ListTemplate(){
    return `
    <div class="rounded  p-2">
        <b class="text-center w-100">${this.name}</b><br/>
        <input type="checkbox" ${this.prepared ? 'checked' : ''} onclick="app.mySpellsController.prepareSpell('${this.id}')">
        <button class="btn selectable" onclick="app.mySpellsController.setActiveSpell('${this.id}')"> see details</button>
      <div class="border border-light mt-2"></div>
    </div>`
  }

  get Button(){
    let button = ''
    if(this.id){
      button = `<button class="btn btn-danger" onclick="app.mySpellsController.removeSpell()">Remove Spell book</button>`
    } else {
      button = `<button class="btn btn-primary" onclick="app.mySpellsController.saveSpell()">Save to spell book</button>`
    }
    return button
  }
}