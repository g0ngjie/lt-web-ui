import path from 'path'
import nodeResolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import merge from "lodash.merge";
import pkg from "./package.json";
import rollupTypescript from "rollup-plugin-typescript2";
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';

const extensions = ['.ts'];

const resolve = (...args) => path.resolve(__dirname, ...args)

// Static assets will vary depending on the application
const copyConfig = {
  targets: [
    { src: 'node_modules/@webcomponents', dest: 'build-modern/node_modules' },
    { src: 'images', dest: 'build-modern' },
    { src: 'data', dest: 'build-modern' },
    { src: 'index.html', dest: 'build-modern' },
  ],
};

// 打包任务的个性化配置
const jobs = {
  // build:umd - 编译出符合 umd 规范的可执行文件，供 jQuery、Vue、NodeJS 等项目使用
  umd: {
    output: {
      format: 'umd',
      file: resolve(pkg.main),
      name: 'lib',
    },
  },
  // build:min - 编译出符合 umd 规范的压缩的可执行文件
  min: {
    output: {
      format: 'umd',
      file: resolve(pkg.main.replace(/(.\w+)$/, '.min$1')),
      name: 'lib',
    },
    plugins: [terser()],
  },
  esm: {
    output: {
      format: 'esm',
      file: resolve(pkg.module),
      name: 'lib',
    }
  },
};

// ts
const tsPlugin = rollupTypescript({
  tsconfig: resolve('./tsconfig.prod.json'), // 导入本地ts配置
  extensions
})

// 从环境变量获取打包特征
const mergeConfig = jobs[process.env.FORMAT || 'esm'];

export default merge(
  {
    input: resolve('./src/index.ts'),
    output: {
      // dir: 'build-modern/src/components',
      // format: 'es',
    },
    plugins: [
      minifyHTML(),
      nodeResolve({
        extensions,
        modulesOnly: true,
      }),
      copy(copyConfig),
      tsPlugin,
    ],
  },
  mergeConfig,
);
