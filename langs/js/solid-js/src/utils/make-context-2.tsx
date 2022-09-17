import { Context, createContext, useContext, ParentComponent } from "solid-js";
import { createStore, SetStoreFunction, Store, StoreNode } from "solid-js/store";

type GetStateFn<State> = (props: Partial<State>) => Store<State>

type GetActionsFn<State, Actions> = (state: State, setState: SetStoreFunction<State>) => Actions

export default function makeContext<State, Actions>(
  getState: GetStateFn<State>,
  getActions: GetActionsFn<State, Actions>
) {
  const Context = createContext() as Context<[State, Actions]>;

  const Provider: ParentComponent<State> = (props) => {
    const [state, setState] = createStore<any>(getState(props)) as [State, SetStoreFunction<State>];
    const actions = getActions(state, setState);

    return (
      <Context.Provider value={[state, actions]}>
        {props.children}
      </Context.Provider>
    );
  }

  const use = () => useContext(Context);

  return [Provider, use] as [typeof Provider, typeof use];
}
