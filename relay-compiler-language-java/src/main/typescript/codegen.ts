import {
  ReaderFragment,
  ReaderFragmentSpread,
  ReaderArgumentDefinition,
  ReaderLocalArgument,
  ReaderRootArgument,
  ReaderSelection,
  ReaderLinkedField,
  ReaderArgument,
  ReaderScalarField,
  ReaderVariable,
  ReaderLiteral,
  ReaderCondition,
  ReaderInlineFragment,
  ReaderInlineDataFragmentSpread,
  ReaderInlineDataFragment
} from "relay-runtime/lib/util/ReaderNode";
import { GeneratedNode, ConcreteRequest } from "relay-runtime";
import invariant from "invariant";

type PrintOptions = {
  createClass?: boolean;
};

function str(text: string): string {
  return JSON.stringify(text);
}
/*
function printArgumentDefinition(node: ReaderArgumentDefinition): string {
  switch (node.kind) {
    case "LocalArgument": {
      node = node as ReaderLocalArgument;
      console.log(node);
      return `
        LocalArgument
          .builder()

      `;
    }
    case "RootArgument": {
      node = node as ReaderRootArgument;
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

function printArgumentDefinitions(
  argumentDefinitions:
    | ReaderArgumentDefinition[]
    | readonly ReaderArgumentDefinition[]
): string {
  return `Arrays.asList(${(argumentDefinitions as ReaderArgumentDefinition[])
    .map(printArgumentDefinition)
    .join(", ")})`;
}

function printArgument(node: ReaderArgument) {
  switch (node.kind) {
    case "Literal": {
      let field = node as ReaderLiteral;
        return `
        Literal
          .builder()
          .name(${str(field.name)})
          .value(${
            typeof field.value === "string" ? str(field.value)
              : field.value
          })
          .build()
      `;
    }
    case "Variable": {
      let field = node as ReaderVariable;
      return `
        Variable
          .builder()
          .name(${str(field.name)})
          .variableName(${str(field.variableName)})
          .build()
      `;
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

function printArguments(
  nodes: ReaderArgument[] | readonly ReaderArgument[] | null | undefined
) {
  return nodes == null
    ? "Arrays.asList()"
    : `Arrays.asList(${(nodes as ReaderArgument[])
        .map(printArgument)
        .join(", ")})`;
}
*/

function printSelection(node: ReaderSelection): string {
  switch (node.kind) {
    case "LinkedField": {
      let field = node as ReaderLinkedField;
      return `
        LinkedField
          .builder()
          .name(${str(field.name)})
          .alias(${str(field.alias ?? field.name)})
          .selections(${printSelections(field.selections)})
          .build()
      `;
    }

    case "ScalarField": {
      let field = node as ReaderScalarField;
      return `
        ScalarField
          .builder()
          .name(${str(field.name)})
          .alias(${str(field.alias ?? field.name)})
          .build()
      `;
    }

    case "Condition": {
      let field = node as ReaderCondition;
      return `
        Condition
          .builder()
          .condition(${str(field.condition)})
          .passingValue(${field.passingValue})
          .selections(${printSelections(field.selections)})
          .build()
      `;
    }

    case "Fragment": {
      let field = node as ReaderFragment;
      return `
        Fragment
          .builder()
          .name(${str(field.name)})
          .metadata(${printFragmentMetadata(field)})
          .selections(${printSelections(field.selections)})
          .build()
      `;
    }

    case "InlineFragment": {
      let field = node as ReaderInlineFragment;
      return `
        InlineFragment
          .builder()
          .type(${str(field.type)})
          .selections(${printSelections(field.selections)})
          .build()
      `;
    }

    case "InlineDataFragment": {
      let field = node as ReaderInlineDataFragment;
      return `
        InlineDataFragment
          .builder()
          .name(${str(field.name)})
          .build()
      `;
    }

    case "FragmentSpread": {
      let field = node as ReaderFragmentSpread;
      return `
        FragmentSpread
          .builder()
          .name(${str(field.name)})
          .build()
      `;
    }

    case "InlineDataFragmentSpread": {
      let field = node as ReaderInlineDataFragmentSpread;

      return `
        InlineDataFragmentSpread
          .builder()
          .name(${str(field.name)})
          .selections(${printSelections(field.selections)})
          .build()
      `;
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

function printSelections(
  selections: readonly ReaderSelection[] | ReaderSelection[]
) {
  return `Arrays.asList(${(selections as ReaderSelection[])
    .map(printSelection)
    .join(", ")})`;
}

function printFragmentMetadata(fragment: ReaderFragment) {
  return `
    FragmentMetadata
      .builder()
      .plural(${fragment.metadata?.plural ?? false})
      .mask(${fragment.metadata?.mask ?? true})
      .build()
  `;
}

/**
 * Converts Relay IR AST to Java code
 * @param node
 */
export function print(
  node: GeneratedNode | ReaderFragmentSpread | ReaderFragment
): string {
  switch (node.kind) {
    case "InlineDataFragment": {
      node = node as ReaderInlineDataFragment;
      return `
        public class ${node.name} extends InlineDataFragment {
          public ${node.name}() {
            super(${str(node.name)});
          }
        }
      `;
    }
    case "Fragment": {
      node = node as ReaderFragment;
      return `
        public class ${node.name} extends Fragment {
          public ${node.name}() {
            super(
              ${str(node.name)},
              ${printFragmentMetadata(node)},
              ${printSelections(node.selections)}
            );
          }
        }
      `;
    }

    case "Request": {
      node = node as ConcreteRequest;
      return `
        public class ${node.params.name} extends Request {
          public ${node.params.name}() {
            super(${str(node.params.name)}, ${printSelection(node.fragment)});
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
