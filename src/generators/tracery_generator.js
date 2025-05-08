import * as Blockly from 'blockly';

export const traceryGenerator = new Blockly.Generator('Tracery');

const Order = {
  ATOMIC: 0,
};

traceryGenerator.workspaceToCode = function (ws) {
  const ruleBlocks = Blockly.getMainWorkspace().getBlocksByType('RULE');
  const code = ruleBlocks.map((blk, idx) => {
    return traceryGenerator.forBlock['RULE'](blk, traceryGenerator)
  }).join(',\n');
  return this.finish(code);
};

traceryGenerator.quote_ = function (str) {
  return str
  .replace(/\\/g, '\\\\')
  .replace(/\n/g, '\\\n')
  .replace(/"/g, "\\\"");
}

traceryGenerator.finish = function (code) {
  return "{\n" + code + "\n}\n";
}

traceryGenerator.scrub_ = function (block, code, thisOnly) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock && !thisOnly) {
    return code + ',\n' + traceryGenerator.blockToCode(nextBlock);
  }
  return code;
};

traceryGenerator.forBlock['RULE'] = function (block, generator) {
  const name = block.getFieldValue('rule_name');
  const alternatives = generator.statementToCode(block, 'value');
  const code = `"${name}": [\n${alternatives}\n]`;
  return code;
};

traceryGenerator.forBlock['ALTERNATIVE'] = function (block, generator) {
  const statementMembers = generator.valueToCode(block, 'content', Order.ATOMIC);
  const code = '"' + statementMembers + '"';
  return code;
};

traceryGenerator.forBlock['STR_CONTENT'] = function (block, generator) {
  const textValue = generator.quote_(block.getFieldValue('str_val'));
  const nextCode = generator.valueToCode(block, 'next', Order.ATOMIC);
  const code = `${textValue}${nextCode}`;
  return [code, Order.ATOMIC];
};

traceryGenerator.forBlock['RULE_CALL'] = function (block, generator) {
  const ruleName = block.getFieldValue('rule_name');
  const nextCode = generator.valueToCode(block, 'next', Order.ATOMIC);
  const code = `#${ruleName}#${nextCode}`;
  return [code, Order.ATOMIC];
};

traceryGenerator.forBlock['CONTENT_MODIFIER'] = function (block, generator) {
  const ruleName = block.getFieldValue('rule_name');
  const nextCode = generator.valueToCode(block, 'next', Order.ATOMIC);
  const modifier = block.getFieldValue('modifier');
  const code = `#${ruleName}.${modifier}#${nextCode}`;
  return [code, Order.ATOMIC];
};