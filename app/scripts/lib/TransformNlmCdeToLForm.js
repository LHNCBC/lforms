/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

var oboe = require('oboe');
var events = require('events');
var underscore = require('underscore');
var local_util = require('./util');

function TransformToLForm() {
  this.answerLists = {};
  events.EventEmitter.call(this);
}

require('util').inherits(TransformToLForm, events.EventEmitter);

underscore.extend(TransformToLForm.prototype,  {
  
  /*
   * 
   */
  transform: function(url) {
    var self = this;
    
    var parser = oboe(url)
      .node({
        'formElements.*': this.handle_form_element.bind(this),
        'naming': this.handle_naming.bind(this),
        'cardinality': this.handle_cardinality.bind(this),
        'answers.*': this.handle_answers.bind(this),
        'uoms.*': this.handle_units.bind(this),
//        'stewardOrg': oboe.drop,
        // List out ignorable
        'createdBy': oboe.drop,
        'history': oboe.drop,
        'comments': oboe.drop,
        'ids': oboe.drop,
        'properties': oboe.drop,
        'registrationState': oboe.drop,
        'attachments': oboe.drop
      })
      .done(function(json){
        json.code = json._id;
        json.type = json.stewardOrg.name;
        delete json.stewardOrg;
        json.template = 'panelTableV';
        rename_key(json, 'naming', 'name');
        rename_key(json, 'formElements', 'items');
        json = local_util.WidgetUtil.convertFromEmbeddedToReference(json);
        json.answerLists = self.answerLists;
        self.emit('done', json);
      })
      .fail(function(errorReport){
        parser.abort();
        self.emit('error', errorReport);
      });
  },
  
  handle_naming: function(param, path) {
    if(param && param.length > 0) {
      return param[0].designation;
    }
    else {
      oboe.drop();
    }
  },
  
  handle_form_element: function(param, path) {
    param.questionCode = createQuestionCode(param);
    var q = param.question;
    param.question = param.label;
    delete param.label;
    param.header = false;    
    if(param.elementType === 'section') {
      param.header = true;
    }
    delete param.elementType;
    
    param.dataType = createDataType(q);
    if(q.answers && q.answers.length > 0) {
      this.answerLists[param.questionCode] = q.answers;
      param.answers = param.questionCode;
    }
    if(q.uoms && q.uoms.length > 0) {
      param.units = q.uoms;
      param.units[0].default = true;
    }
    rename_key(param, 'formElements', 'items');
    rename_key(param, 'cardinality', 'questionCardinality');
    
    
    return param;
  },
  
  handle_cardinality: function(param, path) {
    var ret = {};
    var a = param.split('.');
    if(a.length > 1) {
      a[0] = (a[0] === '*' ? -1 : parseInt(a[0]));
      a[1] = (a[1] === '*' ? -1 : parseInt(a[1]));
      ret.min = a[0];
      ret.max = a[1];
    }
    else {
      if (param === '*') {
        ret.min = 0;
        ret.max = -1;
      }
      else {
        ret.min = parseInt(param);
        ret.max = parseInt(param);
      }
    }
    return ret;
  },
  
  handle_units: function(param, path) {
    var ret = {};
    ret.name = param;
    return ret;
  },
  
  handle_answers: function(param, path) {
    rename_key(param, 'permissibleValue', 'code');
    rename_key(param, 'valueMeaningName', 'text');
    return param;
  }
});

function  rename_key(obj, oldkey, newkey) {
  if(obj[oldkey]) {
    obj[newkey] = obj[oldkey];
    delete obj[oldkey];
  }
}

function createQuestionCode(param) {
  var ret = '';
  if(param.elementType === 'section') {
    ret = param.label.replace(/\s/g, '_');
  }
  else {
    ret = param.question.cde.tinyId;
  }
  return ret;
}

function createDataType(question) {
  var ret = '';
  if(question) {
    switch(question.datatype) {
      case 'Character':
        ret = 'ST';
        break;
      case 'Value List':
        ret = 'CNE';
        break;
      case 'NUMBER':
        ret = 'REAL';
        break;
      case 'Float':
        ret = 'REAL';
        break;
      case 'Date':
        ret = 'DT';
        break;
      default:
        ret = 'ST';
        break;
    }
  }
  return ret;  
}
// Functions which will be available to external callers
module.exports = TransformToLForm;
