# crypto

Command line cryptographic app

## s-des-algorithm CLI App
To run the application do the following steps:

1. Type `npm run build` in command line to build the project.
2. Type `npm install -g` to install script globally. Now you can run it from anywhere with just typing `s-des` followed with command line arguments.

### Encryption example
Typing `s-des -v qwerty -a encrypt -k 1001010011` will result in this:

![image](https://user-images.githubusercontent.com/57208499/156901041-e5e88bcb-4dab-439a-8293-a8bf26574cef.png)

### Decryption example
When running `s-des -v 000011101000010001001110111110001101111000100100 -a decrypt -k 1001010011` you'll get the following:

![image](https://user-images.githubusercontent.com/57208499/156901021-cd316e1f-f21e-4c14-934a-5e6972bd50a7.png)
