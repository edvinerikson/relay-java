import {
  GraphQLTag,
  GraphQLTagFinder
} from "relay-compiler/lib/language/RelayLanguagePluginInterface";
import {
  parse,
  Attribute,
  DefaultTreeElement,
  DefaultTreeTextNode
} from "parse5";
import walk from "walk-parse5";

import invariant from "invariant";

const GRAPHQL_TEXT_TAG = "graphql:text";
const GRAPHQL_FRAGMENT_NAME_PROPERTY = "key";

function findAttribute(
  key: string,
  node: DefaultTreeElement
): Attribute | null {
  const attr = node.attrs.find(({ name }) => key === name);
  return attr ?? null;
}

export const find: GraphQLTagFinder = (text, filePath) => {
  const tags: GraphQLTag[] = [];
  const document = parse(text, {
    sourceCodeLocationInfo: true
  });
  walk(document, node => {
    if (node.tagName === GRAPHQL_TEXT_TAG) {
      invariant(node.childNodes.length === 1, "Expected only one text node");
      let childNode = node.childNodes[0];
      invariant(
        childNode.nodeName === "#text",
        "Expected text node, but got %s",
        childNode.nodeName
      );
      let textNode = childNode as DefaultTreeTextNode;
      let text = textNode.value;
      invariant(text.trim() !== "", "Must contain graphql document");
      let sourceLocation = textNode.sourceCodeLocation;
      invariant(sourceLocation != null, "No source location found");

      let keyName =
        findAttribute(GRAPHQL_FRAGMENT_NAME_PROPERTY, node)?.value ?? null;
      invariant(keyName != null, "Found graphql text without key set.");

      const tag: GraphQLTag = {
        keyName,
        template: text,
        sourceLocationOffset: {
          line: sourceLocation.startLine,
          column: sourceLocation.startCol
        }
      };

      tags.push(tag);
    }
  });

  return tags;
};
