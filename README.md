# omegle-ipinfo

A skiddish WebExtension that shows you the stranger's IP along with some info associated with it.

## Features

 - Prints out the IP address of the stranger you're connected to in chat alongside some info like approximate location (based on the location tied to the IP), ISP name etc.
 - That's pretty much it lol
 
## Installation

### Firefox

If you're on Firefox just download and install the XPI file in the [latest release](https://github.com/fantoro/omegle-ipinfo/releases/latest).

### Chrome

Installation is a bit trickier on Chrome because I couldn't get Google to sign my extension so you'll have to "sideload" it yourself.

 - Sideloading/Load unpacked
   - `git clone` the repository or download and extract a zip.
   - Navigate to [chrome://extensions](chrome://extensions).
   - In the top right corner enable developer mode.
   - A bar should pop up at the top, click on the `Load unpacked` button.
   - This will open a file open dialog, navigate to the directory with the repository and click `Select folder`.
   - And you're done, the extension should be installed and working now
