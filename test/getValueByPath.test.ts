import { describe, expect, test } from 'vitest';
import { getValueByPath } from '../src/getValueByPath';

describe('getValueByPath', () => {
  const data = {
    user: {
      profile: {
        name: 'Alice',
        age: 30,
        contact: {
          email: 'alice@example.com',
          phones: ['123-456', '789-012']
        }
      },
      active: true
    },
    posts: [
      { id: 1, title: 'Post One' },
      { id: 2, title: 'Post Two' }
    ],
    empty: null
  };

  test('should get a top-level value', () => {
    expect(getValueByPath(data, 'user')).toEqual(data.user);
  });

  test('should get a deeply nested value with default dot separator', () => {
    expect(getValueByPath(data, 'user.profile.name')).toBe('Alice');
    expect(getValueByPath(data, 'user.profile.contact.email')).toBe('alice@example.com');
  });

  test('should access array item with dot separator', () => {
    expect(getValueByPath(data, 'user.profile.contact.phones.0')).toBe('123-456');
    expect(getValueByPath(data, 'posts.1.title')).toBe('Post Two');
  });

  test('should return undefined for non-existent path', () => {
    expect(getValueByPath(data, 'user.profile.location.city')).toBeUndefined();
    expect(getValueByPath(data, 'non.existing.key')).toBeUndefined();
  });

  test('should return null if value is null', () => {
    expect(getValueByPath(data, 'empty')).toBeNull();
  });

  test('should return the whole object for empty path', () => {
    expect(getValueByPath(data, '')).toEqual(data);
  });

  test('should work with custom separator "/"', () => {
    expect(getValueByPath(data, 'user/profile/name', '/')).toBe('Alice');
    expect(getValueByPath(data, 'user/profile/contact/phones/1', '/')).toBe('789-012');
  });

  test('should work with custom separator "-"', () => {
    const custom = { a: { b: { c: 1 } } };
    expect(getValueByPath(custom, 'a-b-c', '-')).toBe(1);
  });

  test('should return undefined if using wrong separator', () => {
    expect(getValueByPath(data, 'user/profile/name')).toBeUndefined(); // default is dot
  });

  test('should handle incorrect types gracefully', () => {
    expect(getValueByPath(undefined, 'a.b')).toBeUndefined();
    expect(getValueByPath(null, 'a.b')).toBeUndefined();
    expect(getValueByPath(123 as any, 'a.b')).toBeUndefined();
  });
});
