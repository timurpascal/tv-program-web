import React from 'react'
import { Select } from 'antd'
import { Group } from '../interfaces/Group'

const { Option } = Select

export interface SelectorProps {
  changeGroup: (e: string) => void
  groups: Array<Group>
}

export const Selector = ({ changeGroup, groups = [] }: SelectorProps) => {
  const handleChange = (value: any) => {
    changeGroup(value)
  }

  return (
    <Select defaultValue="Выберите группу" onChange={handleChange} style={{ width: '100%' }}>
      {/* генерируем карточки передач */}
      {groups.map((group, index) => {
        return <Option value={group.id} key={index}>{group.name}</Option>
      })}
    </Select>
  )
}
