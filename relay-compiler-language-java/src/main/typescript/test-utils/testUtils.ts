import fs from "fs";
import path from "path";
import { Source, parse } from "graphql";
import {
  Parser,
  ASTConvert,
  Fragment,
  Root,
  Schema,
  CompilerContext,
  IRTransforms,
  GeneratedDefinition
} from "relay-compiler";
import { GeneratedNode } from "relay-runtime";
// @ts-ignore
import compileRelayArtifacts from "relay-compiler/lib/codegen/compileRelayArtifacts";
// @ts-ignore
export const TestSchema: Schema = Schema.create(
  new Source(fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"))
);

/**
 * Extend Jest with a custom snapshot serializer to provide additional context
 * and reduce the amount of escaping that occurs.
 */
const FIXTURE_TAG = Symbol.for("FIXTURE_TAG");
expect.addSnapshotSerializer({
  print(value) {
    return Object.keys(value)
      .map(key => `~~~~~~~~~~ ${key.toUpperCase()} ~~~~~~~~~~\n${value[key]}`)
      .join("\n");
  },
  test(value) {
    return value && value[FIXTURE_TAG] === true;
  }
});

/**
 * Generates a set of jest snapshot tests that compare the output of the
 * provided `operation` to each of the matching files in the `fixturesPath`.
 * The fixture should have '# expected-to-throw' on its first line
 * if it is expected to fail
 */
export function generateTestsFromFixtures(
  fixturesPath: string,
  operation: (input: string) => string
): void {
  let fixtures = fs.readdirSync(fixturesPath);

  test(`has fixtures in ${fixturesPath}`, () => {
    expect(fixtures.length > 0).toBe(true);
  });

  const onlyFixtures = fixtures.filter(name => name.startsWith("only."));
  if (onlyFixtures.length) {
    test.skip.each(
      fixtures.filter(name => !name.startsWith("only."))
    )("matches expected output: %s", () => {});
    fixtures = onlyFixtures;
  }
  test.each(fixtures)("matches expected output: %s", file => {
    const input = fs.readFileSync(path.join(fixturesPath, file), "utf8");
    const output = getOutputForFixture(input, operation, file);
    expect({
      [FIXTURE_TAG]: true,
      input,
      output
    }).toMatchSnapshot();
  });
}

function getOutputForFixture(
  input: string,
  operation: (input: string) => string,
  file: string
): string {
  const shouldThrow =
    /^# *expected-to-throw/.test(input) || /\.error\.\w+$/.test(file);
  if (shouldThrow) {
    let result;
    try {
      result = operation(input);
    } catch (e) {
      return `THROWN EXCEPTION:\n\n${e.toString()}`;
    }
    throw new Error(
      `Expected test file '${file}' to throw, but it passed:\n${result}`
    );
  } else {
    return operation(input);
  }
}

export function parseGraphQLText(
  schema: Schema,
  text: string
): {
  definitions: readonly (Fragment | Root)[];
  schema: Schema;
} {
  const ast = parse(text);
  const extendedSchema = schema.extend(ast);
  // @ts-ignore
  const definitions = ASTConvert.convertASTDocuments(
    extendedSchema,
    [ast],
    Parser.transform.bind(Parser)
  );
  return {
    definitions,
    schema: extendedSchema
  };
}

export function printAST() {}
// @ts-ignore
import SkipUnreachableNodeTransform from "relay-compiler/lib/transforms/SkipUnreachableNodeTransform";
export function compileArtifacts(
  context: CompilerContext
): [GeneratedDefinition, GeneratedNode][] {
  const transforms = {
    ...IRTransforms,
    fragmentTransforms: [
      SkipUnreachableNodeTransform.transform,
      ...IRTransforms.fragmentTransforms
    ]
  };
  // @ts-ignore
  return compileRelayArtifacts(context, transforms);
}
