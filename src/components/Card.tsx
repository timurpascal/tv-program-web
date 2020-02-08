import React from 'react'
import { apiURI } from '../config'

import { CardInfo } from '../interfaces/CardInfo'
import { Card, Avatar, Progress } from 'antd'

const { Meta } = Card

export interface CardProps {
  card: CardInfo
}

export const ChannelCard = ({ card }: CardProps) => {
  // добавляет ноль перед цифрой в минутах (иначе возвращает 1 вместо 01)
  const getNormalMinut = (date: Date): string => {
    const minutes = date.getMinutes()
    return minutes < 10 ? '0' + minutes : minutes.toString()
  }

  // формирует строку с часами (18:00)
  const getDate = (date: Date): string => {
    return `${date.getHours()}:${getNormalMinut(date)}`
  }

  const current = Date.now()

  const start = new Date(card.startTime)
  const startISO = new Date(card.startTime).getTime()
  const end = new Date(card.endTime).getTime()
  // вычисляет сколько процентов прошло программы
  const precent = ((current - startISO) * 100) / (end - startISO)
  // если программа еще не началась делает процент 0
  const precentTime = precent < 0 ? 0 : Math.round(precent)
  // создает строку для вывода в description
  const time = `${getDate(start)} ${card.name}`
  return (
    <Card style={{ marginTop: 16 }}>
      <Meta
        avatar={
          <Avatar
            src={`${apiURI}${card.icon}`}
            shape={'square'}
            size={64}
            style={{ width: '100px' }}/>
        }
        title={card.channel}
        description={time}
      />
      <Progress percent={precentTime} showInfo={false}/>
    </Card>
  )
}
