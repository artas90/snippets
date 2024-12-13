import { Signal, signal, useSignal } from "@preact/signals-react";
import { Fragment, Key, useRef, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

// -- lib -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -

const randomId = () => (Math.random() + 1).toString(36).substring(2);

type SignalOrType<T> = T | Signal<T>;

const defaultkeyFn = (_: any, idx: any) => idx;

function For<T extends readonly unknown[], U extends JSX.Element>({
  each,
  children,
  fallback = null,
  keyFn = defaultkeyFn,
}: {
  each: SignalOrType<T | undefined | null>;
  children: (item: T[number], index?: number) => U;
  fallback?: JSX.Element | null;
  keyFn?: (item: T[number], index?: number) => Key;
}) {
  console.log("For each-isSignal =", each instanceof Signal, each);
  each = (each instanceof Signal ? each.value : each) || ([] as unknown as T);
  return !each ? (
    fallback
  ) : (
    <>
      {each.map((it, i) => {
        return <Fragment key={keyFn(it, i)}>{children(it, i)}</Fragment>;
      })}
    </>
  );
}

// -- store -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

type Item = {
  id: string;
};

class Store {
  #items = signal([] as Item[]);

  get signal() {
    return this.#items;
  }

  get items() {
    return this.#items.value;
  }

  addItem() {
    const item = { id: randomId() };
    this.#items.value = [...this.#items.value, item];
  }

  removeItem(id: string) {
    this.#items.value = this.#items.value.filter((it) => it.id !== id);
  }

  static useRef() {
    console.log("static useRef");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = useRef<Store>();
    if (!ref.current) ref.current = new Store();
    return ref.current;
  }
}

// -- components -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- - -

function Counter1() {
  const ref = useRef<string>();
  if (!ref.current) ref.current = randomId();

  console.log("Counter1", ref.current, "-", randomId(), ref);

  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
    </>
  );
}

function Counter2({ item, onRemove }: { item?: Item, onRemove?: any }) {
  console.log("Counter2", item?.id);

  const count = useSignal(0);
  return (
    <>
      {item?.id}
      <button onClick={() => (count.value = count.value + 1)}>
        count2 is {count}
      </button>
      {onRemove && <button onClick={onRemove(item)}>x</button>}
    </>
  );
}

const itemIdKey = (it: Item) => it.id;

function MyList({
  items,
  signalPassthrough,
  onRemove,
}: {
  items: SignalOrType<Item[]>;
  signalPassthrough?: boolean;
  onRemove?: any;
}) {
  console.log("MyList items-isSignal =", items instanceof Signal);
  items = items instanceof Signal && !signalPassthrough ? items.value : items;
  return (
    <For each={items} keyFn={itemIdKey} fallback={<p>fallback</p>}>
      {(item, i) => (
        <div>
          {i} - <Counter2 item={item} onRemove={onRemove} />
        </div>
      )}
    </For>
  );
}

// -- app -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -

const store1 = new Store();

export default function App() {
  const store2 = Store.useRef();
  const store3 = Store.useRef();

  const onRemove3 = (item: Item) => store3.removeItem(item.id);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img src={reactLogo} className="logo preact" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Counter1 />

        <hr />

        <Counter2 item={{ id: "static" }} />

        <hr />

        <MyList items={store1.items} />
        <button onClick={() => store1.addItem()}>add counter</button>

        <hr />

        <MyList items={store2.signal} />
        <button onClick={() => store2.addItem()}>add counter</button>

        <hr />

        <MyList items={store3.signal} signalPassthrough={true} onRemove={onRemove3}/>
        <button onClick={() => store3.addItem()}>add counter</button>

        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
