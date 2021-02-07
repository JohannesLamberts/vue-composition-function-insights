import { ComponentInstance } from '@vue/devtools-api'
import { events, Event } from './events'
import { SetupTracker } from './setupTracker'

// TODO: go back to WeakMap to release when components are destroyed
export const setupTrackerMap = new Map<ComponentInstance, SetupTracker[]>()

export function addSetupTrackerToComponent(
  vm: ComponentInstance,
  setupTracker: SetupTracker,
) {
  console.log('addSetupTrackerToComponent', vm)
  setupTrackerMap.set(vm, [...(setupTrackerMap.get(vm) || []), setupTracker])
  vm.$setupTracker = [...(vm.$setupTracker || []), setupTracker]
  events.emit(Event.NEW_SETUP_TRACKER, setupTracker)
}

export const setupStack: SetupTracker[] = []

export function currentStackNames() {
  return setupStack.map((setup) => setup.name)
}

export function currentSetup() {
  return setupStack[0]
}
