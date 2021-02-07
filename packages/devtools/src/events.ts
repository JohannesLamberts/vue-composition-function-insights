import { EventEmitter } from 'events'

export const events = new EventEmitter()

export enum Event {
  NEW_SETUP_TRACKER = 'NEW_SETUP_TRACKER',
}
