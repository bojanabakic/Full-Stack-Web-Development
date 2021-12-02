import axios from 'axios'
const baseUrl = '/api/persons'

const create = async (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const remove = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = async (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

const getAll = async () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const operations = {
    create, remove, update, getAll
  };

export default operations
