import React from 'react'
import { CardInfo } from '../interfaces/CardInfo'
import { ChannelCard } from './Card'

interface ListProps {
  cards: Array<CardInfo>
}

export const List = ({ cards = [] }: ListProps) => {
  return (
    <div>
      {cards.map((card, index) => {
        return <ChannelCard card={card} key={index}/>
      })}
    </div>
  )
}
