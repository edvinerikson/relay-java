import {
  PluginInterface,
  GraphQLTag,
  GraphQLTagFinder,
  TypeGenerator
} from "relay-compiler/lib/language/RelayLanguagePluginInterface";
import { formatModuleFactory } from "./formatModule";
import { loadConfig } from "relay-config";
import invariant from "invariant";

const noopFindGraphQLTags: GraphQLTagFinder = (): GraphQLTag[] => [];
const noopTypeGenerator: TypeGenerator = {
  generate: (schema, node) => "",
  transforms: []
};

export { formatModuleFactory };

export default function plugin(): PluginInterface {
  const config = loadConfig();
  invariant(
    config?.artifactDirectory != null,
    "Must set artifactDirectory to use relay-compiler-language-java."
  );
  const artifactDirectory = config.artifactDirectory;
  const packageName = artifactDirectory.split("/").join(".");

  return {
    inputExtensions: ["java"],
    outputExtension: "java",
    findGraphQLTags: noopFindGraphQLTags,
    formatModule: formatModuleFactory({ packageName }),
    typeGenerator: noopTypeGenerator
  };
}
