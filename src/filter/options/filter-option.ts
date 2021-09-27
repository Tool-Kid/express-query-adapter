export abstract class FilterOption {
  public abstract setOption(
    query: { expressQuery: any, typeORMQuery: any }
  ): void;
}
