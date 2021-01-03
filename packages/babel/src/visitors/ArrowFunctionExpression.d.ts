import type { Visitor } from '@babel/traverse';
import { Babel } from '../types';
export declare const createArrowFunctionExpressionVisitor: ({ types: t, }: Babel) => Visitor['ArrowFunctionExpression'];
