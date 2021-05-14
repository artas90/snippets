class BulkUploadService {
  uploadQueue(ioId: number, agreementId: number): Observable<IAgreement> {
    return Observable.from([...this.queue])
      .concatMap((file: File) => 
        Observable
          .defer(() => this.addAttachment())
          .do(() => this.queue.shift(); // reduce q;
      );
  }
  
  addAttachment() {
    return Observable.fromPromise(...);
  }
}
