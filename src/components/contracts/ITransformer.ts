

export default interface ITransformer<T> {
  transform: (item: T) => any
  collection: (items: T[]) => any
}