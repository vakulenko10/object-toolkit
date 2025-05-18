import { describe, it, expect } from 'vitest';
import { findDeepByPredicate } from '../src/findDeepByPredicate';

describe('findDeepByPredicate - robust usage', () => {
  // ✅ BASIC MATCHING

  it('matches keys by name only', () => {
    const input = {
      user: { name: 'Alice', age: 30 },
      meta: { name: 'Admin' }
    };

    const result = findDeepByPredicate(input, (key) => key === 'name');

    expect(result).toEqual({
      'user.name': 'Alice',
      'meta.name': 'Admin'
    });
  });

  it('matches values that are strings', () => {
    const input = {
      a: 'hello',
      b: 123,
      c: { d: 'world', e: true }
    };

    const result = findDeepByPredicate(input, (_, value) => typeof value === 'string');

    expect(result).toEqual({
      'a': 'hello',
      'c.d': 'world'
    });
  });

  // ✅ EDGE VALUES

  it('includes falsy values that pass predicate', () => {
    const input = {
      a: 0,
      b: false,
      c: '',
      d: null,
      e: undefined
    };

    const result = findDeepByPredicate(input, (_, val) => val === 0 || val === '');

    expect(result).toEqual({
      'a': 0,
      'c': ''
    });
  });

  // ✅ ARRAY TRAVERSAL

  it('traverses arrays and includes array indices in path', () => {
    const input = {
      users: [
        { name: 'Alice', active: true },
        { name: 'Bob', active: false },
        { name: 'Charlie', active: true }
      ]
    };

    const result = findDeepByPredicate(input, (key, val) => key === 'active' && val === true);

    expect(result).toEqual({
      'users.0.active': true,
      'users.2.active': true
    });
  });

  // ✅ REAL-WORLD OBJECT STRUCTURE

  it('finds all fields related to credentials', () => {
    const input = {
      session: {
        token: 'abc123',
        expires: '2025-01-01'
      },
      user: {
        username: 'john',
        password: 'secret'
      },
      config: {
        refreshToken: 'xyz456',
        nested: {
          apiKey: 'secure',
          irrelevant: 1
        }
      }
    };

    const result = findDeepByPredicate(input, (key) => /token|password|apiKey/i.test(key));

    expect(result).toEqual({
      'session.token': 'abc123',
      'user.password': 'secret',
      'config.refreshToken': 'xyz456',
      'config.nested.apiKey': 'secure'
    });
  });

  // ✅ DEEP NESTING

  it('handles deeply nested structures', () => {
    const input = {
      a: {
        b: {
          c: {
            d: {
              e: {
                target: 42
              }
            }
          }
        }
      }
    };

    const result = findDeepByPredicate(input, (key) => key === 'target');

    expect(result).toEqual({
      'a.b.c.d.e.target': 42
    });
  });

  // ✅ CIRCULAR REFERENCES

  it('safely handles circular references', () => {
    const a: any = { id: 1, ref: null };
    const b: any = { id: 2, ref: a };
    a.ref = b; // a ↔ b (circular)

    const input = {
      root: a,
      extra: { id: 3 }
    };

    const result = findDeepByPredicate(input, (key, val) => key === 'id' && typeof val === 'number');

    expect(result).toEqual({
      'root.id': 1,
      'root.ref.id': 2,
      'extra.id': 3
    });
  });

  // ✅ MATCHES BY BOTH KEY AND VALUE

  it('matches where key is "status" and value is "active"', () => {
    const input = {
      user: { status: 'active' },
      profile: { status: 'inactive' },
      system: { mode: 'active' }
    };

    const result = findDeepByPredicate(input, (key, val) => key === 'status' && val === 'active');

    expect(result).toEqual({
      'user.status': 'active'
    });
  });

  // ✅ NON-MATCH CASE

  it('returns empty object when no predicate matches', () => {
    const input = {
      a: 1,
      b: { c: 2 }
    };

    const result = findDeepByPredicate(input, (k, v) => k === 'x' || v === 999);

    expect(result).toEqual({});
  });

});
