import type { Visitor } from '@babel/traverse';
import { Babel } from './types';
export default function ssrRefPlugin(babel: Babel): {
    visitor: Visitor<{}>;
};
