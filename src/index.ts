import { setFailed, info, notice } from '@actions/core'
import { run } from './main'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run()
  .then(data => {
    if (data == 'OK') {
      info(`✅ [DONE] ${data}`)
    } else {
      setFailed(`❌ [ERROR] ${data}`)
    }
  })
  .catch(error => {
    notice(`error ${error.message}`)
    info(`✅ [DONE], but robot send failed.`)
  })
