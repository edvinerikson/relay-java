import { PluginInterface } from "relay-compiler/lib/language/RelayLanguagePluginInterface";
import { find } from "./FindGraphQLTags";
import {
  Selection,
  Argument,
  ArgumentValue,
  Parser,
  IRTransforms,
  GeneratedDefinition,
  ArgumentDefinition,
  Root
} from "relay-compiler";
import { format } from "prettier";
import invariant from "invariant";
IRTransforms.codegenTransforms;

function stringify(
  parts: TemplateStringsArray,
  ...interpolation: (string | null | undefined)[]
) {
  let str = "";
  for (let i in interpolation) {
    let value = interpolation[i] ?? null;
    str += parts[i];
    str += value === null ? null : JSON.stringify(value);
  }
  str += parts[parts.length - 1];
  return str;
}
function str(string: string): string {
  return JSON.stringify(string);
}
function generateCode(
  node:
    | GeneratedDefinition
    | ArgumentDefinition
    | Selection
    | Root
    | Argument
    | ArgumentValue
): string {
  switch (node.kind) {
    case "Literal": {
      let strValue = node.value;
      if (
        strValue !== "true" &&
        strValue !== "false" &&
        parseInt(strValue as string, 10).toString() !== strValue
      ) {
        strValue = JSON.stringify(strValue);
      }
      return `
        ArgumentValueLiteral
          .builder()
          .value(${strValue})
          .build()
      `;
    }
    case "Argument": {
      const value = generateCode(node.value);
      return `
        Argument
          .builder()
          .type(${str(node.type)})
          .value(${value})
          .build()
      `;
      break;
    }
    case "Root": {
      const argumentDefinitions = node.argumentDefinitions
        .map(generateCode)
        .join(", ");
      const selections = ((node.selections as unknown) as Selection[])
        .map(generateCode)
        .join(", ");
      return `
      Root.
        builder()
        .name(${str(node.name)})
        .type(${str(node.type)})
        .operation(${str(node.operation)})
        .argumentDefinitions(Arrays.asList(${argumentDefinitions}))
        .selections(Arrays.asList(${selections}))
        .build()
      `;
      break;
    }
    case "Fragment": {
      const argumentDefinitions = node.argumentDefinitions
        .map(generateCode)
        .join(", ");
      const selections = node.selections.map(generateCode).join(", ");
      return `
        Fragment
          .builder()
          .name(${str(node.name)})
          .type(${str(node.type)})
          .argumentDefinitions(Arrays.asList(${argumentDefinitions}))
          .selections(Arrays.asList(${selections}))
          .build()
      `;
    }
    case "FragmentSpread": {
      const args = node.args.map(generateCode).join(", ");
      return `
        FragmentSpread
          .builder()
          .name(${str(node.name)})
          .args(Arrays.asList(${args}))
          .build()
      `;
    }
    case "InlineDataFragmentSpread": {
      break;
    }
    case "InlineFragment": {
      break;
    }
    case "LinkedField": {
      const selections = node.selections.map(generateCode).join(", ");
      const args = node.args.map(generateCode).join(", ");
      return `
        LinkedField
          .builder()
          .name(${str(node.name)})
          .alias(${str(node.alias)})
          .type(${str(node.type)})
          .args(Arrays.asList(${args}))
          .selections(Arrays.asList(${selections}))
          .build()
      `;
      break;
    }
    case "LocalArgumentDefinition": {
      break;
    }
    case "ModuleImport": {
      break;
    }
    case "Request": {
      break;
    }
    case "RootArgumentDefinition": {
      break;
    }
    case "ScalarField": {
      const args = node.args.map(generateCode).join(", ");
      return `
        ScalarField
          .builder()
          .name(${str(node.name)})
          .alias(${str(node.alias)})
          .type(${str(node.type)})
          .args(Arrays.asList(${args}))
          .build()
      `;
      break;
    }
    case "SplitOperation": {
      break;
    }
    case "Stream": {
      break;
    }
    case "ClientExtension": {
      break;
    }
    case "Condition": {
      break;
    }
    case "Defer": {
      break;
    }
  }
  invariant(false, 'Kind "%s" did not match any condtion', node.kind);
}

export default function plugin(): PluginInterface {
  return {
    findGraphQLTags: find,
    formatModule: ({ moduleName, node, docText, definition }) => {
      let sourceCode = "";

      if (definition.kind === "Fragment") {
        const className = definition.name;
        const argumentDefinitions = definition.argumentDefinitions.map(
          generateCode
        );
        const selections = definition.selections.map(generateCode);
        sourceCode = `public class ${className} extends Fragment {
          public ${className}() {
            super(
              ${str(definition.name)},
              ${str(definition.type)},
              Arrays.asList(${argumentDefinitions.join(", ")}),
              Arrays.asList(${selections.join(", ")})
            );
          }
        }
      `;
      } else if (definition.kind === "Request") {
        const className = `${definition.name}`;
        const fragment = generateCode(definition.fragment);
        const root = generateCode(definition.root);

        sourceCode = `
        public class ${className} extends Request {
          public ${className}() {
            super(${fragment}, ${root});
          }
        }
      `;
      }

      const docTextComment = docText
        ? "\n/*\n" + docText.trim() + "\n*/\n"
        : "";

      const sourceModule = `
      package com.github.edvinerikson.relay.generated;
      import java.util.Arrays;
      import com.github.edvinerikson.relay.types.*;
/*
${JSON.stringify(node, null, 2)}
*/

${docTextComment}

${sourceCode}
`;
      return format(sourceModule, {
        filepath: moduleName + ".java",
        plugins: [require("prettier-plugin-java")]
      });
    },
    inputExtensions: ["jsp"],
    outputExtension: "java",
    typeGenerator: {
      generate: (schema, node, options) => {
        return "";
      },
      transforms: []
    }
  };
}
