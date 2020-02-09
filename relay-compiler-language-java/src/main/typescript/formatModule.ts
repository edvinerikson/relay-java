import { FormatModule } from "relay-compiler";
import { print } from "./codegen";
import { format } from "prettier";

export function formatModuleFactory({
  packageName
}: {
  packageName: string;
}): FormatModule {
  const formatModule: FormatModule = ({ docText, node }) => {
    const module = `package ${packageName};
  import dev.wennerdahl.relay.compiler.language.java.runtime.*;
  /**
  ${docText}
  */

  ${print(node)}
  `;

    return format(module, {
      filepath: "source.java",
      plugins: [require("prettier-plugin-java")]
    });
  };
  return formatModule;
}
