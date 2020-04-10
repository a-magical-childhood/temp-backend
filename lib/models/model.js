'use strict';

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  async create(record) {
    try{
      let recordToAdd = new this.schema(record);
      return await recordToAdd.save();
    }
    catch(e){
      console.error('ERROR CREATING RECORD', e);
      return false;
    }
  }

  async read(_id) {
    try {
      let record = await this.schema.findOne({_id});

      return record;
    }
    catch(e) {
      console.error('ERROR FINDING RECORD', e);
    }
  }

  async readByQuery(collection) {
    try {
      let foundRecords = await this.schema.find(collection);

      return foundRecords;
    }
    catch(e){
      console.error('ERROR FINDING RECORDS', e);
      return false;
    }

  }

  async update(_id, changedRecord) {

  }

  async delete(_id) {

  }
}

module.exports = Model;