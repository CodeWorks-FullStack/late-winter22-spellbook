import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {

  spellSlots = 7

  dndApiSpells = []

  /** @type {import('./Models/Spell').Spell[]} */
  mySpells = []
  
  activeSpell = {}


  /** @type {import('./Models/Value').Value[]} */

}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
