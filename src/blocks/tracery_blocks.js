/**
 * @fileoverview All the tracery-related blocks defined in the custom generator.
 */

import * as Blockly from 'blockly';

const ALTERNATIVE = {
  init: function() {
    this.appendDummyInput('dummy1')
      .appendField('"');
    this.appendValueInput('content');
    this.appendDummyInput('dummy2')
      .appendField('"');
    this.setPreviousStatement(true, ['ALTERNATIVE', 'RULE']);
    this.setNextStatement(true, 'ALTERNATIVE');
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(225);
  }
};
Blockly.common.defineBlocks({ALTERNATIVE: ALTERNATIVE});
                   

const STR_CONTENT = {
  init: function() {
    this.appendValueInput('next')
    .setCheck('content')
      .appendField(new Blockly.FieldTextInput('some text'), 'str_val');
    this.setOutput(true, 'content');
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(225);
  }
};
Blockly.common.defineBlocks({STR_CONTENT: STR_CONTENT});      

const RULE = {
  init: function() {
    this.appendDummyInput('NAME')
      .appendField(new Blockly.FieldTextInput('rule1'), 'rule_name')
      .appendField(':');
    this.appendStatementInput('value')
    .setCheck('ALTERNATIVE');
    this.setInputsInline(false)
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(300);
  }
};
Blockly.common.defineBlocks({RULE: RULE});
                    

const CONTENT_MODIFIER = {
  init: function() {
    this.appendValueInput('next')
    .setCheck('content')
      .appendField('#')
      .appendField(new Blockly.FieldDropdown([
          ['blah', 'blah'],
          ['foo', 'foo'],
          ['bar', 'bar']
        ]), 'rule_name')
      .appendField('.')
      .appendField(new Blockly.FieldDropdown([
          ['capitalize', 'capitalize'],
          ['singular', 'a'],
          ['plural', 's']
        ]), 'modifier')
      .appendField('#');
    this.setInputsInline(false)
    this.setOutput(true, 'content');
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(300);
  }
};
Blockly.common.defineBlocks({CONTENT_MODIFIER: CONTENT_MODIFIER});

const RULE_CALL = {
  init: function() {
    this.appendValueInput('next')
    .setCheck('content')
      .appendField('#')
      .appendField(new Blockly.FieldDropdown([
          ['blah', 'blah'],
          ['foo', 'foo'],
          ['bar', 'bar']
        ]), 'rule_name')
      .appendField('#');
    this.setInputsInline(false)
    this.setOutput(true, 'content');
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(300);
  }
};
Blockly.common.defineBlocks({RULE_CALL: RULE_CALL});
export const blocks = {
  'RULE': RULE,
  'ALTERNATIVE': ALTERNATIVE,
  'STR_CONTENT': STR_CONTENT,
  'CONTENT_MODIFIER': CONTENT_MODIFIER
};