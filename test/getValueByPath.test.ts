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

  test('should get a deeply nested value', () => {
    expect(getValueByPath(data, 'user.profile.name')).toBe('Alice');
    expect(getValueByPath(data, 'user.profile.contact.email')).toBe('alice@example.com');
  });

  test('should access array inside object', () => {
    expect(getValueByPath(data, 'user.profile.contact.phones.0')).toBe('123-456');
    expect(getValueByPath(data, 'posts.1.title')).toBe('Post Two');
  });

  test('should return undefined for non-existent path', () => {
    expect(getValueByPath(data, 'user.profile.location.city')).toBeUndefined();
    expect(getValueByPath(data, 'user.profile.contact.phones.5')).toBeUndefined();
    expect(getValueByPath(data, 'non.existent.path')).toBeUndefined();
  });

  test('should return null if value is null', () => {
    expect(getValueByPath(data, 'empty')).toBeNull();
  });

  test('should handle empty path', () => {
    expect(getValueByPath(data, '')).toEqual(data); // path '' means return root
  });

  test('should handle path pointing to array', () => {
    expect(getValueByPath(data, 'posts')).toEqual(data.posts);
  });

  test('should handle incorrect types gracefully', () => {
    expect(getValueByPath(undefined, 'a.b')).toBeUndefined();
    expect(getValueByPath(null, 'a.b')).toBeUndefined();
    expect(getValueByPath(42 as any, 'a.b')).toBeUndefined();
  });
});