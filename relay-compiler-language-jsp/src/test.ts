let currentPath: string[] = [];
const m = new Proxy<any>(
  {},
  {
    get(target, p, r) {
      if (p === "construct") {
        const str = currentPath.join(".");
        currentPath = [];
        return () => {
          return str;
        };
      }
      // console.log(p);
      // console.log("asd", target, p, r);
      currentPath.push(p);
      function f(...args: string[]) {
        console.log(currentPath);
        console.log(p);
        currentPath.pop();
        // console.log(p);
        let t = p + "(" + args.join(", ") + ")";
        // console.log(args);
        // Array.prototype.join.apply(args);
        currentPath.push(t);
        // currentPath.push(...args);
        // console.log(args);
        return proxy;
      }
      const proxy = new Proxy(f, this);

      return proxy;
    }
  }
);

// console.log(m.LinkedField);

console.log(
  m.LinkedField.builder()
    .name()
    .args(
      m.Arrays.asList(
        m.Argument.builder()
          .name()
          .build()
          .construct()
      ).construct()
    )
    .build()
    .construct()
);
