# crypto

Command line cryptographic apps

## s-des-algorithm CLI App
To run the application do the following steps:

1. Type `npm run build` in command line to build the project.
2. Type `npm install -g` to install script globally. Now you can run it from anywhere with just typing `s-des` followed with command line arguments.

#### Encryption example
Typing `s-des -v qwerty -a encrypt -k 1001010011` will result in this:

![image](https://user-images.githubusercontent.com/57208499/156901041-e5e88bcb-4dab-439a-8293-a8bf26574cef.png)

#### Decryption example
When running `s-des -v 000011101000010001001110111110001101111000100100 -a decrypt -k 1001010011` you'll get the following:

![image](https://user-images.githubusercontent.com/57208499/156901021-cd316e1f-f21e-4c14-934a-5e6972bd50a7.png)


## public-key-algorithms (RSA)
There are several separate apps: `rsa-keygen`, `euclid-key-calc` and `rsa` itself.
To run these apps you should run the following commands:
1. `npm run build` to build the project.
2. `npm i -g` to make apps available globally on your machine.

Now, you may call appropriate apps by typing it name (e.g. `rsa-keygen`) in command line or any other terminal and necessary arguments. You may find more info on arguments by typing command with `--help` flag (e.g. `rsa --help`).

### rsa-keygen
This app is used to generate  private and public keys (their inner parts `d`, `e` and `r`).

After running `rsa-keygen` you'll get something similar:

![image](https://user-images.githubusercontent.com/57208499/157196788-f8d4a72c-7cc5-422a-8828-eb58951a7670.png)

### rsa
This app is used to encrypt/decrypt data.

To run it you should type command that looks like this:
```
rsa -a encrypt -s cli -v "Hello World!" -e <key> -r <key>
```
When working with files command will look like this:
```
rsa -a encrypt -s file -i "input.txt" -o "output.txt" -e <key> -r <key>
```

To learn more about each parameter simply run `rsa --help`

### euclid-key-calc
App used to find private key based on `p`, `q` and `e` values.

_Command:_
```
euclid-key-calc -p 3 -q 11 -e 7
```

_Result:_

![image](https://user-images.githubusercontent.com/57208499/157203156-a91db928-3ff3-4280-bba0-200cf30bc9f4.png)


## murmur-hash-3 (MurmurHash3 hash function)
To run the application do the following steps:

1. Type `npm run build` in command line to build the project.
2. Type `npm install -g` to install script globally. Now you can run it from anywhere with just typing `murmur-hash-3` followed with command line arguments.

### Calculate hash value
```
murmur-hash-3 -v "Hello World!" -s 21 -t cli
```

### Result
![image](https://user-images.githubusercontent.com/57208499/157228384-e7a491f1-d185-438d-ad13-87418a3be612.png)


## digital-signature (RSA & MurmurHash3 - based)

### Result

<img src="https://user-images.githubusercontent.com/57208499/159134037-8880a17d-1d39-4eea-8ebc-cff168b9d26f.png" width="50%" height="50%">
<img src="https://user-images.githubusercontent.com/57208499/159133830-bc56b02c-ef9c-4ca4-b1c9-d0f3881a0bc5.png" width="50%" height="50%">

#### Example of successful check
<img src="https://user-images.githubusercontent.com/57208499/159133882-0b18a127-b197-448e-b008-5d9965499c0d.png" width="50%" height="50%">

#### Example of failed check
<img src="https://user-images.githubusercontent.com/57208499/159133899-82fa99d1-f280-4f72-bb40-efad6f54600a.png" width="50%" height="50%">


## lsb (Least Significant Bit)

### Result

<img src="https://user-images.githubusercontent.com/57208499/159171939-ee337e32-2daf-455f-9f07-56551890fa3e.png" width="50%" height="50%">

<img src="https://user-images.githubusercontent.com/57208499/159172181-d24c3b11-dc5d-43d0-b496-93815ca3f5e2.png" width="50%" height="50%">
