const QueroAPIError = require('./error'),
  axios = require('axios'),
  _ = require('lodash');

module.exports = class QueroAPIClient {
	constructor({
    api_url,
    api_token
  } = {}) {
    this._agent = axios.create({
      baseURL: api_url,
      timeout: 5000,
      responseType: 'json',
      responseEncoding: 'utf8',
      validateStatus: null
    });
    this._agent.defaults.headers.common['Authorization'] = `Token ${api_token}`;
    this._agent.interceptors.response.use(
      function (response) {
        let errorMessage = 'Something went wrong';
        switch(response.status){
          case 200:
            if(_.get(response.data, 'status') !== 'error'){
              return Promise.resolve(response.data);
            }
            errorMessage = _.get(response.data, 'errors[0].title', errorMessage);
            break;
          case 400:
            // https://docs.queroalunos.com/beta#requisicao-com-token-invalido
            errorMessage = 'Invalid token';
            break;
          case 401:
            // https://docs.queroalunos.com/beta#requisicao-sem-token
            errorMessage = 'Request without token';
            break;
          case 403:
            // https://docs.queroalunos.com/beta#requisicao-com-token-nao-autorizado
            errorMessage = 'Token not authorized';
            break;
        }
        return Promise.reject(new QueroAPIError(errorMessage, response.status, response.data));
      }
    );
    return this;
  }
  
  getStudent(student_id) {
    return this._agent.get(`/students/${student_id}`);
  }

  findStudents(student_cpf) {
    return this._agent.get('/students', {
      params: {
        cpf: student_cpf
      }
    });
  }

  getAdmission(admission_id){
    return this._agent.get(`/admissions/${admission_id}`);
  }

  findAdmissions({
    starting_after,
    ending_before,
    start_date,
    end_date
  } = {}) {
    return this._agent.get('/admissions', {
      params: {
        starting_after,
        ending_before,
        start_date,
        end_date
      }
    });
  }

  updateAdmissionStatus(admission_id, status){
    return this._agent.put(`/admissions/${admission_id}`, {
      data: {
        status
      }
    })
  }

  getAdmissionDocument(admission_id, document_id) {
    return this._agent.get(`/admissions/${admission_id}/documents/${document_id}`);
  }

  findAdmissionDocuments(admission_id, {
    starting_after,
    ending_before,
    start_date,
    end_date
  } = {}) {
    return this._agent.get(`/admissions/${admission_id}/documents`, {
      params: {
        starting_after,
        ending_before,
        start_date,
        end_date
      }
    });
  }
}
