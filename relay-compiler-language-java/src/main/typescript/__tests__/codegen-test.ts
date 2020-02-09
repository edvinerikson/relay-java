import { print } from "../codegen";

import { CompilerContext, IRTransforms } from "relay-compiler";

import {
  parseGraphQLText,
  generateTestsFromFixtures,
  TestSchema,
  compileArtifacts
} from "../test-utils/testUtils";
import { format } from "prettier";
describe("print(node)", () => {
  generateTestsFromFixtures(`${__dirname}/fixtures/print`, text => {
    const relaySchema = TestSchema.extend(IRTransforms.schemaExtensions);
    const { definitions, schema } = parseGraphQLText(relaySchema, text);
    const compilerContext = new CompilerContext(schema).addAll(definitions);

    compilerContext.applyTransforms([
      ...IRTransforms.commonTransforms,
      ...IRTransforms.queryTransforms
    ]);
    return compileArtifacts(compilerContext)
      .map(node => {
        let out = "";
        out += print(node) + "\n\n";

        try {
          return format(out, {
            filepath: "test.java",
            plugins: [require("prettier-plugin-java")]
          });
        } catch (err) {
          out += err.stack;
          return out;
        }
      })
      .join("\n\n");
  });
});
