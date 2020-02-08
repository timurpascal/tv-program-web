import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, Result } from 'antd'

import { Selector } from './components/Selector'
import { List } from './components/List'

import { CardInfo } from './interfaces/CardInfo'
import { Group } from './interfaces/Group'

import { getProgram } from './controllers/Program'
import { getGroup } from './controllers/Group'

const { Content } = Layout

const App = () => {
  const [group, setGroup] = useState<Array<Group>>([])
  const [selectedGroup, setSelectedGroup] = useState<string>('')
  const [programs, setPrograms] = useState<Array<CardInfo>>([])
  const [success, setSuccess] = useState<Boolean>(true)

  const changeGroup = (value: string) => {
    setSelectedGroup(value)
  }

  useEffect(() => {
    const updateProgram = async () => {
      try {
        setPrograms(await getProgram(selectedGroup))
      } catch (err) {
        setSuccess(false)
      }
    }

    const updateGroup = async () => {
      try {
        setGroup(await getGroup())
      } catch (err) {
        setSuccess(false)
      }
    }

    updateGroup()

    if (selectedGroup) {
      updateProgram()
    }
  }, [selectedGroup])

  return (
    <Layout className="App" style={{ minHeight: '100vh' }}>
      {success ? (
        <Content style={{ marginTop: '48px' }}>
          <Row>
            <Col
              // описываем брейкпоинты для сетки antd
              xxl={{ span: 6, offset: 9 }}
              xl={{ span: 8, offset: 8 }}
              lg={{ span: 10, offset: 7 }}
              md={{ span: 12, offset: 6 }}
              sm={{ span: 14, offset: 5 }}
              xs={{ span: 20, offset: 2 }}>
              <Selector changeGroup={changeGroup} groups={group} />
              <List cards={programs} />
            </Col>
          </Row>
        </Content>
      ) : (
        <Result
          status="500"
          title="500"
          subTitle="Упс... Что то пошло не так. Проверьте соединение с сервером"
        />
      )
      }
    </Layout>
  )
}

export default App
