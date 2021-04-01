import os
import base64

secret = "" #Empty string to append message.
files = [] #Empty list to appendn files.

for filename in os.listdir(os.getcwd()): #Open all files in directory.
   with open(os.path.join(os.getcwd(), filename), 'r') as f:
      if filename != 'script.py': files.append(filename) #Append to files list.

code_decode_dictionary = {} #Emty dictionary to keep files in key pair order.
for code in files:
    base64_bytes = code.encode('ascii') #Decrypt base64 code.
    message_bytes = base64.b64decode(base64_bytes)
    message = message_bytes.decode('ascii')
    code_decode_dictionary[code] = int(message) #Put in dictionary

#Sort dictionary by key.
my_sorted = dict(sorted(code_decode_dictionary.items(), key=lambda item: item[1]))

#Append sorted files in a list.
sorted_files = []
for key in my_sorted:
    sorted_files.append(key)
)

#Read binary file values and append to a string.
for filename2 in sorted_files:
    with open(filename2, 'r') as f2:
        secret = secret + f2.read() + " "

#Function to decode binary to ASCII.
def decode_binary_string(s):
    binary_values = s.split()
    ascii_string = ""
    for binary_value in binary_values:
        num_value = int(binary_value, 2)
        ascii_character = chr(num_value)
        ascii_string += ascii_character
    print(ascii_string)

#Get secret message.
decode_binary_string(secret)
