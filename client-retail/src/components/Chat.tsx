
import React, { useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { Card, Avatar, Input, Typography } from 'antd'
import 'antd/dist/antd.css'
import '../index.css'
import { useEffect } from 'react'

const { Search } = Input
const { Text } = Typography
const { Meta } = Card

const client = new W3CWebSocket('ws://localhost:8000')

export const Chat = () => {
  const [userName, setUserName] = useState('Retail')
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [messages, setMessages] = useState<any>([])
  const [searchVal, setSearchVal] = useState('')

  useEffect(() => {
    client.onopen = () => {
      console.log('connected')
    }
    client.onmessage = (message) => {
      console.log('message', message)
      const dataFromServer: any = message.data
      console.log('got reply! ', dataFromServer)
      if (dataFromServer.type === 'message') {
        setMessages((prev: any) => [
          ...prev,
          dataFromServer,
          {
            msg: dataFromServer.msg,
            user: dataFromServer.user,
          },
        ])
      }
    }
  }, [])

  const onButtonClicked = (value: any) => {
    client.send(
      JSON.stringify({
        type: 'message',
        msg: value,
        user: userName,
      }),
    )
    setSearchVal('')
  }

  return (
    <div className='main' id='wrapper'>
      {isLoggedIn ? (
        <div>
          <div className='title'>
            <Text
              id='main-heading'
              type='secondary'
              style={{ fontSize: '36px' }}
            >
              Websocket Chat: {userName}
            </Text>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingBottom: 50,
            }}
            id='messages'
          >
            {messages
              .map((message: any) => (
                <Card
                  key={message.msg}
                  style={{
                    width: 300,
                    margin: '16px 4px 0 4px',
                    alignSelf:
                      userName === message.user ? 'flex-end' : 'flex-start',
                  }}
                  loading={false}
                >
                  <Meta
                    avatar={
                      <Avatar
                        style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                      >
                        {message.user[0].toUpperCase()}
                      </Avatar>
                    }
                    title={message.user + ':'}
                    description={message.msg}
                  />
                </Card>
              ))
              .reverse()}
          </div>
          <div className='bottom'>
            <Search
              placeholder='input message and send'
              enterButton='Send'
              value={searchVal}
              size='large'
              onChange={(e) => {
                console.log(e)
                setSearchVal(e.target.value)
              }}
              onSearch={(value) => onButtonClicked(value)}
            />
          </div>
        </div>
      ) : (
        <div style={{ padding: '200px 40px' }}>
          <Search
            placeholder='Enter Username'
            enterButton='Login'
            size='large'
            onSearch={(value) => {
              setIsLoggedIn(true)
              setUserName(value)
            }}
          />
        </div>
      )}
    </div>
  )
}