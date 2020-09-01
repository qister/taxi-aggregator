
import { createContext } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

export const client = new W3CWebSocket('ws://localhost:8001')

export const ClientContext = createContext({
  client: ''
})
