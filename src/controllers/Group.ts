import { apiURI } from '../config'

export const getGroup = async () => {
  const res = await fetch(`${apiURI}/group`)
  return res.json()
}
