import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Package Structure', () => {
  it('should have all required dist files', () => {
    const distPath = join(__dirname, '..', 'dist');
    const requiredFiles = [
      'index.js', 'index.d.ts',
      'api.js', 'api.d.ts',
      'form.js', 'form.d.ts',
      'node.js', 'node.d.ts',
      'router.js', 'router.d.ts',
      'cli.js'
    ];
    
    for (const file of requiredFiles) {
      const filePath = join(distPath, file);
      expect(() => readFileSync(filePath, 'utf-8')).not.toThrow();
    }
  });

  it('index.js should export Form', () => {
    const indexPath = join(__dirname, '..', 'dist', 'index.js');
    const content = readFileSync(indexPath, 'utf-8');
    expect(content).toContain('Form');
  });

  it('package.json should have valid exports', () => {
    const pkgPath = join(__dirname, '..', 'package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    
    expect(pkg.exports['.']).toBeDefined();
    expect(pkg.exports['./api']).toBeDefined();
    expect(pkg.exports['./form']).toBeDefined();
    expect(pkg.exports['./node']).toBeDefined();
    expect(pkg.exports['./router']).toBeDefined();
  });

  it('cli.js should be executable', () => {
    const cliPath = join(__dirname, '..', 'dist', 'cli.js');
    const content = readFileSync(cliPath, 'utf-8');
    expect(content.startsWith('#!/usr/bin/env node')).toBe(true);
  });
});
