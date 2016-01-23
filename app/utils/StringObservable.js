import Rx from 'rx'

export default class StringObservable {
  static split(observable, regex) {
    return Rx.Observable.create((observer) => {
      let leftOver = ''

      function onNext(segment) {
        const parts = segment.split(regex)
        parts[0] = leftOver + parts[0]
        leftOver = parts.pop()
        parts.forEach(part => observer.onNext(part))
      }

      function onError(err) {
        observer.onNext(leftOver)
        observer.onError(err)
      }

      function onCompleted() {
        observer.onNext(leftOver)
        observer.onCompleted()
      }

      observable.subscribe(onNext, onError, onCompleted)
    })
  }
}
