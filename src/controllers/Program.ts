import { Channel } from '../interfaces/Channel'
import { CardInfo } from '../interfaces/CardInfo'
import { apiURI } from '../config'

export const getProgram = async (channelId: string) => {
  const encodeId = encodeURI(channelId)
  const res = await fetch(`${apiURI}/group/${encodeId}/channel?withProgram`)
  const arrayChannel: Array<Channel> = await res.json()
  return arrayChannel.reduce((acc: Array<CardInfo>, item: Channel): Array<CardInfo> => {
    const res = [
      ...acc,
      {
        channel: item.name,
        icon: item.icon,
        ...item.program.current
      }
    ]
    if (item.program.next) {
      const next = {
        channel: item.name,
        icon: item.icon,
        ...item.program.next
      }
      res.push(next)
    }
    return res
  }, [])
}
