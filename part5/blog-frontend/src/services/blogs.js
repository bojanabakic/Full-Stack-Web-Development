import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  // eslint-disable-next-line no-unused-vars
  token = `bearer ${newToken}`
}

const removeToken = () => {
  // eslint-disable-next-line no-unused-vars
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, setToken, removeToken, create, update, remove }