interface JSON {
    parse(
        text: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reviver?: (this: any, key: string, value: any) => any
    ): unknown;
}
