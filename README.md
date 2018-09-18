# Quero Admissão SDK JS

SDK JS para API de Admissões do Quero Bolsa

## Installation

Using npm

```bash
npm install quero-admissao-sdk
```

### Running the tests

Using npm

```bash
env QUERO_API_TOKEN=SUA_API_KEY npm test
```

## Example

```javascript
const QueroSDK = require('quero-admissao-sdk');

const quero = QueroSDK({
  environment: 'production',
  api_key: 'YOUR_API_KEY'
});

quero.getStudent(1234).then(student => console.log(student));
```

## Reference

### `quero.getStudent(student_id)`

Finds a single student by its id field.

* `student_id` - value of id to query by [String | Number]

### `quero.findStudents(student_cpf)`

### `quero.getAdmission(admission_id)`

Finds a single admission by its id field.

* `admission_id` - value of id to query by [String | Number]

### `quero.findAdmissions(options)`

### `quero.updateAdmissionStatus(admission_id, status)`

Finds a single admission by its id field, and updates it according to the status arg.

* `admission_id` - value of id to query by [String | Number]
* `status` - new status [String] enum: `initiated`, `pre_registered`, `registered`, `failed`, `approved`, `pending_docs`, `submitted_docs`, `rejected_docs`, `enrolled`, `dropped_out`, `dropping_out`, `drop_out_confirmed`

### `quero.getAdmissionDocument(admission_id, document_id)`

### `quero.findAdmissionDocuments(admission_id, options)`

## Authors

* **Luca Chamecki Granato** - *Initial work* - [EngagED](https://www.engaged.com.br)

## License

This project is licensed under the MIT License
