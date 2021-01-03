import { ComponentInstance } from '@vue/devtools-api'
import { SetupTracker } from './setupTracker'

export const setupTrackerMap = new WeakMap<ComponentInstance, SetupTracker[]>()

export function addSetupTrackerToComponent(
  vm: ComponentInstance,
  setupTracker: SetupTracker,
) {
  setupTrackerMap.set(vm, [...(setupTrackerMap.get(vm) || []), setupTracker])
  vm.$setupTracker = [...(vm.$setupTracker || []), setupTracker]
}

export const setupStack: SetupTracker[] = []

export function currentStackNames() {
  return setupStack.map((setup) => setup.name)
}

export function currentSetup() {
  return setupStack[0]
}
