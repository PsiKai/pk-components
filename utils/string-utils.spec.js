import { pascalize } from "./string-utils.js"

describe("pascalize", () => {
  describe("should convert a string to pascal case", () => {
    it("from camel case", () => {
      expect(pascalize("fooBar")).toBe("FooBar")
    })
    it("from snake case", () => {
      expect(pascalize("foo_bar")).toBe("FooBar")
    })
    it("from kebab case", () => {
      expect(pascalize("foo-bar")).toBe("FooBar")
    })
    it("from space case", () => {
      expect(pascalize("foo bar")).toBe("FooBar")
    })
    it("from pascal case", () => {
      expect(pascalize("FooBar")).toBe("FooBar")
    })
    it("from lower case", () => {
      expect(pascalize("foo")).toBe("Foo")
    })
    it("from mixed case", () => {
      expect(pascalize("foo_BarBAZ-buzz")).toBe("FooBarBAZBuzz")
    })
  })
})
