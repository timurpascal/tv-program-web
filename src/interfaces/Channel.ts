import { Program } from './Program'

export interface Channel {
  id: Number,
  name: String,
  icon: String,
  groups: Array<String>,
  program: {
    current: Program,
    next?: Program
  }
}
