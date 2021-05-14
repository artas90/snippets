type Pipe = () => {};
type Component = () => {};

export const fakePipe = (name: string) => {
  let result = {value: undefined};

  @Pipe({name})
  class FakePipe {
    static returns(fakeResult: any): void {
      result.value = fakeResult;
    }

    static reset(): void {
      result.value = undefined;
    }

    transform(): any {
      return result.value;
    }
  }

  return <any> FakePipe;
};

export const fakeComponent = (selector: string, uniqInputName = 'name') => {
  @Component({
    selector,
    template: `<div id="{{ ${uniqInputName} }}"></div>`
  })
  class FakeComponent {}

  Input(uniqInputName)(FakeComponent.prototype, uniqInputName);

  return <any> FakeComponent;
};
