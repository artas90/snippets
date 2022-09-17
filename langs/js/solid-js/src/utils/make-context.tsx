import { Context, createContext, useContext, ParentComponent } from "solid-js";
import { tuple } from "./utils";


export default function makeContext<ContextState, ContextValue>(
  getCtx: (props: Partial<ContextState>) => ContextValue
) {
  const Context = createContext<ContextValue>() as Context<ContextValue>;

  const Provider: ParentComponent<Partial<ContextState>> = (props) =>
    <Context.Provider value={getCtx(props)}>
        {props.children}
    </Context.Provider>;

  return tuple(Provider, () => useContext(Context))
}
