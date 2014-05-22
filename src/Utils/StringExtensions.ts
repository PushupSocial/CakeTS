module CakeTS.Utils {
    export class StringExtensions {
        private static IsUpperCase(text: string): boolean {
            return text.match(/^[A-Z]+$/) != null;
        }

        private static MakeInitialLowerCase(word: string): string {
            return word.substring(0, 1).toLowerCase() + word.substring(1);
        }

        private static ToPascalCase(text: string, removeUnderscores: boolean): string {
            if (text == null || text === "") {
                return text;
            }

            text = text.replace("_", "");
            var words: string[] = text.split(" ");

            if (words.length > 1 || StringExtensions.IsUpperCase(words[0])) {
                for (var i: number = 0; i < words.length; i++) {
                    if (words[i].length > 0) {
                        var word: string = words[i];
                        var restOfWord: string = word.substring(1);

                        if (StringExtensions.IsUpperCase(restOfWord)) {
                            restOfWord = restOfWord.toLowerCase();
                        }

                        words[i] = word.substring(0, 1).toUpperCase() + restOfWord;
                    }
                }

                return words.join(removeUnderscores ? "" : "_");
            }

            return words[0].substring(0, 1).toUpperCase() + words[0].substring(1);
        }

        private static ToCamelCase(value: string): string {
            return StringExtensions.MakeInitialLowerCase(StringExtensions.ToPascalCase(value, true));
        }

        private static AddUnderscores(pascalCasedWord: string): string {
            return pascalCasedWord
                .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
                .replace(/([a-z\d])([A-Z])/g, "$1_$2")
                .replace(/[-\s]/g, "_");
        }

        private static AddDashes(pascalCasedWord: string): string {
            return pascalCasedWord
                .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
                .replace(/([a-z\d])([A-Z])/g, "$1-$2")
                .replace(/[\s]/g, "-");
        }

        private static AddUnderscorePrefix(pascalCasedWord: string): string {
            return "_" + pascalCasedWord;
        }

        public static GetNameVariants(name: string): string[] {
            return [
                name,
                StringExtensions.ToCamelCase(name),
                name.toLowerCase(),
                StringExtensions.AddUnderscores(name),
                StringExtensions.AddUnderscores(name).toLowerCase(),
                StringExtensions.AddDashes(name),
                StringExtensions.AddDashes(name).toLowerCase(),
                StringExtensions.AddUnderscorePrefix(name),
                StringExtensions.AddUnderscorePrefix(StringExtensions.ToCamelCase(name))
            ];
        }
    }
}