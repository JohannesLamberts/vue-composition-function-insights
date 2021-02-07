import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { App, isRef, reactive, unref } from 'vue'
import { Event, events } from '../events'
import { SetupTracker, SetupTrackerEvents } from '../setupTracker'
import { setupTrackerMap } from '../state'
import { FunctionCallData } from '../types'

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

      function buildTitle(data: FunctionCallData) {
        const identifier = data.context.identifier || 'unknown'
        return `${identifier}(${data.context.arguments.join(', ')}) => ${
          data.result.type === 'error' ? data.result.error : data.result.value
        }`
      }

      function addSetupTrackerTimeline(setupTracker: SetupTracker) {
        const id = `setup-tracker-${setupTracker.label}`

        api.addTimelineLayer({
          id,
          label: `🛠 ${setupTracker.label}`,
          color: 0xe5df88,
        })

        setupTracker.on(
          SetupTrackerEvents.FUNCTION_RESULT,
          (data: FunctionCallData) => {
            api.addTimelineEvent({
              layerId: id,
              event: {
                time: Date.now(),
                title: buildTitle(data),
                subtitle:
                  data.result.type === 'return' &&
                  data.result.value instanceof Promise
                    ? 'async'
                    : '',
                logType: data.result.type === 'error' ? 'error' : 'default',
                data: {
                  ...data.context,
                  result: data.result,
                },
              },
            })
          },
        )
      }

      setupTrackerMap.forEach((setupTrackerList) =>
        setupTrackerList.forEach(addSetupTrackerTimeline),
      )

      events.on(Event.NEW_SETUP_TRACKER, addSetupTrackerTimeline)
    },
  )
}
