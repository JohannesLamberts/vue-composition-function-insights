import { currentStackNames } from './state'

export class SetupTracker {
  public readonly insights: Insight[] = []

  private stackNames: string[] = currentStackNames()

  get label(): string {
    return [...this.stackNames, this.name].join(' > ')
  }

  constructor(public readonly name: string) {}

  public addInsight(insight: Insight) {
    this.insights.push(insight)
  }
}
