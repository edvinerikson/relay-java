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

function printSelection(node: Selection, parent: Selection | Fragment): string {
  switch (node.kind) {
    case "LinkedField": {
      const name = node.alias ?? node.name;
      let type = printType(node.type);
      const unwrappedType = unwrapType(node.type);

      type = type.replace(unwrappedType, name);
      return `
        private static class ${name} {
          ${printSelectionDefinitions(node)}
          private ${name}(HashMap<String, Object> data) {
            ${printInitSelections(node)}
          }
        }

        @Getter
        private ${type} ${name};

      `;
    }

    case "ScalarField": {
      let field = node as ScalarField;
      return `
      @Getter
      private ${printType(field.type)} ${field.alias ?? field.name};`;
    }

    case "Condition": {
      return `// TODO: Implement Conditions`;
    }

    case "InlineFragment": {
      let parentName = "";
      switch (parent.kind) {
        case "LinkedField": {
          const name = parent.alias ?? parent.name;
          parentName = name;
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
        private static class ${node.typeCondition} extends ${parentName} {
          ${printSelectionDefinitions(node)}
          ${node.typeCondition}(HashMap<String, Object> data) {
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
      let type = printType(node.type);
      type = type.replace(unwrapType(node.type), name);
      const isList = type.includes("List<");
      const inlineFragments = node.selections
        .filter(selection => selection.kind === "InlineFragment")
        .map(selection => {
          if (selection.kind === "InlineFragment") {
            return `if (${str(
              selection.typeCondition
            )}.equals((String) data.get("__typename"))) {
            this.${name} = new ${name}.${
              selection.typeCondition
            }((HashMap<String, Object>) data.get(${str(name)}));
          }
          `;
          }
          return "";
        })
        .join(" else ");
      let stack = 0;
      let typeNode = node.type;
      let previousNode = null;
      while (typeNode != null) {
        let _previousNode = typeNode;
        switch (typeNode.constructor.name) {
          case "List": {
            typeNode = typeNode.ofType;
            stack += 1;
            break;
          }
          case "NonNull": {
            typeNode = typeNode.ofType;
            _previousNode = previousNode;
            break;
          }
          default: {
            typeNode = null;
          }
        }
        previousNode = _previousNode;
      }
      let string = "";
      for (let i = stack; i > 0; i--) {
        if (i === 1) {
          `items${i + 1}.add(new ${name}(item));`;
        } else if (i === stack) {
          `this.${name}.add(items${i - 1});`;
        } else {
          string += `
            List<Object> items${i} = Collections.emptyList();
            for (List<Object> : items${i}) {
              List<Object> items${i - 1} = Collections.emptyList();
              items${i}.add(items${i - 1});
            }
          `;
        }
      }
      console.log(string);

      return `
        ${
          isList
            ? `
        this.${name} = Collections.emptyList();
        for (HashMap<String, Object> item : (List<HashMap<String, Object>>) data.get(${str(
          name
        )})) {
          this.${name}.add(new ${name}(item));
        }
        `
            : `
        this.${name} = new ${name}((HashMap<String, Object>) data.get(${str(
                name
              )}));
        `
        }
        ${inlineFragments}
        `;
    }
    case "FragmentSpread": {
      return `this.__fragmentSpread${node.name} = new ${node.name}(data);`;
    }
    case "InlineFragment": {
      let parentField = "";
      switch (parent.kind) {
        case "LinkedField": {
          parentField = parent.alias ?? parent.name;
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
    case "UnionType":
    case "ObjectType": {
      return type.name;
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
    case "List": {
      return `List<${printType(type.ofType)}>`;
    }
    default: {
      // TODO: Custom scalars
      console.log(type);
      return "Object";
    }
  }
}

function unwrapType(type: any): string {
  const name = type.constructor.name;
  switch (name) {
    case "UnionType":
    case "EnumType":
    case "ObjectType":
    case "ScalarType": {
      return type.name;
    }
    case "List":
    case "NonNull": {
      return unwrapType(type.ofType);
    }
  }
  return type;
}
