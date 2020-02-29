import {
  GeneratedDefinition,
  Selection,
  LinkedField,
  ScalarField,
  Condition,
  InlineFragment,
  FragmentSpread
} from "relay-compiler";
import invariant from "invariant";
import {
  InlineDataFragmentSpread,
  Fragment,
  Request
} from "relay-compiler/lib/core/IR";
import { GraphQLType, GraphQLScalarType } from "graphql";

function str(text: string): string {
  return JSON.stringify(text);
}

function camelCase(str: string): string {
  return str.replace(/^[a-zA-Z0-9]/, str[0].toUpperCase());
}

function printSelection(node: Selection, parent: Selection | Fragment): string {
  switch (node.kind) {
    case "LinkedField": {
      const name = node.alias ?? node.name;
      const className = camelCase(name) + "Class";
      const isList = node.type.constructor.name === "List";
      return `
        private static class ${className} {
          ${printSelectionDefinitions(node)}
          private ${className}(HashMap<String, Object> data) {
            ${printInitSelections(node)}
          }
        }

        @Getter
        private ${isList ? `List<${className}>` : className} ${name};

      `;
    }

    case "ScalarField": {
      let field = node as ScalarField;
      return `
      @Getter
      private ${printType(field.type)} ${field.alias ?? field.name};`;
    }

    case "Condition": {
      let field = node as Condition;

      return `// TODO: Implement Conditions`;
    }

    case "InlineFragment": {
      let parentName = "";
      switch (parent.kind) {
        case "LinkedField": {
          const name = parent.alias ?? parent.name;
          parentName = camelCase(name) + "Class";
          break;
        }
        default: {
          invariant(
            false,
            'Unepected kind "%s". This is a bug in relay-compiler-language-java',
            parent.kind
          );
        }
      }
      return `
        private static class InlineFragment${
          node.typeCondition
        } extends ${parentName} {
          ${printSelectionDefinitions(node)}
          InlineFragment${node.typeCondition}(HashMap<String, Object> data) {
            super(data);
            ${printInitSelections(node)}
          }
        }
      `;
    }

    case "FragmentSpread": {
      return `private ${node.name} __fragmentSpread${node.name};`;
    }

    case "InlineDataFragmentSpread": {
      let field = node as InlineDataFragmentSpread;

      return `// TODO: Implement InlineDataFragmentSpread`;
    }

    default: {
      invariant(
        false,
        'Unepected kind "%s". This is a bug in relay-compiler-language-java',
        node.kind
      );
    }
  }
}

function printSelectionDefinitions(
  node: InlineFragment | Fragment | LinkedField
) {
  return `${node.selections
    .map(selection => printSelection(selection, node))
    .join("\n")}`;
}

/**
 * Converts Relay IR AST to Java code
 * @param node
 */
export function print(node: GeneratedDefinition): string {
  switch (node.kind) {
    case "Fragment": {
      return `
        public class ${node.name} {
          ${printSelectionDefinitions(node)}
          public ${node.name}(HashMap<String, Object> data) {
            ${printInitSelections(node)}
          }
        }
      `;
    }

    case "Request": {
      return `
        public class ${node.name} {
          ${printSelectionDefinitions(node.fragment)}
          public ${node.name}(HashMap<String, Object> data) {
            ${printInitSelections(node.fragment)}
          }
        }
      `;
    }
    default: {
      invariant(
        false,
        'Got unexpected "%s". This is likely a bug in relay-compiler-language-java.',
        node.kind
      );
    }
  }
}

function printInitSelection(node: Selection, parent: Selection | Fragment) {
  switch (node.kind) {
    case "ScalarField": {
      const selector = node.alias ?? node.name;
      return `this.${selector} = (${printType(node.type)}) data.get(${str(
        selector
      )});`;
    }
    case "LinkedField": {
      const name = node.alias ?? node.name;
      const isList = node.type.constructor.name === "List";

      const className = camelCase(name) + "Class";
      const inlineFragments = node.selections
        .filter(selection => selection.kind === "InlineFragment")
        .map(selection => {
          if (selection.kind === "InlineFragment") {
            return `if (${str(
              selection.typeCondition
            )}.equals((String) data.get("__typename"))) {
            this.${name} = new ${className}.InlineFragment${
              selection.typeCondition
            }((HashMap<String, Object>) data.get(${str(name)}));
          }
          `;
          }
          return "";
        })
        .join(" else ");
      return `
        ${isList ? "// TODO: Plural fields" : ""}
        this.${name} = new ${className}((HashMap<String, Object>) data.get(${str(
        name
      )}));
        ${inlineFragments}
        `;
    }
    case "FragmentSpread": {
      return `this.__fragmentSpread${node.name} = new ${node.name}(data);`;
    }
    case "InlineFragment": {
      let parentField = "";
      let parentClassName = "";
      switch (parent.kind) {
        case "LinkedField": {
          parentField = parent.alias ?? parent.name;
          parentClassName = camelCase(parentField + "Class");
          break;
        }
        default: {
          invariant(
            false,
            'Got unexpected "%s". This is likely a bug in relay-compiler-language-java.',
            parent.kind
          );
        }
      }
      return `

      `;
    }
    case "ClientExtension":
    case "Condition":
    case "Defer":
    case "InlineDataFragmentSpread":
    case "ModuleImport":
    case "Stream": {
      return `// TODO: ${node.kind}`;
    }

    default: {
      invariant(
        false,
        'Got unexpected "%s". This is likely a bug in relay-compiler-language-java.',
        node.kind
      );
    }
  }
}
function printInitSelections(node: InlineFragment | Fragment | LinkedField) {
  return node.selections
    .map(selection => printInitSelection(selection, node))
    .join("\n");
}

function printType(type: any): string {
  const name = type.constructor.name;
  switch (name) {
    case "NonNull": {
      return printType(type.ofType);
    }
    case "ScalarType": {
      switch (type.name) {
        case "ID": {
          return "String";
        }
        case "Number":
        case "String":
        case "Boolean":
          return type;
      }
    }
    default: {
      // TODO: Custom scalars
      return "Object";
    }
  }
}
