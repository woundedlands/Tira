export const common = {
    classToFunction<T extends {new(...args: any): any}>(target: T) {
        return function (...args: ConstructorParameters<T>) {
            return new target(args)
        }
    }
} as const