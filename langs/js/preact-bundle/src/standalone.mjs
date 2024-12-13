// based on https://github.com/developit/htm/blob/master/src/integrations/preact/standalone.mjs

import { h, Component, createContext, render } from 'preact';
import {
    useState, useReducer, useEffect, useLayoutEffect, useRef, useImperativeHandle, useMemo,
    useCallback, useContext, useDebugValue
} from 'preact/hooks';
import htm from '../../index.mjs';

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
  