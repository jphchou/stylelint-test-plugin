import {utils, Plugin} from 'stylelint';
import {namespace} from "../../utils/namespace";

export const ruleName = namespace('test-rule');

export const messages = {
  expected: '@mixin rules are not allowed without an @allowMixins comment',
};

export const plugin: Plugin = (primary) => {
  return (root, result) => {
    let allowMixins = false;
    root.walkComments((comment) => {
      if (comment.text.indexOf('@allowMixins') > -1) {
        allowMixins = true;
      }
    })

    if (allowMixins) {
      return;
    }

    root.walkAtRules('mixin', (decl) => {
      utils.report({
        message: messages.expected,
        node: decl,
        result,
        ruleName,
      })
    })
  }
};
