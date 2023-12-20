import * as core from '@actions/core'
import axios from 'axios'

import type { Payload } from './types'

/**
 * The main function for the action.
 */
export async function run(): Promise<string> {
  try {
    const accessToken = core.getInput('accessToken')
    const type = core.getInput('type')
    const title = core.getInput('title')
    const content = core.getInput('content')

    let url = `https://oapi.dingtalk.com/robot/send?access_token=${accessToken}`

    let payload: Payload = {
      msgtype: 'text',
      text: {
        content: content
      },
      at: {}
    }

    if (type === 'markdown') {
      payload = {
        msgtype: 'markdown',
        markdown: {
          title: title,
          text: content
        },
        at: {}
      }
    }

    core.info(payload.toString());

    // const res = await axios.post(url, JSON.stringify(payload), {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // })

    const res = await (await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })).json()

    let result = 'OK'
    if (res.data.errcode > 0) {
      result = res.data.errmsg
    }

    return result
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)

    return 'error'
  }
}
