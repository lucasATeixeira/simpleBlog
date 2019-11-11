'use strict';
const Antl = use('Antl');
class File {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      file: 'required|file_size:2mb', // file/file_ext:png,jpg, jpeg|file_size:2mb|file_types:image
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = File;
