/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import {blocks} from './blocks/tracery_blocks';
import {traceryGenerator} from './generators/tracery_generator';
import {save, load} from './serialization';
import {toolbox} from './toolbox';
import './index.css';
//import * as Tracery from 'tracery-grammar';
import * as tracery from './tracery';
import * as baseEngModifiers from './mods-eng-basic'
import * as baseFrenchModifiers from './mods-fr-basic'

// Register the blocks with Blockly
//Blockly.common.defineBlocks(blocks);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode').firstChild;
const outputDiv = document.getElementById('output');
const blocklyDiv = document.getElementById('blocklyDiv');
const rollButton = document.getElementById('roll');
const ws = Blockly.inject(blocklyDiv, {toolbox});

// This function resets the code div and shows the
// generated code from the workspace.
const runCode = () => {
  // Generate Tracery code
  const code = traceryGenerator.workspaceToCode(ws);
  codeDiv.innerText = code;

  // Create a Tracery Grammar out of it
  var grammar = tracery.default.createGrammar(JSON.parse(code));

  // Add modifiers depending on the language
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang');
  if (lang == 'fr') {
    grammar.addModifiers(baseFrenchModifiers.baseFrenchModifiers);
  } else {
    grammar.addModifiers(baseEngModifiers.baseEngModifiers);
  }

  // Run it several times
  var res = [];
  for(let i = 0; i < 10; i++) {
    var sentence = grammar.flatten('#origin#');
    if (lang =='fr') {
      // Still some french subtilities
      sentence = sentence.replaceAll(' à le ', ' au ');
      sentence = sentence.replaceAll(' à les ', ' aux ');
      sentence = sentence.replaceAll(' de les ', ' des ');
      sentence = sentence.replaceAll(' de le ', ' du ');
    }
    // console.log(grammar.errors);
    res.push(sentence);
  }
  outputDiv.innerHTML = res.join('<hr/>\n');
};

// Load the initial state from storage and run the code.
load(ws);
runCode();

rollButton.addEventListener("click", runCode); 

// Every time the workspace changes state, save the changes to storage.
ws.addChangeListener((e) => {
  // UI events are things like scrolling, zooming, etc.
  // No need to save after one of these.
  if (e.isUiEvent) return;
  save(ws);
});

// Whenever the workspace changes meaningfully, run the code again.
ws.addChangeListener((e) => {
  // Don't run the code when the workspace finishes loading; we're
  // already running it once when the application starts.
  // Don't run the code during drags; we might have invalid state.
  if (
    e.isUiEvent ||
    e.type == Blockly.Events.FINISHED_LOADING ||
    ws.isDragging()
  ) {
    return;
  }
  runCode();
});

ws.addChangeListener((e) => {
      if (
        e.isUiEvent ||
        e.type == Blockly.Events.FINISHED_LOADING ||
        ws.isDragging()
      ) {
        return;
      }
      const ruleBlocks = Blockly.getMainWorkspace().getBlocksByType('RULE');
      const rulesNames = ruleBlocks.map(blk => blk.getFieldValue('rule_name'));
      const rulesMenuItems = rulesNames.map(name => [name, name]);
      const ruleCallBlocks = Blockly.getMainWorkspace().getBlocksByType('RULE_CALL');
      const contentModifierBlocks = Blockly.getMainWorkspace().getBlocksByType('CONTENT_MODIFIER');
      ruleCallBlocks.concat(contentModifierBlocks).forEach((blk) => {
        const dropdown = blk.getField('rule_name');
        dropdown.menuGenerator_ = rulesMenuItems;
      });
});