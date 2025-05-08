/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export const toolbox = {
  kind: 'flyoutToolbox',
  contents: [
    {
      kind: 'block',
      type: 'RULE',
    },
    {
      kind: 'block',
      type: 'ALTERNATIVE',
    },
    {
      kind: 'block',
      type: 'STR_CONTENT',
    },
    {
      kind: 'block',
      type: 'RULE_CALL',
    },
    {
      kind: 'block',
      type: 'CONTENT_MODIFIER',
    }
    // {
    //   kind: 'block',
    //   type: 'BLAH_RULE',
    // },
    // {
    //   kind: 'block',
    //   type: 'VERB_RULE',
    // }
  ],
};
