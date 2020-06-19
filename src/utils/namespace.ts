const prefix = "test";

export function namespace(ruleName: string) {
  return `${prefix}/${ruleName}`;
}
