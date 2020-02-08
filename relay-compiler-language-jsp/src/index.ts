import { PluginInterface } from "relay-compiler/lib/language/RelayLanguagePluginInterface";
import { find } from "./FindGraphQLTags";
import { Selection, Argument, ArgumentValue } from "relay-compiler";
import { format } from "prettier";
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

export default function plugin(): PluginInterface {
  return {
    findGraphQLTags: find,
    formatModule: ({
      moduleName,
      node,
      docText,
      definition,
      documentType,
      concreteText,
      typeText,
      kind
    }) => {
      const docTextComment = docText
        ? "\n/*\n" + docText.trim() + "\n*/\n"
        : "";

      const sourceModule = `package com.github.edvinerikson.relay.generated;

${docTextComment}

/* ${concreteText} */

${format(typeText, {
  filepath: moduleName + ".java",
  plugins: [require("prettier-plugin-java")]
})}
`;
      // return sourceModule;
      console.log(moduleName);
      return sourceModule;
    },
    inputExtensions: ["jsp"],
    outputExtension: "java",
    typeGenerator: {
      generate: (schema, node, options) => {
        function buildArgumentValue(value: ArgumentValue) {
          switch (value.kind) {
            case "ListValue": {
              break;
            }
            case "Literal": {
              let strValue = value.value as string;
              if (
                strValue !== "true" &&
                strValue !== "false" &&
                parseInt(strValue, 10).toString() !== strValue
              ) {
                strValue = JSON.stringify(strValue);
              }
              return `ArgumentValueLiteral.builder().value(${strValue}).build()`;
            }
            case "ObjectValue": {
              break;
            }
            case "Variable": {
              return stringify`ArgumentValueVariable.builder().type(${value.type}).variableName(${value.variableName}).build()`;
            }
          }
          return "";
        }
        function buildArgument(argument: Argument) {
          return `Argument
.builder()
.name(${JSON.stringify(argument.name)})
.type(${JSON.stringify(argument.type)})
.value(${buildArgumentValue(argument.value)})
.build()`;
        }
        function buildArguments(args: readonly Argument[]) {
          return args.map(buildArgument).join(`,`);
        }
        function buildSelection(selection: Selection): string {
          console.log(selection.kind);
          switch (selection.kind) {
            case "ScalarField": {
              return `
ScalarField
.builder()
.name(${JSON.stringify(selection.name)})
.type(${JSON.stringify(selection.type)})
.alias(${JSON.stringify(selection.alias)})
.args(Arrays.asList(${buildArguments(selection.args)}))
.build()`;
            }

            case "LinkedField": {
              console.log(
                schema.getTypeFromString(schema.getTypeString(selection.type))
              );
              return `
LinkedField
.builder()
.name(${JSON.stringify(selection.name)})
.type(${JSON.stringify(selection.type)})
.selections(Arrays.asList(${buildSelections(selection.selections)}))
.args(Arrays.asList(${buildArguments(selection.args)}))
.build()`;
            }
            default: {
              return "";
            }
          }
        }
        function buildSelections(selections: readonly Selection[]) {
          return selections.length === 0
            ? null
            : selections.map(buildSelection).join(", ");
        }

        let depth = 0;

        function line(text: string, scope?: () => void, end?: string) {
          types += " ".repeat(depth * 4) + text + "\n";
          if (scope) {
            depth += 1;
            scope();
            depth -= 1;
          }
          if (end) {
            line(end);
          }
        }
        let types = "";
        line("import java.util.Arrays;");
        line("import com.github.edvinerikson.relay.types.*;\n");
        if (node.kind === "Fragment") {
          line(
            `public class ${node.name} extends Fragment {`,
            () => {
              line(
                `public ${node.name}() {`,
                () => {
                  line(
                    "super(",
                    () => {
                      line(`${JSON.stringify(node.name)},`);
                      line(`${JSON.stringify(node.type)},`);
                      line(`Arrays.asList(),`);
                      line(
                        `Arrays.asList(${buildSelections(node.selections)})`
                      );
                    },
                    ");"
                  );
                },
                "}"
              );
            },
            "}"
          );
        }

        return types;
      },
      transforms: []
    }
  };
}
