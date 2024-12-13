// -- -- basic preact -- --

import { 
  h,
  Component,
  createContext,
  render
} from 'preact';
import {
  useState, useReducer, useEffect, useLayoutEffect, useRef,
  useImperativeHandle, useMemo, useCallback, useContext, useDebugValue
} from 'preact/hooks';
import htm from 'htm';

const html = htm.bind(h);

export { 
  h,
  html,
  render,
  Component,
  createContext,
  useState,
  useReducer,
  useEffect,
  useLayoutEffect,
  useRef,
  useImperativeHandle,
  useMemo,
  useCallback,
  useContext,
  useDebugValue,
};

// -- - linkstate -- --

import linkState from 'linkstate';
export { linkState };

// -- -- mitt -- --

import mitt from 'mitt';
export { mitt };

// -- -- custom element -- --

import registerCustomElement from 'preact-custom-element';
export { registerCustomElement };

// -- -- wouter -- --

export * as wouter from 'wouter-preact';
// import {
//   useRouter, useLocation, useRoute, Router, Route, Link, Switch, Redirect
// } from "wouter-preact";
// export const wouter = {
//   useRouter,
//   useLocation,
//   useRoute,
//   Router,
//   Route,
//   Link,
//   Switch,
//   Redirect
// };

// -- -- mobx lite -- --

// export * as mobxLite from 'mobx-react';
// import {
//   isUsingStaticRendering, useStaticRendering,
//   observer,
//   useObserver,
//   Observer,
//   useForceUpdate,
//   useAsObservableSource,
//   useLocalStore,
//   useQueuedForceUpdate,
//   observerBatching,
// } from 'mobx-react-lite/es';
// export const mobxLite = {
//   isUsingStaticRendering, useStaticRendering,
//   observer,
//   useObserver,
//   Observer,
//   useForceUpdate,
//   useAsObservableSource,
//   useLocalStore,
//   useQueuedForceUpdate,
//   observerBatching,
// };
