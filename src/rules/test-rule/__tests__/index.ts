import * as rule from '..';
import * as postCss from 'postcss';

interface TestCase {
  name: string;
  input: string;
  accept: boolean;
}

describe(rule.ruleName, () => {
  const testCases: TestCase[] = [
    {
      name: 'should pass if there are no @mixin declarations',
      input: `
        @media screen and (max-width: 600px) {
          font-size: 18px;
        }
      `,
      accept: true,
    },
    {
      name: 'should warn if there are @mixin declarations without @allowMixins',
      input: `
        @mixin font-size-default {
          font-size: 18px;
        }
      `,
      accept: false,
    },
    {
      name: 'should pass if there are @mixin declarations with @allowMixins',
      input: `// @allowMixins
        @mixin font-size-default {
          font-size: 18px;
        }
      `,
      accept: true,
    },
  ];

  for (const testCase of testCases) {
    it(testCase.name, () => {
      const warn = jest.fn();
      const result = {warn} as any as postCss.Result;
      rule.plugin({})(postCss.parse(testCase.input), result);
      if (testCase.accept) {
        expect(warn).not.toHaveBeenCalled();
      } else {
        expect(warn).toHaveBeenCalled();
      }
    });
  }
})
