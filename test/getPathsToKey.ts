import { describe, it, expect } from 'vitest';
import { getPathsToKey } from '../src/getPathsToKey';

describe('getPathsToKey - basic and complex usage', () => {
  // ✅ BASIC TESTS

  it('returns path for a shallow key', () => {
    const input = { name: 'Alice' };
    expect(getPathsToKey(input, 'name')).toEqual(['name']);
  });

  it('returns path for a deeply nested key', () => {
    const input = { a: { b: { c: { name: 'A' } } } };
    expect(getPathsToKey(input, 'name')).toEqual(['a.b.c.name']);
  });

  it('returns multiple paths for repeated key', () => {
    const input = {
      user: { name: 'Alice' },
      meta: { name: 'Author' },
      extra: {
        fields: {
          profile: { name: 'Deep' }
        }
      }
    };
    expect(getPathsToKey(input, 'name')).toEqual([
      'user.name',
      'meta.name',
      'extra.fields.profile.name'
    ]);
  });

  it('returns empty array if key does not exist', () => {
    const input = { a: 1, b: { c: 2 } };
    expect(getPathsToKey(input, 'notHere')).toEqual([]);
  });

  // ✅ INTERMEDIATE TESTS

  it('handles arrays and includes index in path', () => {
    const input = {
      users: [
        { name: 'Alice' },
        { name: 'Bob' },
        { name: 'Carol' }
      ]
    };
    expect(getPathsToKey(input, 'name')).toEqual([
      'users.0.name',
      'users.1.name',
      'users.2.name'
    ]);
  });

  it('handles arrays of nested objects', () => {
    const input = {
      posts: [
        { meta: { title: 'Post 1' } },
        { meta: { title: 'Post 2' } }
      ],
      footer: {
        meta: { title: 'Footer Info' }
      }
    };
    expect(getPathsToKey(input, 'title')).toEqual([
      'posts.0.meta.title',
      'posts.1.meta.title',
      'footer.meta.title'
    ]);
  });

  // ✅ ADVANCED TESTS

  it('works with complex deeply nested form-like schema', () => {
    const input = {
      form: {
        sections: [
          {
            title: 'Section A',
            fields: [
              { label: 'First Name', key: 'first_name' },
              { label: 'Last Name', key: 'last_name' }
            ]
          },
          {
            title: 'Section B',
            fields: [
              { label: 'Email', key: 'email' },
              { label: 'Password', key: 'password' }
            ]
          }
        ],
        metadata: {
          createdBy: 'admin',
          audit: { key: 'form_created' }
        }
      }
    };
    expect(getPathsToKey(input, 'key')).toEqual([
      'form.sections.0.fields.0.key',
      'form.sections.0.fields.1.key',
      'form.sections.1.fields.0.key',
      'form.sections.1.fields.1.key',
      'form.metadata.audit.key'
    ]);
  });

  it('finds key even when mixed in arrays and objects at same level', () => {
    const input = {
      data: [
        { name: 'Entry A', meta: { name: 'Meta A' } },
        'ignored string',
        {
          name: 'Entry B',
          details: [{ name: 'Nested' }, { other: 1 }]
        }
      ],
      name: 'Top-level'
    };
    expect(getPathsToKey(input, 'name')).toEqual([
      'data.0.name',
      'data.0.meta.name',
      'data.2.name',
      'data.2.details.0.name',
      'name'
    ]);
  });

  it('safely handles circular references', () => {
    const a: any = { label: 'root' };
    const b: any = { label: 'child', next: a };
    a.next = b; // circular

    const input = {
      node: a,
      meta: { label: 'footer' }
    };

    expect(() => getPathsToKey(input, 'label')).not.toThrow();
    expect(getPathsToKey(input, 'label')).toEqual([
      'node.label',
      'meta.label'
    ]);
  });

  it('finds all "config" keys in a deeply nested UI config tree', () => {
    const input = {
      layout: {
        config: { type: 'grid' },
        rows: [
          {
            config: { spacing: 'md' },
            columns: [
              { config: { width: 6 } },
              { config: { width: 6 } }
            ]
          }
        ]
      }
    };
    expect(getPathsToKey(input, 'config')).toEqual([
      'layout.config',
      'layout.rows.0.config',
      'layout.rows.0.columns.0.config',
      'layout.rows.0.columns.1.config'
    ]);
  });

});
