import type { Visitor } from '@babel/traverse';
import { Babel } from '../types';
export declare const createVariableDeclaratorVisitor: ({ types: t, }: Babel) => Visitor['VariableDeclaration'];
