import Axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
  return Axios.get(baseUrl).then(
    response => response.data
  );
};

const create = personData => {
  return Axios.post(baseUrl, personData).then(
    response => response.data
  );
};

const update = (id, personData) => {
  return Axios.put(`${baseUrl}/${id}`, personData).then(
    response => response.data
  );
};

const deletePerson = id => {
  return Axios.delete(`${baseUrl}/${id}`).then(
    response => response.data
  );
};

export default { getAll, create, update, deletePerson };
