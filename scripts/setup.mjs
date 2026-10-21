import {mkdir,copyFile,readdir} from 'node:fs/promises';
const source='node_modules/@mediapipe/face_detection';
await mkdir('public/vendor',{recursive:true});
for(const file of await readdir(source))if(/\.(js|wasm|data|tflite|binarypb)$/.test(file))await copyFile(`${source}/${file}`,`public/vendor/${file}`);
