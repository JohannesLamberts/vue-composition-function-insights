import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { App } from 'vue'
import { setupTrackerMap } from '../state'

let isAlreadyInstalled = false

export function installVueJSDevtoolsIntegration(app: App) {
  console.log('installing vuejs devtools', app)
  setupDevtoolsPlugin(
    {
      id: 'with-devtools',
      label: 'With Devtools 🛠',
      app,
    },
    (api) => {
      api.on.inspectComponent((payload, ctx) => {
        console.log('inspectComponent', payload.componentInstance)
        if (payload.instanceData) {
          const tracker = setupTrackerMap.get(payload.componentInstance)
          if (!tracker) {
            return
          }
          tracker.forEach((setupTracker) => {
            setupTracker.insights.forEach((insight) => {
              payload.instanceData.state.push({
                type: `🛠 ${setupTracker.label}`,
                key: insight.name,
                editable: false,
                value: insight.value,
              })
            })
          })
        }
      })

      const mutationsLayerId = 'devtools:mutations'

      if (!isAlreadyInstalled) {
        isAlreadyInstalled = true

        api.addTimelineLayer({
          id: mutationsLayerId,
          label: `With Devtools 🛠`,
          color: 0xe5df88,
        })
      }

      api.addTimelineEvent({
        layerId: mutationsLayerId,
        event: {
          time: Date.now(),
          data: {},
          // TODO: remove when fixed
          meta: {},
        },
      })
    },
  )
}
