import { ComponentInstance } from '@vue/devtools-api'
import { EventEmitter } from 'events'
import { currentStackNames } from './state'
import { FunctionCallData, Insight } from './types'

export enum SetupTrackerEvents {
  FUNCTION_RESULT = 'FUNCTION_RESULT',
}

export class SetupTracker extends EventEmitter {
  public readonly insights: Insight[] = []

  private stackNames: string[] = currentStackNames()

  get label(): string {
    return [...this.stackNames, this.name].join(' > ')
  }

  constructor(
    public readonly name: string,
    public readonly vm: ComponentInstance,
  ) {
    super()
  }

  public addInsight(insight: Insight) {
    this.insights.push(insight)
  }

  public trackFunctionResult(data: FunctionCallData) {
    this.emit(SetupTrackerEvents.FUNCTION_RESULT, data)
  }
}
