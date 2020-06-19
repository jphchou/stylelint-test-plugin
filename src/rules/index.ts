import {Plugin} from 'stylelint';
import * as testRule from './test-rule'

export const rules: {[key: string]: Plugin} = {
  [testRule.ruleName]: testRule.plugin,
}
