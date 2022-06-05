import { execFile } from 'child_process';
import { fileURLToPath } from 'url';

export const spawnChildProcess = async (args) => {
    // You should implement several functions in dedicated files

    // cp.js - implement function spawnChildProcess that receives array of arguments args
    // and creates child process from file script.js, passing these args to it
    // This function should create IPC-channel between stdin and stdout of master process and child process:
    // child process stdin should receive input from master process stdin
    // child process stdout should send data to master process stdout

    const path = fileURLToPath(new URL('./files/script.js', import.meta.url));

    console.log(path);

    console.log('test');

    const child = execFile('node', [path, ...args], (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        console.log(stdout);
    });

      child.stdin.write('test', console.log);


    process.on('SIGINT', () => {
        child.kill('SIGINT');
    })
};

spawnChildProcess(['--first', 'value', '--second', 'unknown']);