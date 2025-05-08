/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// Use a unique storage key for this codelab
const storageKey = 'traceryGeneratorWorkspace';

function saveDataToUrl(data) {
  // Convert JSON data to string
  const jsonString = JSON.stringify(data);

  // Encode JSON string to base64
  const base64String = btoa(jsonString);

  // Update the URL with the base64 encoded string
  const urlParams = new URLSearchParams(window.location.search);
  var lang = urlParams.get('lang');
  if (!lang) {
    lang = 'en';
  }
  const newUrl = `${window.location.pathname}?lang=${lang}#${base64String}`;
  window.history.pushState({ data }, '', newUrl);
}

function getDataFromUrl() {
  const hash = window.location.hash.substring(1);
  if (hash) {
    try {
      // Decode base64 string
      const jsonString = atob(hash);

      // Parse JSON string
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error parsing URL data:', error);
    }
  }
  return null;
}

/**
 * Saves the state of the workspace to browser's local storage.
 * @param {Blockly.Workspace} workspace Blockly workspace to save.
 */
export const save = function (workspace) {
  var data = Blockly.serialization.workspaces.save(workspace);
  const jsonData = JSON.stringify(data);
  window.localStorage?.setItem(storageKey, jsonData);
  saveDataToUrl(data);
};

/**
 * Loads saved state from local storage into the given workspace.
 * @param {Blockly.Workspace} workspace Blockly workspace to load into.
 */
export const load = function (workspace) {
  var data = getDataFromUrl();
  if (!data) {
    data = window.localStorage?.getItem(storageKey);
    data = JSON.parse(data);
  }
  if (!data) return;

  // turn validations off, saving the old validation function
  // Force valid rule_name
  const prevValidation = Blockly.FieldDropdown.prototype.doClassValidation_;
  Blockly.FieldDropdown.prototype.doClassValidation_ = function (newValue) {
      // TODO check that newValue is not already in
      this.menuGenerator_.push([newValue, newValue]);
      return newValue
  }
  
  Blockly.serialization.workspaces.load(data, workspace, false);

  Blockly.FieldDropdown.prototype.doClassValidation_ = prevValidation;
};
