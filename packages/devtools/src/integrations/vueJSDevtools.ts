import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { App, isRef, reactive, unref } from 'vue'
import { setupTrackerMap } from '../state'

let isAlreadyInstalled = false

export function installVueJSDevtoolsIntegration(app: App) {
  console.info('installing vuejs devtools', app)
  setupDevtoolsPlugin(
    {
      id: 'with-devtools',
      label: 'With Devtools 🛠',
      app,
    },
    (api) => {
      api.on.inspectComponent((payload) => {
        if (payload.instanceData) {
          const tracker = setupTrackerMap.get(payload.componentInstance)
          if (!tracker) {
            return
          }
          tracker.forEach((setupTracker) => {
            setupTracker.insights.forEach((insight) => {
              const { value } = insight
              payload.instanceData.state.push({
                type: `🛠 ${setupTracker.label}`,
                key: insight.name,
                editable: false,
                value: isRef(value)
                  ? unref(value)
                  : value && typeof value === 'object'
                  ? reactive(value)
                  : value,
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
