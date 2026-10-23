import { formatJavaScript, isFormatted } from '../src/formatter.js';

const source = 'function greet(name){return "Hello, "+name}';
const formatted = await formatJavaScript(source);

console.log('Before Prettier:\n' + source);
console.log('\nFormatting check before:', await isFormatted(source));
console.log('\nAfter Prettier:\n' + formatted);
console.log('Formatting check after:', await isFormatted(formatted));
