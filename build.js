import * as esbuild from 'esbuild';
import { existsSync, mkdirSync } from 'fs';

if (!existsSync('dist')) {
  mkdirSync('dist');
}

const baseConfig = {
  bundle: true,
  platform: 'neutral',
  format: 'esm',
  splitting: true,
  sourcemap: true,
  minify: true,
  target: 'es2020',
  outdir: 'dist',
  external: ['react', 'react-dom'],
};

const entryPoints = [
  'src/index.ts',
  'src/api.ts',
  'src/form.ts',
  'src/node.ts',
  'src/router.ts',
  'src/cli.ts',
];

async function build() {
  try {
    await esbuild.build({
      ...baseConfig,
      entryPoints,
    });
    console.log('Build completed successfully');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
