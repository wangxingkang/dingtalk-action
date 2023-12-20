interface AT {
  atMobiles?: string[]
  atUserIds?: string[]
  isAtAll?: boolean
}

interface Text {
  msgtype: 'text'
  text: {
    content: string
  }
  at: AT
}

interface Link {
  msgtype: 'link'
  link: {
    text: string
    title: string
    picUrl: string
    messageUrl: string
  }
}

interface Markdown {
  msgtype: 'markdown'
  markdown: {
    text: string
    title: string
  }
  at: AT
}

interface ActionCard {
  msgtype: 'actionCard'
  actionCard: {
    text: string
    title: string
    singleTitle: string
    singleURL: string
  }
}

export type Payload = Text | Link | Markdown | ActionCard
