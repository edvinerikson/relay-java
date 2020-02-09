import {
  PluginInterface,
  GraphQLTag,
  GraphQLTagFinder,
  TypeGenerator
} from "relay-compiler/lib/language/RelayLanguagePluginInterface";
import formatModule from "./formatModule";

const noopFindGraphQLTags: GraphQLTagFinder = (): GraphQLTag[] => [];
const noopTypeGenerator: TypeGenerator = {
  generate: (schema, node) => "",
  transforms: []
};
export default function plugin(): PluginInterface {
  return {
    inputExtensions: ["java"],
    outputExtension: "java",
    findGraphQLTags: noopFindGraphQLTags,
    formatModule: formatModule,
    typeGenerator: noopTypeGenerator
  };
}
